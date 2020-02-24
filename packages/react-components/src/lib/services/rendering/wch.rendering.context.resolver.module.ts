import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER
} from '@acoustic-content-sdk/react-api';
import { RenderingContextResolverService } from './rendering.context.resolver.service';

const createRenderingContextResolver = (
  [deliveryResolver]: [DeliveryContentResolver],
  [logSvc]: [LoggerService?]
) => new RenderingContextResolverService(deliveryResolver, logSvc);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_RENDERING_CONTEXT_RESOLVER = createInjectableReactProvider(
  createRenderingContextResolver,
  ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER,
  [ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
