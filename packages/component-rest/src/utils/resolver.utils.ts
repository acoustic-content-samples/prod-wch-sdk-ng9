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
  UnaryFunction
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
  return from(mapArray(selectDocuments(aResult), selectDocument));
}

const LOGGER = 'createResolverFromSearch';

export function createResolverFromSearch<T>(
  aSearch: DeliverySearchResolver,
  aCallback: UnaryFunction<string, QueryInput>,
  aLogSvc: LoggerService
): UnaryFunction<string, Observable<T>> {
  // logger
  const logger = aLogSvc.get(LOGGER);
  // next logger
  const log: <V>(...v: any[]) => MonoTypeOperatorFunction<V> = rxNext(logger);
  // send a request
  const sendRequest = (
    id: string
  ): Observable<SearchResults<SearchResult<T>>> => {
    // dispatch
    return rxPipe(
      aSearch.getDeliverySearchResults(aCallback(id), id),
      catchError((error) => {
        // log
        logger.error(error);
        // nothing
        return UNDEFINED$;
      })
    );
  };
  // return based on mode
  return (id) =>
    rxPipe(sendRequest(id), log('documents', id), mergeMap(extractDocuments));
}
