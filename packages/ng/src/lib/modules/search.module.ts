import { ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliverySearchResolverService } from '../services/search/search.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER,
      useClass: DeliverySearchResolverService
    }
  ]
})
export class WchNgSearchModule {}
