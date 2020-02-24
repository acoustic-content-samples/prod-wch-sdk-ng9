import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_LAYOUT_RESOLVER = new InjectionToken<
  DeliveryLayoutResolver
>('ACOUSTIC_TOKEN_DELIVERY_LAYOUT_RESOLVER');

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_LAYOUT_SEED = new InjectionToken<string>(
  'ACOUSTIC_TOKEN_DELIVERY_LAYOUT_SEED'
);
