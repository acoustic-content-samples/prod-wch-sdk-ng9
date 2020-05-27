import {
  LoggerService,
  QueryInput,
  SearchResult,
  SearchResults
} from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import {
  assertFromGenerator,
  hashRandomIdentifier,
  mapArray,
  pluckProperty,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import {
  from,
  MonoTypeOperatorFunction,
  Observable,
  of,
} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

function createDefaultSeedResolver(): SeedResolver {
  // seed cache
  const cache: Record<string, string> = {};

  const getDefaultSeed = (aID: string, aClassification: string) =>
    assertFromGenerator(aClassification, cache, () =>
      of(hashRandomIdentifier())
    );

  return { getSeed: getDefaultSeed };
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
  const ids = mapArray(selectDocuments(aResult), selectDocument);
  // still emit undefined, even if there are no documents
  return ids.length ? from(ids) : of(undefined);
}

const LOGGER = 'createResolverFromSearch';

export function createResolverFromSearch<T>(
  aSearch: DeliverySearchResolver,
  aClassification: string,
  aCallback: (id: string, aSiteId?: string) => QueryInput,
  aLogSvc: LoggerService
): (id: string, aSiteId?: string) => Observable<T> {
  // logger
  const logger = aLogSvc.get(LOGGER);
  // next logger
  const log: <V>(...v: any[]) => MonoTypeOperatorFunction<V> = rxNext(logger);
  // send a request
  const sendRequest = (
    id: string,
    siteId?: string,
  ): Observable<SearchResults<SearchResult<T>>> => {
    // dispatch
    return rxPipe(
      aSearch.getDeliverySearchResults(aCallback(id, siteId), aClassification),
      catchError((error) => {
        // log
        logger.error(error);
        // nothing
        return UNDEFINED$;
      })
    );
  };
  // return based on mode
  return (id, siteId) =>
    rxPipe(sendRequest(id, siteId), log('documents', id), mergeMap(extractDocuments));
}
