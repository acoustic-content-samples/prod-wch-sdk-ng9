import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { createReactContext } from '@acoustic-content-sdk/react-api';

/* Copyright IBM Corp. 2017 */
export const EVENT_EDIT_START = 'wchEditStart';
export const EVENT_EDIT_END = 'wchEditEnd';

export const EVENT_INLINE_EDIT_START = 'wchInlineEditStart';
export const EVENT_INLINE_EDIT_END = 'wchInlineEditEnd';

/*
 * Token used for dependency injection of the logger.
 */
export const ACOUSTIC_CONTEXT_INLINE_EDIT_SERVICE = createReactContext<
  WchInlineEditServiceV2
>('ACOUSTIC_CONTEXT_INLINE_EDIT_SERVICE');
