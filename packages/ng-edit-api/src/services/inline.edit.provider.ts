import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { InjectionToken } from '@angular/core';

/**
 * Provides information about the inline edit selection
 */
export const ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER = new InjectionToken<
  InlineEditSelectionProvider
>('ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER');
