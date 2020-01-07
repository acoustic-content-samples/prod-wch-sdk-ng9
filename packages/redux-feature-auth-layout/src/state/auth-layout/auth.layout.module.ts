import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { authoringLayoutEpic } from './auth.layout.epics';
import { AuthLayoutFeatureState } from './auth.layout.feature';
import { AUTH_LAYOUT_FEATURE } from './auth.layout.id';
import { authoringLayoutReducer } from './auth.layout.reducer';
import { AuthoringLayoutState } from './auth.layout.state';

/**
 * Exposes the feature module selector
 */
export const authoringLayoutFeature = createReduxFeatureModule<
  AuthoringLayoutState,
  AuthLayoutFeatureState
>(AUTH_LAYOUT_FEATURE, authoringLayoutReducer, authoringLayoutEpic, [
  loadingFeature,
  loggedInFeature
]);
