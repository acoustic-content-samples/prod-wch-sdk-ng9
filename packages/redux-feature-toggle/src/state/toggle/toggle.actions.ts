import { Logger } from '@acoustic-content-sdk/api';
import { ACTION_INIT } from '@acoustic-content-sdk/redux-actions';
import {
  createAuthenticatedLoader,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import {
  ofInitFeature,
  PayloadAction
} from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  Generator,
  isStringArray,
  jsonParse,
  opDeepDistinctUntilChanged,
  rxPipe,
  typedPluck
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { UnaryFunction } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';

import { TOGGLE_FEATURE } from './toggle.id';

const TOGGLES_URL = 'toggle/v1/tenantToggles';

/**
 * Response of the toggle service
 */
interface ToggleResponse {
  enabled: string[];
}

export const ACTION_SET_TOGGLES = 'ACTION_SET_TOGGLES';
export type SetTogglesAction = PayloadAction<string[]>;

export const ACTION_LOAD_TOGGLES = 'ACTION_LOAD_TOGGLES';
export type LoadTogglesAction = Action;

export const ACTION_CLEAR_TOGGLES = 'ACTION_CLEAR_TOGGLES';
export type ClearTogglesAction = Action;

export const loadTogglesAction: Generator<LoadTogglesAction> = createAction(
  ACTION_LOAD_TOGGLES
);

export const clearTogglesAction: Generator<ClearTogglesAction> = createAction(
  ACTION_CLEAR_TOGGLES
);

export const setTogglesAction: UnaryFunction<
  string[],
  SetTogglesAction
> = createAction(ACTION_SET_TOGGLES);

export interface ToggleDependencies {
  fetchText: FetchText;
  logger: Logger;
}

const loadTogglesEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: ToggleDependencies
) => {
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      /**
       * load the resource right away
       */
      fetchText(id),
      // parse
      map<string, ToggleResponse>(jsonParse),
      // extract the enabled array
      typedPluck('enabled'),
      // only if this is a string array
      filter(isStringArray),
      // sort to protect against unimportant ordering
      map((toggles) => toggles.sort()),
      // dispatch
      opDeepDistinctUntilChanged,
      // dispatch the toggles to the store
      map(setTogglesAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    // load the toggles
    ofType(ACTION_LOAD_TOGGLES),
    // load the toggles
    mapTo(TOGGLES_URL),
    // load
    opLoader
  );
};

const initToggleEpic: Epic = (actions$) =>
  rxPipe(actions$, ofType(ACTION_INIT), map(loadTogglesAction));

const initFeatureToggleEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature(TOGGLE_FEATURE), map(loadTogglesAction));

export const togglesEpic: Epic = combineEpics(
  initToggleEpic,
  initFeatureToggleEpic,
  loadTogglesEpic
);
