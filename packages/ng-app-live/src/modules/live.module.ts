import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AcNgRestModule } from '@acoustic-content-sdk/ng-rest';
import { AcNgEditDirectivesModule } from '@acoustic-content-sdk/ng-view';
import { AcNgHbsViewModule } from '@acoustic-content-sdk/ng-hbs-view';
import { logModule } from '@acoustic-content-sdk/utils';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from './../version';

/**
 * Imports the modules required for live functionality
 */
@NgModule({
  imports: [AcNgRestModule, AcNgEditDirectivesModule, AcNgHbsViewModule]
})
export class AcNgAppLiveModule {
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
