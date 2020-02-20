import {
  KEY_WCH_SEED,
  LoggerService,
  Query,
  QueryInput,
  SearchResults
} from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ProtectedContent,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  arrayPush,
  assertFromGenerator,
  hashRandomIdentifier,
  isArray,
  isString,
  jsonParse,
  luceneEscapeKeyValue,
  boxLoggerService,
  parseQueryString,
  queryToCanonicalString,
  queryToString,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const LOGGER = 'AbstractDeliverySearchResolverService';

function createDefaultSeedResolver(): SeedResolver {
  // seed cache
  const cache: Record<string, string> = {};

  const getSeed = (aID: string, aClassification: string) =>
    assertFromGenerator(aClassification, cache, () =>
      of(hashRandomIdentifier())
    );

  return { getSeed };
}
const DEFAULT_SEED_RESOLVER = createDefaultSeedResolver();

const resolveSeed = (aClassification: string, aSeedResolver: SeedResolver) => (
  aID: string
) => aSeedResolver.getSeed(aID, aClassification);

/**
 * Makes sure we have an array
 *
 * @param aValue - the value
 */
function toArray(aValue: string | string[]): string[] {
  return isArray(aValue) ? [...aValue] : isString(aValue) ? [aValue] : [];
}

const KEY_FQ = 'fq';

const REL_PUBLIC_PATH_SEARCH = 'delivery/v1/search';
const REL_PROTECTED_PATH_SEARCH = 'mydelivery/v1/search';

export type SendRequest = <T>(
  aUrl: string,
  aCredentials: boolean
) => Observable<T>;

/**
 * Actually send a request
 *
 * @param aUrlConfig - the URL config
 * @param aQuery - the query object
 * @param aHttp - the http client used to make the request
 *
 * @returns the observable of the search result
 */
function sendRequest<T>(
  aIsProtected: boolean,
  aQuery: Query,
  aFetchText: FetchText
): Observable<SearchResults<T>> {
  // the path
  const path = aIsProtected
    ? REL_PROTECTED_PATH_SEARCH
    : REL_PUBLIC_PATH_SEARCH;
  // build the URL
  const url = `${path}?${queryToCanonicalString(aQuery)}`;
  // make the request
  return rxPipe(aFetchText(url), map<string, SearchResults<T>>(jsonParse));
}

export class AbstractDeliverySearchResolverService
  implements DeliverySearchResolver {
  getDeliverySearchResults: <T>(
    aQuery: QueryInput,
    aClassification: string
  ) => Observable<SearchResults<T>>;

  protected constructor(
    aFetchText: FetchText,
    aProtected: ProtectedContent,
    aSeedResolver?: SeedResolver,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    // seed resolver
    const seedResolver = aSeedResolver || DEFAULT_SEED_RESOLVER;

    function getDeliverySearchResults<T>(
      aQuery: QueryInput,
      aClassification: string
    ): Observable<SearchResults<T>> {
      // parse the query
      const origQuery = parseQueryString(queryToString(aQuery));
      // augment the query
      const fq = arrayPush(
        luceneEscapeKeyValue('classification', aClassification),
        toArray(origQuery[KEY_FQ])
      );
      // seed
      const seedFct = resolveSeed(aClassification, seedResolver);
      // resolv one seed
      const seed$ = seedFct(aClassification);
      // build the url and make the request
      return rxPipe(
        combineLatest([aProtected.protected$, seed$]),
        // debounceTime(0),
        switchMap(([isProtected, seed]) =>
          sendRequest<T>(
            isProtected,
            { ...origQuery, fq, [KEY_WCH_SEED]: seed },
            aFetchText
          )
        ),
        log('searchResult')
      );
    }
    // expose the callback
    this.getDeliverySearchResults = getDeliverySearchResults;
  }
}
