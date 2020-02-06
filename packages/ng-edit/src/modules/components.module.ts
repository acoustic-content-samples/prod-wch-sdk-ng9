import { LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { logModule } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';

import { WchPlaceholderComponent } from '../components/placeholder/placeholder.component';
import { EditItemPipe } from './../pipes/edit.item.pipe';
import { MODULE, VERSION } from './../version';
import { WchNgInlineEditServiceModule } from './wch.inline.edit.module';
import { WchPlaceholderProviderModule } from './wch.placeholder.provider.module';

const LOGGER = 'WchNgEditComponentsModule';

/**
 * Exports the components and directives used to attach inline edit to code level
 * angular components.
 */
@NgModule({
  imports: [
    CommonModule,
    WchPlaceholderProviderModule,
    WchNgInlineEditServiceModule
  ],
  declarations: [WchPlaceholderComponent, EditItemPipe],
  providers: [],
  exports: [WchPlaceholderComponent, EditItemPipe]
})
export class WchNgEditComponentsModule {
  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // log module startup
    logModule(VERSION, MODULE, aLoggerService);
  }
}
