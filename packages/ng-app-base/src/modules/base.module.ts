import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  WchNgLoggerModule,
  WchNgRouterModule,
  WchNgServicesModule
} from '@acoustic-content-sdk/ng';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WchNgBrowserWindowModule } from '@acoustic-content-sdk/ng-utils';
import { logModule } from '@acoustic-content-sdk/utils';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from '../version';

/**
 * Imports the modules required for basic functionality
 */
@NgModule({
  imports: [
    WchNgBrowserWindowModule,
    WchNgServicesModule,
    WchNgRouterModule,
    WchNgLoggerModule
  ]
})
export class WchNgAppBaseModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;

  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log this module
    logModule(VERSION, MODULE, aLoggerService);
  }
}
