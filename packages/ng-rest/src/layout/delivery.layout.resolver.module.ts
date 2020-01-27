/* Copyright IBM Corp. 2017 */
import { WCH_TOKEN_DELIVERY_LAYOUT_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryLayoutResolverService } from './delivery.layout.resolver.service';

/**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes an implementation of `WCH_TOKEN_DELIVERY_LAYOUT_RESOLVER`.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_DELIVERY_LAYOUT_RESOLVER,
      useClass: DeliveryLayoutResolverService
    }
  ]
})
export class WchNgRestLayoutModule {}
