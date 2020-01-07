import { LayoutResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_LAYOUT_RESOLVER = new InjectionToken<LayoutResolver>(
  'WCH_TOKEN_LAYOUT_RESOLVER'
);
