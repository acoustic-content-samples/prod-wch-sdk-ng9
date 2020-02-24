import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the navigation service
 */
export const ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER = new InjectionToken<
  DeliverySearchResolver
>('ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER');
