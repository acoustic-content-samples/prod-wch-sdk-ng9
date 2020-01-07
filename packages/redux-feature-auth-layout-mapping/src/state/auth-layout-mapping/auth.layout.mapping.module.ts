import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { authoringLayoutMappingEpic } from './auth.layout.mapping.epics';
import { AuthLayoutMappingFeatureState } from './auth.layout.mapping.feature';
import { AUTH_LAYOUT_MAPPING_FEATURE } from './auth.layout.mapping.id';
import { authoringLayoutMappingReducer } from './auth.layout.mapping.reducer';
import { AuthoringLayoutMappingState } from './auth.layout.mapping.state';

/**
 * Exposes the feature module selector
 */
export const authoringLayoutMappingFeature = createReduxFeatureModule<
  AuthoringLayoutMappingState,
  AuthLayoutMappingFeatureState
>(
  AUTH_LAYOUT_MAPPING_FEATURE,
  authoringLayoutMappingReducer,
  authoringLayoutMappingEpic,
  [loadingFeature, loggedInFeature]
);
