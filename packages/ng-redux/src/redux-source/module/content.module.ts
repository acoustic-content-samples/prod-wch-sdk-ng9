/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryContentResolverService } from '../content/delivery.content.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER,
      useClass: DeliveryContentResolverService
    }
  ]
})
export class AcNgReduxContentModule {}
