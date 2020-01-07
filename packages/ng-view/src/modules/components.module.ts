import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { WchPlaceholderComponent } from '../components/placeholder/placeholder.component';
import { WchEditableDirective } from './../directives/editable/editable.directive';
import { EditItemPipe } from './../pipes/edit.item.pipe';
import { MODULE, VERSION } from './../version';

const LOGGER = 'WchNgEditComponentsModule';

/**
 * Exports the components and directives used to attach inline edit to code level
 * angular components.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [WchEditableDirective, WchPlaceholderComponent, EditItemPipe],
  providers: [],
  exports: [WchPlaceholderComponent, WchEditableDirective, EditItemPipe],
  entryComponents: [WchPlaceholderComponent]
})
export class WchNgEditComponentsModule {
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
