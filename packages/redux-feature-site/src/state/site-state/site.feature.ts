import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { SITE_FEATURE } from './site.id';
import { siteReducer, DEFAULT_STATE } from './site.reducer';
import { SiteState } from './site.state';

/**
 */
export interface SiteFeatureState {
  [SITE_FEATURE]: SiteState;
}

/**
 */
export const siteFeatureReducer = {
  [SITE_FEATURE]: siteReducer
};

/**
 * Select the feature
 */
export const selectSiteFeature = selectFeature<SiteState>(
  SITE_FEATURE,
  DEFAULT_STATE
);
