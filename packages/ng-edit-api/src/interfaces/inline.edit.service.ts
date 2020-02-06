import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { InjectionToken } from '@angular/core';

/**
 * Token used to inject the `WchInlineEditServiceV2` service.
 */
export const WCH_TOKEN_INLINE_EDIT_SERVICE = new InjectionToken<
  WchInlineEditServiceV2
>('WCH_TOKEN_INLINE_EDIT_SERVICE');
