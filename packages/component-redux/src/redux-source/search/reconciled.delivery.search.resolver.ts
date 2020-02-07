import {
  CLASSIFICATION_ASSET,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  KEY_ID,
  LoggerService,
  Query,
  SearchResult,
  SearchResults,
  SEARCH_FL_DOCUMENT
} from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ReconciledDeliverySearchInput,
  ReconciledDeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { selectAuthAssetFeature } from '@acoustic-content-sdk/redux-feature-auth-asset';
import { selectAuthLayoutFeature } from '@acoustic-content-sdk/redux-feature-auth-layout';
import { selectAuthLayoutMappingFeature } from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import { selectAuthTypeFeature } from '@acoustic-content-sdk/redux-feature-auth-type';
import { selectDeliveryContentFeature } from '@acoustic-content-sdk/redux-feature-delivery-content';
import {
  ReduxRootState,
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  arrayPush,
  constGenerator,
  isEmpty,
  isNil,
  NOOP_LOGGER_SERVICE,
  objectAssign,
  opDistinctUntilChanged,
  opShallowDistinctUntilChanged,
  parseQueryString,
  Predicate,
  queryToString,
  reduceArray,
  reduceForIn,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  of,
  timer,
  UnaryFunction
} from 'rxjs';
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  startWith
} from 'rxjs/operators';

const LOGGER = 'AbstractDeliverySearchResolverService';

/**
 * Maps from classification to feature selector
 */
const FEATURE_SELECTORS = {
  [CLASSIFICATION_CONTENT]: selectDeliveryContentFeature,
  [CLASSIFICATION_CONTENT_TYPE]: selectAuthTypeFeature,
  [CLASSIFICATION_LAYOUT]: selectAuthLayoutFeature,
  [CLASSIFICATION_LAYOUT_MAPPING]: selectAuthLayoutMappingFeature,
  [CLASSIFICATION_ASSET]: selectAuthAssetFeature
};

const EMPTY_SELECTOR = constGenerator({});

interface ResultWithId<T> extends SearchResult<T> {
  id: string;
}

const emptySearchResult: <T>() => SearchResults<ResultWithId<T>> = () => ({
  numFound: 0,
  documents: []
});

const GENERAL_QUERY: Query = {
  fl: `${KEY_ID},${SEARCH_FL_DOCUMENT}`
};

/**
 * Selects the redux feature based on the classification
 *
 * @param aClassification - the classification
 * @returns the selector function
 */
const selectFeature = <T>(
  aClassification: string
): UnaryFunction<ReduxRootState, Record<string, T>> =>
  FEATURE_SELECTORS[aClassification] || EMPTY_SELECTOR;

/**
 * Reducer function that assigns a value if it does not exist, yet
 *
 * @param aDst - target record
 * @param aValue - value
 *
 * @returns the target record
 */
function reduceFromSearch<T>(
  aDst: Record<string, T>,
  { id, document }: ResultWithId<T>
): Record<string, T> {
  // only assign if it does not exist on the target
  if (isNil(aDst[id])) {
    aDst[id] = document;
  }
  // returns the target document
  return aDst;
}

const addToArray = <T>(aDst: T[], aValue: T): T[] => arrayPush(aValue, aDst);
const toArray = <T>(aMap: Record<string, T>): T[] =>
  reduceForIn(aMap, addToArray, []);

/**
 * Filters the content of the store based on a predicate
 *
 * @param aContent  - the content in the store
 * @param aPredicate - the predicate
 *
 * @returns the filtered content
 */
const filterStore = <T>(
  aContent: Record<string, T>,
  aPredicate: Predicate<T>
): Record<string, T> =>
  reduceForIn(
    aContent,
    (aDst: Record<string, T>, aValue: T, aKey: string) =>
      aPredicate(aValue) ? objectAssign(aKey, aValue, aDst) : aDst,
    {}
  );

/**
 * Augments a local search result with a remote search result
 *
 * @param aContent - the local search result
 * @param aRemote - the remote search result
 *
 * @returns the augmented result
 */
const reconcileResults = <T>(
  aContent: Record<string, T>,
  { documents = [] }: SearchResults<ResultWithId<T>>
): Record<string, T> =>
  isEmpty(documents)
    ? aContent
    : reduceArray(documents, reduceFromSearch, { ...aContent });

/**
 * Base implementation of the search service against a redux store.
 */
export class AbstractDeliverySearchResolverService
  implements ReconciledDeliverySearchResolver {
  /**
   * Implement a search reconciled against the redux store
   *
   * @param aQuery - the query
   * @param aClassification - classification
   */
  getDeliverySearchResults: <T>(
    aQuery: ReconciledDeliverySearchInput<T>,
    aClassification: string
  ) => Observable<T[]>;

  protected constructor(
    aReduxStore: ReduxRootStore,
    aDelegate: DeliverySearchResolver,
    aLoggerService?: LoggerService
  ) {
    // sanity check
    const logSvc = aLoggerService || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // reactive logging
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );
    // store
    const store$ = rxStore(aReduxStore);

    function getDeliverySearchResults<T>(
      { predicate, query }: ReconciledDeliverySearchInput<T>,
      aClassification: string
    ): Observable<T[]> {
      // original query
      const origQuery: Query = parseQueryString(queryToString(query));
      // augmented quers
      const augQuery: Query = { ...origQuery, ...GENERAL_QUERY };
      // log this
      logger.info('Query', augQuery);
      // select the redux content
      const content$ = rxPipe(
        store$,
        rxSelect(selectFeature<T>(aClassification)),
        rxSelect((content) => filterStore(content, predicate)),
        log('from store')
      );
      // remote search results
      const search$ = rxPipe(
        aDelegate.getDeliverySearchResults<ResultWithId<T>>(
          augQuery,
          aClassification
        ),
        startWith(emptySearchResult<T>()),
        retryWhen((errors$) =>
          rxPipe(
            errors$,
            delayWhen(() => timer(1000))
          )
        ),
        catchError(() => of(emptySearchResult<T>())),
        opDistinctUntilChanged,
        log('from search')
      );
      // reconcile
      return rxPipe(
        combineLatest([content$, search$]),
        rxSelect(([content, search]) => reconcileResults(content, search)),
        opShallowDistinctUntilChanged,
        map(toArray),
        log('from reconciliation')
      );
    }

    // attach
    this.getDeliverySearchResults = getDeliverySearchResults;
  }
}
