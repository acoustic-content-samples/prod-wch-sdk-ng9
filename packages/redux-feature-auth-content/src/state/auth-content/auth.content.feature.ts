import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { AUTH_CONTENT_FEATURE } from './auth.content.id';
import { authoringContentReducer } from './auth.content.reducer';
import { AuthoringContentState } from './auth.content.state';

/**
 */
export interface AuthContentFeatureState {
  [AUTH_CONTENT_FEATURE]: AuthoringContentState;
}

/**
 */
export const authContentFeatureReducer = {
  [AUTH_CONTENT_FEATURE]: authoringContentReducer
};

/**
 * Select the auth.contenting feature
 */
export const selectAuthContentFeature = selectFeature<AuthoringContentState>(
  AUTH_CONTENT_FEATURE
);
