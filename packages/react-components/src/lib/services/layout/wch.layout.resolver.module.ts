import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
  DeliveryLayoutResolver,
  DeliveryTypeResolver
} from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER,
  WCH_CONTEXT_DELIVERY_TYPE_RESOLVER,
  WCH_CONTEXT_LAYOUT_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { LayoutResolverService } from './layout.resolver.service';

const createLayoutResolver = (
  [typeResolver, layoutMappingResolver, layoutResolver]: [
    DeliveryTypeResolver,
    DeliveryLayoutMappingResolver,
    DeliveryLayoutResolver
  ],
  [logSvc]: [LoggerService?]
) =>
  new LayoutResolverService(
    typeResolver,
    layoutMappingResolver,
    layoutResolver,
    logSvc
  );

/**
 * Declares the provider
 */
export const WCH_PROVIDER_LAYOUT_RESOLVER = createInjectableReactProvider(
  createLayoutResolver,
  WCH_CONTEXT_LAYOUT_RESOLVER,
  [
    WCH_CONTEXT_DELIVERY_TYPE_RESOLVER,
    WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
    WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER
  ],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
