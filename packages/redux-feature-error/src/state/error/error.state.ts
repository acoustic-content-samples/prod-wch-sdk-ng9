import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { constGenerator } from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { prependWithLimit } from './../../utils/state.utils';
import {
  ACTION_CLEAR_ERROR,
  ACTION_CLEAR_ERRORS,
  ACTION_SET_ERROR,
  ClearErrorAction,
  ClearErrorsAction,
  SetErrorAction
} from './error.actions';

/**
 * Description of an error
 */
export interface ErrorInstance<T = any> {
  /**
   * Timestamp the error occurred
   */
  date: number;
  /**
   * The actual error instance
   */
  error: T;
}

// defines the error state
export interface ErrorState {
  error?: ErrorInstance;
  errors: ErrorInstance[];
}

// default
const DEFAULT_ERROR_STATE: ErrorState = {
  errors: []
};

// maximum number of errors in the state
const MAX_ERROR_COUNT = 10;

/**
 * Adds a new error to the existing list
 *
 * @param state - the current state
 * @param action - the action
 *
 * @returns the new state
 */
const setErrorReducer: Reducer<ErrorState, SetErrorAction<any>> = (
  state,
  action
) => {
  // current errors
  const { errors } = state;
  // new error
  const error = selectPayload(action);
  // copy
  return {
    error,
    errors: prependWithLimit(error, errors, MAX_ERROR_COUNT)
  };
};

/**
 * Clears the current error
 *
 * @param state - the current state
 * @param action - the action
 *
 * @returns the new state
 */
const clearErrorReducer: Reducer<ErrorState, ClearErrorAction> = state => ({
  ...state,
  error: undefined
});

/**
 * Clears the current error
 *
 * @param state - the current state
 * @param action - the action
 *
 * @returns the new state
 */
const clearErrorsReducer: Reducer<
  ErrorState,
  ClearErrorsAction
> = constGenerator(DEFAULT_ERROR_STATE);

/**
 * reducers for config settings
 */
export const errorReducer: Reducer<ErrorState> = handleActions(
  {
    [ACTION_SET_ERROR]: setErrorReducer,
    [ACTION_CLEAR_ERROR]: clearErrorReducer,
    [ACTION_CLEAR_ERRORS]: clearErrorsReducer
  },
  DEFAULT_ERROR_STATE
);
