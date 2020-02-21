import { WchConfig } from '@acoustic-content-sdk/edit-api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { isNotNil, parseURL } from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_CLEAR_ACOUSTIC_CONFIG,
  ACTION_SET_ACOUSTIC_CONFIG,
  ClearWchConfigAction,
  SetWchConfigAction
} from './wch.config.actions';

// default
const DEFAULT_CONFIG: WchConfig = {
  apiUrl: null,
  previewApiUrl: null,
  authoringUIBaseUrl: null,
  deliveryUrl: null,
  previewDeliveryUrl: null
};

// defines the config state
export type WchConfigState = WchConfig;

/**
 * Make sure to parse the wch config such that it contains correct URLs
 *
 * @param aConfig - the original config
 * @returns the config object
 */
function normalizeWchConfig(aConfig: WchConfig): WchConfig {
  return isNotNil(aConfig)
    ? {
        ...aConfig,
        apiUrl: parseURL(aConfig.apiUrl),
        previewApiUrl: parseURL(aConfig.previewApiUrl),
        authoringUIBaseUrl: parseURL(aConfig.authoringUIBaseUrl),
        deliveryUrl: parseURL(aConfig.deliveryUrl),
        previewDeliveryUrl: parseURL(aConfig.previewDeliveryUrl)
      }
    : aConfig;
}

/**
 * reducers for config settings
 */
export const wchConfigReducer: Reducer<WchConfigState> = handleActions(
  {
    [ACTION_SET_ACOUSTIC_CONFIG]: (
      state: WchConfigState,
      action: SetWchConfigAction
    ) => normalizeWchConfig(selectPayload(action)),
    [ACTION_CLEAR_ACOUSTIC_CONFIG]: (
      state: WchConfigState,
      action: ClearWchConfigAction
    ) => DEFAULT_CONFIG
  },
  DEFAULT_CONFIG
);
