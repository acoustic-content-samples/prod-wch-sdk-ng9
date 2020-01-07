import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { AUTH_LAYOUT_FEATURE } from './auth.layout.id';
import { authoringLayoutReducer } from './auth.layout.reducer';
import { AuthoringLayoutState } from './auth.layout.state';

/**
 */
export interface AuthLayoutFeatureState {
  [AUTH_LAYOUT_FEATURE]: AuthoringLayoutState;
}

/**
 */
export const authLayoutFeatureReducer = {
  [AUTH_LAYOUT_FEATURE]: authoringLayoutReducer
};

/**
 * Select the authoring type feature
 */
export const selectAuthLayoutFeature = selectFeature<AuthoringLayoutState>(
  AUTH_LAYOUT_FEATURE
);
