import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the navigation service
 */
export const WCH_TOKEN_DELIVERY_SEARCH_RESOLVER = new InjectionToken<
  DeliverySearchResolver
>('WCH_TOKEN_DELIVERY_SEARCH_RESOLVER');
