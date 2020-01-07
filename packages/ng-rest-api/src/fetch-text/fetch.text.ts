import { FetchText } from '@acoustic-content-sdk/rest-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the remote text access
 */
export const WCH_TOKEN_FETCH_TEXT = new InjectionToken<FetchText>(
  'WCH_TOKEN_FETCH_TEXT'
);
