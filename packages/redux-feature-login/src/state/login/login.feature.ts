import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { LOGIN_FEATURE } from './login.id';
import { loggedInReducer } from './login.reducer';
import { LoggedInState } from './login.state';

/**
 */
export interface LoggedInFeatureState {
  [LOGIN_FEATURE]: LoggedInState;
}

/**
 */
export const loggedInFeatureReducer = {
  [LOGIN_FEATURE]: loggedInReducer
};

/**
 * Select the login feature
 */
export const selectLoggedInFeature = selectFeature<LoggedInState>(
  LOGIN_FEATURE
);
