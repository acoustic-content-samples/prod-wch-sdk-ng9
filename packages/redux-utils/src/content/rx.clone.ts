import {
  AuthoringAsset,
  AuthoringContentItem,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  arrayPush,
  assignObject,
  BiFunction,
  boxLoggerService,
  isEmpty,
  isNotNil,
  isString,
  mapArray,
  Maybe,
  objectAssign,
  objectKeys,
  opFilterNotNil,
  reduceArray,
  reduceForIn,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  EMPTY,
  MonoTypeOperatorFunction,
  Observable,
  of,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import {
  getDeliveryId,
  getDeliveryIdFromAuthoringItem
} from '../draft/draft.utils';
import { AuthoringItem, cloneItems as oldCloneItems } from './auth.clone';
import {
  isAuthoringContentItem,
  referencedAssets,
  referencedContent
} from './auth.content.utils';

export type ResolveAuthoringContentItem = UnaryFunction<
  string,
  Observable<AuthoringContentItem>
>;
export type ResolveAuthoringAsset = UnaryFunction<
  string,
  Observable<AuthoringAsset>
>;

export interface ResolvedNode<T> {
  id: string;
  item: T;
  parentId?: string;
}

export type ResolutionResult = Record<string, ResolvedNode<AuthoringItem>>;

declare type Cycles = Record<string, string>;

const LOGGER = 'RxClone';

function safeCombineLatest<T>(
  aInput: Observable<T>[],
  aScheduler: SchedulerLike
): Observable<T[]> {
  return isEmpty(aInput)
    ? of([], aScheduler)
    : combineLatest(aInput, aScheduler);
}

function assignResolvedNode(
  aDst: ResolutionResult,
  item: AuthoringItem,
  parentId?: string
): ResolutionResult {
  const id = getDeliveryIdFromAuthoringItem(item);
  return objectAssign(id, { id, item, parentId }, aDst);
}

/**
 * Aggregates the assets into a resolution map
 *
 * @param aParentId
 * @param aAssets
 */
const authoringAssetsToResolutionResult = (
  aAssets: AuthoringAsset[],
  aParentId?: string
): ResolutionResult =>
  reduceArray(
    aAssets,
    (aRes: ResolutionResult, aAsset: AuthoringAsset) =>
      assignResolvedNode(aRes, aAsset, aParentId),
    {}
  );

const mergeResolutionResults = (
  aResults: ResolutionResult[]
): ResolutionResult =>
  reduceArray(
    aResults,
    (aRes: ResolutionResult, aResult: ResolutionResult) =>
      assignObject(aRes, aResult),
    {}
  );

const reduceIsNotNil = (aResult: boolean, aItem: any) =>
  aResult && isNotNil(aItem);
const isNoneNil = (aItems: any[]) => reduceArray(aItems, reduceIsNotNil, true);

export type IdOrItem = string | AuthoringContentItem;

function selectId(aIdOrItem: IdOrItem): string {
  return isString(aIdOrItem)
    ? getDeliveryId(aIdOrItem)
    : getDeliveryIdFromAuthoringItem(aIdOrItem);
}

/**
 * Resolves the content item and its dependencies
 *
 * @param item - the content item
 * @param parentId - ID of the parent item
 * @param resolveItem - callback to resolve a content item
 * @param resolveAsset - callback to resolve an asset
 * @param cycles - map of the currently resolved nodes for cycle protection
 * @param logger - the logger instance
 * @param scheduler - scheduler for recursive calls
 *
 * @returns the dependencies
 */
function rxResolveDependencies(
  item: AuthoringContentItem,
  parentId: string,
  resolveItem: ResolveAuthoringContentItem,
  resolveAsset: ResolveAuthoringAsset,
  cycles: Cycles,
  logger: Logger,
  scheduler: SchedulerLike
): Observable<ResolutionResult> {
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // the ID
  const id = getDeliveryIdFromAuthoringItem(item);
  // the item itself
  const result: ResolutionResult = { [id]: { id, item, parentId } };
  // resolve the assets
  const asset$ = rxPipe(
    safeCombineLatest(
      mapArray(referencedAssets(item, logger), resolveAsset),
      scheduler
    ),
    filter(isNoneNil),
    log('assets'),
    map((assets) => authoringAssetsToResolutionResult(assets, parentId))
  );
  // resolve the items
  const item$ = safeCombineLatest(
    mapArray(referencedContent(item, logger), (refId) =>
      rxResolveContentItems(
        refId,
        id,
        resolveItem,
        resolveAsset,
        cycles,
        logger,
        scheduler
      )
    ),
    scheduler
  );
  // combine everything
  return rxPipe(
    combineLatest([asset$, item$], scheduler),
    map(([assets, items]) => mergeResolutionResults([result, assets, ...items]))
  );
}

/**
 * Loads one content item and resolves its dependencies
 *
 * @param id - ID of the item to resolve
 * @param parentId - ID of the parent item
 * @param resolveItem - callback to resolve a content item
 * @param resolveAsset - callback to resolve an asset
 * @param cycles - map of the currently resolved nodes for cycle protection
 * @param logger - the logger instance
 * @param scheduler - scheduler for recursive calls
 *
 * @returns the resolution result
 */
function rxResolveContentItems(
  idOrItem: IdOrItem,
  parentId: Maybe<string>,
  resolveItem: ResolveAuthoringContentItem,
  resolveAsset: ResolveAuthoringAsset,
  cycles: Cycles,
  logger: Logger,
  scheduler: SchedulerLike
): Observable<ResolutionResult> {
  // extract the ID
  const id = selectId(idOrItem);
  // log this
  logger.info('rxResolveContentItems', id);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // sanity check
  const existing = cycles[id];
  if (isNotNil(existing)) {
    return EMPTY;
  }
  // cycle protection
  const cyc = { ...cycles, [id]: id };
  // the resolved item
  const item$ = isString(idOrItem) ? resolveItem(id) : of(idOrItem, scheduler);
  // resolve the item
  return rxPipe(
    item$,
    opFilterNotNil,
    log('item'),
    switchMap((item) =>
      rxResolveDependencies(
        item,
        parentId,
        resolveItem,
        resolveAsset,
        cyc,
        logger,
        scheduler
      )
    )
  );
}

/**
 * Resolves the item and all referenced items and assets
 *
 * @param id - ID of the item to resolve
 * @param resolveItem - callback to resolve a content item
 * @param resolveAsset - callback to resolve an asset
 * @param logSvc - logger service
 * @param scheduler - scheduler for recursive calls
 *
 * @returns the observable containing the resolution result
 */
export function rxResolveAuthoringItems(
  idOrItem: IdOrItem,
  resolveItem: ResolveAuthoringContentItem,
  resolveAsset: ResolveAuthoringAsset,
  aLogSvc?: LoggerService,
  scheduler: SchedulerLike = queueScheduler
): Observable<ResolutionResult> {
  // construct our logger
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // just dispatch
  return rxResolveContentItems(
    idOrItem,
    null,
    resolveItem,
    resolveAsset,
    {},
    logger,
    scheduler
  );
}

/**
 * Inserts the item and its parent items in topological order into the array
 *
 * @param aDst - target array
 * @param aItem - the resolved node that knows about the parent
 * @param aTotal - the total number of known nodes
 * @param aCycle - cycle protection
 *
 * @returns the original target array
 */
function reduceResolveItems(
  aDst: AuthoringItem[],
  aItem: ResolvedNode<AuthoringItem>,
  aTotal: ResolutionResult,
  aCycle: ResolutionResult
): AuthoringItem[] {
  // decode
  const { id, item, parentId } = aItem;
  // check for a cycle
  const existing = aCycle[id];
  if (isNotNil(existing)) {
    return aDst;
  }
  // protect against cycles
  aCycle[id] = aItem;
  // make sure we add the parent first
  const parentItem = aTotal[parentId];
  if (isNotNil(parentItem)) {
    reduceResolveItems(aDst, parentItem, aTotal, aCycle);
  }
  // insert in topological order
  return arrayPush(item, aDst);
}

/**
 * Performs a topological sort on a set of resolved items
 *
 * @param aResult - the resolution result, basically a graph of nodes
 *
 * @returns the items in toplogical order, i.e. parents before children
 */
export function sortAuthoringItems(aResult: ResolutionResult): AuthoringItem[] {
  // the result
  const cycle: ResolutionResult = {};
  // cycles
  return reduceForIn(
    aResult,
    (aRes: AuthoringItem[], aItem: ResolvedNode<AuthoringItem>) =>
      reduceResolveItems(aRes, aItem, aResult, cycle),
    []
  );
}

function reduceReferences(
  aItem: AuthoringItem
): BiFunction<
  Record<string, AuthoringItem>,
  string,
  Record<string, AuthoringItem>
> {
  return (aDst, aId) => objectAssign(aId, aItem, aDst);
}

/**
 * Returns a listing of all referenced items
 *
 * @param aItems - the item
 *
 * @returns all references
 */
export function referencedItems(
  aItems: AuthoringItem[],
  aLogger: Logger
): string[] {
  return objectKeys(
    reduceArray(
      aItems,
      (aResult: Record<string, AuthoringItem>, aItem: AuthoringItem) => {
        if (isAuthoringContentItem(aItem)) {
          // the callback
          const reducer = reduceReferences(aItem);
          reduceArray(referencedAssets(aItem, aLogger), reducer, aResult);
          reduceArray(referencedContent(aItem, aLogger), reducer, aResult);
        }
        // add the item
        return objectAssign(
          getDeliveryIdFromAuthoringItem(aItem),
          aItem,
          aResult
        );
      },
      {}
    )
  );
}

/**
 * Basically a re-export of the clone functionality to have it all clean inside this one function
 *
 * @param aItems - the original items
 * @returns the cloned items
 */
export const cloneAuthoringItems: UnaryFunction<
  AuthoringItem[],
  AuthoringItem[]
> = oldCloneItems;
