import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { WCH_CONFIG_FEATURE } from './wch.config.id';
import { wchConfigReducer, WchConfigState } from './wch.config.state';

/**
 */
export interface WchConfigFeatureState {
  [WCH_CONFIG_FEATURE]: WchConfigState;
}

/**
 */
export const wchConfigFeatureReducer = {
  [WCH_CONFIG_FEATURE]: wchConfigReducer
};

/**
 * Select the WCH config feature
 */
export const selectWchConfigFeature = selectFeature<WchConfigState>(
  WCH_CONFIG_FEATURE
);
