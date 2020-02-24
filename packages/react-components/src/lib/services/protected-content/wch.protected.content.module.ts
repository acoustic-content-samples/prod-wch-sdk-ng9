import {
  AuthStatus,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_AUTH_STATUS,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_PROTECTED_CONTENT,
  ACOUSTIC_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { Observable } from 'rxjs';
import { ReactProtectedContentService } from './protected.content.service';

const createProtectedContent = (
  [urlConfig$, authStatus]: [Observable<UrlConfig>, AuthStatus],
  [logSvc]: [LoggerService?]
) => new ReactProtectedContentService(urlConfig$, authStatus, logSvc);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_PROTECTED_CONTENT = createInjectableReactProvider(
  createProtectedContent,
  ACOUSTIC_CONTEXT_PROTECTED_CONTENT,
  [ACOUSTIC_CONTEXT_URL_CONFIG, ACOUSTIC_CONTEXT_AUTH_STATUS],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
