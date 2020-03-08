import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import { ExtractInjectionTokenType } from '@acoustic-content-sdk/ng-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { VERSION } from './../../version';
import { WchNgMarkupRegistryService } from './markup.registry.service';

const LOGGER = 'WchNgMarkupRegistryModule';

declare type AppInitializerType = ExtractInjectionTokenType<
  typeof APP_INITIALIZER
>[0];

/**
 * Initializes the markup registry with the current value of the page markup
 *
 * @param aRegistryService - the registry service
 * @param aLogSvc - optional logger
 */
export function initializeMarkup(
  aRegistryService: WchNgMarkupRegistryService,
  aLogSvc?: LoggerService
): AppInitializerType {
  // log
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // returns the initializer
  return () => {
    // log this
    logger.info('Initializing ...');
    // add
    aRegistryService.add();
  };
}

/**
 * Module that exposes a resolver for handlebars components
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WchNgMarkupRegistryService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMarkup,
      deps: [WchNgMarkupRegistryService],
      multi: true
    }
  ]
})
export class WchNgMarkupRegistryModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
