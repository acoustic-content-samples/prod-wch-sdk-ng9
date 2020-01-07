import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_LAYOUT_RESOLVER = new InjectionToken<
  DeliveryLayoutResolver
>('WCH_TOKEN_DELIVERY_LAYOUT_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_LAYOUT_SEED = new InjectionToken<string>(
  'WCH_TOKEN_DELIVERY_LAYOUT_SEED'
);
