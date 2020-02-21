import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryLayoutResolverService } from '@acoustic-content-sdk/component-rest';
import {
  ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliveryLayoutResolverService
  extends AbstractDeliveryLayoutResolverService
  implements DeliveryLayoutResolver {
  constructor(
    @Inject(ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER) aSearch: DeliverySearchResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super(aSearch, aLogSvc);
  }
}
