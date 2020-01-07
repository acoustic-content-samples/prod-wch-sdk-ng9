import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { AUTH_LAYOUT_MAPPING_FEATURE } from './auth.layout.mapping.id';
import { authoringLayoutMappingReducer } from './auth.layout.mapping.reducer';
import { AuthoringLayoutMappingState } from './auth.layout.mapping.state';

/**
 */
export interface AuthLayoutMappingFeatureState {
  [AUTH_LAYOUT_MAPPING_FEATURE]: AuthoringLayoutMappingState;
}

/**
 */
export const authLayoutMappingFeatureReducer = {
  [AUTH_LAYOUT_MAPPING_FEATURE]: authoringLayoutMappingReducer
};

/**
 * Select the authoring type feature
 */
export const selectAuthLayoutMappingFeature = selectFeature<
  AuthoringLayoutMappingState
>(AUTH_LAYOUT_MAPPING_FEATURE);
