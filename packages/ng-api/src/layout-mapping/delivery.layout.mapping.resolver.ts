import { DeliveryLayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER = new InjectionToken<
  DeliveryLayoutMappingResolver
>('ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER');

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_SEED = new InjectionToken<
  string
>('ACOUSTIC_TOKEN_DELIVERY_LAYOUT_MAPPING_SEED');
