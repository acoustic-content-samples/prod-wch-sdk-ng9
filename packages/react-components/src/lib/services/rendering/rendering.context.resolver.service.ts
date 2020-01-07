import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  RenderingContextResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractRenderingContextResolverService } from '@acoustic-content-sdk/component-utils';

/**
 * Implementation of a service that resolves the outbound parts of a rendering context
 */
export class RenderingContextResolverService
  extends AbstractRenderingContextResolverService
  implements RenderingContextResolver {
  constructor(
    aDeliveryContentResolver: DeliveryContentResolver,
    aLogSvc?: LoggerService
  ) {
    super(aDeliveryContentResolver, aLogSvc);
  }
}
