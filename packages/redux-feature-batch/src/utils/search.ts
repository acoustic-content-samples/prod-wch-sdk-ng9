import {
  KEY_ID,
  Query,
  SEARCH_FL_DOCUMENT,
  SearchResult,
  SearchResults
} from '@acoustic-content-sdk/api';
import { FETCH_PRIORITY, FetchText } from '@acoustic-content-sdk/rest-api';
import {
  chunkArray,
  getProperty,
  isNotEmpty,
  jsonParse,
  luceneEscapeKeyValue,
  luceneEscapeKeyValueOr,
  mapArray,
  queryToString,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

const REL_MYDELIVERY_SEARCH = 'mydelivery/v1/search';
const REL_DELIVERY_SEARCH = 'delivery/v1/search';
const REL_AUTHORING_SEARCH = 'authoring/v1/search';

declare type FetchByQuery = (
  aQuery: Query,
  aPriority?: FETCH_PRIORITY
) => Observable<string>;

/**
 * Just because prime numbers are fun
 */
const MAX_CHUNK_SIZE = 61;

/**
 * Selects the documents from a search result
 *
 * @param aDocs - the search docs
 * @returns the documents
 */
function selectDocuments<T>(aDocs: SearchResults<T>): T[] {
  return getProperty(aDocs, 'documents', []);
}

/**
 * Selects an individual document
 *
 * @param aResult   - the search result
 * @returns the document
 */
function selectDocument<T>(aResult: SearchResult<T>): T {
  return getProperty(aResult, 'document');
}

/**
 * Resolves one particular chunk of data
 *
 * @param aClassification  - the item classification
 * @param aIds  - the chunk of IDs to fetch, needs to have a sensible size
 * @param aFetch  - the fetch APIs
 *
 * @returns the resolved chunk
 */
function searchChunkByClassificationAndIds<T>(
  aClassification: string,
  aIds: string[],
  aFetch: FetchByQuery,
  aPriority?: FETCH_PRIORITY
): Observable<T[]> {
  // count
  const rows = aIds.length;
  // build the query
  const query: Query = {
    q: luceneEscapeKeyValue('classification', aClassification),
    fq: luceneEscapeKeyValueOr(KEY_ID, ...aIds),
    fl: `${KEY_ID},${SEARCH_FL_DOCUMENT}`,
    rows
  };
  // make the query
  return rxPipe(
    aFetch(query, aPriority),
    // just one
    first(),
    // parse
    map<string, SearchResults<SearchResult<T>>>(jsonParse),
    // docs
    map(selectDocuments),
    // extract the docs
    map((results) => mapArray(results, selectDocument))
  );
}

/**
 * Searches for items based on classification and a list of ids. The ids will be split into
 * chunks of sensible size, so an individual search request will not become too large.
 *
 * @param aClassification  - classification to search for
 * @param aIds  - the set of IDs
 * @param aFetch  - the fetch callback
 *
 * @returns an observable of the search result
 */
export function searchByClassificationAndIds<T>(
  aClassification: string,
  aIds: string[],
  aFetch: FetchByQuery,
  aPriority?: FETCH_PRIORITY
): Observable<T[]> {
  // quick sanity check
  if (isNotEmpty(aIds)) {
    // split the ids into chunks
    const chunks = chunkArray(aIds, MAX_CHUNK_SIZE);
    // resolve the chunks
    const chunkedResult = mapArray(chunks, (chunk) =>
      searchChunkByClassificationAndIds(
        aClassification,
        chunk,
        aFetch,
        aPriority
      )
    );
    // synchronize
    return rxPipe(
      // wait until all chunks are resolved
      forkJoin(chunkedResult),
      // flatten the chunks
      map((results) => [].concat(...results))
    );
  }
  // returns the empty result
  return of([]);
}

/**
 * Returns a function that performs a delivery query
 *
 * @param aFetch - the transport layer
 *
 * @returns the  query callback
 */
export function fetchByDeliveryQuery(
  aFetch: FetchText,
  aPriority?: FETCH_PRIORITY
): FetchByQuery {
  return (query) =>
    aFetch(`${REL_DELIVERY_SEARCH}?${queryToString(query)}`, aPriority);
}

/**
 * Returns a function that performs a delivery query
 *
 * @param aFetch - the transport layer
 *
 * @returns the  query callback
 */
export function fetchByMyDeliveryQuery(
  aFetch: FetchText,
  aPriority?: FETCH_PRIORITY
): FetchByQuery {
  return (query) =>
    aFetch(`${REL_MYDELIVERY_SEARCH}?${queryToString(query)}`, aPriority);
}

/**
 * Returns a function that performs an authoring query
 *
 * @param aFetch - the transport layer
 *
 * @returns the  query callback
 */
export function fetchByAuthoringQuery(
  aFetch: FetchText,
  aPriority?: FETCH_PRIORITY
): FetchByQuery {
  return (query) =>
    aFetch(`${REL_AUTHORING_SEARCH}?${queryToString(query)}`, aPriority);
}
