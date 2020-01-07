import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { togglesEpic } from './toggle.actions';
import { ToggleFeatureState } from './toggle.feature';
import { TOGGLE_FEATURE } from './toggle.id';
import { togglesReducer, TogglesState } from './toggle.state';

/**
 * Exposes the feature module selector
 */
export const togglesFeature = createReduxFeatureModule<
  TogglesState,
  ToggleFeatureState
>(TOGGLE_FEATURE, togglesReducer, togglesEpic, [
  loadingFeature,
  loggedInFeature
]);
