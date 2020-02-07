import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ReconciledDeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliverySearchResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class ReconciledDeliverySearchResolverService
  extends AbstractDeliverySearchResolverService
  implements ReconciledDeliverySearchResolver {
  constructor(
    aStore: ReduxRootStore,
    aDelegate: DeliverySearchResolver,
    aLogSvc?: LoggerService
  ) {
    super(aStore, aDelegate, aLogSvc);
  }
}
