import { authoringLayoutFeature } from '@acoustic-content-sdk/redux-feature-auth-layout';
import { authoringTypeFeature } from '@acoustic-content-sdk/redux-feature-auth-type';
import { authoringAssetFeature } from '@acoustic-content-sdk/redux-feature-auth-asset';
import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { currentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { authoringContentEpic } from './auth.content.epics';
import { AuthContentFeatureState } from './auth.content.feature';
import { AUTH_CONTENT_FEATURE } from './auth.content.id';
import { authoringContentReducer } from './auth.content.reducer';
import { AuthoringContentState } from './auth.content.state';

/**
 * Exposes the feature module selector
 */
export const authoringContentFeature = createReduxFeatureModule<
  AuthoringContentState,
  AuthContentFeatureState
>(AUTH_CONTENT_FEATURE, authoringContentReducer, authoringContentEpic, [
  currentUserFeature,
  authoringTypeFeature,
  authoringLayoutFeature,
  authoringAssetFeature,
  loadingFeature,
  loggedInFeature
]);
