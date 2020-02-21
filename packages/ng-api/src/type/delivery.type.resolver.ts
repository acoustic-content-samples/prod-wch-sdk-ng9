import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER = new InjectionToken<
  DeliveryTypeResolver
>('ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER');

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_TYPE_SEED = new InjectionToken<string>(
  'ACOUSTIC_TOKEN_DELIVERY_TYPE_SEED'
);
