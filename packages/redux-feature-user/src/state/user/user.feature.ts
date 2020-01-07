import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { CURRENT_USER_FEATURE } from './user.id';
import { userReducer } from './user.reducer';
import { UserState } from './user.state';

/**
 */
export interface CurrentUserFeatureState {
  [CURRENT_USER_FEATURE]: UserState;
}

/**
 */
export const currentUserFeatureReducer = {
  [CURRENT_USER_FEATURE]: userReducer
};

/**
 * Select the user feature
 */
export const selectCurrentUserFeature = selectFeature<UserState>(
  CURRENT_USER_FEATURE
);
