import {
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
import { NgModule } from '@angular/core';

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
    WchNgInlineEditSelectionModule
  ]
})
export class WchNgAppEditModule {}
