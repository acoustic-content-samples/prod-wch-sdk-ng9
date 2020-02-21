import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchLoggerService } from '../services/logger/wch.logger.service';

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
export class WchNgLoggerModule {}
