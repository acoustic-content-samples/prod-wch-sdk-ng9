import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryLayoutResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class DeliveryLayoutResolverService
  extends AbstractDeliveryLayoutResolverService
  implements DeliveryLayoutResolver {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    super(aStore, aLogSvc);
  }
}
