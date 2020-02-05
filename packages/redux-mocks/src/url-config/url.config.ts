import { UrlConfig } from '@acoustic-content-sdk/api';
import {
  parseURL,
  wchGetHubInfoFromBaseURL,
  wchIsPreviewMode
} from '@acoustic-content-sdk/utils';

export function createUrlConfigFromBaseURL(aBaseURL: URL | string): UrlConfig {
  const baseUrl = parseURL(aBaseURL);
  const hubInfo = wchGetHubInfoFromBaseURL(baseUrl);
  return {
    apiUrl: parseURL(hubInfo.apiUrl),
    resourceUrl: parseURL(hubInfo.resourceUrl),
    isPreviewMode: wchIsPreviewMode(baseUrl),
    baseUrl
  };
}

export const DEFAULT_URL_CONFIG = createUrlConfigFromBaseURL(
  'https://my4-preview.digitalexperience.ibm.com/api/ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/'
);
