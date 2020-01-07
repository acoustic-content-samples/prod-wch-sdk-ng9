import {
  AuthoringLayoutItem,
  AuthoringSelectedLayout,
  Logger
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
import { jsonParse, mapArray, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  ACTION_ADD_AUTH_LAYOUT,
  ACTION_ADD_AUTH_LAYOUT_IF_NONEXISTENT,
  ACTION_GUARANTEE_AUTH_LAYOUT,
  ACTION_LOAD_AUTH_LAYOUT,
  ACTION_SET_AUTH_LAYOUT,
  addAuthoringLayoutAction,
  LoadAuthoringLayoutAction,
  loadAuthoringLayoutAction
} from './auth.layout.actions';
import { selectAuthLayoutFeature } from './auth.layout.feature';

export interface AuthoringLayoutDependencies {
  fetchText: FetchText;
  logger: Logger;
}

// TODO type fallback for layouts!

/**
 * Initialize the active page
 */
const loadLayoutEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: AuthoringLayoutDependencies
) => {
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      fetchText(
        `authoring/v1/layouts/${encodeURIComponent(
          id
        )}?${PROJECT_ID_QUERY_PARAM}`
      ),
      // convert text to json
      map<string, AuthoringLayoutItem>(jsonParse),
      // save the loaded asset
      map(addAuthoringLayoutAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<LoadAuthoringLayoutAction>(ACTION_LOAD_AUTH_LAYOUT),
    // extract the id of the type
    map(selectPayload),
    // load
    opLoader
  );
};

/**
 * Determine the IDs of the layouts to resolve
 *
 * @param aLayouts - the authoring layouts
 * @returns the resolved layout IDs
 */
function idsFromSelectedLayouts(aLayouts: AuthoringSelectedLayout[]): string[] {
  return mapArray(aLayouts, (layout) => layout.layout.id);
}

// epic to convert from ACTION_ADD_AUTH_LAYOUT to ACTION_SET_AUTH_LAYOUT
const setLayoutEpic = addToSetEpic<AuthoringLayoutItem>(
  ACTION_ADD_AUTH_LAYOUT,
  ACTION_SET_AUTH_LAYOUT
);

/**
 * Handles layout guarantees
 */
const guaranteeLayoutEpic: Epic = guaranteeEpic(
  ACTION_GUARANTEE_AUTH_LAYOUT,
  loadAuthoringLayoutAction,
  selectAuthLayoutFeature
);

/**
 * Handles non existent items
 */
const nonExistentLayoutEpic: Epic = nonExistentEpic(
  ACTION_ADD_AUTH_LAYOUT_IF_NONEXISTENT,
  addAuthoringLayoutAction,
  getDeliveryIdFromAuthoringItem,
  selectAuthLayoutFeature
);

export const authoringLayoutEpic: Epic = combineEpics(
  loadLayoutEpic,
  guaranteeLayoutEpic,
  nonExistentLayoutEpic,
  setLayoutEpic
);
