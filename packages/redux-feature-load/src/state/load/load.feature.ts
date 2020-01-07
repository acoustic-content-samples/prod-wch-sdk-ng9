import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { LOADING_FEATURE } from './load.id';
import { loadingReducer } from './load.reducer';
import { LoadingState } from './load.state';

/**
 */
export interface LoadingFeatureState {
  [LOADING_FEATURE]: LoadingState;
}

/**
 */
export const loadingFeatureReducer = {
  [LOADING_FEATURE]: loadingReducer
};

/**
 * Select the loading feature
 */
export const selectLoadingFeature = selectFeature<LoadingState>(
  LOADING_FEATURE
);
