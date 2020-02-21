import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the protected content status
 */
export const ACOUSTIC_TOKEN_PROTECTED_CONTENT = new InjectionToken<ProtectedContent>(
  'ACOUSTIC_TOKEN_PROTECTED_CONTENT'
);
