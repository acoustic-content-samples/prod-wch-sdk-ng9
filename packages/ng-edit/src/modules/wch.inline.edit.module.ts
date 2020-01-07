import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import {
  EVENT_INLINE_EDIT_SET_SELECTED_CELL,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER,
  WCH_TOKEN_INLINE_EDIT_SERVICE
} from '@acoustic-content-sdk/ng-edit-api';
import {
  Consumer,
  isFunction,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from './../version';
import { WchInlineEditService } from './wch.inline.edit.service';

const LOGGER = 'WchNgInlineEditServiceModule';

/**
 * Provides token `WCH_TOKEN_INLINE_EDIT_SERVICE` requires a `WCH_TOKEN_INLINE_EDIT_PROVIDER`
 * for the backend
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_INLINE_EDIT_SERVICE,
      useClass: WchInlineEditService
    }
  ]
})
export class WchNgInlineEditServiceModule {
  constructor(
    @Inject(WCH_TOKEN_INLINE_EDIT_SERVICE)
    aInlineEditService: WchInlineEditServiceV2,
    @Optional()
    @Inject(WCH_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER)
    aSelectedCellConsumer?: Consumer<string>,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService?: LoggerService
  ) {
    // log the existence of this service
    const logSvc = aLoggerService || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // log this
    logger.info(MODULE, createVersionString(VERSION));
    /**
     * Register for inline edit selections. We assume
     * that the event stream will automatically close on shutdown
     */
    if (isFunction(aSelectedCellConsumer)) {
      // register
      aInlineEditService
        .fromEvent(EVENT_INLINE_EDIT_SET_SELECTED_CELL)
        .subscribe(aSelectedCellConsumer);
    }
  }
}
