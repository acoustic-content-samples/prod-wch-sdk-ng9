import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { WchPlaceholderComponent } from '../components/placeholder/placeholder.component';
import { EditItemPipe } from './../pipes/edit.item.pipe';
import { MODULE, VERSION } from './../version';

const LOGGER = 'AcNgEditComponentsModule';

/**
 * Exports the components and directives used to attach inline edit to code level
 * angular components.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [WchPlaceholderComponent, EditItemPipe],
  providers: [],
  exports: [WchPlaceholderComponent, EditItemPipe]
})
export class AcNgEditComponentsModule {
  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log the existence of this service
    const logSvc = boxLoggerService(aLoggerService);
    const logger = logSvc.get(LOGGER);
    // log this
    logger.info(MODULE, createVersionString(VERSION));
  }
}
