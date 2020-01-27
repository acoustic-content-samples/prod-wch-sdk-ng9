import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import { wchCreateUrlConfig } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

/**
 * Construcs a `UrlConfig` object based on some configuration
 *
 * @param aBaseUrl - the base URL
 * @param aApiUrl   - the API URL
 * @param aResourceUrl - the resource URL
 * @param aDocument - the document
 *
 * @returns the observable of the `UrlConfig` object
 */
export function createUrlConfig(
  aBaseUrl?: HubInfoUrlProvider,
  aApiUrl?: HubInfoUrlProvider,
  aResourceUrl?: HubInfoUrlProvider,
  aDocument?: any
): Observable<UrlConfig> {
  // just dispatch
  return wchCreateUrlConfig(aBaseUrl, aApiUrl, aResourceUrl, aDocument);
}
