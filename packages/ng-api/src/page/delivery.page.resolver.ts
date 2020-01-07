import { ActivePageV2 } from '@acoustic-content-sdk/api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_PAGE_RESOLVER = new InjectionToken<
  DeliveryPageResolver
>('WCH_TOKEN_DELIVERY_PAGE_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_DELIVERY_PAGE_SEED = new InjectionToken<string>(
  'WCH_TOKEN_DELIVERY_PAGE_SEED'
);

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_ACTIVE_PAGE = new InjectionToken<ActivePageV2>(
  'WCH_TOKEN_ACTIVE_PAGE'
);
