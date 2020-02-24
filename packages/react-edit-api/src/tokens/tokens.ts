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
export const ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG = createReactContext<Observable<WchConfig>>(
  'ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG'
);

/**
 * Injection token for the inline edit provider
 */
export const ACOUSTIC_CONTEXT_INLINE_EDIT_PROVIDER = createReactContext<
  Observable<WchInlineEditProviderV2>
>('ACOUSTIC_CONTEXT_INLINE_EDIT_PROVIDER');

/**
 * Injection token for default placeholder text
 */
export const ACOUSTIC_CONTEXT_DEFAULT_PLACEHOLDER_TEXT = createReactContext<
  WchDefaultPlaceholder
>('ACOUSTIC_CONTEXT_DEFAULT_PLACEHOLDER_TEXT');

/**
 * Injection token for placeholder debugging
 */
export const ACOUSTIC_CONTEXT_DEBUG_PLACEHOLDERS = createReactContext<boolean>(
  'ACOUSTIC_CONTEXT_DEBUG_PLACEHOLDERS'
);

/**
 * Injects the window that acts as the edit host for an application. This
 * is typically the parent window or the opener window.
 */
export const ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW = createReactContext<WindowType>(
  'ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW'
);
