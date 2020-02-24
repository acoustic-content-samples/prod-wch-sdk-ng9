import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER = new InjectionToken<
  DeliveryContentResolver
>('ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER');

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_CONTENT_SEED = new InjectionToken<string>(
  'ACOUSTIC_TOKEN_DELIVERY_CONTENT_SEED'
);
