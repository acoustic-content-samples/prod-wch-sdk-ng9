import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryLayoutMappingResolverService } from '@acoustic-content-sdk/component-rest';
import {
  ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliveryLayoutMappingResolverService
  extends AbstractDeliveryLayoutMappingResolverService
  implements DeliveryLayoutMappingResolver {
  constructor(
    @Inject(ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER) aSearch: DeliverySearchResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super(aSearch, aLogSvc);
  }
}
