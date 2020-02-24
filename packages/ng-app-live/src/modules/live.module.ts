import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WchNgRestModule } from '@acoustic-content-sdk/ng-rest';
import { WchNgEditDirectivesModule } from '@acoustic-content-sdk/ng-view';
import { WchNgHbsViewModule } from '@acoustic-content-sdk/ng-hbs-view';
import { logModule } from '@acoustic-content-sdk/utils';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from './../version';

/**
 * Imports the modules required for live functionality
 */
@NgModule({
  imports: [WchNgRestModule, WchNgEditDirectivesModule, WchNgHbsViewModule]
})
export class WchNgAppLiveModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;

  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log this module
    logModule(VERSION, MODULE, aLoggerService);
  }
}
