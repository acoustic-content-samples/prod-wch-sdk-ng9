/** Copyright IBM Corp. 2017 */
import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_API_URL,
  WCH_CONTEXT_BASE_URL,
  WCH_CONTEXT_RESOURCE_URL,
  WCH_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { Observable } from 'rxjs';

import { createUrlConfig } from './wch.info.service';

function proxyCreateUrlConfig(
  aReq: [],
  [aBaseUrl, aApiUrl, aResourceUrl]: [
    HubInfoUrlProvider?,
    HubInfoUrlProvider?,
    HubInfoUrlProvider?
  ]
): Observable<UrlConfig> {
  return createUrlConfig(aBaseUrl, aApiUrl, aResourceUrl, document);
}

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REST_URL_CONFIG = createInjectableReactProvider(
  proxyCreateUrlConfig,
  WCH_CONTEXT_URL_CONFIG,
  [],
  [WCH_CONTEXT_BASE_URL, WCH_CONTEXT_API_URL, WCH_CONTEXT_RESOURCE_URL]
);
