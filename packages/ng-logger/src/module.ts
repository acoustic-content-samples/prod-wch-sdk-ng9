/* Copyright IBM Corp. 2017 */
import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_FACTORY } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Ng2LoggerConfig,
  Ng2LoggerConfigService
} from './services/config/wch.logger.config';
import { Ng2LoggerFactory } from './services/logger.factory';
import { VERSION } from './version';

/**
 * Module that provides the a logger factory based on {@link https://www.npmjs.com/package/ng2-logger | ng2-logger}.
 *
 * @remarks
 *
 * You can enable logging for certain logging levels or modules by either providing a config object to the module, setting variables on {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage | localStorage} or by setting a {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies | cookie}. Both approaches use the same keys and expect string array serialized in {@link https://www.json.org/ | JSON format} as a value.
 *
 * For modules use `Ng2LoggerFactory.onlyModules` as the key. The value array lists names of the modules or a regular expression string matching the modules. See the documentation for {@link https://www.npmjs.com/package/ng2-logger | ng2-logger} for more details.
 *
 * For levels use `Ng2LoggerFactory.onlyLevel` as the key. The value array lists the logging levels, e.g `DATA`, `INFO`, `WARN` or `ERROR`. See the documentation for {@link https://www.npmjs.com/package/ng2-logger | ng2-logger} for more details.
 */
@NgModule({
  imports: [CommonModule]
})
export class AcNgLoggingModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;

  /**
   * Provides the module with default configuration
   *
   * @param aConfig - optionally the configuration of the logger
   *
   * @returns the preconfigured module
   */
  static forRoot(aConfig?: Ng2LoggerConfig): ModuleWithProviders {
    return {
      ngModule: AcNgLoggingModule,
      providers: [
        { provide: Ng2LoggerConfigService, useValue: aConfig },
        { provide: ACOUSTIC_TOKEN_LOGGER_FACTORY, useClass: Ng2LoggerFactory }
      ]
    };
  }
}
