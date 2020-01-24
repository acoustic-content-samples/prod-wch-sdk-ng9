/* Copyright IBM Corp. 2017 */
import { WCH_TOKEN_DELIVERY_TYPE_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryTypeResolverService } from '../type/delivery.type.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_DELIVERY_TYPE_RESOLVER,
      useClass: DeliveryTypeResolverService
    }
  ]
})
export class WchNgReduxTypeModule {}
