/* Copyright IBM Corp. 2017 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgRestAuthStatusModule } from '../auth-status/auth.status.module';
import { WchNgRestContentModule } from '../content/delivery.content.resolver.module';
import { WchNgRestFetchTextModule } from '../fetch/fetch.text.module';
import { WchNgRestUrlConfigModule } from '../info/wch.info.module';
import { WchNgRestLayoutMappingModule } from '../layout-mapping/delivery.layout.mapping.resolver.module';
import { WchNgRestLayoutModule } from '../layout/delivery.layout.resolver.module';
import { WchNgRestPageModule } from '../page/delivery.page.resolver.module';
import { WchNgRestTypeModule } from '../type/delivery.type.resolver.module';

/**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes common services.
 */
@NgModule({
  imports: [
    CommonModule,
    WchNgRestUrlConfigModule,
    WchNgRestContentModule,
    WchNgRestLayoutModule,
    WchNgRestLayoutMappingModule,
    WchNgRestTypeModule,
    WchNgRestPageModule,
    WchNgRestFetchTextModule,
    WchNgRestAuthStatusModule
  ]
})
export class WchNgRestModule {}
