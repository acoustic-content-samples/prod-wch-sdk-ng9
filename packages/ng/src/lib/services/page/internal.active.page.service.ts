import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { createSingleSubject } from '@acoustic-content-sdk/utils';
import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_INTERNAL_ACTIVE_PAGE = new InjectionToken<
  Subject<RenderingContextV2>
>('ACOUSTIC_TOKEN_INTERNAL_ACTIVE_PAGE');

/**
 * Subject that carries the currently selected page
 *
 * @returns the selected page
 */
export function createInternalActivePage(): Subject<RenderingContextV2> {
  return createSingleSubject();
}
