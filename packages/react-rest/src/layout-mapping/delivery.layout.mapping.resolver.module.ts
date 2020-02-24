/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { DeliveryLayoutMappingResolverService } from './delivery.layout.mapping.resolver.service';

const createDeliveryLayoutMappingResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryLayoutMappingResolverService(aSearch, aLogSvc);

/**
 * Provider implementation for the `ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER`.
 */
export const ACOUSTIC_PROVIDER_REST_DELIVERY_LAYOUT_MAPPING_RESOLVER = createInjectableReactProvider(
  createDeliveryLayoutMappingResolver,
  ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  [ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
