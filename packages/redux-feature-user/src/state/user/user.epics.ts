import { Logger, REL_PATH_CURRENT_USER, User } from '@acoustic-content-sdk/api';
import { ACTION_INIT } from '@acoustic-content-sdk/redux-actions';
import {
  createLoader,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import {
  ACTION_LOGGED_IN,
  ACTION_LOGGED_OUT
} from '@acoustic-content-sdk/redux-feature-login';
import { ofInitFeature } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { isNotNil, jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';

import {
  ACTION_LOAD_CURRENT_USER,
  clearCurrentUserAction,
  LoadCurrentUserAction,
  loadCurrentUserAction,
  setCurrentUserAction
} from './user.actions';
import { CURRENT_USER_FEATURE } from './user.id';

export interface UserDependencies {
  fetchText: FetchText;
  logger: Logger;
}

/**
 * Loads the current User
 */
const loadUserEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: UserDependencies
) => {
  // clear action
  const clearAction: Action = clearCurrentUserAction();
  // loader
  const loader: LoaderType = isNotNil(fetchText)
    ? (id) =>
        rxPipe(
          /**
           * load the resource right away
           */
          fetchText(id),
          // parse
          map<string, User>(jsonParse),
          // dispatch the toggles to the store
          map(setCurrentUserAction),
          // in case of an error, clear the user
          catchError((error) => of(clearAction))
        )
    : () => EMPTY;
  // our loader
  const opLoader = createLoader(state$, loader, logger);

  // actually perform the action
  return rxPipe(
    actions$,
    // react to the load User command
    ofType<LoadCurrentUserAction>(ACTION_LOAD_CURRENT_USER),
    // map to the path
    mapTo(REL_PATH_CURRENT_USER),
    // load
    opLoader
  );
};

/**
 * Initializes the User
 */
const initUserEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType(ACTION_INIT, ACTION_LOGGED_IN, ACTION_LOGGED_OUT),
    map(loadCurrentUserAction)
  );

/**
 * Initializes the User
 */
const initFeatureUserEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofInitFeature(CURRENT_USER_FEATURE),
    map(loadCurrentUserAction)
  );

export const userEpic: Epic = combineEpics(
  initUserEpic,
  initFeatureUserEpic,
  loadUserEpic
);
