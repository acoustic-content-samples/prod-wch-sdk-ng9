import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_TYPE_RESOLVER = new InjectionToken<
  DeliveryTypeResolver
>('WCH_TOKEN_DELIVERY_TYPE_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_TYPE_SEED = new InjectionToken<string>(
  'WCH_TOKEN_DELIVERY_TYPE_SEED'
);
