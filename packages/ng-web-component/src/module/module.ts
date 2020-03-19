import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcNgBundleModule } from '../services/bundle/bundle.module';
import { AcNgWebResolverViewModule } from '../services/resolver/resolver.module';
import { VERSION } from './../version';
import { AcNgWebComponentViewModule } from './components.module';

@NgModule({
  imports: [
    CommonModule,
    AcNgWebComponentViewModule,
    AcNgWebResolverViewModule,
    AcNgBundleModule
  ]
})
export class AcNgWebComponentModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
