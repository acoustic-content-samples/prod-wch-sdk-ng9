/* Copyright IBM Corp. 2017 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgRestContentModule } from '../content/delivery.content.resolver.module';
import { WchNgRestUrlConfigModule } from '../info/wch.info.module';
import { WchNgRestLayoutMappingModule } from '../layout-mapping/delivery.layout.mapping.resolver.module';
import { WchNgRestLayoutModule } from '../layout/delivery.layout.resolver.module';
import { WchNgRestPageModule } from '../page/delivery.page.resolver.module';
import { WchNgRestTypeModule } from '../type/delivery.type.resolver.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgRestUrlConfigModule,
    WchNgRestContentModule,
    WchNgRestLayoutModule,
    WchNgRestLayoutMappingModule,
    WchNgRestTypeModule,
    WchNgRestPageModule
  ]
})
export class WchNgRestModule {}
