import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { bootstrapEpic } from './bootstrap.epics';
import { BOOTSTRAP_FEATURE } from './bootstrap.id';

/**
 * Exposes the feature module selector
 */
export const bootstrapFeature = createReduxFeatureModule(
  BOOTSTRAP_FEATURE,
  undefined,
  bootstrapEpic,
  [loadingFeature, loggedInFeature]
);
