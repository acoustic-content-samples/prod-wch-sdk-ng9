/** Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { DeliveryLayoutMappingResolverService } from './delivery.layout.mapping.resolver.service';

const createDeliveryLayoutMappingResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryLayoutMappingResolverService(aSearch, aLogSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REST_DELIVERY_LAYOUT_MAPPING_RESOLVER = createInjectableReactProvider(
  createDeliveryLayoutMappingResolver,
  WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  [WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
