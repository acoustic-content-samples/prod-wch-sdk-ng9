import { LoggerService } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_AUTH_STATUS,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

import { ReactAuthStatusService } from '../auth-status/auth.status.service';

const createAuthStatus = (
  [aStore]: [ReduxRootStore],
  [aLogSvc]: [LoggerService?]
) => new ReactAuthStatusService(aStore, aLogSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_AUTH_STATUS = createInjectableReactProvider(
  createAuthStatus,
  WCH_CONTEXT_AUTH_STATUS,
  [WCH_CONTEXT_REDUX_STORE],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
