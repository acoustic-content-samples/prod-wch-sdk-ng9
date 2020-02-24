import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgMarkupRegistryModule } from '../services/markup/markup.registry.module';
import { WchNgHbsResolverViewModule } from '../services/resolver/resolver.module';
import { VERSION } from './../version';
import { WchNgHbsComponentsViewModule } from './components.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgHbsComponentsViewModule,
    WchNgHbsResolverViewModule,
    WchNgMarkupRegistryModule
  ]
})
export class WchNgHbsViewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
