import { LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WchNgRestModule } from '@acoustic-content-sdk/ng-rest';
import { WchNgEditDirectivesModule } from '@acoustic-content-sdk/ng-view';
import { logModule } from '@acoustic-content-sdk/utils';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from './../version';

/**
 * Imports the modules required for live functionality
 */
@NgModule({
  imports: [WchNgRestModule, WchNgEditDirectivesModule]
})
export class WchNgAppLiveModule {
  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log this module
    logModule(VERSION, MODULE, aLoggerService);
  }
}
