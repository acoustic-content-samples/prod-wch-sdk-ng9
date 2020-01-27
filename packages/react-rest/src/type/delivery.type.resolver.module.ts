/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_DELIVERY_TYPE_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { DeliveryTypeResolverService } from './delivery.type.resolver.service';

const createDeliveryTypeResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryTypeResolverService(aSearch, aLogSvc);

/**
 * Provider implementation for the `WCH_CONTEXT_DELIVERY_TYPE_RESOLVER`.
 */
export const WCH_PROVIDER_REST_DELIVERY_TYPE_RESOLVER = createInjectableReactProvider(
  createDeliveryTypeResolver,
  WCH_CONTEXT_DELIVERY_TYPE_RESOLVER,
  [WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
