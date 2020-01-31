import { urlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { loggedInEpic } from './login.epic';
import { LoggedInFeatureState } from './login.feature';
import { LOGIN_FEATURE } from './login.id';
import { loggedInReducer } from './login.reducer';
import { LoggedInState } from './login.state';

/**
 * Exposes the feature module selector
 */
export const loggedInFeature = createReduxFeatureModule<
  LoggedInState,
  LoggedInFeatureState
>(LOGIN_FEATURE, loggedInReducer, loggedInEpic, [urlConfigFeature]);
