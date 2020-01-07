import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryTypeResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class DeliveryTypeResolverService
  extends AbstractDeliveryTypeResolverService
  implements DeliveryTypeResolver {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    super(aStore, aLogSvc);
  }
}
