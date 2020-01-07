/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { DeliveryLayoutResolverService } from './delivery.layout.resolver.service';

const createDeliveryLayoutResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryLayoutResolverService(aSearch, aLogSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REST_DELIVERY_LAYOUT_RESOLVER = createInjectableReactProvider(
  createDeliveryLayoutResolver,
  WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER,
  [WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
