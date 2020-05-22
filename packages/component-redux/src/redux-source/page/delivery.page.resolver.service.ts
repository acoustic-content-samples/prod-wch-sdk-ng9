import {
  CLASSIFICATION_CONTENT,
  ContentItemWithLayout,
  createVersionString,
  DeliveryContentItem,
  KEY_ID,
  LoggerService,
  Query,
  SearchResults
} from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { guaranteeAuthoringContentBatchAction } from '@acoustic-content-sdk/redux-feature-batch';
import {
  DeliveryContentState,
  selectDeliveryContentFeature
} from '@acoustic-content-sdk/redux-feature-delivery-content';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  boxLoggerService,
  createDeliveryContentItem,
  Generator,
  isEqual,
  luceneEscapeKeyValue,
  luceneEscapeKeyValueOr,
  mapArray,
  opCacheLast,
  opFilterNever,
  pluckProperty,
  Predicate,
  rxCachedFunction,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import {
  merge,
  MonoTypeOperatorFunction,
  Observable,
  UnaryFunction,
  of
} from 'rxjs';
import { catchError, debounceTime, map, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { selectSiteFeature, selectDefaultSite } from '@acoustic-content-sdk/redux-feature-site';

import { createCache } from '../../utils/cache.utils';
import { selectCanonicalPath, selectTags, selectSiteDescriptorId } from '../../utils/selection.utils';
import { logDispatch } from '../../utils/store.utils';
import { MODULE, VERSION } from './../../version';

function removeTrailingSlash(aPath: string): string {
  return aPath === '/'
    ? aPath
    : aPath.endsWith('/')
      ? aPath.substr(0, aPath.length - 1)
      : aPath;
}

function ensureTrailingSlash(aPath: string): string {
  return aPath === '/' ? aPath : aPath.endsWith('/') ? aPath : `${aPath}/`;
}

const ERROR_TAG = 'errorPage';

/**
 * Selects the delivery ID from the item
 */
const selectId = pluckProperty<ContentItemWithLayout, typeof KEY_ID>(KEY_ID);

const LOGGER = 'AbstractDeliveryPageResolverService';

const selectDocuments = pluckProperty<any, 'documents'>('documents');

/**
 * Extracts the id as a sequence
 *
 * @param aResult - the result set
 * @returns the resulting array
 */
const extractIds = (aResult: SearchResults<DeliveryContentItem>): string[] =>
  mapArray(selectDocuments(aResult), selectId);

/**
 * Iterate over all items and locate by a selector
 */
function findBy<T>(
  aData: DeliveryContentState,
  aPredicate: Predicate<T>,
  aSelector: UnaryFunction<ContentItemWithLayout, T>
): ContentItemWithLayout {
  // tslint:disable-next-line:forin
  for (const id in aData) {
    // extract the item
    const item = aData[id];
    // the path
    if (aPredicate(aSelector(item))) {
      return item;
    }
  }
  // nothing
  return undefined;
}

function selectByPath(
  aPath: string,
  siteId?: string
): UnaryFunction<DeliveryContentState, ContentItemWithLayout> {
  // normalize the path
  const withSlash = ensureTrailingSlash(aPath);
  const noSlash = removeTrailingSlash(aPath);
  // predicate
  const isPath = (aValue: any) => {
    return siteId
      ? isEqual(siteId, aValue.siteId) && (isEqual(aValue.canonicalPath, withSlash) || isEqual(aValue.canonicalPath, noSlash))
      : isEqual(aValue.canonicalPath, withSlash) || isEqual(aValue.canonicalPath, noSlash);
  }
  // returns the finder
  const selectSiteAndPath = (item) => {
    return {
      canonicalPath: selectCanonicalPath(item),
      siteId: selectSiteDescriptorId(item),
      id: item?.id
    }
  }
  return (aData: DeliveryContentState) =>
    findBy(aData, isPath, selectSiteAndPath);
}

function selectByErrorTag(siteId?): UnaryFunction<
  DeliveryContentState,
  ContentItemWithLayout
> {
  // predicate
  const isTag = (aValue: any) => siteId
    ? aValue?.tags.indexOf(ERROR_TAG) >= 0 && isEqual(siteId, aValue.siteId)
    : aValue?.tags.indexOf(ERROR_TAG) >= 0;

  const selectTagsAndSiteDescriptorId = (item) => ({
    id: item?.id,
    tags: selectTags(item),
    siteId: selectSiteDescriptorId(item),
  })
  // returns the finder
  return (aData: DeliveryContentState) => findBy(aData, isTag, selectTagsAndSiteDescriptorId);
}

export class AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  /**
   * Locates a page given the path
   *
   * @param aCompoundPath - a potentially compound path
   *
   * @returns an observable of the content item
   */
  getDeliveryPage: (aCompoundPath: string) => Observable<any>;
  /**
   * Returns the error page
   *
   * @param aSiteId - the current siteId
   * @returns an observable of the content item
   */
  getErrorPage: (aSiteId?: string) => Observable<DeliveryContentItem>;

  constructor(
    aStore: ReduxRootStore,
    aDeliverySearchResolver: DeliverySearchResolver,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    const store$ = rxStore(aStore);

    // dispatch callback
    const dispatch = logDispatch(aStore, logger);

    // delivery items
    const deliveryItems$ = rxPipe(
      store$,
      rxSelect(selectDeliveryContentFeature),
      debounceTime(0)
    );

    // basic query
    const query: Query = {
      fl: KEY_ID,
      rows: 1
    };

    /**
     * Operator that returns undefined in case of an error
     */
    const catchUndefined = () =>
      catchError((error) => {
        // log
        logger.error(error);
        // nothing
        return UNDEFINED$;
      });

    // send a request to locate the page by path
    const sendPageRequest = (
      path: string,
      siteId: string
    ): Observable<SearchResults<ContentItemWithLayout>> => {

      const searchQuery: Query = {
        ...query,
        q: luceneEscapeKeyValueOr(
          'path',
          removeTrailingSlash(path),
          ensureTrailingSlash(path)
        )
      }
      if (siteId) {
        searchQuery.fq = luceneEscapeKeyValue('siteId', siteId)
      }

      return rxPipe(
        aDeliverySearchResolver.getDeliverySearchResults(
          searchQuery,
          CLASSIFICATION_CONTENT
        ),
        catchUndefined()
      );
    }

    // send a request to locate the error page
    const sendErrorPageRequest = (): Observable<
      SearchResults<ContentItemWithLayout>
    > =>
      rxPipe(
        aDeliverySearchResolver.getDeliverySearchResults(
          {
            ...query,
            // TODO refine search
            q: luceneEscapeKeyValueOr('tags', ERROR_TAG)
          },
          CLASSIFICATION_CONTENT
        ),
        catchUndefined()
      );

    /**
     * Search item based on path
     */
    const searchByCanonicalPath = (
      path,
      siteId,
    ): any => rxPipe(sendPageRequest(path, siteId), map(extractIds), log('ids', path));

    /**
     * Search item based on path
     */
    const searchByError: Generator<Observable<string[]>> = () =>
      rxPipe(sendErrorPageRequest(), map(extractIds), log('ids'));

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // locate the page
    const getDeliveryPage = (aCompoundPath: string) => {
      // split the compound paths
      const [path, siteId] = aCompoundPath.split('#');

      // result based on a local search
      const local$ = rxPipe(
        deliveryItems$,
        rxSelect(selectByPath(path, siteId)),
        rxSelect(createDeliveryContentItem),
        log('page', path),
        opCacheLast
      );
      // guarantee the existence of the item
      const dispatch$ = rxPipe(
        searchByCanonicalPath(path, siteId),
        map(guaranteeAuthoringContentBatchAction),
        map(dispatch),
        opFilterNever
      );
      // combine
      return merge(local$, dispatch$);
    };

    // locate the page
    const getErrorPage = (siteId?: string) => {
      // result based on a local search
      const local$ = rxPipe(
        deliveryItems$,
        rxSelect(selectByErrorTag(siteId)),
        rxSelect(createDeliveryContentItem),
        log('page'),
        opCacheLast
      );
      // guarantee the existence of the item
      const dispatch$ = rxPipe(
        searchByError(),
        map(guaranteeAuthoringContentBatchAction),
        map(dispatch),
        opFilterNever
      );
      // combine
      return merge(local$, dispatch$);
    };

    // expose this as a cached function
    this.getDeliveryPage = rxCachedFunction(
      getDeliveryPage,
      createCache(logger)
    );
    // no need to cache, errors are rare
    this.getErrorPage = getErrorPage;
  }
}
