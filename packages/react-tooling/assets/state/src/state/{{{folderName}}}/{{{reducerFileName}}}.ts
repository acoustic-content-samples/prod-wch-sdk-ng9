import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { {{{baseState}}} } from './{{{stateFileName}}}';

export const DEFAULT_STATE: {{{baseState}}} = {};

/**
 * reducers for authoring content
 */
export const {{{baseReducer}}}: Reducer<{{{baseState}}}> = handleActions(
  {
  },
  DEFAULT_STATE
);
