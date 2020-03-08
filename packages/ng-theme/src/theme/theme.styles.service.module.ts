import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_PRE_RENDERING_RESOLVER
} from '@acoustic-content-sdk/ng-api';
import { logModule } from '@acoustic-content-sdk/utils';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { VERSION } from './../version';
import { ACOUSTIC_TOKEN_THEME_STYLES } from './theme.styles';
import { ThemeStylesDirective } from './theme.styles.directive';
import { createThemeStyles } from './theme.styles.service';

const LOGGER = 'ThemeStylesModule';

/**
 * Implementation of a module that exposes the `themeStyles` directive.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [ThemeStylesDirective],
  exports: [ThemeStylesDirective],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_THEME_STYLES,
      useFactory: createThemeStyles,
      deps: [
        ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER,
        ACOUSTIC_TOKEN_PRE_RENDERING_RESOLVER,
        [new Optional(), DOCUMENT],
        [new Optional(), ACOUSTIC_TOKEN_LOGGER_SERVICE]
      ]
    }
  ]
})
export class AcNgThemeStylesModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;

  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService?: LoggerService
  ) {
    // log the module
    logModule(VERSION, LOGGER, aLoggerService);
  }
}
