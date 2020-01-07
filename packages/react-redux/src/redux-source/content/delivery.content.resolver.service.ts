import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryContentResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class DeliveryContentResolverService
  extends AbstractDeliveryContentResolverService
  implements DeliveryContentResolver {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // dispatch
    super(aStore, aLogSvc);
  }
}
