import { LoggerService, WchSdkVersion } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import { assertSameOrigin } from '@acoustic-content-sdk/component-utils';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_WINDOW
} from '@acoustic-content-sdk/ng-api';
import {
  WchNgEditDirectivesModule,
  WchNgInlineEditSelectionModule,
  WchNgInlineEditServiceModule,
  WchNgParentInlineEditProviderModule
} from '@acoustic-content-sdk/ng-edit';
import { ACOUSTIC_TOKEN_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/ng-edit-api';
import { WchNgHbsEditModule } from '@acoustic-content-sdk/ng-hbs-edit';
import {
  WchNgParentFrameReduxStoreModule,
  WchNgReduxModule
} from '@acoustic-content-sdk/ng-redux';
import { WchNgEditHostWindowModule } from '@acoustic-content-sdk/ng-utils';
import { logModule } from '@acoustic-content-sdk/utils';
import { Inject, NgModule, Optional } from '@angular/core';

import { MODULE, VERSION } from '../version';

/**
 * Imports the modules required for inline edit functionality. This module makes the following choices:
 *
 * - Inline edit functionality is accessed from the controlling parent window
 * - Data access is implemented by accessing the redux store
 * - The redux store is accessed from the controlling parent window
 *
 * This module assumes that the controlling parent window runs in the same origin than the application window.
 * If this is not the case for your application, select different providers for `ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER` and `ACOUSTIC_TOKEN_REDUX_STORE`
 */
@NgModule({
  imports: [
    WchNgEditHostWindowModule,
    WchNgParentInlineEditProviderModule,
    WchNgInlineEditServiceModule,
    WchNgParentFrameReduxStoreModule,
    WchNgReduxModule,
    // TODO this is just a workaround
    WchNgHbsEditModule,
    WchNgInlineEditSelectionModule,
    WchNgEditDirectivesModule
  ]
})
export class WchNgAppPreviewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;

  constructor(
    @Inject(ACOUSTIC_TOKEN_WINDOW)
    aCurrentWindow: WindowType,
    @Inject(ACOUSTIC_TOKEN_EDIT_HOST_WINDOW)
    aHostWindow: WindowType,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log this module
    logModule(VERSION, MODULE, aLoggerService);
    // validate same origin
    assertSameOrigin(aCurrentWindow, aHostWindow, aLoggerService);
  }
}
