import { LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  WchNgEditDirectivesModule,
  WchNgInlineEditSelectionModule,
  WchNgInlineEditServiceModule,
  WchNgParentInlineEditProviderModule
} from '@acoustic-content-sdk/ng-edit';
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
 * Imports the modules required for inline edit functionality
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
  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log this module
    logModule(VERSION, MODULE, aLoggerService);
  }
}
