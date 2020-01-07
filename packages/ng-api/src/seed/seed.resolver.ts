import { SeedResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_SEED_RESOLVER = new InjectionToken<SeedResolver>(
  'WCH_TOKEN_SEED_RESOLVER'
);
