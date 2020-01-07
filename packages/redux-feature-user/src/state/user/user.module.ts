import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { userEpic } from './user.epics';
import { CurrentUserFeatureState } from './user.feature';
import { CURRENT_USER_FEATURE } from './user.id';
import { userReducer } from './user.reducer';
import { UserState } from './user.state';

/**
 * Exposes the feature module selector
 */
export const currentUserFeature = createReduxFeatureModule<
  UserState,
  CurrentUserFeatureState
>(CURRENT_USER_FEATURE, userReducer, userEpic);
