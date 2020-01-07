import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryLayoutMappingResolverService } from '@acoustic-content-sdk/component-rest';

export class DeliveryLayoutMappingResolverService
  extends AbstractDeliveryLayoutMappingResolverService
  implements DeliveryLayoutMappingResolver {
  constructor(aSearch: DeliverySearchResolver, aLogSvc?: LoggerService) {
    super(aSearch, aLogSvc);
  }
}
