/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { DeliveryContentResolverService } from './delivery.content.resolver.service';

const createDeliveryContentResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryContentResolverService(aSearch, aLogSvc);

/**
 * Provider implementation for the `WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER`.
 */
export const WCH_PROVIDER_REST_DELIVERY_CONTENT_RESOLVER = createInjectableReactProvider(
  createDeliveryContentResolver,
  WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER,
  [WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
