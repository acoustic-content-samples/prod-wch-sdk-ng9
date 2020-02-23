import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgHbsResolverViewModule } from '../services/resolver/resolver.module';
import { VERSION } from './../version';
import { WchNgHbsComponentsViewModule } from './components.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgHbsComponentsViewModule,
    WchNgHbsResolverViewModule
  ]
})
export class WchNgHbsViewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
