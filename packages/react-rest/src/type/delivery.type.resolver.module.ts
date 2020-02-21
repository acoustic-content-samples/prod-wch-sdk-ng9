/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_CONTEXT_DELIVERY_TYPE_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { DeliveryTypeResolverService } from './delivery.type.resolver.service';

const createDeliveryTypeResolver = (
  [aSearch]: [DeliverySearchResolver],
  [aLogSvc]: [LoggerService?]
) => new DeliveryTypeResolverService(aSearch, aLogSvc);

/**
 * Provider implementation for the `ACOUSTIC_CONTEXT_DELIVERY_TYPE_RESOLVER`.
 */
export const ACOUSTIC_PROVIDER_REST_DELIVERY_TYPE_RESOLVER = createInjectableReactProvider(
  createDeliveryTypeResolver,
  ACOUSTIC_CONTEXT_DELIVERY_TYPE_RESOLVER,
  [ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
