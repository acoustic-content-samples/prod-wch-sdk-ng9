import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { WchNgEditableDirectiveModule } from '../directives/editable/editable.directive.module';
import { WchNgEditablePlaceholderDirectiveModule } from '../directives/editable/editable.placeholder.directive.module';
import { WchNgSelectableDirectiveModule } from '../directives/selectable/selectable.directive.module';
import { MODULE, VERSION } from '../version';

const LOGGER = 'WchNgEditDirectivesModule';

/**
 * Exports the services required to implement the editable directives
 */
@NgModule({
  imports: [
    CommonModule,
    WchNgEditableDirectiveModule,
    WchNgEditablePlaceholderDirectiveModule,
    WchNgSelectableDirectiveModule
  ]
})
export class WchNgEditDirectivesModule {
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
