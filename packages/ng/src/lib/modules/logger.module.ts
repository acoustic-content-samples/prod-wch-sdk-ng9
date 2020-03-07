import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchLoggerService } from '../services/logger/wch.logger.service';
import { VERSION } from './../../version';

/**
 * Modules that exposes the `ACOUSTIC_TOKEN_LOGGER_SERVICE` token
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_LOGGER_SERVICE,
      useClass: WchLoggerService
    }
  ]
})
export class WchNgLoggerModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
