import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { InjectionToken } from '@angular/core';

/**
 * Token used to inject the `WchInlineEditServiceV2` service.
 */
export const ACOUSTIC_TOKEN_INLINE_EDIT_SERVICE = new InjectionToken<
  WchInlineEditServiceV2
>('ACOUSTIC_TOKEN_INLINE_EDIT_SERVICE');
