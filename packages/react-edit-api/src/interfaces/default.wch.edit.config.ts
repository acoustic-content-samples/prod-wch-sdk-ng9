import { StaticHubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { createReactContext } from '@acoustic-content-sdk/react-api';

/* Copyright IBM Corp. 2017 */

/**
 * default value for the inline edit URL
 */
export const DEFAULT_INLINE_EDIT_URL =
  '${authoringUIBaseUrl.protocol}//${authoringUIBaseUrl.host}/authoring-sites-ui/inline-edit/inline-edit.js';

export const ACOUSTIC_CONTEXT_INLINE_EDIT_URL = createReactContext<
  StaticHubInfoUrlProvider
>('ACOUSTIC_CONTEXT_INLINE_EDIT_URL');

/**
 * per default do not debug
 */
export const DEFAULT_DEBUG_PLACEHOLDERS = false;
