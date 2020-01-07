import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { AUTH_ASSET_FEATURE } from './auth.asset.id';
import { authoringAssetReducer } from './auth.asset.reducer';
import { AuthoringAssetState } from './auth.asset.state';

/**
 */
export interface AuthAssetFeatureState {
  [AUTH_ASSET_FEATURE]: AuthoringAssetState;
}

/**
 */
export const authAssetFeatureReducer = {
  [AUTH_ASSET_FEATURE]: authoringAssetReducer
};

/**
 * Select the auth.asseting feature
 */
export const selectAuthAssetFeature = selectFeature<AuthoringAssetState>(
  AUTH_ASSET_FEATURE
);
