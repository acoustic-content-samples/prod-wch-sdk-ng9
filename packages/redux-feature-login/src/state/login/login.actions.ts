import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_LOGGED_IN = 'ACTION_LOGGED_IN';
export type LoggedInAction = Action;

export const loggedInAction: Generator<LoggedInAction> = createAction(
  ACTION_LOGGED_IN
);

export const ACTION_LOGGED_OUT = 'ACTION_LOGGED_OUT';
export type LoggedOutAction = Action;

export const loggedOutAction: Generator<LoggedOutAction> = createAction(
  ACTION_LOGGED_OUT
);

export const ACTION_CHECKED_LOGGED_IN = 'ACTION_CHECKED_LOGGED_IN';
export type CheckLoggedInAction = Action;

export const checkLoggedInAction: Generator<CheckLoggedInAction> = createAction(
  ACTION_CHECKED_LOGGED_IN
);
