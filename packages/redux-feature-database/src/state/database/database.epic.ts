import { BaseAuthoringItem, LoggerService } from '@acoustic-content-sdk/api';
import {
  ACTION_ADD_AUTH_ASSET,
  ACTION_LOAD_AUTH_ASSET,
  AddAuthoringAssetAction,
  addAuthoringAssetAction,
  LoadAuthoringAssetAction,
} from '@acoustic-content-sdk/redux-feature-auth-asset';
import {
  ACTION_ADD_AUTH_CONTENT,
  ACTION_LOAD_AUTH_CONTENT,
  AddAuthoringContentAction,
  addAuthoringContentIfNonExistentAction,
  LoadAuthoringContentAction,
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  ACTION_ADD_AUTH_LAYOUT,
  ACTION_LOAD_AUTH_LAYOUT,
  AddAuthoringLayoutAction,
  addAuthoringLayoutIfNonExistentAction,
  LoadAuthoringLayoutAction,
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  ACTION_ADD_AUTH_LAYOUT_MAPPING,
  ACTION_LOAD_AUTH_LAYOUT_MAPPING,
  AddAuthoringLayoutMappingAction,
  addAuthoringLayoutMappingIfNonExistentAction,
  LoadAuthoringLayoutMappingAction,
} from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import {
  ACTION_ADD_AUTH_CONTENT_TYPE,
  ACTION_LOAD_AUTH_CONTENT_TYPE,
  AddAuthoringContentTypeAction,
  addAuthoringContentTypeIfNonExistentAction,
  LoadAuthoringContentTypeAction,
} from '@acoustic-content-sdk/redux-feature-auth-type';
import { setErrorAction } from '@acoustic-content-sdk/redux-feature-error';
import {
  ACTION_HANDLEBARS_LOAD_TEMPLATE,
  ACTION_HANDLEBARS_SET_TEMPLATE,
  handlebarsAddTemplateAction,
  HandlebarsKey,
  HandlebarsLoadTemplateAction,
  HandlebarsSetTemplateAction,
  HandlebarsSetTemplatePayload,
} from '@acoustic-content-sdk/redux-feature-handlebars';
import { selectApiUrl, selectUrlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import { selectCurrentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { PayloadAction, rxSelect, selectPayload } from '@acoustic-content-sdk/redux-store';
import { getDeliveryIdFromAuthoringItem, markAsFromDataBase } from '@acoustic-content-sdk/redux-utils';
import { opFilterNotNil, opShareLast, rxPipe, typedPluck } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { asyncScheduler, combineLatest, merge, Observable, of, UnaryFunction } from 'rxjs';
import { catchError, map, mergeMap, observeOn, withLatestFrom } from 'rxjs/operators';

import { DataBase } from '../../db/database';
import { openIndexedDbDataBase } from '../../db/indexed.db';
import { openLocalStorageDataBase } from '../../db/local.storage';
import { databaseItemSavedAction, DatabaseReadItemPayload } from './database.actions';

const LOGGER = 'DataBaseEpic';

export interface DataBaseDependencies {
  logSvc: LoggerService;
}

const USE_INDEXED_DB = false;

const openDataBase = USE_INDEXED_DB
  ? openIndexedDbDataBase
  : openLocalStorageDataBase;

/**
 * Extracts the data record to persist from the action
 *
 * @param aAction   the action
 * @return the data record
 */
function extractData(aAction: PayloadAction<any>): [string, any] {
  // check the type
  const { type } = aAction;
  if (type === ACTION_HANDLEBARS_SET_TEMPLATE) {
    // the payload
    const payload: HandlebarsSetTemplatePayload = selectPayload(aAction);
    // data
    return [payload.key, payload.stringTemplate];
  } else {
    // assume some authoring data structure
    const payload: BaseAuthoringItem = selectPayload(aAction);
    const id = getDeliveryIdFromAuthoringItem(payload);
    // data
    return [id, payload];
  }
}

/**
 * Persists the data item to the database
 *
 * @param aId  - ID of the item
 * @param aData   - the data record
 * @param aDataBase  - the data base
 *
 * @return a promise when the data has been saved
 */
function writeData(
  aId: string,
  aData: any,
  aDataBase: DataBase
): PromiseLike<string> {
  // just dispatch
  return aDataBase.write(aId, aData);
}

/**
 * Maps from load action to add action
 */
const LOAD_ACTION_MAP: Record<string, UnaryFunction<any, Action>> = {
  [ACTION_LOAD_AUTH_CONTENT]: addAuthoringContentIfNonExistentAction,
  [ACTION_LOAD_AUTH_ASSET]: addAuthoringAssetAction,
  [ACTION_LOAD_AUTH_LAYOUT]: addAuthoringLayoutIfNonExistentAction,
  [ACTION_LOAD_AUTH_LAYOUT_MAPPING]: addAuthoringLayoutMappingIfNonExistentAction,
  [ACTION_LOAD_AUTH_CONTENT_TYPE]: addAuthoringContentTypeIfNonExistentAction
};

/**
 * Maps to the actual read action
 *
 * @param aAction  - the load action
 *
 * @returns the read action
 */
function createDatabaseReadItemPayload(
  aAction: PayloadAction<any>
): DatabaseReadItemPayload {
  // check the type
  const { type } = aAction;
  // special case for handlebars
  if (type === ACTION_HANDLEBARS_LOAD_TEMPLATE) {
    // extract the payload
    const key: HandlebarsKey = selectPayload(aAction);
    // the action callback
    const action = (stringTemplate: string) =>
      handlebarsAddTemplateAction({ key, stringTemplate });
    // create the read action
    return { id: key, action };
  } else {
    // extract the payload
    const id: string = selectPayload(aAction);
    // map to the action
    const action = LOAD_ACTION_MAP[type];
    // create the read action
    return { id, action };
  }
}

/**
 * Performs the read operation against the local database
 *
 * @param aPayload  - the payload with the ID of the item and the action
 * @param aDataBase - the database
 *
 * @returns the desired action sequence
 */
function executeReadAction<T>(
  aPayload: DatabaseReadItemPayload<T>,
  aDataBase: DataBase
): Observable<Action> {
  // decompose
  const { id, action } = aPayload;
  // read the actual data item
  const item$: Observable<T> = rxPipe(
    aDataBase.read<T>(id),
    observeOn(asyncScheduler)
  );
  // map to the actual action
  const result$: Observable<Action> = rxPipe(
    // work on the resolved item
    item$,
    // sanity check
    opFilterNotNil,
    // augment the item with our internal identifier
    map(markAsFromDataBase),
    // generate the desired action
    map(action),
    // error handling
    catchError((error) => of(setErrorAction(error)))
  );
  // ok
  return result$;
}

/**
 * Side effect to persist all items added to the store to the database
 */
export const dataBaseEpic: Epic = (
  actions$,
  state$,
  { logSvc }: DataBaseDependencies
) => {
  /**
   * The URL configuration
   */
  const urlConfig$ = rxPipe(state$, rxSelect(selectUrlConfigFeature));
  const apiUrl$ = rxPipe(
    urlConfig$,
    rxSelect(selectApiUrl),
    opFilterNotNil,
    typedPluck('href')
  );
  /**
   * The current user
   */
  const currentUser$ = rxPipe(state$, rxSelect(selectCurrentUserFeature));

  /**
   * The derived database
   */
  const db$ = rxPipe(
    combineLatest(apiUrl$, currentUser$),
    map(([apiUrl, currentUser]) => openDataBase(apiUrl, currentUser, logSvc)),
    opShareLast
  );

  /**
   * Handles the persist case
   */
  const persist$ = rxPipe(
    actions$,
    ofType<
      | AddAuthoringContentAction
      | AddAuthoringAssetAction
      | AddAuthoringLayoutAction
      | AddAuthoringLayoutMappingAction
      | AddAuthoringContentTypeAction
      | HandlebarsSetTemplateAction
    >(
      ACTION_ADD_AUTH_CONTENT,
      ACTION_ADD_AUTH_ASSET,
      ACTION_ADD_AUTH_LAYOUT,
      ACTION_ADD_AUTH_LAYOUT_MAPPING,
      ACTION_ADD_AUTH_CONTENT_TYPE,
      ACTION_HANDLEBARS_SET_TEMPLATE
    ),
    // extract the data
    map(extractData),
    // augment with the db
    withLatestFrom(db$),
    // actually write the item
    mergeMap(([[id, data], db]) => writeData(id, data, db)),
    // convert the result to a saved action
    map(databaseItemSavedAction),
    // some error handling
    catchError((error) => of(setErrorAction(error)))
  );

  /** Handles the read case */
  const read$ = rxPipe(
    actions$,
    ofType<
      | LoadAuthoringContentAction
      | LoadAuthoringAssetAction
      | LoadAuthoringLayoutAction
      | LoadAuthoringLayoutMappingAction
      | LoadAuthoringContentTypeAction
      | HandlebarsLoadTemplateAction
    >(
      ACTION_LOAD_AUTH_CONTENT,
      ACTION_LOAD_AUTH_ASSET,
      ACTION_LOAD_AUTH_LAYOUT,
      ACTION_LOAD_AUTH_LAYOUT_MAPPING,
      ACTION_LOAD_AUTH_CONTENT_TYPE,
      ACTION_HANDLEBARS_LOAD_TEMPLATE
    ),
    // map to the read payload
    map(createDatabaseReadItemPayload),
    // augment with the db
    withLatestFrom(db$),
    // read
    mergeMap(([payload, db]) => executeReadAction(payload, db))
  );

  // combines the read and the write case
  return merge(persist$, read$);
};
