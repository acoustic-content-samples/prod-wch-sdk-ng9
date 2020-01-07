import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  DeliveryTypeResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryTypeResolverService } from '@acoustic-content-sdk/component-rest';
import {
  WCH_TOKEN_DELIVERY_SEARCH_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliveryTypeResolverService
  extends AbstractDeliveryTypeResolverService
  implements DeliveryTypeResolver {
  constructor(
    @Inject(WCH_TOKEN_DELIVERY_SEARCH_RESOLVER) aSearch: DeliverySearchResolver,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    super(aSearch, aLogSvc);
  }
}
