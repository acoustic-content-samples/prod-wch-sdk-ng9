import {
  Logger,
  REL_PATH_CURRENT_TENANT,
  Tenant
} from '@acoustic-content-sdk/api';
import { ACTION_INIT } from '@acoustic-content-sdk/redux-actions';
import {
  createAuthenticatedLoader,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import { ofInitFeature } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mapTo } from 'rxjs/operators';

import {
  ACTION_LOAD_TENANT,
  LoadTenantAction,
  loadTenantAction,
  setTenantAction
} from './tenant.actions';
import { TENANT_FEATURE } from './tenant.id';

export interface TenantDependencies {
  fetchText: FetchText;
  logger: Logger;
}

/**
 * Loads the current tenant
 */
const loadTenantEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: TenantDependencies
) => {
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      /**
       * load the resource right away
       */
      fetchText(id),
      // parse
      map<string, Tenant>(jsonParse),
      // dispatch the toggles to the store
      map(setTenantAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    // react to the load tenant command
    ofType<LoadTenantAction>(ACTION_LOAD_TENANT),
    // directly map to the route
    mapTo(REL_PATH_CURRENT_TENANT),
    // load
    opLoader
  );
};

/**
 * Initializes the tenant
 */
const initTenantEpic: Epic = (actions$) =>
  rxPipe(actions$, ofType(ACTION_INIT), mapTo(loadTenantAction()));

/**
 * Initializes the tenant
 */
const initFeatureTenantEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature(TENANT_FEATURE), mapTo(loadTenantAction()));

export const tenantEpic: Epic = combineEpics(
  initTenantEpic,
  initFeatureTenantEpic,
  loadTenantEpic
);
