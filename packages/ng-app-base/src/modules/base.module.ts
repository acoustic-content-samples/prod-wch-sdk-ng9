import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  AcNgLoggerModule,
  AcNgRouterModule,
  AcNgServicesModule
} from '@acoustic-content-sdk/ng';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AcNgBrowserWindowModule } from '@acoustic-content-sdk/ng-utils';
import { logModule } from '@acoustic-content-sdk/utils';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from '../version';

/**
 * Imports the modules required for basic functionality
 */
@NgModule({
  imports: [
    AcNgBrowserWindowModule,
    AcNgServicesModule,
    AcNgRouterModule,
    AcNgLoggerModule
  ]
})
export class AcNgAppBaseModule {
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
