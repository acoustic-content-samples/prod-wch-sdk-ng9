import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import { fetchTextAjax } from '@acoustic-content-sdk/redux-ajax';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  NOOP_LOGGER_SERVICE,
  opFilterNotNil,
  rxPipe,
  selectApiUrl
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

/**
 * Constructs the fetch text implementation
 *
 * @param aUrlConfig$ - the URL config
 * @param aLogSvc - logger service
 *
 * @returns the fetch text implementation
 */
export function createFetchText(
  aUrlConfig$: Observable<UrlConfig>,
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
): FetchText {
  // provider the API URL
  const apiUrl$ = rxPipe(
    aUrlConfig$,
    opFilterNotNil,
    map(selectApiUrl),
    first()
  );
  // dispatch
  return fetchTextAjax(apiUrl$.toPromise(), aLogSvc);
}
