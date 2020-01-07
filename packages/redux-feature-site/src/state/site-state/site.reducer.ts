import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_CLEAR_DEFAULT_SITE,
  ACTION_SET_DEFAULT_SITE,
  ActionSetDefaultSite
} from './site.actions';
import { SiteState } from './site.state';

export const DEFAULT_STATE: SiteState = {};

const setDefaultState = (
  state: SiteState,
  action: ActionSetDefaultSite
): SiteState => ({ ...state, defaultId: selectPayload(action) });

const clearDefaultState = (state: SiteState): SiteState => {
  // remove
  const { defaultId, ...result } = state;
  return result;
};

/**
 * reducers for authoring content
 */
export const siteReducer: Reducer<SiteState> = handleActions(
  {
    [ACTION_SET_DEFAULT_SITE]: setDefaultState,
    [ACTION_CLEAR_DEFAULT_SITE]: clearDefaultState
  },
  DEFAULT_STATE
);
