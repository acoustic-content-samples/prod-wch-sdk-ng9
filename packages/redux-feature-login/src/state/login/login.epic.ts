import { LoggerService } from '@acoustic-content-sdk/api';
import { ACTION_INIT, InitAction } from '@acoustic-content-sdk/redux-actions';
import { setErrorAction } from '@acoustic-content-sdk/redux-feature-error';
import {
  selectApiUrl,
  selectUrlConfigFeature
} from '@acoustic-content-sdk/redux-feature-url-config';
import {
  ofInitFeature,
  rxSelect,
  selectPayload
} from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  isNotNil,
  opFilterNotNil,
  rxNext,
  rxPipe,
  spreadArgs
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { MonoTypeOperatorFunction, Observable, of, timer } from 'rxjs';
import {
  catchError,
  map,
  mapTo,
  switchMap,
  switchMapTo,
  withLatestFrom
} from 'rxjs/operators';

import { login, rxIsLoggedIn } from './../../utils/login.utils';
import {
  ACTION_CHECKED_LOGGED_IN,
  ACTION_LOGGED_OUT,
  ACTION_PASSWORD_LOGIN,
  CheckLoggedInAction,
  checkLoggedInAction,
  loggedInAction,
  LoggedOutAction,
  loggedOutAction,
  LoginCredentials,
  PasswordLoginAction
} from './login.actions';
import { LOGIN_FEATURE } from './login.id';

const LOGGER = 'LoginEpic';

export interface LoginDependencies {
  fetchText: FetchText;
  logSvc: LoggerService;
}

const passwordLoginEpic: Epic = (
  actions$,
  state$,
  { logSvc }: LoginDependencies
) => {
  // init the logger
  const logger = logSvc.get(LOGGER);
  // logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

  // attach to the API URL
  const urlConfigFeature$ = rxPipe(state$, rxSelect(selectUrlConfigFeature));
  // select the API URL
  const apiUrl$ = rxPipe(
    urlConfigFeature$,
    rxSelect(selectApiUrl),
    opFilterNotNil
  );
  // the check
  const checkAction = checkLoggedInAction();

  /**
   * Performs a login and then tests if the login was successful
   *
   * @param credentials - credentials used for the login
   * @param apiUrl - the API URL object
   *
   * @returns the result actions
   */
  const executeLogin = (
    { username, password }: LoginCredentials,
    { href }: URL
  ): Observable<Action> =>
    rxPipe(
      login(href, username, password),
      log('loginResult'),
      mapTo(checkAction),
      catchError((error) => of(setErrorAction(error), checkAction))
    );

  return rxPipe(
    actions$,
    ofType<PasswordLoginAction>(ACTION_PASSWORD_LOGIN),
    map(selectPayload),
    withLatestFrom(apiUrl$),
    switchMap(spreadArgs(executeLogin))
  );
};

const checkLoginEpic: Epic = (
  actions$,
  state$,
  { fetchText }: LoginDependencies
) => {
  // test the login state
  const loggedIn$ = isNotNil(fetchText) ? rxIsLoggedIn(fetchText) : of(false);
  // logged in action
  const loggedIn = loggedInAction();
  const loggedOut = loggedOutAction();

  return rxPipe(
    actions$,
    ofType<CheckLoggedInAction>(ACTION_CHECKED_LOGGED_IN),
    switchMapTo(loggedIn$),
    map((bFlag) => (bFlag ? loggedIn : loggedOut)),
    catchError((error) => of(loggedOut))
  );
};

/** Epic that schedules a login check if the user is currently logged out */
const retryLoggedInCheckEpic: Epic = (actions$) => {
  // action to check
  const checkLoggedIn = checkLoggedInAction();
  const checkLoggedIn$ = rxPipe(timer(2000), mapTo(checkLoggedIn));

  return rxPipe(
    actions$,
    ofType<LoggedOutAction>(ACTION_LOGGED_OUT),
    switchMapTo(checkLoggedIn$)
  );
};

/** At startup time check for the login state */
const initEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType<InitAction>(ACTION_INIT),
    mapTo(checkLoggedInAction())
  );

/** At startup time check for the login state */
const initFeatureEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature(LOGIN_FEATURE), mapTo(checkLoggedInAction()));

export const loggedInEpic: Epic = combineEpics(
  initEpic,
  initFeatureEpic,
  checkLoginEpic,
  retryLoggedInCheckEpic,
  passwordLoginEpic
);
