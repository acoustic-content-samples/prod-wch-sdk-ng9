import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  DeliverySiteResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractSiteResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class SiteResolverService extends AbstractSiteResolverService
  implements DeliverySiteResolver {
  constructor(
    aStore: ReduxRootStore,
    aContentResolver: DeliveryContentResolver,
    aLogSvc?: LoggerService
  ) {
    super(aStore, aContentResolver, aLogSvc);
  }
}
