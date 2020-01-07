import { DeliveryLayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER = new InjectionToken<
  DeliveryLayoutMappingResolver
>('WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_SEED = new InjectionToken<
  string
>('WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_SEED');
