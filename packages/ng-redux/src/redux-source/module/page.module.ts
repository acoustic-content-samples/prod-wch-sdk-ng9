/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_DELIVERY_PAGE_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryPageResolverService } from '../page/delivery.page.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_PAGE_RESOLVER,
      useClass: DeliveryPageResolverService
    }
  ]
})
export class WchNgReduxPageModule {}
