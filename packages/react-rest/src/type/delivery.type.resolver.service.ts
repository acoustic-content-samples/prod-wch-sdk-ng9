import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  DeliveryTypeResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryTypeResolverService } from '@acoustic-content-sdk/component-rest';

export class DeliveryTypeResolverService
  extends AbstractDeliveryTypeResolverService
  implements DeliveryTypeResolver {
  constructor(aSearch: DeliverySearchResolver, aLogSvc?: LoggerService) {
    super(aSearch, aLogSvc);
  }
}
