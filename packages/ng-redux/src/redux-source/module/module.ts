/* Copyright IBM Corp. 2017 */
import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VERSION } from './../../version';
import { WchNgReduxAuthStatusModule } from './auth.status.module';
import { WchNgReduxContentModule } from './content.module';
import { WchNgReduxFetchTextModule } from './fetch.text.module';
import { WchNgReduxHbsModule } from './handlebars.module';
import { WchNgReduxInlineEditModule } from './inline.edit.module';
import { WchNgReduxLayoutMappingModule } from './layout.mapping.module';
import { WchNgReduxLayoutModule } from './layout.module';
import { WchNgReduxPageModule } from './page.module';
import { WchNgReduxSiteModule } from './site.module';
import { WchNgReduxTypeModule } from './type.module';
import { WchNgReduxUrlConfigModule } from './url.config.module';
import { WchNgReduxWchConfigModule } from './wch.config.module';

/**
 * Module that provides the SDK services based on a redux store implementation.
 *
 * Depends on: `WCH_TOKEN_REDUX_STORE`
 */
@NgModule({
  imports: [
    CommonModule,
    WchNgReduxUrlConfigModule,
    WchNgReduxWchConfigModule,
    WchNgReduxContentModule,
    WchNgReduxLayoutModule,
    WchNgReduxLayoutMappingModule,
    WchNgReduxTypeModule,
    WchNgReduxPageModule,
    WchNgReduxSiteModule,
    WchNgReduxHbsModule,
    WchNgReduxAuthStatusModule,
    WchNgReduxFetchTextModule,
    WchNgReduxInlineEditModule
  ]
})
export class WchNgReduxModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
