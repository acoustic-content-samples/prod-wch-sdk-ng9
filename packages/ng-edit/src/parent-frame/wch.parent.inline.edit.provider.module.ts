import {
  createVersionString,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  INLINE_EDIT_PROVIDER_ID,
  WchInlineEditProviderV2
} from '@acoustic-content-sdk/edit-api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_EDIT_HOST_WINDOW,
  WCH_TOKEN_INLINE_EDIT_PROVIDER
} from '@acoustic-content-sdk/ng-edit-api';
import {
  createObservableAdaptor,
  isNil,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';
import { defer, from, Observable, Subscribable, throwError } from 'rxjs';

import { MODULE, VERSION } from './../version';

const LOGGER = 'WchNgParentInlineEditProviderModule';

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
export function getInlineEditProvider(
  aHostWindow: WindowType,
  aLogSvc: LoggerService
): Observable<WchInlineEditProviderV2> {
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
  const logger = logSvc.get(LOGGER);
  // dispatch
  return defer(() => internalGetInlineEditProvider(aHostWindow, logger));
}

/**
 * Exposes the inline edit provider `WCH_TOKEN_INLINE_EDIT_PROVIDER` from the parent frame
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      deps: [
        WCH_TOKEN_EDIT_HOST_WINDOW,
        [new Optional(), WCH_TOKEN_LOGGER_SERVICE]
      ],
      provide: WCH_TOKEN_INLINE_EDIT_PROVIDER,
      useFactory: getInlineEditProvider
    }
  ]
})
export class WchNgParentInlineEditProviderModule {
  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log the existence of this service
    const logSvc = aLoggerService || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // log this
    logger.info(MODULE, createVersionString(VERSION));
  }
}
