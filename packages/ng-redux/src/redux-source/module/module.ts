/* Copyright IBM Corp. 2017 */
import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VERSION } from './../../version';
import { AcNgReduxAuthStatusModule } from './auth.status.module';
import { AcNgReduxContentModule } from './content.module';
import { AcNgReduxFetchTextModule } from './fetch.text.module';
import { AcNgReduxHbsModule } from './handlebars.module';
import { AcNgReduxInlineEditModule } from './inline.edit.module';
import { AcNgReduxLayoutMappingModule } from './layout.mapping.module';
import { AcNgReduxLayoutModule } from './layout.module';
import { AcNgReduxPageModule } from './page.module';
import { AcNgReduxSiteModule } from './site.module';
import { AcNgReduxTypeModule } from './type.module';
import { AcNgReduxUrlConfigModule } from './url.config.module';
import { AcNgReduxWchConfigModule } from './wch.config.module';

/**
 * Module that provides the SDK services based on a redux store implementation.
 *
 * Depends on: `ACOUSTIC_TOKEN_REDUX_STORE`
 */
@NgModule({
  imports: [
    CommonModule,
    AcNgReduxUrlConfigModule,
    AcNgReduxWchConfigModule,
    AcNgReduxContentModule,
    AcNgReduxLayoutModule,
    AcNgReduxLayoutMappingModule,
    AcNgReduxTypeModule,
    AcNgReduxPageModule,
    AcNgReduxSiteModule,
    AcNgReduxHbsModule,
    AcNgReduxAuthStatusModule,
    AcNgReduxFetchTextModule,
    AcNgReduxInlineEditModule
  ]
})
export class AcNgReduxModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
