import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryPageResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class DeliveryPageResolverService
  extends AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  constructor(
    aStore: ReduxRootStore,
    aSearchResolver: DeliverySearchResolver,
    aLogSvc?: LoggerService
  ) {
    super(aStore, aSearchResolver, aLogSvc);
  }
}
