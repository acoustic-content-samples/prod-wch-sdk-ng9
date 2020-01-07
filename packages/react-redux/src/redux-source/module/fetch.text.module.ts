import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_FETCH_TEXT } from '@acoustic-content-sdk/react-rest-api';
import { Observable } from 'rxjs';

import { createFetchText } from '../fetch-text/fetch.text';

const createFetchTextProvider = (
  [aUrlConfig$]: [Observable<UrlConfig>],
  [aLogSvc]: [LoggerService?]
) => createFetchText(aUrlConfig$, aLogSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_FETCH_TEXT = createInjectableReactProvider(
  createFetchTextProvider,
  WCH_CONTEXT_FETCH_TEXT,
  [WCH_CONTEXT_URL_CONFIG],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
