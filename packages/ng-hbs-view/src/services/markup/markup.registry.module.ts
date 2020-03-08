import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ExtractInjectionTokenType
} from '@acoustic-content-sdk/ng-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule, Optional } from '@angular/core';

import { VERSION } from './../../version';
import { AcNgMarkupRegistryService } from './markup.registry.service';

const LOGGER = 'AcNgMarkupRegistryModule';

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
  aRegistryService: AcNgMarkupRegistryService,
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
      provide: AcNgMarkupRegistryService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMarkup,
      deps: [
        AcNgMarkupRegistryService,
        [new Optional(), ACOUSTIC_TOKEN_LOGGER_SERVICE]
      ],
      multi: true
    }
  ]
})
export class AcNgMarkupRegistryModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
