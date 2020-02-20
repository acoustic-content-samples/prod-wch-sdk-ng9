import {
  CLASSIFICATION_ASSET,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  KEY_ID,
  LoggerService,
  Query,
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
  anyToString,
  arrayPush,
  constGenerator,
  createCache,
  isEmpty,
  isEqual,
  isNil,
  isNotEmpty,
  isNotNil,
  mapArray,
  boxLoggerService,
  objectAssign,
  opDistinctUntilChanged,
  parseQueryString,
  partialLeft,
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
import { catchError, delayWhen, retryWhen, startWith } from 'rxjs/operators';

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

const KEY_FL = 'fl';

const EMPTY_SELECTOR = constGenerator({});

const EMPTY_SEARCH_RESULT = {
  numFound: 0,
  documents: []
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
 * @param aAllContent - the record of all content already considered
 * @param aDst - target record
 * @param aSrc - source value
 *
 * @returns the target record
 */
function reduceFromSearch<ITEM, RESULT>(
  aAllContent: Record<string, ITEM>,
  aDst: SearchResults<RESULT>,
  aSrc: RESULT
): SearchResults<RESULT> {
  // extract the source id
  const id = aSrc[KEY_ID];
  // only assign if it does not exist on the target
  if (isNotNil(id)) {
    // we really have a new item from the remote search
    if (isNil(aAllContent[id])) {
      arrayPush(aSrc, aDst.documents);
    } else {
      // we counted the item multiple times, fix that
      aDst.numFound--;
    }
  }
  // target
  return aDst;
}

const addToArray = <T>(aDst: T[], aValue: T): T[] => arrayPush(aValue, aDst);
const toArray = <T>(aMap: Record<string, T>): T[] =>
  reduceForIn(aMap, addToArray, []);

/**
 * Filter result, will be all content, filtered content
 */
declare type FilterResult<ITEM, RESULT> = [
  Record<string, ITEM>,
  SearchResults<RESULT>
];

// assigns the document
const documentMapper = (
  aDst: Record<string, any>,
  aItem: Record<string, any>
) => objectAssign('document', aItem, aDst);
// extracts a fiels
const fieldMapper = (
  aKey: string,
  aDst: Record<string, any>,
  aItem: Record<string, any>
) => objectAssign(aKey, aItem[aKey], aDst);

/**
 * Splits the field list
 *
 * @param aList - the string based field list
 * @returns the split list
 */
const splitFieldList = (aList?: string) =>
  isNotEmpty(aList) ? mapArray(aList.split(','), (fl) => fl.trim()) : [];

/**
 * Constructs a mapper function for the callback
 *
 * @param aName - the field name
 * @returns the callback function
 */
const createMapper = (aName: string) =>
  isEqual(aName, SEARCH_FL_DOCUMENT)
    ? documentMapper
    : partialLeft(fieldMapper, aName);

/**
 * Constructs a mapper function that extracts the desired fields from
 * a source item
 *
 * @param aList - list of fields to extract
 *
 * @returns the mappers
 */
const createMapperFromFieldList = (
  aList: string
): UnaryFunction<Record<string, any>, Record<string, any>> => {
  // parse the fields
  const mappers = mapArray(splitFieldList(aList), createMapper);
  // build the callback
  return (aItem: Record<string, any>) =>
    reduceArray(mappers, (aDst, mapper) => mapper(aDst, aItem), {});
};

/**
 * Make sure we include the ID in the field list
 *
 * @param aQuery - the original query
 * @returns the augmented query
 */
const augmentFieldList = (aQuery: Query): string => {
  // extract the current field list
  const currentFl = new Set(splitFieldList(anyToString(aQuery[KEY_FL])));
  currentFl.add(KEY_ID);
  // convert back
  return Array.from(currentFl)
    .sort()
    .join(',');
};

/**
 * Constructs the filter result
 *
 * @param aAllContent - all content items
 * @param aFilteredContent - filtered content items
 *
 * @return the filter result object
 */
const createFilterResult = <ITEM, RESULT>(
  aAllContent: Record<string, ITEM>,
  aFilteredContent: RESULT[]
): FilterResult<ITEM, RESULT> => [
  aAllContent,
  { numFound: aFilteredContent.length, documents: aFilteredContent }
];

/**
 * Filters the content of the store based on a predicate
 *
 * @param aAllContent  - the content in the store
 * @param aPredicate - the predicate
 * @param aMapper - extracts the portions of the original object that are interesting
 *
 * @returns the filtered content
 */
const filterStore = <ITEM, RESULT>(
  aAllContent: Record<string, ITEM>,
  aPredicate: Predicate<ITEM>,
  aMapper: UnaryFunction<ITEM, RESULT>
): FilterResult<ITEM, RESULT> =>
  createFilterResult(
    aAllContent,
    reduceForIn(
      aAllContent,
      (aDst: RESULT[], aValue: ITEM) =>
        aPredicate(aValue) ? arrayPush(aMapper(aValue), aDst) : aDst,
      []
    )
  );

/**
 * Augments a local search result with a remote search result
 *
 * @param aContent - the local search result
 * @param aRemote - the remote search result
 *
 * @returns the augmented result
 */
const reconcileResults = <ITEM, RESULT>(
  [allContent, localResults]: FilterResult<ITEM, RESULT>,
  { numFound, documents = [] }: SearchResults<RESULT>
): SearchResults<RESULT> =>
  isEmpty(documents)
    ? localResults
    : reduceArray(documents, partialLeft(reduceFromSearch, allContent), {
        numFound: numFound + localResults.numFound,
        documents: [...localResults.documents]
      });

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
  getDeliverySearchResults: <ITEM, RESULT>(
    aQuery: ReconciledDeliverySearchInput<ITEM>,
    aClassification: string
  ) => Observable<SearchResults<RESULT>>;

  protected constructor(
    aReduxStore: ReduxRootStore,
    aDelegate: DeliverySearchResolver,
    aLoggerService?: LoggerService
  ) {
    // sanity check
    const logSvc = boxLoggerService(aLoggerService);
    const logger = logSvc.get(LOGGER);
    // reactive logging
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );
    // store
    const store$ = rxStore(aReduxStore);
    // mapper cache
    const mapperCache = createCache<
      UnaryFunction<Record<string, any>, Record<string, any>>
    >();

    function getDeliverySearchResults<ITEM, RESULT>(
      { predicate, query }: ReconciledDeliverySearchInput<ITEM>,
      aClassification: string
    ): Observable<SearchResults<RESULT>> {
      // original query
      const origQuery: Query = parseQueryString(queryToString(query));
      const fl = augmentFieldList(origQuery);
      // augmented quers
      const augQuery: Query = { ...origQuery, [KEY_FL]: fl };
      // construct the mapper
      const mapper = mapperCache(fl, createMapperFromFieldList);
      // log this
      logger.info('Query', augQuery);
      // select the redux content
      const content$ = rxPipe(
        store$,
        rxSelect(selectFeature(aClassification)),
        rxSelect((content) => filterStore(content, predicate, mapper)),
        log('from store')
      );
      // remote search results
      const search$ = rxPipe(
        aDelegate.getDeliverySearchResults<RESULT>(augQuery, aClassification),
        startWith(EMPTY_SEARCH_RESULT),
        retryWhen((errors$) =>
          rxPipe(
            errors$,
            delayWhen(() => timer(1000))
          )
        ),
        catchError(() => of(EMPTY_SEARCH_RESULT)),
        opDistinctUntilChanged,
        log('from search')
      );
      // reconcile
      return rxPipe(
        combineLatest([content$, search$]),
        rxSelect(([content, search]) => reconcileResults(content, search)),
        log('from reconciliation')
      );
    }

    // attach
    this.getDeliverySearchResults = getDeliverySearchResults;
  }
}
