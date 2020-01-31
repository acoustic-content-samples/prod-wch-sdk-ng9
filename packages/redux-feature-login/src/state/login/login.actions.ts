import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_LOGGED_IN = 'ACTION_LOGGED_IN';
export type LoggedInAction = Action;

/**
 * Action to indicate that a successful login occurred
 */
export const loggedInAction: Generator<LoggedInAction> = createAction(
  ACTION_LOGGED_IN
);

export const ACTION_LOGGED_OUT = 'ACTION_LOGGED_OUT';
export type LoggedOutAction = Action;

/**
 * Action to indicate that a successful logout occurred
 */
export const loggedOutAction: Generator<LoggedOutAction> = createAction(
  ACTION_LOGGED_OUT
);

export const ACTION_CHECKED_LOGGED_IN = 'ACTION_CHECKED_LOGGED_IN';
export type CheckLoggedInAction = Action;

/**
 * Action to check if the system is logged in or not
 */
export const checkLoggedInAction: Generator<CheckLoggedInAction> = createAction(
  ACTION_CHECKED_LOGGED_IN
);

export const ACTION_PASSWORD_LOGIN = 'ACTION_PASSWORD_LOGIN';
/**
 * Credentials used to login
 */
export interface LoginCredentials {
  /**
   * The WCH username, typically an email or the string 'apikey'
   */
  username: string;
  /**
   * The WCH password
   */
  password: string;
}
export type PasswordLoginAction = PayloadAction<LoginCredentials>;

/**
 * Action to execute a login
 */
export const passwordLoginAction: UnaryFunction<
  LoginCredentials,
  PasswordLoginAction
> = createAction(ACTION_PASSWORD_LOGIN);

export const ACTION_FEDERATED_LOGIN = 'ACTION_FEDERATED_LOGIN';
export type FederatedLoginAction = Action;

/**
 * Action to execute a login
 */
export const federatedLoginAction: Generator<FederatedLoginAction> = createAction(
  ACTION_FEDERATED_LOGIN
);
