import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { siteEpic } from './site.epic';
import { SiteFeatureState } from './site.feature';
import { SITE_FEATURE } from './site.id';
import { siteReducer } from './site.reducer';
import { SiteState } from './site.state';

/**
 * Exposes the feature module selector
 */
export const siteFeature = createReduxFeatureModule<
  SiteState,
  SiteFeatureState
>(SITE_FEATURE, siteReducer, siteEpic, [loadingFeature, loggedInFeature]);
