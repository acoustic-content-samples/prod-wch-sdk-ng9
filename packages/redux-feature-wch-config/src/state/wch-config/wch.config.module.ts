import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { urlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { wchConfigEpic } from './wch.config.epics';
import { WchConfigFeatureState } from './wch.config.feature';
import { WCH_CONFIG_FEATURE } from './wch.config.id';
import { wchConfigReducer, WchConfigState } from './wch.config.state';

/**
 * Exposes the feature module selector
 */
export const wchConfigFeature = createReduxFeatureModule<
  WchConfigState,
  WchConfigFeatureState
>(WCH_CONFIG_FEATURE, wchConfigReducer, wchConfigEpic, [
  loadingFeature,
  loggedInFeature,
  urlConfigFeature
]);
