import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_CONTENT_RESOLVER = new InjectionToken<
  DeliveryContentResolver
>('WCH_TOKEN_DELIVERY_CONTENT_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_CONTENT_SEED = new InjectionToken<string>(
  'WCH_TOKEN_DELIVERY_CONTENT_SEED'
);
