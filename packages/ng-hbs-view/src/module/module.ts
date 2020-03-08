import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcNgMarkupRegistryModule } from '../services/markup/markup.registry.module';
import { AcNgPreRenderingModule } from '../services/pre-rendering/pre.rendering.module';
import { AcNgHbsResolverViewModule } from '../services/resolver/resolver.module';
import { VERSION } from './../version';
import { AcNgHbsComponentsViewModule } from './components.module';

@NgModule({
  imports: [
    CommonModule,
    AcNgHbsComponentsViewModule,
    AcNgHbsResolverViewModule,
    AcNgMarkupRegistryModule,
    AcNgPreRenderingModule
  ]
})
export class AcNgHbsViewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
