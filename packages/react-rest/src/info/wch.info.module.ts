/* Copyright IBM Corp. 2017 */
import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_API_URL,
  ACOUSTIC_CONTEXT_BASE_URL,
  ACOUSTIC_CONTEXT_RESOURCE_URL,
  ACOUSTIC_CONTEXT_URL_CONFIG
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
 * Provider implementation for the `ACOUSTIC_CONTEXT_URL_CONFIG`.
 */
export const ACOUSTIC_PROVIDER_REST_URL_CONFIG = createInjectableReactProvider(
  proxyCreateUrlConfig,
  ACOUSTIC_CONTEXT_URL_CONFIG,
  [],
  [ACOUSTIC_CONTEXT_BASE_URL, ACOUSTIC_CONTEXT_API_URL, ACOUSTIC_CONTEXT_RESOURCE_URL]
);
