import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
  DeliveryLayoutResolver,
  DeliveryTypeResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractLayoutResolverService } from '@acoustic-content-sdk/component-utils';

export class LayoutResolverService extends AbstractLayoutResolverService
  implements LayoutResolver {
  constructor(
    aDeliveryTypeResolver: DeliveryTypeResolver,
    aDeliveryLayoutMappingResolver: DeliveryLayoutMappingResolver,
    aDeliveryLayoutResolver: DeliveryLayoutResolver,
    aLogSvc?: LoggerService
  ) {
    super(
      aDeliveryTypeResolver,
      aDeliveryLayoutMappingResolver,
      aDeliveryLayoutResolver,
      aLogSvc
    );
  }
}
