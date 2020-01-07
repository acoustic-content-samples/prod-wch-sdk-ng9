import { LoggerService, User } from '@acoustic-content-sdk/api';
import { addAuthoringAssetAction } from '@acoustic-content-sdk/redux-feature-auth-asset';
import {
  addAuthoringContentAction,
  removeAuthoringContentAction
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  SetErrorAction,
  setErrorAction
} from '@acoustic-content-sdk/redux-feature-error';
import { selectCurrentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { rxSelect, selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  createUpdater,
  ensureDraftId,
  updateGenericProperties
} from '@acoustic-content-sdk/redux-utils';
import { WriteText } from '@acoustic-content-sdk/rest-api';
import {
  arrayPush,
  isNotEmpty,
  isString,
  mapArray,
  reduceArray,
  rxBackpressure,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  EMPTY,
  from,
  merge,
  Observable,
  of,
  OperatorFunction,
  pipe,
  queueScheduler
} from 'rxjs';
import {
  concatMap,
  filter,
  map,
  mergeMap,
  share,
  withLatestFrom
} from 'rxjs/operators';
import {
  persistAuthContent,
  persistAuthContentBuffer,
  PersistBatchBufferResult,
  PersistBatchResult
} from '../../utils/auth.content.persist';
import {
  isAuthoringAsset,
  isAuthoringContentItem
} from '../../utils/auth.content.utils';
import { isTest } from '../../utils/env';
import {
  ACTION_SAVE_AUTH_BATCH,
  ACTION_SAVE_AUTH_BATCH_INTERNAL,
  AuthoringSaveBatchItems,
  AuthoringSaveItem,
  SaveAuthoringBatchAction,
  SaveAuthoringBatchInternalAction,
  saveAuthoringBatchInternalAction,
  SaveEndAction,
  saveEndAction,
  saveStartAction
} from './save.actions';

export const LOGGER = 'SaveEpic';

export interface SaveDependencies {
  writeJson: WriteText;
  logSvc: LoggerService;
}

/**
 * Assembles the actions across the targets
 *
 * @param aDst - target
 * @param aItem - item
 *
 * @returns the target
 */
export function reduceSaveActions(
  aDst: Action[],
  aItem: AuthoringSaveItem
): Action[] {
  // is the item deleted?
  if (isString(aItem)) {
    // remove the item
    arrayPush(removeAuthoringContentAction(aItem), aDst);
  } else if (isAuthoringContentItem(aItem)) {
    // add the item
    arrayPush(addAuthoringContentAction(aItem), aDst);
  } else if (isAuthoringAsset(aItem)) {
    // add the asset
    arrayPush(addAuthoringAssetAction(aItem), aDst);
  }
  // returns the target
  return aDst;
}

/**
 * Augments the properties with some useful information
 *
 * @param aItem - the actual item
 * @param aUser - the user making a change
 *
 * @returns a copy of the item, augmented with info
 */
export function augmentGenericProperties(
  aItem: AuthoringSaveItem,
  aUser: User
): AuthoringSaveItem {
  // rewrite the ID
  if (isString(aItem)) {
    return ensureDraftId(aItem);
  } else {
    const itemUpdater = createUpdater(aItem);
    updateGenericProperties(itemUpdater, aUser);
    return itemUpdater.get();
  }
}

/**
 * Converts a saved item into a sequence of actions that execute the save operation
 *
 * @param aItem - the item to save
 * @returns the set of actions
 */
function getSaveActions(
  aItems: AuthoringSaveBatchItems,
  aUser: User
): Action[] {
  // update the revision
  const items = mapArray(aItems, (item) =>
    augmentGenericProperties(item, aUser)
  );
  // the actions
  return reduceArray(items, reduceSaveActions, [
    saveAuthoringBatchInternalAction(items)
  ]);
}

/**
 * Dispatch authoring batch operations
 */
const saveBatchEpic: Epic = (actions$, state$) => {
  // access the current user
  const currentUser$ = rxPipe(state$, rxSelect(selectCurrentUserFeature));

  return rxPipe(
    actions$,
    ofType<SaveAuthoringBatchAction>(ACTION_SAVE_AUTH_BATCH),
    // extract the batch operation
    map(selectPayload),
    // sanity check
    filter(isNotEmpty),
    // access the user
    withLatestFrom(currentUser$),
    // map to the actual actions
    map(([actions, user]) => getSaveActions(actions, user)),
    // convert
    mergeMap((actions) => from(actions))
  );
};

declare type PersistResultAction = SaveEndAction | SetErrorAction<any>;

// converts errors into actions
const errorActions = (errors?: any[]): Observable<SetErrorAction<any>> =>
  isNotEmpty(errors) ? rxPipe(from(errors), map(setErrorAction)) : EMPTY;

/**
 * Converts the batch result into a sequence of result actions
 *
 * @param result - the actual batch result
 * @returns the stream of result actions
 */
function persistBatchBufferResultActions({
  buffer,
  errors
}: PersistBatchBufferResult): Observable<PersistResultAction> {
  // the save result actions
  const result$ = rxPipe(from(buffer), map(saveEndAction));
  // the error actions
  const errors$ = errorActions(errors);
  // merge
  return merge(result$, errors$);
}

function persistBatchResultActions({
  batch,
  errors
}: PersistBatchResult): Observable<PersistResultAction> {
  // the save result actions
  const result$ = of(saveEndAction(batch));
  // the error actions
  const errors$ = errorActions(errors);
  // merge
  return merge(result$, errors$);
}

const persistEpic: Epic = (
  actions$,
  state$,
  { writeJson, logSvc }: SaveDependencies
) => {
  // scheduler to use
  const scheduler = queueScheduler;
  // construct the logger
  const logger = logSvc.get(LOGGER);
  // buffered persist
  const persistBuffer = persistAuthContentBuffer(writeJson, logger, scheduler);
  const persistBatch = persistAuthContent(writeJson, logger, scheduler);
  // buffering operator
  const opBuffering: OperatorFunction<
    AuthoringSaveBatchItems,
    PersistResultAction
  > = pipe(
    // backpressure
    rxBackpressure(persistBuffer),
    // map the result into result streams
    mergeMap(persistBatchBufferResultActions)
  );
  // without buffering, just append one batch after the other
  const opNoBuffering: OperatorFunction<
    AuthoringSaveBatchItems,
    PersistResultAction
  > = pipe(concatMap(persistBatch), mergeMap(persistBatchResultActions));
  // no buffering in test
  const opAggregation = isTest ? opNoBuffering : opBuffering;

  /**
   * The item batches
   */
  const src$: Observable<AuthoringSaveBatchItems> = rxPipe(
    actions$,
    ofType<SaveAuthoringBatchInternalAction>(ACTION_SAVE_AUTH_BATCH_INTERNAL),
    // extract the batch operation
    map(selectPayload),
    // sanity check
    filter(isNotEmpty),
    // use the same sequence for the save start and save end actions
    share()
  );

  // the start events
  const startSavingEvents$ = rxPipe(src$, map(saveStartAction));

  // the actual save events
  const savingEvents$ = rxPipe(src$, opAggregation);

  // go
  return merge(startSavingEvents$, savingEvents$);
};

export const savingEpic: Epic = combineEpics(saveBatchEpic, persistEpic);
