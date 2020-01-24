import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_PLACEHOLDER_PROVIDER } from '@acoustic-content-sdk/ng-edit-api';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { WchPlaceholderService } from '../services/placeholders/placeholders.service';
import { MODULE, VERSION } from './../version';

const LOGGER = 'WchPlaceholderProviderModule';

/** Copyright IBM Corp. 2017 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_PLACEHOLDER_PROVIDER,
      useClass: WchPlaceholderService
    }
  ]
})
export class WchPlaceholderProviderModule {
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
