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
  UnaryFunction
} from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

import { createCache } from '../../utils/cache.utils';
import { selectCanonicalPath, selectTags } from '../../utils/selection.utils';
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
  aPath: string
): UnaryFunction<DeliveryContentState, ContentItemWithLayout> {
  // normalize the path
  const withSlash = ensureTrailingSlash(aPath);
  const noSlash = removeTrailingSlash(aPath);
  // predicate
  const isPath = (aValue: string) =>
    isEqual(aValue, withSlash) || isEqual(aValue, noSlash);
  // returns the finder
  return (aData: DeliveryContentState) =>
    findBy(aData, isPath, selectCanonicalPath);
}

function selectByErrorTag(): UnaryFunction<
  DeliveryContentState,
  ContentItemWithLayout
> {
  // predicate
  const isTag = (aValue: string[]) => aValue.indexOf(ERROR_TAG) >= 0;
  // returns the finder
  return (aData: DeliveryContentState) => findBy(aData, isTag, selectTags);
}

export class AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  /**
   * Locates a page given the path
   *
   * @param aPath - the path to the page
   *
   * @returns an observable of the content item
   */
  getDeliveryPage: (aPath: string) => Observable<DeliveryContentItem>;
  /**
   * Returns the error page
   *
   * @returns an observable of the content item
   */
  getErrorPage: () => Observable<DeliveryContentItem>;

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
      path: string
    ): Observable<SearchResults<ContentItemWithLayout>> =>
      rxPipe(
        aDeliverySearchResolver.getDeliverySearchResults(
          {
            ...query,
            q: luceneEscapeKeyValueOr(
              'path',
              removeTrailingSlash(path),
              ensureTrailingSlash(path)
            )
          },
          CLASSIFICATION_CONTENT
        ),
        catchUndefined()
      );

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
    const searchByCanonicalPath: UnaryFunction<string, Observable<string[]>> = (
      path
    ) => rxPipe(sendPageRequest(path), map(extractIds), log('ids', path));

    /**
     * Search item based on path
     */
    const searchByError: Generator<Observable<string[]>> = () =>
      rxPipe(sendErrorPageRequest(), map(extractIds), log('ids'));

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // locate the page
    const getDeliveryPage = (path: string) => {
      // result based on a local search
      const local$ = rxPipe(
        deliveryItems$,
        rxSelect(selectByPath(path)),
        rxSelect(createDeliveryContentItem),
        log('page', path),
        opCacheLast
      );
      // guarantee the existence of the item
      const dispatch$ = rxPipe(
        searchByCanonicalPath(path),
        map(guaranteeAuthoringContentBatchAction),
        map(dispatch),
        opFilterNever
      );
      // combine
      return merge(local$, dispatch$);
    };

    // locate the page
    const getErrorPage = () => {
      // result based on a local search
      const local$ = rxPipe(
        deliveryItems$,
        rxSelect(selectByErrorTag()),
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
