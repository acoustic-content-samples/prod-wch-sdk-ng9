import { Logger } from '@acoustic-content-sdk/api';
import { ACTION_INIT, InitAction } from '@acoustic-content-sdk/redux-actions';
import { ofInitFeature } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { of, timer } from 'rxjs';
import { catchError, map, mapTo, switchMapTo } from 'rxjs/operators';

import { rxIsLoggedIn } from './../../utils/login.utils';
import {
  ACTION_CHECKED_LOGGED_IN,
  ACTION_LOGGED_OUT,
  CheckLoggedInAction,
  checkLoggedInAction,
  loggedInAction,
  LoggedOutAction,
  loggedOutAction
} from './login.actions';
import { LOGIN_FEATURE } from './login.id';

export interface LoginDependencies {
  fetchText: FetchText;
  logger: Logger;
}

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
  retryLoggedInCheckEpic
);
