import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  WchConfig,
  WchInlineEditProviderV2
} from '@acoustic-content-sdk/edit-api';
import { createReactContext } from '@acoustic-content-sdk/react-api';
import { Observable } from 'rxjs';

import { WchDefaultPlaceholder } from '../interfaces/placeholder';

/**
 * Injection token for the wch config
 */
export const WCH_CONTEXT_WCH_CONFIG = createReactContext<Observable<WchConfig>>(
  'WCH_CONTEXT_WCH_CONFIG'
);

/**
 * Injection token for the inline edit provider
 */
export const WCH_CONTEXT_INLINE_EDIT_PROVIDER = createReactContext<
  Observable<WchInlineEditProviderV2>
>('WCH_CONTEXT_INLINE_EDIT_PROVIDER');

/**
 * Injection token for default placeholder text
 */
export const WCH_CONTEXT_DEFAULT_PLACEHOLDER_TEXT = createReactContext<
  WchDefaultPlaceholder
>('WCH_CONTEXT_DEFAULT_PLACEHOLDER_TEXT');

/**
 * Injection token for placeholder debugging
 */
export const WCH_CONTEXT_DEBUG_PLACEHOLDERS = createReactContext<boolean>(
  'WCH_CONTEXT_DEBUG_PLACEHOLDERS'
);

/**
 * Injects the window that acts as the edit host for an application. This
 * is typically the parent window or the opener window.
 */
export const WCH_CONTEXT_EDIT_HOST_WINDOW = createReactContext<WindowType>(
  'WCH_CONTEXT_EDIT_HOST_WINDOW'
);
