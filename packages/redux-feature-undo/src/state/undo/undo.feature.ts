import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { UNDO_FEATURE } from './undo.id';
import { UndoState } from './undo.state';

/**
 */
export interface UndoFeatureState {
  [UNDO_FEATURE]: UndoState;
}

/**
 * Select the URL config feature
 */
export const selectUndoFeature = selectFeature<UndoState>(UNDO_FEATURE);
