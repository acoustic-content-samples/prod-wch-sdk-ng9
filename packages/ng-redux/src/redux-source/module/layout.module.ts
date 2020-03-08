/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_DELIVERY_LAYOUT_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryLayoutResolverService } from '../layout/delivery.layout.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_LAYOUT_RESOLVER,
      useClass: DeliveryLayoutResolverService
    }
  ]
})
export class AcNgReduxLayoutModule {}
