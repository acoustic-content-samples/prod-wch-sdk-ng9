import { UrlConfig } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  isNotNil,
  isString,
  mergeHubInfo,
  parseURL,
  UNDEFINED_TYPE,
  urlFromProvider,
  wchGetBaseURL,
  wchGetHubInfoFromBaseURL,
  wchGetHubInfoFromLinks,
  wchGetResourceUrlFromApiURL,
  wchIsPreviewMode
} from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_CLEAR_URL_CONFIG,
  ACTION_SET_URL_CONFIG,
  ClearUrlConfigAction,
  SetUrlConfigAction
} from './url.config.actions';

// default
const DEFAULT_CONFIG: UrlConfig = {
  apiUrl: null,
  resourceUrl: null,
  isPreviewMode: false,
  baseUrl: null
};

/**
 * State that covers the {@link @acoustic-content-sdk/api#UrlConfig | configuration} of the URLs to be used
 * when working with {@link https://developer.ibm.com/api/view/dx-prod:ibm-watson-content-hub:title-IBM_Watson_Content_Hub | WCH REST} services.
 *
 * @remarks
 * Note that all URLs in this object are guaranteed to be absolute URLs and to end with a trailing slash.
 */
export type UrlConfigState = UrlConfig;

/*
 * Makes sure our path ends with a proper trailing slash
 */
function _guaranteeTrailingSlash(aUrl: string): string {
  return aUrl.endsWith('/') ? aUrl : aUrl + '/';
}

function createBaseURL(aUrl: URL | string): string {
  const url = parseURL(aUrl);
  return isNotNil(url)
    ? _guaranteeTrailingSlash(`${url.origin}${url.pathname}`)
    : undefined;
}

const HAS_DOCUMENT = typeof document !== UNDEFINED_TYPE;

/**
 * Returns the global document if it exists
 */
function getDocument(): Document {
  return HAS_DOCUMENT ? document : undefined;
}

/**
 * Decodes the URL configuration from a URL provider
 *
 * @param aApiUrl - the API URL
 * @param aDocument - optionally the document
 *
 * @returns the configuration
 */
export function wchGetUrlConfig(
  aApiUrl: string,
  aDocument?: Document
): UrlConfig {
  /**
   * Decode the resource base
   */
  // const resourceBaseUrl = getBaseUrlFromDocument(aDocument);

  /**
   * Decode the base URL from the configuration or fall back to the global window
   */
  const baseUrl = parseURL(createBaseURL(wchGetBaseURL(aDocument)));

  // decode the fallback
  const cfgFallback = mergeHubInfo(
    wchGetHubInfoFromBaseURL(baseUrl),
    wchGetHubInfoFromLinks(aDocument)
  );

  const infoApiUrl = urlFromProvider(aApiUrl) || parseURL(cfgFallback.apiUrl);
  const apiRoot = createBaseURL(infoApiUrl);
  const resourceRoot = createBaseURL(wchGetResourceUrlFromApiURL(infoApiUrl));

  // convert
  const apiUrl = parseURL(apiRoot);
  const resourceUrl = parseURL(resourceRoot);

  const isPreviewMode = wchIsPreviewMode(apiUrl);

  // ok
  return {
    apiUrl,
    resourceUrl,
    baseUrl,
    isPreviewMode
  };
}

/**
 * reducers for config settings
 */
export const urlConfigReducer: Reducer = handleActions(
  {
    [ACTION_SET_URL_CONFIG]: (
      state: UrlConfigState,
      action: SetUrlConfigAction
    ): UrlConfig => {
      // extract the payload
      const payload = selectPayload(action);
      return isString(payload)
        ? wchGetUrlConfig(payload, getDocument())
        : payload;
    },
    [ACTION_CLEAR_URL_CONFIG]: (
      state: UrlConfigState,
      action: ClearUrlConfigAction
    ) => DEFAULT_CONFIG
  },
  DEFAULT_CONFIG
);
