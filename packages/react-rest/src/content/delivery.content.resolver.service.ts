import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryContentResolverService } from '@acoustic-content-sdk/component-rest';

export class DeliveryContentResolverService
  extends AbstractDeliveryContentResolverService
  implements DeliveryContentResolver {
  constructor(aSearch: DeliverySearchResolver, aLogSvc?: LoggerService) {
    super(aSearch, aLogSvc);
  }
}
