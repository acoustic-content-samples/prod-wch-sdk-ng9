import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { UrlConfigFeatureState } from './url.config.feature';
import { URL_CONFIG_FEATURE } from './url.config.id';
import { urlConfigReducer, UrlConfigState } from './url.config.state';

/**
 * Exposes the feature module selector
 */
export const urlConfigFeature = createReduxFeatureModule<
  UrlConfigState,
  UrlConfigFeatureState
>(URL_CONFIG_FEATURE, urlConfigReducer);
