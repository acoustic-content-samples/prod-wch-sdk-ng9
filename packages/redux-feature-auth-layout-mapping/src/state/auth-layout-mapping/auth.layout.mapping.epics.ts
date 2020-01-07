import {
  AuthoringLayoutMapping,
  CLASSIFICATION_LAYOUT_MAPPING,
  KEY_TYPE_ID,
  Logger,
  Query,
  SearchResult,
  SearchResults
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
import {
  jsonParse,
  luceneEscapeKeyValue,
  queryToString,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, map } from 'rxjs/operators';

import {
  ACTION_ADD_AUTH_LAYOUT_MAPPING,
  ACTION_ADD_AUTH_LAYOUT_MAPPING_IF_NONEXISTENT,
  ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING,
  ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING_BY_TYPE,
  ACTION_LOAD_AUTH_LAYOUT_MAPPING,
  ACTION_SET_AUTH_LAYOUT_MAPPING,
  addAuthoringLayoutMappingAction,
  GuaranteeAuthoringLayoutMappingByTypeAction,
  LoadAuthoringLayoutMappingAction,
  loadAuthoringLayoutMappingAction
} from './auth.layout.mapping.actions';
import { selectAuthLayoutMappingFeature } from './auth.layout.mapping.feature';

export interface AuthoringLayoutMappingDependencies {
  fetchText: FetchText;
  logger: Logger;
}

function createLayoutMappingByTypeQuery(aTypeId: string): Query {
  return {
    q: luceneEscapeKeyValue('classification', CLASSIFICATION_LAYOUT_MAPPING),
    fq: luceneEscapeKeyValue(KEY_TYPE_ID, aTypeId),
    rows: 1,
    fl: 'document:[json]'
  };
}

const createLayoutMappingByTypeUrl = (aTypeId: string): string =>
  `delivery/v1/search?${queryToString(
    createLayoutMappingByTypeQuery(aTypeId)
  )}`;

const guaranteeLayoutMappingByTypeEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: AuthoringLayoutMappingDependencies
) => {
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      // loads the mapping by ID
      fetchText(id),
      // convert text to json
      map<string, SearchResults<SearchResult<AuthoringLayoutMapping>>>(
        jsonParse
      ),
      // only if we have a result
      filter((res) => res.numFound > 0),
      // extract the doc
      map((res) => res.documents[0].document),
      // update the mapping
      map(addAuthoringLayoutMappingAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<GuaranteeAuthoringLayoutMappingByTypeAction>(
      ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING_BY_TYPE
    ),
    // extract the id of the type
    map(selectPayload),
    // map to the URL
    map(createLayoutMappingByTypeUrl),
    // load
    opLoader
  );
};

// TODO type fallback for layouts!

/**
 * Initialize the active page
 */
const loadLayoutMappingEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: AuthoringLayoutMappingDependencies
) => {
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      fetchText(
        `authoring/v1/layout-mappings/${encodeURIComponent(
          id
        )}?${PROJECT_ID_QUERY_PARAM}`
      ),
      // convert text to json
      map<string, AuthoringLayoutMapping>(jsonParse),
      // save the loaded asset
      map(addAuthoringLayoutMappingAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<LoadAuthoringLayoutMappingAction>(ACTION_LOAD_AUTH_LAYOUT_MAPPING),
    // extract the id of the type
    map(selectPayload),
    // load
    opLoader
  );
};

// epic to convert from ACTION_ADD_AUTH_LAYOUT_MAPPING to ACTION_SET_AUTH_LAYOUT_MAPPING
const setLayoutMappingEpic = addToSetEpic<AuthoringLayoutMapping>(
  ACTION_ADD_AUTH_LAYOUT_MAPPING,
  ACTION_SET_AUTH_LAYOUT_MAPPING
);

/**
 * Handles layout guarantees
 */
const guaranteeLayoutMappingEpic: Epic = guaranteeEpic(
  ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING,
  loadAuthoringLayoutMappingAction,
  selectAuthLayoutMappingFeature
);

/**
 * Handles non existent items
 */
const nonExistentLayoutMappingEpic: Epic = nonExistentEpic(
  ACTION_ADD_AUTH_LAYOUT_MAPPING_IF_NONEXISTENT,
  addAuthoringLayoutMappingAction,
  getDeliveryIdFromAuthoringItem,
  selectAuthLayoutMappingFeature
);

export const authoringLayoutMappingEpic: Epic = combineEpics(
  loadLayoutMappingEpic,
  guaranteeLayoutMappingEpic,
  nonExistentLayoutMappingEpic,
  setLayoutMappingEpic,
  guaranteeLayoutMappingByTypeEpic
);
