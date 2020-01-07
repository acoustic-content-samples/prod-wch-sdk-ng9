import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import { wchCreateUrlConfig } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

/**
 * Make a custom function for naming purposes
 *
 * @param aBaseUrl - the base URL
 * @param aApiUrl   - the API URL
 * @param aResourceUrl - the resource URL
 * @param aDocument - the document
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
