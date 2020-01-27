/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_PAGE_RESOLVER,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { DeliveryPageResolverService } from './delivery.page.resolver.service';

const createDeliveryPageResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryPageResolverService(aSearch, aLogSvc);

/**
 * Provider implementation for the `WCH_CONTEXT_DELIVERY_PAGE_RESOLVER`.
 */
export const WCH_PROVIDER_REST_DELIVERY_PAGE_RESOLVER = createInjectableReactProvider(
  createDeliveryPageResolver,
  WCH_CONTEXT_DELIVERY_PAGE_RESOLVER,
  [WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
