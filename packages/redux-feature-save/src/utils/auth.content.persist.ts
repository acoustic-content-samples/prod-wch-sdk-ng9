import {
  AuthoringAsset,
  AuthoringContentItem,
  BaseAuthoringItem,
  CLASSIFICATION_ASSET,
  Logger,
  Query
} from '@acoustic-content-sdk/api';
import {
  ensureDraftId,
  getDeliveryIdFromAuthoringItem,
  removeDataBaseMarker
} from '@acoustic-content-sdk/redux-utils';
import { WriteText } from '@acoustic-content-sdk/rest-api';
import {
  arrayPush,
  assertArray,
  assertObject,
  forEach,
  getPath,
  getProperty,
  isEqual,
  isNotEmpty,
  isNotNil,
  isString,
  mapArray,
  pluckProperty,
  queryToString,
  reduceArray,
  reduceForIn,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  concat,
  EMPTY,
  merge,
  Observable,
  of,
  queueScheduler,
  SchedulerLike,
  throwError,
  UnaryFunction
} from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { catchError, first, map, mapTo, toArray } from 'rxjs/operators';
import { v4 } from 'uuid';

import {
  AuthoringSaveBatchItems,
  AuthoringSaveItem
} from '../state/save/save.actions';
import { assertIsDraftId } from './asserts';
import { isAuthoringAsset, isAuthoringContentItem } from './auth.content.utils';

/** Publishes in batches of n seconds */
const ERR_CONTENT_NOT_FOUND = 2000;
const ERR_ASSET_NOT_FOUND = 3000;

function deleteItem(
  aWriteText: WriteText,
  aId: string,
  aLogger: Logger,
  aScheduler: SchedulerLike
): Observable<string> {
  // sanity check
  assertIsDraftId(aId, 'deleted item');
  // not able to tell content and asset ids apart, therefore need to attempt a deletion of both
  const encodedId = encodeURIComponent(aId);
  const errorHandler = catchError((err) => {
    // check if item has already been deleted (error code 2000 -> error.content.not.found, error coe 3000 -> error.asset.not.found)
    if (
      isHttpStatusCode(err, 404) &&
      (isErrorCode(err, ERR_CONTENT_NOT_FOUND) ||
        isErrorCode(err, ERR_ASSET_NOT_FOUND))
    ) {
      aLogger.info('No need to delete a non-existing item.');
      return of(aId, aScheduler);
    } else {
      return throwError(err);
    }
  });

  const deleteContent$ = rxPipe(
    aWriteText(`authoring/v1/content/${encodedId}`, null),
    errorHandler
  );
  const deleteAsset$ = rxPipe(
    aWriteText(`authoring/v1/assets/${encodedId}`, null),
    errorHandler
  );

  // temporarily disable delete operations (outstanding discussions how to delete drafts)
  return of(aId, aScheduler);
}

function persistAuthoringContentItem(
  aWriteText: WriteText,
  aItem: AuthoringContentItem,
  aLogger: Logger,
  aScheduler: SchedulerLike
): Observable<AuthoringContentItem> {
  // make sure to remove the DB marker
  const item = removeDataBaseMarker(aItem);
  // decompose
  const { id } = item;
  // sanity check
  assertIsDraftId(id, 'AuthoringContentItem');
  const encodedId = encodeURIComponent(id);
  const createContentUrl = `authoring/v1/content`;
  const updateContentUrl = `authoring/v1/content/${encodedId}?forceOverride=true`;
  return rxPipe(
    // try to update the item first
    aWriteText(updateContentUrl, item),
    catchError((err) => {
      if (
        isHttpStatusCode(err, 404) &&
        isErrorCode(err, ERR_CONTENT_NOT_FOUND)
      ) {
        aLogger.info(
          'Failed to update content item. Try to create it instead.'
        );
        const { rev, ...aItemWithoutRevision } = item;
        return aWriteText(createContentUrl, aItemWithoutRevision);
      } else {
        // pass error along in all other error cases
        return throwError(err);
      }
    })
  );
}

/**
 * Result of the save operation of a batch of items. The batch will either
 * contain the result of the save operation or the item we tried to save, initially.
 *
 * If errors occurred, these errors are part of a separate array.
 */
export interface PersistBatchResult {
  // batch result
  batch: AuthoringSaveBatchItems;
  // potential errors
  errors?: any[];
}

/**
 * Result of the save operation of a batch of items. The batch will either
 * contain the result of the save operation or the item we tried to save, initially.
 *
 * If errors occurred, these errors are part of a separate array.
 */
export interface PersistBatchBufferResult {
  // batch result
  buffer: AuthoringSaveBatchItems[];
  // potential errors
  errors?: any[];
}

interface PersistResult {
  // item to save
  item: AuthoringSaveItem;
  // potential error
  error?: any;
}

function persistResult(item: AuthoringSaveItem, error?: any): PersistResult {
  return { item, error };
}

/**
 * Converts a sequence of individual persist results into a batch result
 *
 * @param aResults  - the array of individual results
 * @returns the batch result
 */
function persistBatchResult(aResults: PersistResult[]): PersistBatchResult {
  // the batch
  const batch: AuthoringSaveBatchItems = [];
  const errors: any[] = [];
  // convert
  forEach(aResults, ({ item, error }) => {
    arrayPush(item, batch);
    if (isNotNil(error)) {
      arrayPush(error, errors);
    }
  });
  // returns the final item
  return isNotEmpty(errors) ? { batch, errors } : { batch };
}

const persistBatchBufferResult = (
  { batch, errors }: PersistBatchResult,
  aMapping: IndexBatchItems[]
): PersistBatchBufferResult => ({
  buffer: expandItems(batch, aMapping),
  errors
});

function isHttpStatusCode(err: any, statusCode: number): boolean {
  return err instanceof AjaxError && err.status === statusCode;
}

function isErrorCode(err: any, errorCode: number): boolean {
  return (
    err instanceof AjaxError &&
    getPath(err.response, ['errors', '0', 'code']) === errorCode
  );
}

function persistAuthoringAsset(
  aWriteText: WriteText,
  aItem: AuthoringAsset,
  aLogger: Logger,
  aScheduler: SchedulerLike
): Observable<AuthoringAsset> {
  // make sure to remove the DB marker
  const item = removeDataBaseMarker(aItem);
  // decompose
  const { id, classification } = item;
  const encodedId = encodeURIComponent(id);

  // sanity check
  if (classification !== CLASSIFICATION_ASSET) {
    // TODO move this logic into sdk redux-utils
    assertIsDraftId(id, 'AuthoringAsset');
  }
  const createAssetUrl = `authoring/v1/assets`;
  const updateAssetUrl = `authoring/v1/assets/${encodedId}?forceOverride=true`;
  return rxPipe(
    // try to update the item first
    aWriteText(updateAssetUrl, item),
    catchError((err) => {
      // if the update fails with 404 (i.e. item is not present, try to create it instead)
      if (isHttpStatusCode(err, 404) && isErrorCode(err, ERR_ASSET_NOT_FOUND)) {
        aLogger.info('Failed to update asset. Try to create it instead.');
        const { rev, ...aItemWithoutRevision } = item;
        return aWriteText(createAssetUrl, aItemWithoutRevision);
      } else {
        // pass error along in all other error cases
        return throwError(err);
      }
    })
  );
}

function persistItem(
  aWriteText: WriteText,
  aItem: AuthoringSaveItem,
  aLogger: Logger,
  aScheduler: SchedulerLike
): Observable<AuthoringSaveItem> {
  // dispatch
  if (isString(aItem)) {
    return deleteItem(aWriteText, aItem, aLogger, aScheduler);
  } else if (isAuthoringContentItem(aItem)) {
    return persistAuthoringContentItem(aWriteText, aItem, aLogger, aScheduler);
  } else if (isAuthoringAsset(aItem)) {
    return persistAuthoringAsset(aWriteText, aItem, aLogger, aScheduler);
  } else {
    // nothing special to persist
    return of(aItem, aScheduler);
  }
}

/**
 * Persists a single item and materializes a potential error
 *
 * @param aWriteText - the write function
 * @param aItem  - item to persist
 * @param aLogger - logger
 * @param aScheduler - scheduler
 */
const persistItemResult = (
  aWriteText: WriteText,
  aItem: AuthoringSaveItem,
  aLogger: Logger,
  aScheduler: SchedulerLike
): Observable<PersistResult> =>
  rxPipe(
    persistItem(aWriteText, aItem, aLogger, aScheduler),
    first(),
    map((item) => persistResult(item)),
    catchError((error) => of(persistResult(aItem, error), aScheduler))
  );

/**
 * Returns a helper function that persists a batch of items to the backend. The save
 * operations are executed sequentially
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aScheduler - the scheduler used to handle the async aspects
 *
 * @returns the persistence function
 */
function persistAuthContentBatch(
  aWriteText: WriteText,
  aLogger: Logger,
  aScheduler: SchedulerLike
): UnaryFunction<AuthoringSaveBatchItems, Observable<PersistBatchResult>> {
  // the actual persist operation
  function persist(
    batch: AuthoringSaveBatchItems
  ): Observable<PersistBatchResult> {
    // sanity check
    if (isNotEmpty(batch)) {
      // write the individual items
      const items$ = mapArray(batch, (item) =>
        persistItemResult(aWriteText, item, aLogger, aScheduler)
      );
      // make sure to execute in order
      return rxPipe(
        concat(...items$, aScheduler),
        toArray(),
        map(persistBatchResult)
      );
    }
    // nothing special to do
    return of({ batch }, aScheduler);
  }
  // returns the persistence operation
  return persist;
}

declare type IndexBatchItems = number[];

/**
 * Tests if two authoring save items are semantically identical
 *
 * @param aLeft   - left item
 * @param aRight  - right item
 *
 * @returns true if the items are identical, else false
 */
function isEqualAuthoringSaveItem(
  aLeft: AuthoringSaveItem,
  aRight: AuthoringSaveItem
): boolean {
  return (
    isEqual(aLeft, aRight) ||
    (isNotNil(aLeft) &&
      isNotNil(aRight) &&
      !isString(aLeft) &&
      !isString(aRight) &&
      isEqual(aLeft.classification, aRight.classification) &&
      isEqual(aLeft.id, aRight.id))
  );
}

/**
 * Receives a buffered list of batches. Compresses this into a single batch making sure
 * that sequences of equivalent items are only considered once using the last version of the
 * item.
 *
 * Also returns a mapping from the original topology into the index of the compressed batch
 *
 * @param aSrc - source list of batches
 * @returns the condensed list and a mapping back
 */
export function condenseItems(
  aSrc: AuthoringSaveBatchItems[]
): [AuthoringSaveBatchItems, IndexBatchItems[]] {
  // target batch
  const condensed: AuthoringSaveBatchItems = [];
  const index: IndexBatchItems[] = [];
  // count
  const bufferLen = aSrc.length;
  let last: AuthoringSaveItem;
  for (let bufferIdx = bufferLen - 1; bufferIdx >= 0; --bufferIdx) {
    // access current buffer
    const batch: AuthoringSaveBatchItems = aSrc[bufferIdx];
    const idxBatch: number[] = [];
    const batchLen = batch.length;
    for (let batchIdx = batchLen - 1; batchIdx >= 0; --batchIdx) {
      // current item
      const current: AuthoringSaveItem = batch[batchIdx];
      // test for sequences
      if (!isEqualAuthoringSaveItem(last, current)) {
        // we need to process this item
        arrayPush((last = current), condensed);
      }
      // register this (rewrite later)
      arrayPush(condensed.length, idxBatch);
    }
    // register the batch
    arrayPush(idxBatch, index);
  }
  /**
   * At this point all indexes and arrays are reverted, fix them
   */
  const condensedLen = condensed.length;
  const rewriteIndex = (aIdx: number) => condensedLen - aIdx;
  const mappedIdx = mapArray(index.reverse(), (idxBatch) =>
    mapArray(idxBatch.reverse(), rewriteIndex)
  );
  // done
  return [condensed.reverse(), mappedIdx];
}

/**
 * Expand items back
 */
export function expandItems<T>(
  aBatch: T[],
  aMapping: IndexBatchItems[]
): T[][] {
  // unmapper
  const unmap = (aIdx: number) => aBatch[aIdx];
  // do the inverse mapping
  return mapArray(aMapping, (batch) => mapArray(batch, unmap));
}

/**
 * Persists a buffer of items.
 */
export function persistAuthContentBuffer(
  aWriteText: WriteText,
  aLogger: Logger,
  aScheduler: SchedulerLike = queueScheduler
): UnaryFunction<
  AuthoringSaveBatchItems[],
  Observable<PersistBatchBufferResult>
> {
  // delegate
  const persistBatch = persistAuthContentBatch(aWriteText, aLogger, aScheduler);
  // the actual persist operation
  function persist(
    aBuffers: AuthoringSaveBatchItems[]
  ): Observable<PersistBatchBufferResult> {
    // splits the batch
    const [condensed, mapping] = condenseItems(aBuffers);
    // execute and unmap
    return rxPipe(
      persistBatch(condensed),
      map((result) => persistBatchBufferResult(result, mapping))
    );
  }
  // ok
  return persist;
}

/**
 * Returns a helper function that persists a batch of items to the backend. The save
 * operations are executed sequentially
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aScheduler - the scheduler used to handle the async aspects
 *
 * @returns the persistence function
 */
export function persistAuthContent(
  aWriteText: WriteText,
  aLogger: Logger,
  aScheduler: SchedulerLike = queueScheduler
): UnaryFunction<AuthoringSaveBatchItems, Observable<PersistBatchResult>> {
  // buffered persist
  return persistAuthContentBatch(aWriteText, aLogger, aScheduler);
}

/** First value is classification, second is id, third is lastModified */
declare type PublishItem = [string, string, string];

function createPublishItem(
  aClassification: string,
  aId: string,
  aLastModified: string
): PublishItem {
  return [aClassification, aId, aLastModified];
}

/**
 * Triggers a synchronous publish call.
 *
 * @param aWriteText
 * @param aItem
 * @param aLogger
 * @param aScheduler
 * @return emits a single value after the publish call completed
 */
function publishItem(
  aWriteText: WriteText,
  aItem: PublishItem,
  aLogger: Logger,
  aScheduler: SchedulerLike
): Observable<PublishItem> {
  // get classification and id
  const [classification, id, lastModified] = aItem;
  // query
  const query: Query = {
    isDraft: true,
    lastModified
  };
  // build URL (isDraft set to true because all operations triggered by the store operate on drafts)
  const publishItemUrl = `/publishing/v2/publish/${encodeURIComponent(
    classification
  )}/${encodeURIComponent(ensureDraftId(id))}?${queryToString(query)}`;

  return rxPipe(
    // trigger publish call
    aWriteText(publishItemUrl, {}),
    // return the provided item as-is (in both, success and error cases)
    mapTo(aItem),
    // make sure we only take one item
    first(),
    // error handling
    catchError((err) => {
      aLogger.error(
        `Failed to publish (${publishItemUrl}). Ignore error.`,
        err
      );
      // return item
      return of(aItem, aScheduler);
    })
  );
}

declare type ItemsById = Record<string, BaseAuthoringItem[]>;
declare type ItemByClassification = Record<string, ItemsById>;

const selectClassification = pluckProperty<BaseAuthoringItem, 'classification'>(
  'classification'
);

const parseDate = (aDate: string): number =>
  isNotEmpty(aDate) ? Date.parse(aDate) : 0;

/**
 * Finds the largest last modification string
 *
 * @param aItems - items
 *
 * @returns the largest last modified
 */
function getLastModified(aItems: BaseAuthoringItem[]): string {
  return new Date(
    reduceArray(
      aItems,
      (aMaxLastModified: number, item: BaseAuthoringItem) =>
        Math.max(aMaxLastModified, parseDate(item.lastModified)),
      0
    )
  ).toISOString();
}

function getPublishItems(aItems: ItemByClassification): PublishItem[] {
  return reduceForIn(
    aItems,
    (
      aResult: PublishItem[],
      aById: ItemsById,
      aClassification: string
    ): PublishItem[] =>
      reduceForIn(
        aById,
        (
          aInnerResult: PublishItem[],
          aValues: BaseAuthoringItem[],
          aId: string
        ): PublishItem[] =>
          arrayPush(
            createPublishItem(aClassification, aId, getLastModified(aValues)),
            aInnerResult
          ),
        aResult
      ),
    []
  );
}

/**
 * Returns a mapping of the items first by 'classification', then by 'id'
 *
 * @param aBatch  - the batch of items
 * @returns the mapping
 */
function classifyItems(aBatch: BaseAuthoringItem[]): ItemByClassification {
  return reduceArray(
    aBatch,
    (aResult: ItemByClassification, aItem: BaseAuthoringItem) => {
      // ignore deletes
      if (!isString(aItem)) {
        // register the asset
        arrayPush(
          aItem,
          assertArray(
            getDeliveryIdFromAuthoringItem(aItem),
            assertObject(selectClassification(aItem), aResult)
          )
        );
      }
      // returns the resulting object
      return aResult;
    },
    {}
  );
}

/**
 * Returns a helper function that publishes a batch of items to the backend.
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aScheduler - the scheduler used to handle the async aspects
 *
 * @returns the persistence function
 */
export function publishAuthContent(
  aWriteText: WriteText,
  aLogger: Logger,
  aScheduler: SchedulerLike = queueScheduler
): UnaryFunction<BaseAuthoringItem[], Observable<BaseAuthoringItem[]>> {
  // callback
  const executePublish = (aItem: PublishItem) =>
    publishItem(aWriteText, aItem, aLogger, aScheduler);
  // the actual persist operation
  function publish(
    aItems: BaseAuthoringItem[]
  ): Observable<BaseAuthoringItem[]> {
    // sanity check
    if (isNotEmpty(aItems)) {
      // write the individual items
      const byClassification: ItemByClassification = classifyItems(aItems);
      // items to publish
      const items: PublishItem[] = getPublishItems(byClassification);
      // trigger the actual publish for Daniel
      return rxPipe(
        merge(...mapArray(items, executePublish), aScheduler),
        map(([classification, id]) => byClassification[classification][id])
      );
    }
    // nothing special to do
    return EMPTY;
  }
  // returns the persistence operation
  return publish;
}

/**
 * Creates a new asset with a reference to the provided resource id.
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aResourceId - an existing resource id
 * @param isDraft - flag that controls if the asset is created as draft or ready item
 * @param aAssetId - id of the new asset to create (random id if not provided)
 */
export function createAsset(
  aWriteText: WriteText,
  aLogger: Logger,
  aResourceId: string,
  isDraft: boolean,
  aAssetId?: string,
  aAsset?: AuthoringAsset
): Observable<AuthoringAsset> {
  aLogger.info('Create draft asset with resource reference', aResourceId);
  // make sure to copy the alt text
  const altText = getProperty<any, 'altText'>(aAsset, 'altText');

  // build url
  const createAssetUrl = `authoring/v1/assets`;
  // store
  return aWriteText(createAssetUrl, {
    id: isDraft ? ensureDraftId(aAssetId || v4()) : aAssetId || v4(),
    altText,
    resource: aResourceId,
    status: isDraft ? 'draft' : 'ready'
  });
}

/**
 * Creates a resource for the provided {@link File} and returns the id of the created resource.
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aFile - the file to upload
 */
export function createResource(
  aWriteText: WriteText,
  aLogger: Logger,
  aFile: File
) {
  aLogger.info('Create resource for file', aFile);
  // build url
  const createResourceUrl = `authoring/v1/resources?name=${encodeURIComponent(
    aFile.name
  )}`;

  return aWriteText(createResourceUrl, aFile);
}
