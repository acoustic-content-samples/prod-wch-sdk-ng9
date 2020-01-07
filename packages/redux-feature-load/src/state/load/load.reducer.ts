import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_LOADING_END,
  ACTION_LOADING_START,
  LoadingEndAction,
  LoadingStartAction
} from './load.actions';
import { LoadingState } from './load.state';

const DEFAULT_STATE: LoadingState = new Map();

const reduceLoadingStart = (
  state: LoadingState,
  action: LoadingStartAction
): LoadingState => {
  // select the payload
  const id = selectPayload(action);
  // sanity check
  if (state.has(id)) {
    // console.warn('reduceLoadingStart', 'already loading', id);
  }
  // make a copy
  const copy = new Map(state);
  copy.set(id, Date.now());
  // ok
  return copy;
};

const reduceLoadingEnd = (
  state: LoadingState,
  action: LoadingEndAction
): LoadingState => {
  // select the payload
  const id = selectPayload(action);
  // sanity check
  if (!state.has(id)) {
    // console.warn('reduceLoadingEnd', 'not loading', id);
  }
  // make a copy
  const copy = new Map(state);
  copy.delete(id);
  // ok
  return copy;
};

/**
 * reducers for undo and redo
 */
export const loadingReducer: Reducer<LoadingState> = handleActions(
  {
    [ACTION_LOADING_START]: reduceLoadingStart,
    [ACTION_LOADING_END]: reduceLoadingEnd
  },
  DEFAULT_STATE
);
