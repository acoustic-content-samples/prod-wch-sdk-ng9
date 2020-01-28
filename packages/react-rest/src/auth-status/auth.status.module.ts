/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_AUTH_STATUS,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_FETCH_TEXT } from '@acoustic-content-sdk/react-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';

import { AuthStatusService } from './auth.status.service';

const createAuthStatus = (
  [aFetchText]: [FetchText],
  [aLogSvc]: [LoggerService?]
) => new AuthStatusService(aFetchText, aLogSvc);

/**
 * Provider implementation for the `WCH_CONTEXT_AUTH_STATUS`.
 */
export const WCH_PROVIDER_REST_AUTH_STATUS = createInjectableReactProvider(
  createAuthStatus,
  WCH_CONTEXT_AUTH_STATUS,
  [WCH_CONTEXT_FETCH_TEXT],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
