/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_AUTH_STATUS,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_FETCH_TEXT } from '@acoustic-content-sdk/react-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';

import { AuthStatusService } from './auth.status.service';

const createAuthStatus = (
  [aFetchText]: [FetchText],
  [aLogSvc]: [LoggerService?]
) => new AuthStatusService(aFetchText, aLogSvc);

/**
 * Provider implementation for the `ACOUSTIC_CONTEXT_AUTH_STATUS`.
 */
export const ACOUSTIC_PROVIDER_REST_AUTH_STATUS = createInjectableReactProvider(
  createAuthStatus,
  ACOUSTIC_CONTEXT_AUTH_STATUS,
  [ACOUSTIC_CONTEXT_FETCH_TEXT],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
