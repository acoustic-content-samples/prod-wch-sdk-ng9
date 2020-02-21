import { ActivePageV2 } from '@acoustic-content-sdk/api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_PAGE_RESOLVER = new InjectionToken<
  DeliveryPageResolver
>('ACOUSTIC_TOKEN_DELIVERY_PAGE_RESOLVER');

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_PAGE_SEED = new InjectionToken<string>(
  'ACOUSTIC_TOKEN_DELIVERY_PAGE_SEED'
);

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_ACTIVE_PAGE = new InjectionToken<ActivePageV2>(
  'ACOUSTIC_TOKEN_ACTIVE_PAGE'
);
