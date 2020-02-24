/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryLayoutMappingResolverService } from './delivery.layout.mapping.resolver.service';

/**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes an implementation of `ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER`.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER,
      useClass: DeliveryLayoutMappingResolverService
    }
  ]
})
export class WchNgRestLayoutMappingModule {}
