import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
  DeliveryLayoutResolver,
  DeliveryTypeResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractLayoutResolverService } from '@acoustic-content-sdk/component-utils';
import {
  ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  ACOUSTIC_TOKEN_DELIVERY_LAYOUT_RESOLVER,
  ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutResolverService extends AbstractLayoutResolverService
  implements LayoutResolver {
  constructor(
    @Inject(ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER)
    aDeliveryTypeResolver: DeliveryTypeResolver,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER)
    aDeliveryLayoutMappingResolver: DeliveryLayoutMappingResolver,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_LAYOUT_RESOLVER)
    aDeliveryLayoutResolver: DeliveryLayoutResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(
      aDeliveryTypeResolver,
      aDeliveryLayoutMappingResolver,
      aDeliveryLayoutResolver,
      aLogSvc
    );
  }
}
