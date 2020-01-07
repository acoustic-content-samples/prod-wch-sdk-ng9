/* Copyright IBM Corp. 2017 */
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { WCH_TOKEN_LOGGER_FACTORY } from '@acoustic-content-sdk/ng-api';

import {
  Ng2LoggerConfig,
  Ng2LoggerConfigService
} from './services/config/wch.logger.config';
import { Ng2LoggerFactory } from './services/logger.factory';

@NgModule({
  imports: [CommonModule]
})
export class WchNgLoggingModule {
  /*
   * Returns the preconfigured module
   *
   * @param aService  the service
   */
  static forRoot(aConfig?: Ng2LoggerConfig): ModuleWithProviders {
    return {
      ngModule: WchNgLoggingModule,
      providers: [
        { provide: Ng2LoggerConfigService, useValue: aConfig },
        { provide: WCH_TOKEN_LOGGER_FACTORY, useClass: Ng2LoggerFactory }
      ]
    };
  }
}
