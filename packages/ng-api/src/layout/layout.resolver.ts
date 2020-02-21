import { LayoutResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_LAYOUT_RESOLVER = new InjectionToken<LayoutResolver>(
  'ACOUSTIC_TOKEN_LAYOUT_RESOLVER'
);
