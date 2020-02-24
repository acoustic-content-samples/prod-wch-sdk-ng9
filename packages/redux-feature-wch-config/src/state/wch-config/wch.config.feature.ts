import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { ACOUSTIC_CONFIG_FEATURE } from './wch.config.id';
import { wchConfigReducer, WchConfigState } from './wch.config.state';

/**
 */
export interface WchConfigFeatureState {
  [ACOUSTIC_CONFIG_FEATURE]: WchConfigState;
}

/**
 */
export const wchConfigFeatureReducer = {
  [ACOUSTIC_CONFIG_FEATURE]: wchConfigReducer
};

/**
 * Select the WCH config feature
 */
export const selectWchConfigFeature = selectFeature<WchConfigState>(
  ACOUSTIC_CONFIG_FEATURE
);
