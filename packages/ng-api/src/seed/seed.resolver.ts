import { SeedResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_SEED_RESOLVER = new InjectionToken<SeedResolver>(
  'ACOUSTIC_TOKEN_SEED_RESOLVER'
);
