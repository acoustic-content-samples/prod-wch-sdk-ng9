import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { AUTH_TYPE_FEATURE } from './auth.type.id';
import { authoringTypeReducer } from './auth.type.reducer';
import { AuthoringTypeState } from './auth.type.state';

/**
 */
export interface AuthTypeFeatureState {
  [AUTH_TYPE_FEATURE]: AuthoringTypeState;
}

/**
 */
export const authTypeFeatureReducer = {
  [AUTH_TYPE_FEATURE]: authoringTypeReducer
};

/**
 * Select the authoring type feature
 */
export const selectAuthTypeFeature = selectFeature<AuthoringTypeState>(
  AUTH_TYPE_FEATURE
);
