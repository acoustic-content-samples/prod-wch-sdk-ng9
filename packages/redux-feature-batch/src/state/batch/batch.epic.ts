import {
  AuthoringContentItem,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  ACTION_SAVE_AUTH_CONTENT_BATCH,
  addAuthoringContentIfNonExistentAction,
  AuthoringContentState,
  guaranteeAuthoringContentAction,
  migrateContentItems,
  SaveAuthoringContentBatchAction,
  selectAuthContentFeature
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  addAuthoringLayoutIfNonExistentAction,
  AuthoringLayoutState,
  selectAuthLayoutFeature
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  addAuthoringLayoutMappingIfNonExistentAction,
  AuthoringLayoutMappingState,
  selectAuthLayoutMappingFeature
} from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import {
  addAuthoringContentTypeIfNonExistentAction,
  AuthoringTypeState,
  selectAuthTypeFeature
} from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  addDeliveryContentIfNonExistentAction,
  DeliveryContentState,
  selectDeliveryContentFeature
} from '@acoustic-content-sdk/redux-feature-delivery-content';
import {
  handlebarsAddTemplateAction,
  HandlebarsState,
  isValidHandlebarsTemplateState,
  selectHandlebarsFeature
} from '@acoustic-content-sdk/redux-feature-handlebars';
import {
  ACTION_SET_INLINE_EDIT_SELECTED_ITEM,
  SetInlineEditSelectedItemAction
} from '@acoustic-content-sdk/redux-feature-inline-edit';
import {
  createAuthenticatedLoader,
  LoaderType,
  loadingEndAction,
  loadingStartAction,
  LoadingState,
  selectLoadingFeature
} from '@acoustic-content-sdk/redux-feature-load';
import { saveAuthoringBatchAction } from '@acoustic-content-sdk/redux-feature-save';
import { rxSelect, selectPayload } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  arrayPush,
  assertObject,
  hashRandomIdentifier,
  identity,
  isNil,
  isNotEmpty,
  isString,
  isStringArray,
  isUndefined,
  JSONObject,
  jsonParse,
  jsonStringify,
  mapArray,
  objectAssign,
  objectKeys,
  opFilterNotNil,
  propertyFromObject,
  reduceArray,
  reduceForIn,
  reduceToObject,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  asyncScheduler,
  concat,
  from,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
  UnaryFunction
} from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { DRAFT_SUFFIX, draftOverlay } from '../../utils/draft.utils';
import {
  fetchByAuthoringQuery,
  searchByClassificationAndIds
} from '../../utils/search';
import {
  ACTION_GUARANTEE_AUTH_CONTENT_BATCH,
  GuaranteeAuthoringContentBatchAction,
  guaranteeAuthoringContentBatchAction
} from './batch.actions';

export interface BatchDependencies {
  fetchText: UnaryFunction<string, Observable<string>>;
  logSvc: LoggerService;
}

const LOGGER = 'BatchEpic';

const REL_GRAPH_BY_ID = 'mydelivery/v1/rendering/graph/by-id';

// result of the graph operation
declare type GraphByIdResult = Record<string, string | JSONObject>;

/**
 * Result of the graph operation, ordered by classification
 */
declare type OrderedGraphByIdResult = Record<string, GraphByIdResult>;

const CLASSIFICATION_TEMPLATE = hashRandomIdentifier();
const CLASSIFICATION_CONTENT_TYPE = 'content-type';
const CLASSIFICATION_LAYOUT = 'layout';
const CLASSIFICATION_CONTENT = 'content';
const CLASSIFICATION_LAYOUT_MAPPING = 'layout-mapping';

/**
 * Constructs an array of actions that set item state if it does not exist
 *
 * @param aNewItems - record of new items
 * @param aExistingItems - record of existing items
 * @param aActionCreator - action creator
 *
 * @returns the set of actions that will lead to the desired state
 */
function guaranteeTemplates(
  aNewItems: Record<string, string>,
  aExistingItems: HandlebarsState
): Action[] {
  // pluck callback
  const pluck = propertyFromObject(aExistingItems);
  // work on the new items
  return reduceForIn(
    aNewItems,
    (aResult: Action[], stringTemplate: string, key: string) => {
      // get the item
      const existing = pluck(key);
      // test if we know the item
      if (!isValidHandlebarsTemplateState(existing)) {
        // insert
        arrayPush(
          handlebarsAddTemplateAction({ key, stringTemplate }),
          aResult
        );
      }
      // returns the array
      return aResult;
    },
    []
  );
}

/**
 * Constructs an array of actions that set item state if it does not exist
 *
 * @param aNewItems - record of new items
 * @param aExistingItems - record of existing items
 * @param aActionCreator - action creator
 *
 * @returns the set of actions that will lead to the desired state
 */
function guaranteeItems<T>(
  aNewItems: Record<string, T>,
  aExistingItems: Record<string, any>,
  aActionCreator: (aItem: T) => Action
): Action[] {
  // pluck callback
  const pluck = propertyFromObject(aExistingItems);
  // work on the new items
  return reduceForIn(
    aNewItems,
    (aResult: Action[], aItem: T, aKey: string) => {
      // test if we know the item
      if (isUndefined(pluck(aKey))) {
        // insert
        arrayPush(aActionCreator(aItem), aResult);
      }
      // returns the array
      return aResult;
    },
    []
  );
}

function getGraphActions(
  aGraph: GraphByIdResult,
  aAuthTypes: AuthoringTypeState,
  aAuthLayouts: AuthoringLayoutState,
  aAuthLayoutMappings: AuthoringLayoutMappingState,
  aDeliveryContent: DeliveryContentState,
  aTemplates: HandlebarsState
): Action[] {
  // order by classification
  const ordered: OrderedGraphByIdResult = reduceForIn(
    aGraph,
    (res: OrderedGraphByIdResult, item: string | JSONObject, key: string) => {
      // extract the classification
      const cls = isString(item)
        ? CLASSIFICATION_TEMPLATE
        : (item.classification as string);
      // insert
      objectAssign(key, item, assertObject(cls, res));
      // augment the result object
      return res;
    },
    {}
  );
  // pluck callback
  const pluck = propertyFromObject(ordered);
  // work on the classifications in order
  const typeActions = guaranteeItems(
    pluck(CLASSIFICATION_CONTENT_TYPE) as any,
    aAuthTypes,
    addAuthoringContentTypeIfNonExistentAction
  );
  const layoutsActions = guaranteeItems(
    pluck(CLASSIFICATION_LAYOUT) as any,
    aAuthLayouts,
    addAuthoringLayoutIfNonExistentAction
  );
  const layoutMappingActions = guaranteeItems(
    pluck(CLASSIFICATION_LAYOUT_MAPPING) as any,
    aAuthLayoutMappings,
    addAuthoringLayoutMappingIfNonExistentAction
  );
  const deliveryContentActions = guaranteeItems(
    pluck(CLASSIFICATION_CONTENT) as any,
    aDeliveryContent,
    addDeliveryContentIfNonExistentAction
  );
  const handlebarsActions = guaranteeTemplates(
    pluck(CLASSIFICATION_TEMPLATE) as any,
    aTemplates
  );
  const authContentAction = guaranteeAuthoringContentBatchAction(
    objectKeys(pluck(CLASSIFICATION_CONTENT))
  );

  // concat all
  return [
    ...handlebarsActions,
    ...typeActions,
    ...layoutsActions,
    ...layoutMappingActions,
    ...deliveryContentActions,
    authContentAction
  ];
}

/**
 * Makes sure to create a unique set of IDs from the input
 *
 * @param aIds - the identifiers, either a single one or a sequence
 * @returns a sorted, unique set of IDs
 */
function extractIds(aIds: string | string[]): string[] {
  // make sure we have an array
  const ids: string[] = isString(aIds)
    ? [aIds]
    : isStringArray(aIds)
    ? aIds
    : [];
  // make sure there are no duplicates
  return objectKeys(reduceToObject(ids, identity)).sort();
}

/**
 * From a list of IDs return those that are not already in the list of content items
 *
 * @param aIds - the set of IDs
 * @param aAuthContent - the authoring content state
 *
 * @returns the filtered list
 */
function onlyRequired(
  aIds: string[],
  aAuthContent: AuthoringContentState
): string[] {
  // pluck from the content
  const pluck = propertyFromObject(aAuthContent);
  // filter the IDs
  return aIds.filter((id) => isNil(pluck(id)));
}

/**
 * From a list of IDs return those that are not already in the list of content items
 *
 * @param aIds - the set of IDs
 * @param aAuthContent - the authoring content state
 *
 * @returns the filtered list
 */
function onlyUnknown(
  aIds: string[],
  aLoading: LoadingState,
  aAuthContent: AuthoringContentState
): string[] {
  // pluck from the content
  const pluck = propertyFromObject(aAuthContent);
  // filter the IDs and make sure they are not loading, yet
  return aIds.filter((id) => isNil(pluck(id)) && !aLoading.has(id));
}

/**
 * Prepend the ID with 'content:' so we can use authoring search
 *
 * @param aId  - the ID
 * @returns the ID with the prefix
 */
function prefixWithContent(aId: string): string {
  return `${CLASSIFICATION_CONTENT}:${aId}`;
}

/**
 * Returns the values of a record as an array
 *
 * @param aData   - the record
 * @return the data array
 */
function getValues<T>(aData: Record<any, T>): T[] {
  return reduceForIn(
    aData,
    (aResult: T[], aValue: T) => arrayPush(aValue, aResult),
    []
  );
}

/**
 * Makes a request to load authoring content in a batch using a combination of delivery
 * and search APIs
 *
 * @param aFetchText - the fetcher
 * @param aLogger - logger
 *
 * @returns the load callback
 */
function authoringContentLoader(
  aFetchText: FetchText,
  aLogger: Logger
): UnaryFunction<string[], Observable<AuthoringContentItem[]>> {
  // some logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    aLogger,
    'authoringContentLoader'
  );
  // query handler
  const fetchQuery = fetchByAuthoringQuery(aFetchText);
  // make a delivery search to find the IDs
  return (aIds: string[]): Observable<AuthoringContentItem[]> => {
    // make sure to ask for ready AND draft
    const authIds = reduceArray(
      aIds,
      (res, id) => {
        // add
        const prefixed = prefixWithContent(id);
        res.push(prefixed, `${prefixed}${DRAFT_SUFFIX}`);
        return res;
      },
      []
    );
    // execute the search
    return rxPipe(
      // perform the search
      searchByClassificationAndIds<AuthoringContentItem>(
        CLASSIFICATION_CONTENT,
        authIds,
        fetchQuery
      ),
      // construct the draft overlay
      map(draftOverlay),
      // returns the overlayed values
      map(getValues),
      // migrate to latest type
      map(migrateContentItems)
    );
  };
}

/**
 * Constructs a graph URL from the IDs
 *
 * @param aIds - the IDs
 * @returns the URL to the graph API
 */
function createGraphUrl(aIds: string[]): string {
  // build the query
  const query = mapArray(aIds, (id) => `id=${id}`).join('&');
  // construct the URL
  return `${REL_GRAPH_BY_ID}?${query}`;
}

/**
 * Validate if we have valid IDs
 *
 * @param aIds - the IDs or ID
 * @returns true if the IDs are valid
 */
function isValidIds(aIds: any): aIds is string | string[] {
  return isString(aIds) || (isStringArray(aIds) && isNotEmpty(aIds));
}

/**
 * Converts a set of IDs to a helper token
 *
 * @param aIds - the IDs
 * @returns the token
 */
function idsToToken(aIds: string[]): string {
  return jsonStringify(aIds);
}

/**
 * Converts the helper token back to a set of IDs
 *
 * @param aToken - the token
 * @returns the IDs
 */
function tokenToIds(aToken: string): string[] {
  return jsonParse<string[]>(aToken);
}

/**
 * Implements the batch operation
 */
const loadBatchEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: BatchDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // select from the store
  const authContent$ = rxPipe(state$, rxSelect(selectAuthContentFeature));
  const authTypes$ = rxPipe(state$, rxSelect(selectAuthTypeFeature));
  const authLayouts$ = rxPipe(state$, rxSelect(selectAuthLayoutFeature));
  const authLayoutMappings$ = rxPipe(
    state$,
    rxSelect(selectAuthLayoutMappingFeature)
  );
  const deliveryContent$ = rxPipe(
    state$,
    rxSelect(selectDeliveryContentFeature)
  );
  const templates$ = rxPipe(state$, rxSelect(selectHandlebarsFeature));
  const loading$ = rxPipe(state$, rxSelect(selectLoadingFeature));
  // loader impl
  const loadAuthContent = authoringContentLoader(fetchText, logger);

  // loader for the content
  const authLoader: LoaderType = (token) =>
    rxPipe(
      // load the content
      loadAuthContent(tokenToIds(token)),
      // map to action array
      map((items) => mapArray(items, addAuthoringContentIfNonExistentAction))
    );

  // our loader
  const opAuthLoader = createAuthenticatedLoader(state$, authLoader, logger);

  /**
   * Makes sure to send loading events before doing the actual load
   */
  const opLoadGuarded: OperatorFunction<string[], Action> = (ids$) => {
    // issue loading start actions
    return rxPipe(
      ids$,
      mergeMap((ids) => {
        /**
         * Register these IDs with the loader, so we prevent duplicate loading
         */
        const loadingStart$: Observable<Action> = from(
          mapArray(ids, loadingStartAction)
        );
        /**
         * Unregister these IDs, so loading continues
         */
        const loadingEnd$: Observable<Action> = from(
          mapArray(ids, loadingEndAction)
        );
        /**
         * Some safeguard at the end to guarantee that all of these IDs have actually been loaded. This
         * is required, because it can happen that some of the IDs could not be retrieved, e.g.
         * because of a REST failure. In this case we make sure to load these resources one by one. If
         * the resources had been loaded before, these guarantees are not a problem. We load
         * them on the async scheduler to not interrupt the current frame.
         */
        const safeGuard$: Observable<Action> = from(
          mapArray(ids, guaranteeAuthoringContentAction),
          asyncScheduler
        );

        // load the items
        const content$: Observable<Action> = rxPipe(
          of(idsToToken(ids)),
          opAuthLoader
        );

        // merge
        return concat(loadingStart$, content$, loadingEnd$, safeGuard$);
      })
    );
  };

  // loader for the graph
  const graphLoader: LoaderType = (url) =>
    rxPipe(
      // load the graph representation
      fetchText(url),
      // convert text to json
      map<string, GraphByIdResult>(jsonParse),
      // augment with some state
      withLatestFrom(
        authTypes$,
        authLayouts$,
        templates$,
        authLayoutMappings$,
        deliveryContent$
      ),
      // save the loaded type
      map(
        ([
          graph,
          authTypes,
          authLayouts,
          templates,
          authLayoutMappings,
          deliveryContent
        ]) =>
          getGraphActions(
            graph,
            authTypes,
            authLayouts,
            authLayoutMappings,
            deliveryContent,
            templates
          )
      )
    );
  // our loader
  const opGraphLoader = createAuthenticatedLoader(state$, graphLoader, logger);

  // loader by IDs
  function opLoadByIds(aIds$: Observable<string[]>): Observable<Action> {
    // graph loader
    const graph$ = rxPipe(
      aIds$,
      // map to the URL
      map(createGraphUrl),
      // load
      opGraphLoader
    );
    // search loader
    const search$ = rxPipe(
      aIds$,
      // map down to only required
      withLatestFrom(authContent$, loading$),
      // map down and ignore those that are already loading
      map(([ids, authContent, loading]) =>
        onlyUnknown(ids, loading, authContent)
      ),
      // no point in loading emtpy sets
      filter(isNotEmpty),
      // load these IDs guarded
      opLoadGuarded
    );
    // merge
    return merge(graph$, search$);
  }

  return rxPipe(
    actions$,
    // work on the batch
    ofType<GuaranteeAuthoringContentBatchAction>(
      ACTION_GUARANTEE_AUTH_CONTENT_BATCH
    ),
    // extract the id of the selected item
    map(selectPayload),
    // sanity check
    filter(isValidIds),
    map(extractIds),
    // extracts a unique set of IDs
    withLatestFrom(authContent$),
    map(([ids, authContent]) => onlyRequired(ids, authContent)),
    // make sure we have a non-empty set
    filter(isNotEmpty),
    // log these IDs
    log('ids'),
    // load
    opLoadByIds
  );
};

/**
 * Dispatch authoring batch operations
 */
const saveBatchContentEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType<SaveAuthoringContentBatchAction>(ACTION_SAVE_AUTH_CONTENT_BATCH),
    // extract the batch operation
    map(selectPayload),
    // sanity check
    filter(isNotEmpty),
    // map to the generic batch action
    map(saveAuthoringBatchAction)
  );

/**
 * Make sure the selected item is loaded
 */
const loadSelectedItemEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    // make sure a certain item is loaded
    ofType<SetInlineEditSelectedItemAction>(
      ACTION_SET_INLINE_EDIT_SELECTED_ITEM
    ),
    // extract the id of the selected item
    map(selectPayload),
    // sanity check
    opFilterNotNil,
    // make sure we load the item
    map(guaranteeAuthoringContentBatchAction)
  );

export const batchEpic: Epic = combineEpics(
  loadSelectedItemEpic,
  loadBatchEpic,
  saveBatchContentEpic
);
