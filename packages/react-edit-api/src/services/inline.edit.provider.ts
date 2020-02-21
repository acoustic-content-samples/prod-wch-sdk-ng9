import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { createReactContext } from '@acoustic-content-sdk/react-api';

/**
 * Provides information about the inline edit selection
 */
export const ACOUSTIC_CONTEXT_INLINE_EDIT_SELECTION_PROVIDER = createReactContext<
  InlineEditSelectionProvider
>('ACOUSTIC_CONTEXT_INLINE_EDIT_SELECTION_PROVIDER');
