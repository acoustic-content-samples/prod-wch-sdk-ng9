import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER
} from '@acoustic-content-sdk/react-api';
import { RenderingContextResolverService } from './rendering.context.resolver.service';

const createRenderingContextResolver = (
  [deliveryResolver]: [DeliveryContentResolver],
  [logSvc]: [LoggerService?]
) => new RenderingContextResolverService(deliveryResolver, logSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_RENDERING_CONTEXT_RESOLVER = createInjectableReactProvider(
  createRenderingContextResolver,
  WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER,
  [WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
