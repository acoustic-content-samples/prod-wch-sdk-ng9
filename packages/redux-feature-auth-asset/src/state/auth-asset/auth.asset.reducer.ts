import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { updateItemsWithRevision } from '@acoustic-content-sdk/redux-utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_ADD_AUTH_ASSET,
  ACTION_SET_AUTH_ASSET,
  AddAuthoringAssetAction,
  SetAuthoringAssetAction
} from './auth.asset.actions';
import { AuthoringAssetState } from './auth.asset.state';

const DEFAULT_STATE: AuthoringAssetState = {};

const setAsset = (
  state: AuthoringAssetState,
  action: AddAuthoringAssetAction | SetAuthoringAssetAction
): AuthoringAssetState => updateItemsWithRevision(state, selectPayload(action));

/**
 * reducers for templates
 */
export const authoringAssetReducer: Reducer<
  AuthoringAssetState,
  AddAuthoringAssetAction | SetAuthoringAssetAction
> = handleActions(
  {
    [ACTION_ADD_AUTH_ASSET]: setAsset,
    [ACTION_SET_AUTH_ASSET]: setAsset
  },
  DEFAULT_STATE
);
