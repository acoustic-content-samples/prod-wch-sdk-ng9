import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryLayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryLayoutMappingResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class DeliveryLayoutMappingResolverService
  extends AbstractDeliveryLayoutMappingResolverService
  implements DeliveryLayoutMappingResolver {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    super(aStore, aLogSvc);
  }
}
