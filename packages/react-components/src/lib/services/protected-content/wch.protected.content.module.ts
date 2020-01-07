import {
  AuthStatus,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_AUTH_STATUS,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_PROTECTED_CONTENT,
  WCH_CONTEXT_URL_CONFIG
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
export const WCH_PROVIDER_PROTECTED_CONTENT = createInjectableReactProvider(
  createProtectedContent,
  WCH_CONTEXT_PROTECTED_CONTENT,
  [WCH_CONTEXT_URL_CONFIG, WCH_CONTEXT_AUTH_STATUS],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
