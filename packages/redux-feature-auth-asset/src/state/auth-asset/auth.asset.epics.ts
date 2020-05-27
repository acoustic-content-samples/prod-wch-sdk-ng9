import {
  AuthoringAsset,
  BaseAuthoringItem,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  createAuthenticatedLoader,
  guaranteeEpic,
  LoaderType,
  nonExistentEpic,
  PROJECT_ID_QUERY_PARAM
} from '@acoustic-content-sdk/redux-feature-load';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  addToSetEpic,
  getDeliveryIdFromAuthoringItem
} from '@acoustic-content-sdk/redux-utils';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import {
  ACTION_ADD_AUTH_ASSET,
  ACTION_ADD_AUTH_ASSET_IF_NONEXISTENT,
  ACTION_GUARANTEE_AUTH_ASSET,
  ACTION_LOAD_AUTH_ASSET,
  ACTION_SET_AUTH_ASSET,
  addAuthoringAssetAction,
  LoadAuthoringAssetAction,
  loadAuthoringAssetAction
} from './auth.asset.actions';
import { selectAuthAssetFeature } from './auth.asset.feature';

const LOGGER = 'AuthAssetEpic';

export interface AuthoringAssetDependencies {
  fetchText: FetchText;
  logSvc: LoggerService;
}

/**
 * Initialize the active page
 */
const loadAssetEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: AuthoringAssetDependencies
) => {
  // construct the logger
  const logger = logSvc.get(LOGGER);
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      fetchText(
        `authoring/v1/assets/${encodeURIComponent(
          id
        )}?${PROJECT_ID_QUERY_PARAM}&include=metadata`
      ),
      // convert text to json
      map<string, BaseAuthoringItem>(jsonParse),
      // save the loaded asset
      map(addAuthoringAssetAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<LoadAuthoringAssetAction>(ACTION_LOAD_AUTH_ASSET),
    // extract the id of the asset
    map(selectPayload),
    // load
    opLoader
  );
};

// epic to convert from ACTION_ADD_AUTH_ASSET to ACTION_SET_AUTH_ASSET
const setAssetEpic = addToSetEpic<AuthoringAsset>(
  ACTION_ADD_AUTH_ASSET,
  ACTION_SET_AUTH_ASSET
);

/**
 * Handles asset guarantees
 */
const guaranteeAssetEpic: Epic = guaranteeEpic(
  ACTION_GUARANTEE_AUTH_ASSET,
  loadAuthoringAssetAction,
  selectAuthAssetFeature
);

/**
 * Handles non existent items
 */
const nonExistentContentEpic: Epic = nonExistentEpic(
  ACTION_ADD_AUTH_ASSET_IF_NONEXISTENT,
  addAuthoringAssetAction,
  getDeliveryIdFromAuthoringItem,
  selectAuthAssetFeature
);

export const authoringAssetEpic: Epic = combineEpics(
  loadAssetEpic,
  guaranteeAssetEpic,
  nonExistentContentEpic,
  //  resolveAssetEpic,
  setAssetEpic
);
