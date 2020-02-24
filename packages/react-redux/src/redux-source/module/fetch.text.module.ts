import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_FETCH_TEXT } from '@acoustic-content-sdk/react-rest-api';
import { Observable } from 'rxjs';

import { createFetchText } from '../fetch-text/fetch.text';

const createFetchTextProvider = (
  [aUrlConfig$]: [Observable<UrlConfig>],
  [aLogSvc]: [LoggerService?]
) => createFetchText(aUrlConfig$, aLogSvc);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_FETCH_TEXT = createInjectableReactProvider(
  createFetchTextProvider,
  ACOUSTIC_CONTEXT_FETCH_TEXT,
  [ACOUSTIC_CONTEXT_URL_CONFIG],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
