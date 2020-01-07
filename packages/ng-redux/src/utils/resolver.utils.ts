import {
  KEY_WCH_SEED,
  LoggerService,
  Query,
  SearchResult,
  SearchResults,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { SeedResolver } from '@acoustic-content-sdk/component-api';
import {
  assertFromGenerator,
  hashRandomIdentifier,
  mapArray,
  pluckProperty,
  queryToCanonicalString,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { HttpClient } from '@angular/common/http';
import {
  from,
  MonoTypeOperatorFunction,
  Observable,
  of,
  UnaryFunction
} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

const REL_PATH_SEARCH = 'mydelivery/v1/search';

function createDefaultSeedResolver(): SeedResolver {
  // seed cache
  const cache: Record<string, string> = {};

  const getSeed = (aID: string, aClassification: string) =>
    assertFromGenerator(aClassification, cache, () =>
      of(hashRandomIdentifier())
    );

  return { getSeed };
}

export const DEFAULT_SEED_RESOLVER = createDefaultSeedResolver();

export const getSeed = (
  aClassification: string,
  aSeedResolver: SeedResolver
) => (aID: string) => aSeedResolver.getSeed(aID, aClassification);

const selectDocuments = pluckProperty<any, 'documents'>('documents');
const selectDocument = pluckProperty<any, 'document'>('document');

/**
 * Extracts the documents as an array
 *
 * @param aResult - the result set
 * @returns the resulting array
 */
function extractDocuments<T>(
  aResult: SearchResults<SearchResult<T>>
): Observable<T> {
  return from(mapArray(selectDocuments(aResult), selectDocument));
}

const LOGGER = 'createResolverFromSearch';

export function createResolverFromSearch<T>(
  aHttp: HttpClient,
  aUrlConfig: UrlConfig,
  aSeed: UnaryFunction<string, Observable<string>>,
  aCallback: UnaryFunction<string, URLSearchParams | Query>,
  aLogSvc: LoggerService
): UnaryFunction<string, Observable<T>> {
  // logger
  const logger = aLogSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // extract the relevant parts
  const { apiUrl, isPreviewMode } = aUrlConfig;
  // base URL
  const url = `${apiUrl}${REL_PATH_SEARCH}`;
  // base params
  const options = { withCredentials: isPreviewMode };
  // send a request
  const sendRequest = (
    id: string,
    suffix: string
  ): Observable<SearchResults<SearchResult<T>>> =>
    rxPipe(
      aHttp.get<SearchResults<SearchResult<T>>>(
        `${url}?${queryToCanonicalString(aCallback(id))}${suffix}`,
        options
      ),
      catchError((error) => {
        // log
        logger.error(error);
        // nothing
        return UNDEFINED$;
      })
    );
  // return based on mode
  return (id) =>
    rxPipe(
      aSeed(id),
      map((key) => `&${KEY_WCH_SEED}=${encodeURIComponent(key)}`),
      mergeMap((suffix) => sendRequest(id, suffix)),
      log('documents', id),
      mergeMap(extractDocuments)
    );
}
