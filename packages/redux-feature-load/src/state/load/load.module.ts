import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { LoadingFeatureState } from './load.feature';
import { LOADING_FEATURE } from './load.id';
import { loadingReducer } from './load.reducer';
import { LoadingState } from './load.state';

/**
 * Exposes the feature module selector
 */
export const loadingFeature = createReduxFeatureModule<
  LoadingState,
  LoadingFeatureState
>(LOADING_FEATURE, loadingReducer);
