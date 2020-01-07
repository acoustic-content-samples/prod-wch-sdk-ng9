import { AuthStatus } from '@acoustic-content-sdk/api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_AUTH_STATUS = new InjectionToken<AuthStatus>(
  'WCH_TOKEN_AUTH_STATUS'
);
