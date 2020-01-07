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
export const WCH_TOKEN_WCH_CONFIG = new InjectionToken<Observable<WchConfig>>(
  'WCH_TOKEN_WCH_CONFIG'
);

/**
 * Injection token for the inline edit provider
 */
export const WCH_TOKEN_INLINE_EDIT_PROVIDER = new InjectionToken<
  Observable<WchInlineEditProviderV2>
>('WCH_TOKEN_INLINE_EDIT_PROVIDER');

/**
 * Injection token for default placeholder text
 */
export const WCH_TOKEN_DEFAULT_PLACEHOLDER_TEXT = new InjectionToken<
  WchDefaultPlaceholder
>('WCH_TOKEN_DEFAULT_PLACEHOLDER_TEXT');

/**
 * Injection token for placeholder debugging
 */
export const WCH_TOKEN_DEBUG_PLACEHOLDERS = new InjectionToken<boolean>(
  'WCH_TOKEN_DEBUG_PLACEHOLDERS'
);

/**
 * Injects the window that acts as the edit host for an application. This
 * is typically the parent window or the opener window.
 */
export const WCH_TOKEN_EDIT_HOST_WINDOW = new InjectionToken<WindowType>(
  'WCH_TOKEN_EDIT_HOST_WINDOW'
);

/**
 * Consumer for inline edit selections
 */
export const WCH_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER = new InjectionToken<
  string
>('WCH_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER');
