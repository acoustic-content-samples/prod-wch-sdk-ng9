/* Copyright IBM Corp. 2017 */
import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcNgRestAuthStatusModule } from '../auth-status/auth.status.module';
import { AcNgRestContentModule } from '../content/delivery.content.resolver.module';
import { AcNgRestFetchTextModule } from '../fetch/fetch.text.module';
import { AcNgRestUrlConfigModule } from '../info/wch.info.module';
import { AcNgRestLayoutMappingModule } from '../layout-mapping/delivery.layout.mapping.resolver.module';
import { AcNgRestLayoutModule } from '../layout/delivery.layout.resolver.module';
import { AcNgRestPageModule } from '../page/delivery.page.resolver.module';
import { AcNgRestSiteModule } from '../site/site.module';
import { AcNgRestTypeModule } from '../type/delivery.type.resolver.module';
import { VERSION } from './../version';

/**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes common services.
 */
@NgModule({
  imports: [
    CommonModule,
    AcNgRestUrlConfigModule,
    AcNgRestContentModule,
    AcNgRestLayoutModule,
    AcNgRestLayoutMappingModule,
    AcNgRestTypeModule,
    AcNgRestPageModule,
    AcNgRestFetchTextModule,
    AcNgRestAuthStatusModule,
    AcNgRestSiteModule
  ]
})
export class AcNgRestModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
