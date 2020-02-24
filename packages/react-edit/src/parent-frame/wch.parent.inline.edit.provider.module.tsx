import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  INLINE_EDIT_PROVIDER_ID,
  WchInlineEditProviderV2
} from '@acoustic-content-sdk/edit-api';
import {
  createInjectableReactProvider,
  selectDisplayName,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import {
  ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW,
  ACOUSTIC_CONTEXT_INLINE_EDIT_PROVIDER
} from '@acoustic-content-sdk/react-edit-api';
import {
  createObservableAdaptor,
  isNil,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { defer, from, Observable, Subscribable, throwError } from 'rxjs';

const LOGGER = selectDisplayName(ACOUSTIC_CONTEXT_INLINE_EDIT_PROVIDER);

function internalGetInlineEditProvider(
  aHostWindow: WindowType,
  logger: Logger
): Observable<WchInlineEditProviderV2> {
  // access the object from the parent
  const provider: Subscribable<WchInlineEditProviderV2> =
    aHostWindow[INLINE_EDIT_PROVIDER_ID];
  // sanity check
  if (isNil(provider)) {
    // error message
    const msg = `Unable to access [${INLINE_EDIT_PROVIDER_ID}] from parent.`;
    // log this
    logger.warn(msg);
    // error
    return throwError(new Error(msg));
  }
  // get parent
  return from(createObservableAdaptor(provider));
}

/**
 * Accesses the `WchInlineEditProviderV2` from the parent window.
 *
 * @param aHostWindow
 * @param aLogSvc
 */
function createInlineEditProvider(
  [aEditHostWnd]: [WindowType],
  [aLogSvc]: [LoggerService?]
): Observable<WchInlineEditProviderV2> {
  // some fallbacks
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
  const logger = logSvc.get(LOGGER);
  // dispatch
  return defer(() => internalGetInlineEditProvider(aEditHostWnd, logger));
}

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_INLINE_EDIT_PROVIDER = createInjectableReactProvider(
  createInlineEditProvider,
  ACOUSTIC_CONTEXT_INLINE_EDIT_PROVIDER,
  [ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
