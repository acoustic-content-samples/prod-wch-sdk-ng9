/* Copyright IBM Corp. 2017 */
import { WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryLayoutMappingResolverService } from '../layout-mapping/delivery.layout.mapping.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER,
      useClass: DeliveryLayoutMappingResolverService
    }
  ]
})
export class WchNgReduxLayoutMappingModule {}
