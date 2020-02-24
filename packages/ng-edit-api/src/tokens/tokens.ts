import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  WchConfig,
  WchInlineEditProviderV2
} from '@acoustic-content-sdk/edit-api';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { WchDefaultPlaceholder } from '../interfaces/placeholder';

/**
 * Injection token for the wch config
 */
export const ACOUSTIC_TOKEN_ACOUSTIC_CONFIG = new InjectionToken<Observable<WchConfig>>(
  'ACOUSTIC_TOKEN_ACOUSTIC_CONFIG'
);

/**
 * Injection token for the inline edit provider
 */
export const ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER = new InjectionToken<
  Observable<WchInlineEditProviderV2>
>('ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER');

/**
 * Injection token for default placeholder text
 */
export const ACOUSTIC_TOKEN_DEFAULT_PLACEHOLDER_TEXT = new InjectionToken<
  WchDefaultPlaceholder
>('ACOUSTIC_TOKEN_DEFAULT_PLACEHOLDER_TEXT');

/**
 * Injection token for placeholder debugging
 */
export const ACOUSTIC_TOKEN_DEBUG_PLACEHOLDERS = new InjectionToken<boolean>(
  'ACOUSTIC_TOKEN_DEBUG_PLACEHOLDERS'
);

/**
 * Injects the window that acts as the edit host for an application. This
 * is typically the parent window or the opener window.
 */
export const ACOUSTIC_TOKEN_EDIT_HOST_WINDOW = new InjectionToken<WindowType>(
  'ACOUSTIC_TOKEN_EDIT_HOST_WINDOW'
);

/**
 * Consumer for inline edit selections
 */
export const ACOUSTIC_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER = new InjectionToken<
  string
>('ACOUSTIC_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER');
