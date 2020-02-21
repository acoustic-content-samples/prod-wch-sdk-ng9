import { FetchText } from '@acoustic-content-sdk/rest-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the remote text access
 */
export const ACOUSTIC_TOKEN_FETCH_TEXT = new InjectionToken<FetchText>(
  'ACOUSTIC_TOKEN_FETCH_TEXT'
);
