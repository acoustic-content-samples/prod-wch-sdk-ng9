import { LoggerService } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { logModule } from '@acoustic-content-sdk/utils';
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
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log module startup
    logModule(VERSION, MODULE, aLoggerService);
  }
}
