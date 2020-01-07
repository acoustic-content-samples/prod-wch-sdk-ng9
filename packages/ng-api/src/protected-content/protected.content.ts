import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the protected content status
 */
export const WCH_TOKEN_PROTECTED_CONTENT = new InjectionToken<ProtectedContent>(
  'WCH_TOKEN_PROTECTED_CONTENT'
);
