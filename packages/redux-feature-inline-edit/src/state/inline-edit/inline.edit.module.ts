import { createReduxFeatureModule } from "@acoustic-content-sdk/redux-store";

import { inlineEditEpic } from "./inline.edit.epics";
import { InlineEditFeatureState } from "./inline.edit.feature";
import { INLINE_EDIT_FEATURE } from "./inline.edit.id";
import { inlineEditReducer } from "./inline.edit.reducer";
import { InlineEditState } from "./inline.edit.state";

/**
 * Exposes the feature module selector
 */
export const inlineEditFeature = createReduxFeatureModule<
  InlineEditState,
  InlineEditFeatureState
>(INLINE_EDIT_FEATURE, inlineEditReducer, inlineEditEpic);
