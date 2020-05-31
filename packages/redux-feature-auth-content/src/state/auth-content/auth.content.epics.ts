import {
  AuthoringContentItem,
  AuthoringSelectedLayout,
  LoggerService
} from '@acoustic-content-sdk/api';
import { guaranteeAuthoringAssetAction } from '@acoustic-content-sdk/redux-feature-auth-asset';
import { guaranteeAuthoringLayoutAction } from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  createAuthenticatedLoader,
  guaranteeEpic,
  LoaderType,
  nonExistentEpic,
  PROJECT_ID_QUERY_PARAM
} from '@acoustic-content-sdk/redux-feature-load';
import { selectCurrentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { rxSelect, selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  addToSetEpic,
  getDeliveryIdFromAuthoringItem,
  updateValueByAccessor
} from '@acoustic-content-sdk/redux-utils';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  isNil,
  isNotEmpty,
  jsonParse,
  mapArray,
  opFilterNotNil,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, MonoTypeOperatorFunction } from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { migrateContentItem } from '../../utils/auth.content.migrate';
import {
  referencedAssets,
  referencedContent
} from '../../utils/auth.content.utils';
import {
  ACTION_ADD_AUTH_CONTENT,
  ACTION_ADD_AUTH_CONTENT_IF_NONEXISTENT,
  ACTION_AUTH_CONTENT_PROPERTY_UPDATE,
  ACTION_GUARANTEE_AUTH_CONTENT,
  ACTION_LOAD_AUTH_CONTENT,
  ACTION_SET_AUTH_CONTENT,
  AddAuthoringContentAction,
  addAuthoringContentAction,
  AuthContentPropertyUpdateAction,
  guaranteeAuthoringContentAction,
  LoadAuthoringContentAction,
  loadAuthoringContentAction,
  saveAuthoringContentAction,
  SaveAuthoringContentAction,
  ACTION_SAVE_AUTH_CONTENT,
  saveAuthoringContentBatchAction
} from './auth.content.actions';
import { selectAuthContentFeature } from './auth.content.feature';
import { selectAuthoringContentItem } from './auth.content.selectors';
import { AuthoringContentState } from './auth.content.state';

const LOGGER = 'AuthContentEpic';

/**
 * Actions to load content
 *
 * @param aIds - the IDs of the content
 * @param aContent - the available content state
 *
 * @returns the actions
 */
function guaranteeContentActions(
  aIds: string[],
  aContent: AuthoringContentState
): Action[] {
  // create the actions required to load missing content
  return isNotEmpty(aIds)
    ? mapArray(
        aIds.filter((id) => isNil(aContent[id])),
        guaranteeAuthoringContentAction
      )
    : [];
}

export interface AuthoringContentDependencies {
  fetchText: FetchText;
  logSvc: LoggerService;
}

/**
 * Initialize the active page
 */
const resolveContentEpic: Epic = (
  actions$,
  state$,
  { logSvc }: AuthoringContentDependencies
) => {
  // create logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveContentEpic'
  );

  // access the content items
  const authContent$ = rxPipe(state$, rxSelect(selectAuthContentFeature));

  return rxPipe(
    actions$,
    ofType<AddAuthoringContentAction>(ACTION_ADD_AUTH_CONTENT),
    // extract the item
    map(selectPayload),
    // find the references
    map((data) => referencedContent(data, logger)),
    // log this
    log('referencedContent'),
    // work against the current content
    withLatestFrom(authContent$),
    // load referenced content
    map(([ids, authContent]) => guaranteeContentActions(ids, authContent)),
    // convert into observables
    mergeMap((actions) => from(actions))
  );
};

/**
 * Initialize the active page
 */
const saveContentEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType<SaveAuthoringContentAction>(ACTION_SAVE_AUTH_CONTENT),
    // extract the actual item
    map(selectPayload),
    // sanity check
    opFilterNotNil,
    // convert to an array
    map((item) => [item]),
    // map to the batch action
    map(saveAuthoringContentBatchAction)
  );

/**
 * Initialize the active page
 */
const loadContentEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: AuthoringContentDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      fetchText(
        `authoring/v1/content/${encodeURIComponent(
          id
        )}?${PROJECT_ID_QUERY_PARAM}&include=links&include=metadata`
      ),
      // convert text to json
      map<string, AuthoringContentItem>(jsonParse),
      // migrate content to latest type
      map(migrateContentItem),
      // save the loaded type
      map(addAuthoringContentAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<LoadAuthoringContentAction>(ACTION_LOAD_AUTH_CONTENT),
    // extract the id of the type
    map(selectPayload),
    // load
    opLoader
  );
};

// epic to convert from ACTION_ADD_AUTH_CONTENT to ACTION_SET_AUTH_CONTENT
const setContentEpic = addToSetEpic<AuthoringContentItem>(
  ACTION_ADD_AUTH_CONTENT,
  ACTION_SET_AUTH_CONTENT
);

/**
 * Handles a property update
 */
const propUpdateEpic: Epic = (actions$, state$) => {
  // access the segments
  const authContent$ = rxPipe(state$, rxSelect(selectAuthContentFeature));
  const user$ = rxPipe(state$, rxSelect(selectCurrentUserFeature));

  return rxPipe(
    actions$,
    ofType<AuthContentPropertyUpdateAction>(
      ACTION_AUTH_CONTENT_PROPERTY_UPDATE
    ),
    map(selectPayload),
    withLatestFrom(authContent$, user$),
    // construct the updated item
    map(([update, content, user]) =>
      updateValueByAccessor(
        update.accessor,
        update.value,
        selectAuthoringContentItem(update.id)(content),
        user
      ).get()
    ),
    // dispatch to the save action
    map(saveAuthoringContentAction)
  );
};

/**
 * Determine the IDs of the layouts to resolve
 *
 * @param aLayouts - the authoring layouts
 * @returns the resolved layout IDs
 */
function idsFromSelectedLayouts(aLayouts: AuthoringSelectedLayout[]): string[] {
  return mapArray(aLayouts, (layout) => layout.layout.id);
}

/**
 * Loads the layouts that are selected from the content item
 */
const resolveLayoutEpic: Epic = (
  actions$,
  state$,
  { logSvc }: AuthoringContentDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveLayoutEpic'
  );

  return rxPipe(
    actions$,
    ofType<AddAuthoringContentAction>(ACTION_ADD_AUTH_CONTENT),
    // extract the id of the type
    map(selectPayload),
    // resolve all layout IDs from the component
    map((item) => idsFromSelectedLayouts(item.selectedLayouts)),
    // only non empty arrays
    filter(isNotEmpty),
    // log the layouts
    log('layouts'),
    // convert into load actions
    map((items) => mapArray(items, guaranteeAuthoringLayoutAction)),
    // map into actions
    mergeMap((actions) => from(actions))
  );
};

const resolveAssetEpic: Epic = (
  actions$,
  state$,
  { logSvc }: AuthoringContentDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);

  return rxPipe(
    actions$,
    ofType<AddAuthoringContentAction>(ACTION_ADD_AUTH_CONTENT),
    // extract the id of the asset
    map(selectPayload),
    // sanity check
    opFilterNotNil,
    // determine the assets referenced by the item
    map((contentItem) => referencedAssets(contentItem, logger)),
    // protect against empty calls
    filter(isNotEmpty),
    // guarantee that the assets are available
    map((assetIds) => mapArray(assetIds, guaranteeAuthoringAssetAction)),
    // dispatch the actions
    mergeMap((actions) => from(actions))
  );
};

/**
 * Handles item guarantees
 */
const guaranteeContentEpic: Epic = guaranteeEpic(
  ACTION_GUARANTEE_AUTH_CONTENT,
  loadAuthoringContentAction,
  selectAuthContentFeature
);

/**
 * Handles non existent items
 */
const nonExistentContentEpic: Epic = nonExistentEpic(
  ACTION_ADD_AUTH_CONTENT_IF_NONEXISTENT,
  addAuthoringContentAction,
  getDeliveryIdFromAuthoringItem,
  selectAuthContentFeature
);

export const authoringContentEpic: Epic = combineEpics(
  loadContentEpic,
  guaranteeContentEpic,
  nonExistentContentEpic,
  propUpdateEpic,
  saveContentEpic,
  resolveContentEpic,
  setContentEpic,
  resolveLayoutEpic,
  resolveAssetEpic
);
