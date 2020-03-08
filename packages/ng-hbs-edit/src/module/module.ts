import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcNgPreRenderingModule } from '../services/pre-rendering/pre.rendering.module';
import { AcNgHbsRendererModule } from '../services/renderer/renderer.module';
import { AcNgHbsResolverEditModule } from '../services/resolver/resolver.module';
import { VERSION } from './../version';
import { AcNgHbsComponentsEditModule } from './components.module';

/**
 * Module that provides handlebars based rendering functionality in edit mode. This will
 * register a resolver that resolves to the edit mode component if no other layout
 * override could be located.
 *
 * Pull in this module at root level for your application in edit mode
 */
@NgModule({
  imports: [
    CommonModule,
    AcNgHbsComponentsEditModule,
    AcNgHbsResolverEditModule,
    AcNgHbsRendererModule,
    AcNgPreRenderingModule
  ]
})
export class AcNgHbsEditModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
