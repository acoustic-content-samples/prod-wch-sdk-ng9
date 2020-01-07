import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { urlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { authoringTypeEpic } from './auth.type.epics';
import { AuthTypeFeatureState } from './auth.type.feature';
import { AUTH_TYPE_FEATURE } from './auth.type.id';
import { authoringTypeReducer } from './auth.type.reducer';
import { AuthoringTypeState } from './auth.type.state';

/**
 * Exposes the feature module selector
 */
export const authoringTypeFeature = createReduxFeatureModule<
  AuthoringTypeState,
  AuthTypeFeatureState
>(AUTH_TYPE_FEATURE, authoringTypeReducer, authoringTypeEpic, [
  loadingFeature,
  loggedInFeature,
  urlConfigFeature
]);
