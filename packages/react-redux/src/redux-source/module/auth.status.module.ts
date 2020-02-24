import { LoggerService } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_AUTH_STATUS,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

import { ReactAuthStatusService } from '../auth-status/auth.status.service';

const createAuthStatus = (
  [aStore]: [ReduxRootStore],
  [aLogSvc]: [LoggerService?]
) => new ReactAuthStatusService(aStore, aLogSvc);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_AUTH_STATUS = createInjectableReactProvider(
  createAuthStatus,
  ACOUSTIC_CONTEXT_AUTH_STATUS,
  [ACOUSTIC_CONTEXT_REDUX_STORE],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
