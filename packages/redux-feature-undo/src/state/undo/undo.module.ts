import { authoringAssetFeature } from '@acoustic-content-sdk/redux-feature-auth-asset';
import { authoringContentFeature } from '@acoustic-content-sdk/redux-feature-auth-content';
import { inlineEditFeature } from '@acoustic-content-sdk/redux-feature-inline-edit';
import { currentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { undoEpic } from './undo.epics';
import { UndoFeatureState } from './undo.feature';
import { UNDO_FEATURE } from './undo.id';
import { undoReducer } from './undo.reducer';
import { UndoState } from './undo.state';

/**
 * Exposes the feature module selector
 */
export const undoFeature = createReduxFeatureModule<
  UndoState,
  UndoFeatureState
>(UNDO_FEATURE, undoReducer, undoEpic, [
  authoringAssetFeature,
  authoringContentFeature,
  inlineEditFeature,
  currentUserFeature
]);
