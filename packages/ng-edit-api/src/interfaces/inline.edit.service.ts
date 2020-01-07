import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { InjectionToken } from '@angular/core';

/*
 * Token used for dependency injection of the logger.
 */
export const WCH_TOKEN_INLINE_EDIT_SERVICE = new InjectionToken<
  WchInlineEditServiceV2
>('WCH_TOKEN_INLINE_EDIT_SERVICE');
