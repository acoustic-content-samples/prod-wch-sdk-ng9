import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { EDIT_MODE_FEATURE } from './edit.mode.id';
import {
  DEFAULT_EDIT_MODE,
  editModeReducer,
  EditModeState
} from './edit.mode.state';

/**
 */
export interface EditModeFeatureState {
  [EDIT_MODE_FEATURE]: EditModeState;
}

/**
 */
export const EditModeFeatureReducer = {
  [EDIT_MODE_FEATURE]: editModeReducer
};

/**
 * Select the edit.modeing feature
 */
export const selectEditModeFeature = selectFeature<EditModeState>(
  EDIT_MODE_FEATURE,
  DEFAULT_EDIT_MODE
);
