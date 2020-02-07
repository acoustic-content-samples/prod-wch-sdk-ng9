import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { ReconciledDeliverySearchResolverService } from './reconciled.search.resolver.service';

const createReconciledDeliverySearchResolver = (
  [aStore, aDelegate]: [ReduxRootStore, DeliverySearchResolver],
  [logSvc]: [LoggerService?]
) => new ReconciledDeliverySearchResolverService(aStore, aDelegate, logSvc);

/**
 * Provider for the `WCH_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER` injection token
 */
export const WCH_PROVIDER_RECONCILED_DELIVERY_SEARCH_RESOLVER = createInjectableReactProvider(
  createReconciledDeliverySearchResolver,
  WCH_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER,
  [WCH_CONTEXT_REDUX_STORE, WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
