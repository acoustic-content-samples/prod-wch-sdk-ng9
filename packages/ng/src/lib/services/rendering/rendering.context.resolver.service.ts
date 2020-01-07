import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  RenderingContextResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractRenderingContextResolverService } from '@acoustic-content-sdk/component-utils';
import {
  WCH_TOKEN_DELIVERY_CONTENT_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { Inject, Injectable, Optional } from '@angular/core';

/**
 * Implementation of a service that resolves the outbound parts of a rendering context
 */
@Injectable({ providedIn: 'root' })
export class RenderingContextResolverService
  extends AbstractRenderingContextResolverService
  implements RenderingContextResolver {
  constructor(
    @Inject(WCH_TOKEN_DELIVERY_CONTENT_RESOLVER)
    aDeliveryContentResolver: DeliveryContentResolver,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aDeliveryContentResolver, aLogSvc);
  }
}
