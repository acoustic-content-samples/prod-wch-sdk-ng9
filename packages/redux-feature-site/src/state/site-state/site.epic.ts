import { LoggerService } from '@acoustic-content-sdk/api';
import { setErrorAction } from '@acoustic-content-sdk/redux-feature-error';
import {
  createAuthenticatedLoader,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import { ofInitFeature, rxSelect } from '@acoustic-content-sdk/redux-store';
import { addToSetEpic, ItemWithId } from '@acoustic-content-sdk/redux-utils';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  isNil,
  isNotNil,
  jsonParse,
  NOOP_LOGGER_SERVICE,
  pluckProperty,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  mergeMapTo,
  withLatestFrom
} from 'rxjs/operators';

import {
  ACTION_ADD_DEFAULT_SITE,
  ACTION_GUARANTEE_DEFAULT_SITE,
  ACTION_LOAD_DEFAULT_SITE,
  ACTION_SET_DEFAULT_SITE,
  actionAddDefaultSite,
  actionClearDefaultSite,
  GuaranteeDefaultSiteAction,
  LoadDefaultSiteAction,
  loadDefaultSiteAction
} from './site.actions';
import { selectSiteFeature } from './site.feature';
import { SITE_FEATURE } from './site.id';
import { selectDefaultSite } from './site.selectors';
import { SiteItem } from './site.state';

/**
 * Perform initialization actions of the `SITE_FEATURE` feature.
 */
const initEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature(SITE_FEATURE), mergeMapTo(EMPTY));

/**
 * Epic to dispatch an `ACTION_ADD_SITE_ITEM` action to a `ACTION_SET_SITE_ITEM`.
 */
const setEpic = addToSetEpic<SiteItem>(
  ACTION_ADD_DEFAULT_SITE,
  ACTION_SET_DEFAULT_SITE
);

export interface SiteDependencies {
  fetchText: FetchText;
  logSvc?: LoggerService;
}

const REL_PATH_DEFAULT_SITE = 'mydelivery/v2/sites/@current?fields=id';

const selectId = pluckProperty<ItemWithId, 'id'>('id');

const LOGGER = 'SiteEpic';

/**
 * Loads the current User
 */
const loadDefaultSiteEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: SiteDependencies
) => {
  // log this
  const logService = logSvc || NOOP_LOGGER_SERVICE;
  const logger = logService.get(LOGGER);
  // clear action
  const clearAction: Action = actionClearDefaultSite();
  // loader
  const loader: LoaderType = isNotNil(fetchText)
    ? (id) =>
        rxPipe(
          /**
           * load the resource right away
           */
          fetchText(id),
          // parse
          map<string, ItemWithId>(jsonParse),
          // extract the id
          map(selectId),
          // dispatch the toggles to the store
          map(actionAddDefaultSite),
          // error
          catchError((error) => of(setErrorAction(error), clearAction))
        )
    : () => EMPTY;
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  // actually perform the action
  return rxPipe(
    actions$,
    // react to the load User command
    ofType<LoadDefaultSiteAction>(ACTION_LOAD_DEFAULT_SITE),
    // map to the path
    mapTo(REL_PATH_DEFAULT_SITE),
    // load
    opLoader
  );
};

/**
 * Handles item guarantees
 */
const guaranteeDefaultSiteEpic: Epic = (
  actions$,
  state$,
  { logSvc }: SiteDependencies
) => {
  // current default site
  const siteFeature$ = rxPipe(state$, rxSelect(selectSiteFeature));
  const defaultSite$ = rxPipe(siteFeature$, rxSelect(selectDefaultSite));

  // actually perform the action
  return rxPipe(
    actions$,
    // react to the load User command
    ofType<GuaranteeDefaultSiteAction>(ACTION_GUARANTEE_DEFAULT_SITE),
    // map to the path
    mapTo(REL_PATH_DEFAULT_SITE),
    // load if not loaded, yet
    withLatestFrom(defaultSite$),
    // check
    filter(([, defaultSite]) => isNil(defaultSite)),
    // map to the load operation
    mapTo(loadDefaultSiteAction())
  );
};

export const siteEpic: Epic = combineEpics(
  initEpic,
  setEpic,
  loadDefaultSiteEpic,
  guaranteeDefaultSiteEpic
);
