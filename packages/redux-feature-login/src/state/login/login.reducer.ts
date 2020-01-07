import { constGenerator } from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { ACTION_LOGGED_IN, ACTION_LOGGED_OUT } from './login.actions';
import { LoggedInState } from './login.state';

const DEFAULT_STATE: LoggedInState = false;

const LOGGED_IN = constGenerator(true);
const LOGGED_OUT = constGenerator(false);

/**
 * Reducer for modal dialog state
 */
export const loggedInReducer: Reducer<LoggedInState> = handleActions(
  {
    [ACTION_LOGGED_IN]: LOGGED_IN,
    [ACTION_LOGGED_OUT]: LOGGED_OUT
  },
  DEFAULT_STATE
);
