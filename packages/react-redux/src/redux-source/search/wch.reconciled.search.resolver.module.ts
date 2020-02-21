import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { ReconciledDeliverySearchResolverService } from './reconciled.search.resolver.service';

const createReconciledDeliverySearchResolver = (
  [aStore, aDelegate]: [ReduxRootStore, DeliverySearchResolver],
  [logSvc]: [LoggerService?]
) => new ReconciledDeliverySearchResolverService(aStore, aDelegate, logSvc);

/**
 * Provider for the `ACOUSTIC_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER` injection token
 */
export const ACOUSTIC_PROVIDER_RECONCILED_DELIVERY_SEARCH_RESOLVER = createInjectableReactProvider(
  createReconciledDeliverySearchResolver,
  ACOUSTIC_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER,
  [ACOUSTIC_CONTEXT_REDUX_STORE, ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
