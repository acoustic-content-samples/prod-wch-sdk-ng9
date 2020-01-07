import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { TOGGLE_FEATURE } from './toggle.id';
import { togglesReducer, TogglesState } from './toggle.state';

/**
 */
export interface ToggleFeatureState {
  [TOGGLE_FEATURE]: TogglesState;
}

/**
 */
export const toggleFeatureReducer = {
  [TOGGLE_FEATURE]: togglesReducer
};

/**
 * Select the toggle feature
 */
export const selectToggleFeature = selectFeature<TogglesState>(TOGGLE_FEATURE);
