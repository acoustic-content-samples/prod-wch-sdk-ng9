import { DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the navigation service
 */
export const ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER = new InjectionToken<
  DeliverySiteResolver
>('ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER');
