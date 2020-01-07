import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  identity,
  isNotNil,
  pluckProperty,
  reduceToObject
} from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_CLEAR_TOGGLES,
  ACTION_SET_TOGGLES,
  ClearTogglesAction,
  SetTogglesAction
} from './toggle.actions';

// the set of enabled toggles
export type TogglesState = Record<string, boolean>;

// default
const DEFAULT_TOGGLE_STATE: TogglesState = {};

/**
 * Selects a particular toggle
 */
export const selectToggle = (aKey: string) =>
  pluckProperty<TogglesState, any>(aKey, false);

// reducer for the set toggles command
const reduceSetToggles: Reducer<TogglesState, SetTogglesAction> = (
  state,
  action
) => reduceToObject<string, boolean>(selectPayload(action), identity, isNotNil);

// reducer for the clear toggles command
const reduceClearToggles: Reducer<TogglesState, SetTogglesAction> = (
  state,
  action
) => DEFAULT_TOGGLE_STATE;

export const togglesReducer: Reducer<
  TogglesState,
  SetTogglesAction | ClearTogglesAction
> = handleActions(
  {
    [ACTION_SET_TOGGLES]: reduceSetToggles,
    [ACTION_CLEAR_TOGGLES]: reduceClearToggles
  },
  DEFAULT_TOGGLE_STATE
);
