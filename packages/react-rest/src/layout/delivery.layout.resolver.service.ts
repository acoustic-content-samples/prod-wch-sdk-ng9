import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryLayoutResolverService } from '@acoustic-content-sdk/component-rest';

export class DeliveryLayoutResolverService
  extends AbstractDeliveryLayoutResolverService
  implements DeliveryLayoutResolver {
  constructor(aSearch: DeliverySearchResolver, aLogSvc?: LoggerService) {
    super(aSearch, aLogSvc);
  }
}
