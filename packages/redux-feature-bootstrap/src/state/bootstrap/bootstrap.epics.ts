import {
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringType,
  BaseAuthoringItem,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  LoggerService,
  Query,
  SearchResult,
  SearchResults
} from '@acoustic-content-sdk/api';
import { addAuthoringLayoutIfNonExistentAction } from '@acoustic-content-sdk/redux-feature-auth-layout';
import { addAuthoringLayoutMappingIfNonExistentAction } from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import { addAuthoringContentTypeIfNonExistentAction } from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  createAuthenticatedLoader,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  filterArray,
  isNotNil,
  jsonParse,
  luceneEscapeKeyValueOr,
  mapArray,
  NOOP_LOGGER_SERVICE,
  queryToString,
  rxPipe,
  SEARCH_MAX_ROWS
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, map, tap } from 'rxjs/operators';

import { ACTION_BOOTSTRAP, BootstrapAction } from './bootstrap.actions';

export interface BootstrapDependencies {
  fetchText: FetchText;
  logSvc?: LoggerService;
}

const LOGGER = 'BootstrapEpic';

function createSearchQuery(aClassifications: string[]): Query {
  // order classifications
  const cls = [...aClassifications].sort();
  // generate the query
  return {
    q: luceneEscapeKeyValueOr('classification', ...cls),
    rows: SEARCH_MAX_ROWS,
    fl: 'document:[json]'
  };
}

const createSearchUrl = (aClassifications: string[]): string =>
  `mydelivery/v1/search?${queryToString(createSearchQuery(aClassifications))}`;

/**
 * Constructs the action that initializes the item
 *
 * @param aItem - the authoring item
 * @returns the matching action or `undefined`
 */
function createAction(aItem: BaseAuthoringItem): Action {
  // check for the classification
  const { classification } = aItem;
  // dispatch
  switch (classification) {
    case CLASSIFICATION_CONTENT_TYPE:
      return addAuthoringContentTypeIfNonExistentAction(aItem as AuthoringType);
    case CLASSIFICATION_LAYOUT:
      return addAuthoringLayoutIfNonExistentAction(
        aItem as AuthoringLayoutItem
      );
    case CLASSIFICATION_LAYOUT_MAPPING:
      return addAuthoringLayoutMappingIfNonExistentAction(
        aItem as AuthoringLayoutMapping
      );
    default:
      break;
  }
  // not supported
  return undefined;
}

/**
 * Maps all items to actions
 *
 * @param aItems - the actions
 * @returns the set of matching actions
 */
const getActions = (aItems: BaseAuthoringItem[]): Action[] =>
  filterArray(mapArray(aItems, createAction), isNotNil);

const loadBootstrapEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: BootstrapDependencies
) => {
  // create the logger
  const loggerService = logSvc || NOOP_LOGGER_SERVICE;
  const logger = loggerService.get(LOGGER);
  // loader
  const loader: LoaderType = (id: string) =>
    rxPipe(
      // loads the mapping by ID
      fetchText(id),
      // convert text to json
      map<string, SearchResults<SearchResult<BaseAuthoringItem>>>(jsonParse),
      // only if we have a result
      filter((res) => res.numFound > 0),
      // extract the doc
      map((res) =>
        filterArray(
          mapArray(res.documents, (doc) => doc.document),
          isNotNil
        )
      ),
      // shows the documents
      tap((docs) => logger.info('Bootstrap documents', docs.length)),
      // update the mapping
      map(getActions)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<BootstrapAction>(ACTION_BOOTSTRAP),
    // extract the id of the type
    map(selectPayload),
    // map to the URL
    map(createSearchUrl),
    // load
    opLoader
  );
};

export const bootstrapEpic: Epic = combineEpics(loadBootstrapEpic);
