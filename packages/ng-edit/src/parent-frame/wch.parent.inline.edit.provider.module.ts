import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  INLINE_EDIT_PROVIDER_ID,
  WchInlineEditProviderV2
} from '@acoustic-content-sdk/edit-api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  ACOUSTIC_TOKEN_EDIT_HOST_WINDOW,
  ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER
} from '@acoustic-content-sdk/ng-edit-api';
import {
  boxLoggerService,
  createError,
  createObservableAdaptor,
  isNil,
  logModule
} from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';
import { defer, from, Observable, Subscribable, throwError } from 'rxjs';

import { MODULE, VERSION } from './../version';

const LOGGER = 'AcNgParentInlineEditProviderModule';

/**
 * Accesses the `WchInlineEditProviderV2` from another window. This other window
 * must be enabled for cross frame access.
 *
 * @param aHostWindow - the parent window
 * @param logger - logger
 *
 * @returns an observable of the inline edit provider
 */
export function internalGetInlineEditProvider(
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
    return throwError(createError(msg));
  }
  /**
   * Access the object from the parent window. We make sure
   * to wrap the `Subscribable` into an `Observable` using
   * the rxjs implementation in the current frame
   */
  return from(createObservableAdaptor(provider));
}

/**
 * Accesses the `WchInlineEditProviderV2` from another window. This other window
 * must be enabled for cross frame access. The provider must be available via the `INLINE_EDIT_PROVIDER_ID` key
 * on that window.
 *
 * @param aHostWindow - the parent window
 * @param aLogSvc - logger
 *
 * @returns an observable of the inline edit provider
 */
export function getInlineEditProvider(
  aHostWindow: WindowType,
  aLogSvc: LoggerService
): Observable<WchInlineEditProviderV2> {
  // setup some logging
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // dispatch
  return defer(() => internalGetInlineEditProvider(aHostWindow, logger));
}

/**
 * Exposes the inline edit provider `ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER` from the parent frame. The provider
 * must have been exposed via the `INLINE_EDIT_PROVIDER_ID` constant on that window.
 *
 * Depends on: `ACOUSTIC_TOKEN_EDIT_HOST_WINDOW`, `ACOUSTIC_TOKEN_LOGGER_SERVICE`
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      deps: [
        ACOUSTIC_TOKEN_EDIT_HOST_WINDOW,
        [new Optional(), ACOUSTIC_TOKEN_LOGGER_SERVICE]
      ],
      provide: ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER,
      useFactory: getInlineEditProvider
    }
  ]
})
export class AcNgParentInlineEditProviderModule {
  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log the existence of this service
    logModule(VERSION, MODULE, aLoggerService);
  }
}
