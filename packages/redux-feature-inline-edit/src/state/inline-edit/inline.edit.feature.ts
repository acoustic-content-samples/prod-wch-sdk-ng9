import { selectFeature } from "@acoustic-content-sdk/redux-store";

import { INLINE_EDIT_FEATURE } from "./inline.edit.id";
import { inlineEditReducer } from "./inline.edit.reducer";
import { InlineEditState } from "./inline.edit.state";

/**
 */
export interface InlineEditFeatureState {
  [INLINE_EDIT_FEATURE]: InlineEditState;
}

/**
 */
export const inlineEditingFeatureReducer = {
  [INLINE_EDIT_FEATURE]: inlineEditReducer
};

/**
 * Select the inline.editing feature
 */
export const selectInlineEditFeature = selectFeature<InlineEditState>(
  INLINE_EDIT_FEATURE
);
