import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { uploadingFeature } from '@acoustic-content-sdk/redux-feature-upload';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { authoringAssetEpic } from './auth.asset.epics';
import { AuthAssetFeatureState } from './auth.asset.feature';
import { AUTH_ASSET_FEATURE } from './auth.asset.id';
import { authoringAssetReducer } from './auth.asset.reducer';
import { AuthoringAssetState } from './auth.asset.state';

export const authoringAssetFeature = createReduxFeatureModule<
  AuthoringAssetState,
  AuthAssetFeatureState
>(AUTH_ASSET_FEATURE, authoringAssetReducer, authoringAssetEpic, [
  loadingFeature,
  loggedInFeature,
  uploadingFeature
]);
