import { DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the navigation service
 */
export const WCH_TOKEN_DELIVERY_SITE_RESOLVER = new InjectionToken<
  DeliverySiteResolver
>('WCH_TOKEN_DELIVERY_SITE_RESOLVER');
