import { AuthStatus } from '@acoustic-content-sdk/api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_AUTH_STATUS = new InjectionToken<AuthStatus>(
  'ACOUSTIC_TOKEN_AUTH_STATUS'
);
