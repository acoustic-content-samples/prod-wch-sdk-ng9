import {
  CYCLE_HANDLING,
  Group,
  GroupElement,
  HubInfo,
  HubInfoUrlProvider,
  Layout,
  Logger,
  RenderingContext,
  StaticHubInfoUrlProvider,
  UrlConfig,
  WCH_CONFIG_API_URL,
  WCH_CONFIG_BASE_URL,
  WCH_CONFIG_RESOURCE_URL
} from '@acoustic-content-sdk/api';
import { combineLatest, from, Observable, of, UnaryFunction } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mergeMap,
  shareReplay
} from 'rxjs/operators';

import { BiFunction } from '../consumers/consumer';
import { UNDEFINED } from '../js/js.core';
import { pluckProperty } from '../js/pluck';
import { createSymbol } from '../js/symbol';
import { rxPipe, UNDEFINED$ } from '../rx/rx.utils';
import {
  elementById,
  getDocument,
  getWindow,
  pluckHref
} from './../dom/dom.utils';
import { isGroupElement, isReferenceElement } from './../elements/element';
import {
  anyToString,
  arrayPush,
  assertObject,
  cloneDeep,
  KEY_DEBUG,
  mergeObjects
} from './../js/js.utils';
import {
  DEFAULT_LAYOUT_MAPPING,
  DEFAULT_LAYOUT_MODE
} from './../layouts/layout';
import { NOOP_LOGGER } from './../logger/noop.logger';
import {
  isArray,
  isEqual,
  isFunction,
  isNil,
  isNotNil,
  isString,
  isURL
} from './../predicates/predicates';
import { luceneEscapeKeyValue } from './../search/search.utils';
import { EMPTY_SITE_CONTEXT } from './../site/sites.constants';
import {
  absoluteURL,
  createBaseURL,
  getBaseUrlFromDocument,
  parseQueryString,
  parseURL,
  queryToString,
  urlEquals,
  urlTrailingSlash
} from './../url/url.utils';

export interface WchDebug {
  path: string;
}

export interface RenderingContextMap {
  [id: string]: RenderingContext;
}

export const KEY_RENDERING_CONTEXT_MAP = createSymbol();

export const KEY_CYCLE = '$$CYCLE';
export const KEY_REFERENCE = '$$REF';

export const EMPTY_RENDERING_CONTEXT: RenderingContext = {
  id: null,
  kind: [],
  elements: {},
  layouts: DEFAULT_LAYOUT_MAPPING,
  markups: {},
  context: EMPTY_SITE_CONTEXT
};

export const UNDEFINED_RENDERING_CONTEXT: RenderingContext = {
  id: undefined,
  kind: [],
  elements: {},
  layouts: DEFAULT_LAYOUT_MAPPING,
  markups: {},
  context: EMPTY_SITE_CONTEXT
};

// regular expression to detect uuid.v4 strings
const DX_SITES = 'dxsites';
const SITE_ID_STRING = '[\\w\\d_\\-%]';
const HEX_REGEXP_STRING = '[0-9a-fA-F]';
const HOST_REGEXP_STRING = '[^\\.\\:]';
const UUID_V4_REGEXP_STRING = `${HEX_REGEXP_STRING}{8}-${HEX_REGEXP_STRING}{4}-4${HEX_REGEXP_STRING}{3}-[89abAB]${HEX_REGEXP_STRING}{3}-${HEX_REGEXP_STRING}{12}`;
const TENANT_BASED_URL = `^(?:\\/api)?(?:\\/(${UUID_V4_REGEXP_STRING}))?(?:(?:\\/${DX_SITES}\\/)(${SITE_ID_STRING}+))?(?:\\/)?(?:.*)$`;
const TENANT_BASED_URL_REGEXP = new RegExp(TENANT_BASED_URL);

// check for preview hosts
const PREVIEW_SUFFIX = '-preview';
const PREVIEW_SUFFIX_STAGE = '-preview-stage';
const PREVIEW_INDICATOR = `(?:${PREVIEW_SUFFIX}|${PREVIEW_SUFFIX_STAGE})`;
const PREVIEW_HOST_REGEXP_STRING = `^(?:(${HOST_REGEXP_STRING}+)${PREVIEW_INDICATOR})((?:\\.${HOST_REGEXP_STRING}+)+)$`;
const PREVIEW_HOST_REGEXP = new RegExp(PREVIEW_HOST_REGEXP_STRING);

// check for preview origins
const PREVIEW_ORIGIN_REGEXP_STRING = `^http[s]?:\\/\\/(?:(${HOST_REGEXP_STRING}+)${PREVIEW_INDICATOR})((?:\\.${HOST_REGEXP_STRING}+)+)(:\\d+)?$`;
const PREVIEW_ORIGIN_REGEXP = new RegExp(PREVIEW_ORIGIN_REGEXP_STRING);

// check for live URL
const LIVE_HREF_REGEXP_STRING = `^(http[s]?:\/\/(?:${HOST_REGEXP_STRING}+))((?:\.${HOST_REGEXP_STRING}+)+(?:.*))$`;
const LIVE_HREF_REGEXP = new RegExp(LIVE_HREF_REGEXP_STRING);

// check for preview URL
const PREVIEW_HREF_REGEXP_STRING = `^(http[s]?:\/\/(?:${HOST_REGEXP_STRING}+))${PREVIEW_INDICATOR}((?:\.${HOST_REGEXP_STRING}+)+(?:.*))$`;
const PREVIEW_HREF_REGEXP = new RegExp(PREVIEW_HREF_REGEXP_STRING);

const _ALL_FETCH_LEVELS = -1;
const _DEFAULT_FETCH_LEVELS = _ALL_FETCH_LEVELS;

/**
 * Maps unknown or empty modes
 *
 * @param aMode - the mode
 * @returns the mode if not empty, else DEFAULT_LAYOUT_MODE
 */
function _boxLayoutMode(aMode: string | null | undefined): string {
  return isNil(aMode) || aMode.length === 0 ? DEFAULT_LAYOUT_MODE : aMode;
}

/**
 * Returns the layout object for a particular mode for the rendering context
 *
 * @param aLayoutMode - the mode
 * @param aContext - the context
 */
function _getLayout(
  aLayoutMode: string | undefined,
  aContext: RenderingContext | undefined
): Layout | undefined {
  // map the layout
  const layoutMode = aLayoutMode || DEFAULT_LAYOUT_MODE;
  // decode the ID
  const contentId = isNotNil(aContext) ? aContext.id : undefined;
  // check
  if (aContext && aContext.layouts) {
    // resolve
    return (
      aContext.layouts[layoutMode] || aContext.layouts[DEFAULT_LAYOUT_MODE]
    );
  }
}

/**
 * Determines if the server is running in preview mode
 *
 * @param aBaseURL - the base URL
 *
 * @returns true if the URL represents preview mode
 */
function _isPreviewMode(aBaseURL: URL): boolean {
  // extract the hostname
  return PREVIEW_HOST_REGEXP.test(aBaseURL.hostname);
}

/**
 * Determines if the server is running in preview mode
 *
 * @param aOrigin - the origin
 *
 * @returns true if the origin represents preview mode
 */
function _isPreviewOrigin(aOrigin: string): boolean {
  // extract the hostname
  return PREVIEW_ORIGIN_REGEXP.test(aOrigin);
}

// undefined hub info
const UNDEFINED_HUB_INFO: HubInfo = {
  apiUrl: undefined,
  resourceUrl: undefined
};

/* Decodes the hub info from the base URL. This assumes
 * that the application is served from a location in WCH.
 */
function _getHubInfoFromBaseURL(aBaseURL: URL): HubInfo {
  // sanity check
  if (isNil(aBaseURL)) {
    // nothing meaningful to return
    return UNDEFINED_HUB_INFO;
  }
  // match
  const origin = aBaseURL.origin;
  // handle the tenant case
  const urlSuffix = _getBaseUrlSuffix(aBaseURL);
  // construct the URLs
  return {
    apiUrl: parseURL(`${origin}/api/${urlSuffix}`),
    resourceUrl: parseURL(`${origin}/${urlSuffix}`)
  };
}

/**
 * Decodes the hub info from links in the document
 *
 * @param aDocument - the document
 * @param aWindow - the window object
 *
 * @param the - decoded hub info
 */
function _getHubInfoFromLinks(aDocument?: Document, aWindow?: Window): HubInfo {
  // get the doc
  const doc = getDocument(aDocument, aWindow);
  // decode
  const apiUrl = pluckHref(
    elementById<HTMLAnchorElement | HTMLLinkElement>(WCH_CONFIG_API_URL, doc)
  );
  const resourceUrl = pluckHref(
    elementById<HTMLAnchorElement | HTMLLinkElement>(
      WCH_CONFIG_RESOURCE_URL,
      doc
    )
  );
  // fallbacks
  return _getHubInfoFromBaseURL(parseURL(apiUrl || resourceUrl));
}

/**
 * Merges the config of two hub infos
 */
const _mergeHubInfo: BiFunction<HubInfo, HubInfo, HubInfo> = mergeObjects;

/**
 * Computes the resource URL given the API URL
 *
 * @param aApiURL - the API URL
 * @returns the resource URL
 */
function _getResourceUrlFromApiURL(aApiURL: URL): URL {
  // just dispatch
  return parseURL(_getHubInfoFromBaseURL(aApiURL).resourceUrl);
}

/**
 * Computes the API URL given the resource URL
 *
 * @param aResourceURL - the resource URL
 * @returns the API URL
 */
function _getApiUrlFromResourceURL(aResourceURL: URL): URL {
  // just dispatch
  return parseURL(_getHubInfoFromBaseURL(aResourceURL).apiUrl);
}

/**
 * Returns the number of fetch levels
 *
 * @param aLevels - the levels
 * @returns the number, a value < 0 means to fetch all levels
 */
function _boxFetchLevels(
  aLevels: number | null | undefined,
  aDefault?: number
): number {
  return isNotNil(aLevels)
    ? aLevels < 0
      ? _ALL_FETCH_LEVELS
      : aLevels
    : aDefault
    ? aDefault
    : _DEFAULT_FETCH_LEVELS;
}

/**
 * Converts the provider into a URL
 *
 * @param aProvider - the provider
 * @returns the URL if available
 */
export function rxUrlFromProvider(
  aProvider: HubInfoUrlProvider
): Observable<URL> {
  // check check
  if (isNil(aProvider)) {
    return UNDEFINED$;
  }
  // test if we have a generator
  if (isFunction(aProvider)) {
    return rxUrlFromProvider(aProvider());
  }
  // return a URL as is
  if (isURL(aProvider)) {
    return of(parseURL(aProvider.href));
  }
  // parse a string
  if (isString(aProvider)) {
    return of(parseURL(aProvider));
  }
  // convert
  return rxPipe(from(aProvider), mergeMap(rxUrlFromProvider));
}

/**
 * Converts the provider into a URL
 *
 * @param aProvider - the provider
 * @returns the URL if available
 */
export function urlFromProvider(aProvider: StaticHubInfoUrlProvider): URL {
  // test if we have a generator
  if (isFunction(aProvider)) {
    return urlFromProvider(aProvider());
  }
  // return a URL as is
  if (isURL(aProvider)) {
    return parseURL(aProvider.href);
  }
  // parse a string
  if (isString(aProvider)) {
    return parseURL(aProvider);
  }
  // nothing
  return UNDEFINED;
}

function _getCycleHandling(aCycle?: CYCLE_HANDLING | string): CYCLE_HANDLING {
  // sanity check
  return isString(aCycle)
    ? CYCLE_HANDLING[aCycle]
    : isNotNil(aCycle)
    ? aCycle
    : undefined;
}

export const KEY_RENDERING_CONTEXT = 'renderingContext';
export const KEY_LAYOUT_MODE = 'layoutMode';
export const KEY_LEVELS = 'levels';

// some query constants
const _KEY_SEARCH_Q = 'q';
const _VALUE_SEARCH_Q = '*:*';
const _KEY_FIELD_LIST = 'fl';
const _KEY_SORT = 'sort';
const _KEY_ROWS = 'rows';
const _KEY_PATHS = 'paths';
const _VALUE_ONE_ROW = '1';
const _VALUE_MAX_ROWS = anyToString(0x7fffffff);
const _VALUE_FIELD_LIST = 'document:[json]';
const _KEY_SEARCH_FQ = 'fq';
const _VALUE_SEARCH_FQ_CONTENT = 'classification:(content)';
const _VALUE_SEARCH_FQ_PAGE = 'classification:(page)';
const _PREFIX_SEARCH_CLASSIFICATION = 'classification';
const _FQ_SITE_ID = 'siteId';

/**
 * Tests if a field list represents a classification
 *
 * @param aValue - the value
 * @returns true for a classification, else false
 */
function _isSearchClassification(aValue: string): boolean {
  return (
    isNotNil(aValue) && aValue.indexOf(_PREFIX_SEARCH_CLASSIFICATION) === 0
  );
}

/**
 * Adds an FQ value to an array
 *
 * @param aValue - the value to add
 * @param aArray - the array to add the value to
 */
function _fqValuePush(aValue: string, aArray: string[]): string[] {
  // push if not a search classification
  return !_isSearchClassification(aValue) ? arrayPush(aValue, aArray) : aArray;
}

/**
 * Generically adjust the search query
 *
 * @param aQuery - the query
 * @param aFieldQuery - the field
 *
 * @returns  the new query string
 */
function _adjustSearchQuery(aQuery: string, aFieldQueries: string[]): string {
  // sanity check
  if (isNotNil(aQuery)) {
    // parse the query
    const params = parseQueryString(aQuery);
    // check if we have the q value
    if (!params.hasOwnProperty(_KEY_SEARCH_Q)) {
      // inject the default value
      params[_KEY_SEARCH_Q] = _VALUE_SEARCH_Q;
    }
    /**
     * replace the field list to make sure
     * we have the full document included in the result
     */
    params[_KEY_FIELD_LIST] = _VALUE_FIELD_LIST;

    /**
     * Check if the parameters have the fq values
     */
    const fqs = params[_KEY_SEARCH_FQ];
    const newFqs = cloneDeep(aFieldQueries);
    // append
    if (isString(fqs)) {
      _fqValuePush(fqs, newFqs);
    } else if (isArray(fqs)) {
      // current value
      const lenFqs = fqs.length;
      for (let i = 0; i < lenFqs; ++i) {
        _fqValuePush(fqs[i], newFqs);
      }
    }
    // set the value
    params[_KEY_SEARCH_FQ] = newFqs;
    // convert back to a string
    return queryToString(params);
  }
  // return the query as is
  return aQuery;
}

/**
 * Analyzes the search query and makes sure that it contains the required fields.
 *
 * @param aQuery - the search query
 * @returns the modified query
 */
function _adjustRenderingContextSearchQuery(aQuery: string): string {
  // dispatch
  return _adjustSearchQuery(aQuery, [_VALUE_SEARCH_FQ_CONTENT]);
}

/**
 * Analyzes the search query and makes sure that it contains the required fields.
 *
 * @param aQuery - the search query
 * @returns the modified query
 */
function _adjustSitePagesSearchQuery(aQuery: string, aSiteId: string): string {
  // dispatch
  return _adjustSearchQuery(aQuery, [
    _VALUE_SEARCH_FQ_PAGE,
    luceneEscapeKeyValue(_FQ_SITE_ID, aSiteId)
  ]);
}

/**
 * Returns the search expression that finds the siblings of a page
 *
 * @param aParentId - id of the parent page
 * @returns the string
 */
function _getSiblingsExpression(aParentId: string | null | undefined): string {
  // construct the expression
  return `(${luceneEscapeKeyValue(
    'parentId',
    aParentId
  )} AND hideFromNavigation:("false"))`;
}

/**
 * Returns the search expression that finds the children of a page
 *
 * @param aPageId - Id of the page
 * @returns the string
 */
function _getChildrenExpression(aPageId: string): string {
  // construct the expression
  return _getSiblingsExpression(aPageId);
}

/**
 * Returns the parent of a page
 *
 * @param aPageId - Id of the page
 * @returns the string
 */
function _getParentExpression(aParentId: string | null | undefined): string {
  return `(${luceneEscapeKeyValue('id', aParentId)})`;
}

/**
 * Returns the expression to get the complete site context in one call
 *
 * @param aParentId - the parent ID
 * @param aPageId - the page ID
 * @returns the expression
 */
function _getSiteContextExpression(
  aParentId: string | null | undefined,
  aPageId: string
): string {
  return `(${_getParentExpression(aParentId)} OR ${_getChildrenExpression(
    aPageId
  )} OR ${_getSiblingsExpression(aParentId)})`;
}

/**
 * Builds the search query string
 *
 * @param aQueryString - the query string
 * @returns the result
 */
function _getSearchURL(aQueryString: string): Observable<string> {
  // dispatch
  return of(`delivery/v1/search?${aQueryString}`);
}

/**
 * Returns the URI for a page search URL
 *
 * @param aID - the ID
 * @returns the path
 */
function _getPageSearchURL(aPath: string, aSiteId: string): Observable<string> {
  // the query parameters
  const params = {};
  // construct the search string
  params[_KEY_SEARCH_Q] = luceneEscapeKeyValue(_KEY_PATHS, aPath);
  params[_KEY_SEARCH_FQ] = [
    _VALUE_SEARCH_FQ_PAGE,
    luceneEscapeKeyValue(_FQ_SITE_ID, aSiteId)
  ];
  params[_KEY_FIELD_LIST] = _VALUE_FIELD_LIST;
  params[_KEY_ROWS] = _VALUE_ONE_ROW;
  // build the final string
  return _getSearchURL(queryToString(params));
}

/**
 * Returns the URI for a page search URL
 *
 * @param aID - the ID
 * @returns the path
 */
function _getSiteContextURL(
  aParentId: string | null | undefined,
  aPageId: string,
  aSiteId: string
): Observable<string> {
  // the query parameters
  const params = {};
  // construct the search string
  params[_KEY_SEARCH_Q] = _getSiteContextExpression(aParentId, aPageId);
  params[_KEY_SEARCH_FQ] = [
    _VALUE_SEARCH_FQ_PAGE,
    luceneEscapeKeyValue(_FQ_SITE_ID, aSiteId)
  ];
  params[_KEY_FIELD_LIST] = _VALUE_FIELD_LIST;
  params[_KEY_ROWS] = _VALUE_MAX_ROWS;
  params[_KEY_SORT] = 'position asc, lastModified desc, id asc';
  // build the final string
  return _getSearchURL(queryToString(params));
}

/**
 * Returns the URI for a parent page search
 *
 * @param aID - the ID
 * @returns the path
 */
function _getParentPageURL(
  aParentId: string,
  aSiteId: string
): Observable<string> {
  // the query parameters
  const params = {};
  // construct the search string
  params[_KEY_SEARCH_Q] = _getParentExpression(aParentId);
  params[_KEY_SEARCH_FQ] = [
    _VALUE_SEARCH_FQ_PAGE,
    luceneEscapeKeyValue(_FQ_SITE_ID, aSiteId)
  ];
  params[_KEY_FIELD_LIST] = _VALUE_FIELD_LIST;
  params[_KEY_ROWS] = _VALUE_ONE_ROW;
  // build the final string
  return _getSearchURL(queryToString(params));
}

function _addDebug(
  aPath: string,
  aRenderingContext: RenderingContext
): RenderingContext {
  // adds debug info
  const debug: WchDebug = assertObject<WchDebug>(KEY_DEBUG, aRenderingContext);
  debug.path = aPath;
  // ok
  return aRenderingContext;
}

/**
 * Tests if a rendering context is just a reference
 *
 * @param aRenderingContext - the rendering context
 * @returns the reference if it is a reference, else undefined
 */
function getReference(aRenderingContext: RenderingContext): string {
  // extract
  const ref = aRenderingContext[KEY_REFERENCE];
  if (isNotNil(ref)) {
    return ref;
  }
  // access id and elements
  const { id, elements } = aRenderingContext;
  // check
  return isNil(elements) ? id : undefined;
}

/**
 *  Resolves the rendering context according to the configured strategy
 */
function _resolveRenderingContext(
  aRenderingContext: RenderingContext | null | undefined,
  aStrategy: CYCLE_HANDLING,
  aRenderingContextById: (
    id: string
  ) => Observable<RenderingContext | null | undefined>,
  aLogger?: Logger
): Observable<RenderingContext | null | undefined> {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // sanity check
  if (isNotNil(aRenderingContext)) {
    // access the context
    const allContexts: RenderingContextMap =
      aRenderingContext[KEY_RENDERING_CONTEXT_MAP];
    if (isNotNil(allContexts)) {
      // test if this is a reference
      const ref = getReference(aRenderingContext);
      if (isNotNil(ref)) {
        // check if we need to load this beast
        logger.info('lazyLoad', ref);
        // lazy load the context
        return aRenderingContextById(ref);
      }
      // resolve
      const id = aRenderingContext.id;
      // check if we have a resolved context
      const resolvedContext = allContexts[id];
      if (isNotNil(resolvedContext)) {
        // check if this represents a cyclic reference
        if (resolvedContext[KEY_CYCLE]) {
          // check if we need to load this beast
          logger.info('lazyLoad', id);
          // lazy load the context
          return aRenderingContextById(id);
        }
        // the strategy
        logger.info('cycleHandlingStrategy', aStrategy);
        // replace cyclic reference
        if (
          resolvedContext !== aRenderingContext &&
          aStrategy === CYCLE_HANDLING.RESOLVE
        ) {
          // replace the reference
          logger.info('replacing cyclic reference', id);
          // return this context
          return of(resolvedContext);
        }
      }
    } else {
      // test if this is a reference
      const ref = getReference(aRenderingContext);
      if (isNotNil(ref)) {
        // check if we need to load this beast
        logger.info('lazyLoad', ref);
        // lazy load the context
        return aRenderingContextById(ref);
      }
    }
  }
  // fallback to the original context
  return of(aRenderingContext);
}

const VALUE_ROOT = '$';

export declare type RenderingContextCallback = (
  rc: RenderingContext,
  parent?: RenderingContext,
  path?: string
) => void;

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _internalForEachRenderingContexts(
  aRenderingContext: RenderingContext[],
  aParent: RenderingContext | undefined,
  aPath: string,
  aCallback: RenderingContextCallback,
  aCycle: RenderingContextMap
) {
  // dispatch
  let lenContext = aRenderingContext.length;
  while (lenContext-- > 0) {
    // new path
    const path = `${aPath}[${lenContext}]`;
    // dispatch
    _internalForEachRenderingContext(
      aRenderingContext[lenContext],
      aParent,
      path,
      aCallback,
      aCycle
    );
  }
}

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _internalForEachGroup(
  aGroup: Group,
  aParent: RenderingContext | undefined,
  aPath: string,
  aCallback: RenderingContextCallback,
  aCycle: RenderingContextMap
) {
  // analyze the elements
  // tslint:disable-next-line:forin
  for (const elementName in aGroup) {
    // current element
    const element = aGroup[elementName];
    // check for the type
    if (isReferenceElement(element)) {
      // new path
      const path = `${aPath}.${elementName}`;
      // test for the values
      const e: any = element;
      const v: any = e.value || e.values;
      // check for
      if (isArray(v)) {
        // recurse across the values
        _internalForEachRenderingContexts(
          v as RenderingContext[],
          aParent,
          path,
          aCallback,
          aCycle
        );
      } else if (isNotNil(v)) {
        // assume a rendering context
        _internalForEachRenderingContext(
          v as RenderingContext,
          aParent,
          path,
          aCallback,
          aCycle
        );
      }
    } else if (isGroupElement(element)) {
      // extract the path
      const path = `${aPath}.${elementName}`;
      // new path
      _internalForEachGroupElement(element, aParent, path, aCallback, aCycle);
    }
  }
}

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _internalForEachGroups(
  aGroups: Group[],
  aParent: RenderingContext | undefined,
  aPath: string,
  aCallback: RenderingContextCallback,
  aCycle: RenderingContextMap
) {
  // dispatch
  let lenContext = aGroups.length;
  while (lenContext-- > 0) {
    // new path
    const path = `${aPath}[${lenContext}]`;
    // dispatch
    _internalForEachGroup(
      aGroups[lenContext],
      aParent,
      path,
      aCallback,
      aCycle
    );
  }
}

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _internalForEachGroupElement(
  aGroupElement: GroupElement,
  aParent: RenderingContext | undefined,
  aPath: string,
  aCallback: RenderingContextCallback,
  aCycle: RenderingContextMap
) {
  // test for the values
  const e: any = aGroupElement;
  const v: any = e.value || e.values;
  // check for
  if (isArray(v)) {
    // recurse across the values
    _internalForEachGroups(v as Group[], aParent, aPath, aCallback, aCycle);
  } else if (isNotNil(v)) {
    // assume a rendering context
    _internalForEachGroup(v as Group, aParent, aPath, aCallback, aCycle);
  }
}

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _internalForEachRenderingContext(
  aRenderingContext: RenderingContext,
  aParent: RenderingContext | undefined,
  aPath: string,
  aCallback: RenderingContextCallback,
  aCycle: RenderingContextMap
) {
  // recurse into reference elements
  const { id, elements } = aRenderingContext;
  // protecte against duplicate calls
  const oldContext = aCycle[id];
  if (isNil(oldContext)) {
    // insert
    aCycle[id] = aRenderingContext;
    // iterate over the children
    if (isNotNil(elements)) {
      // analyze the elements
      // tslint:disable-next-line:forin
      for (const elementName in elements) {
        // current element
        const element = elements[elementName];
        // check for the type
        if (isReferenceElement(element)) {
          // new path
          const path = `${aPath}.elements.${elementName}`;
          // test for the values
          const e: any = element;
          const v: any = e.value || e.values;
          // check for
          if (isArray(v)) {
            // recurse across the values
            _internalForEachRenderingContexts(
              v as RenderingContext[],
              aRenderingContext,
              path,
              aCallback,
              aCycle
            );
          } else if (isNotNil(v)) {
            // assume a rendering context
            _internalForEachRenderingContext(
              v as RenderingContext,
              aRenderingContext,
              path,
              aCallback,
              aCycle
            );
          }
        } else if (isGroupElement(element)) {
          // extract the path
          const path = `${aPath}.elements.${elementName}`;
          // new path
          _internalForEachGroupElement(
            element,
            aParent,
            path,
            aCallback,
            aCycle
          );
        }
      }
    }
    // notify about this context
    aCallback(aRenderingContext, aParent, aPath);
  }
}

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _forEachRenderingContexts(
  aRenderingContext: RenderingContext[],
  aCallback: RenderingContextCallback
) {
  // dispatch
  return _internalForEachRenderingContexts(
    aRenderingContext,
    undefined,
    VALUE_ROOT,
    aCallback,
    {}
  );
}

/**
 * Iterates over all rendering contexts referenced by this context
 *
 * @param aRenderingContext - the rendering context
 * @param aCallback - the callback
 */
function _forEachRenderingContext(
  aRenderingContext: RenderingContext,
  aCallback: RenderingContextCallback
) {
  // root name
  const ROOT_PATH = isNotNil(aRenderingContext)
    ? aRenderingContext.id
    : VALUE_ROOT;
  // dispatch
  return _internalForEachRenderingContext(
    aRenderingContext,
    undefined,
    ROOT_PATH,
    aCallback,
    {}
  );
}

/**
 * Returns the URI path for the rendering context
 *
 * @param aID - the ID
 * @returns the path
 */
function _getRenderingContextURL(aBaseUrl: string, aID: string): string {
  return `${aBaseUrl}context/${encodeURIComponent(aID)}`;
}

/**
 * Parses the base URL and returns the probable base URL suffix
 *
 * @param aBaseURL - the URL
 * @returns the suffix
 */
function _getBaseUrlSuffix(aBaseURL: URL): string {
  // parse the URL
  const [total, tenantId, siteId] = TENANT_BASED_URL_REGEXP.exec(
    aBaseURL.pathname
  );
  // handle the tenant case
  return tenantId
    ? siteId
      ? `${tenantId}/${DX_SITES}/${siteId}/`
      : `${tenantId}/`
    : siteId
    ? `${DX_SITES}/${siteId}/`
    : '';
}

/**
 * Extracts the base URL from the window location
 *
 * @param aLocation - the location object
 * @returns the base URL or undefined
 */
function _getBaseUrlFromLocation(aLocation?: Location): URL | undefined {
  // checks if we have a location
  if (isNotNil(aLocation)) {
    // access the url
    const url = parseURL(aLocation.href);
    // match
    const origin = url.origin;
    const urlSuffix = _getBaseUrlSuffix(url);
    // returns the base URL
    return parseURL(`${origin}/${urlSuffix}`);
  }
  // nothing decoded
  return UNDEFINED;
}

/**
 * Removes the preview string from the hostname
 *
 * @param aPreviewUrl - the preview URL
 * @returns the live URL
 */
function _getLiveUrlFromPreviewUrl(aPreviewUrl: URL): URL {
  // split the URL and replace
  return parseURL(aPreviewUrl.href.replace(PREVIEW_HREF_REGEXP, `$1$2`));
}

/**
 * Insert the preview string into the hostname
 *
 * @param aLiveUrl - the live URL
 * @returns the preview URL
 */
function _getPreviewUrlFromLiveUrl(aLiveUrl: URL): URL {
  // split the URL and replace
  return parseURL(
    aLiveUrl.href.replace(LIVE_HREF_REGEXP, `$1${PREVIEW_SUFFIX}$2`)
  );
}

/**
 * Constructs a API URL based on a context check callback
 *
 * @param aApiUrl - the configured API URL, can be the live or the preview URL
 * @param aPreviewMode - is preview active
 *
 * @returns the correct API URL
 */
function _getApiUrlFromPreview(aApiUrl: URL, aPreviewMode: boolean): URL {
  // check if the API URL is already correct
  const bApiUrlIsPreview = _isPreviewMode(aApiUrl);
  // check if we have to do anything
  if (bApiUrlIsPreview === aPreviewMode) {
    // nothing to do
    return aApiUrl;
  }
  // do the permutations
  return bApiUrlIsPreview
    ? _getLiveUrlFromPreviewUrl(aApiUrl)
    : _getPreviewUrlFromLiveUrl(aApiUrl);
}

/**
 * Constructs a API URL based on a context check callback
 *
 * @param aApiUrl - the configured API URL, can be the live or the preview URL
 * @param aBaseURL - the URL the system is loaded from, this is used to check for preview mode
 * @param aPreviewCheck - customer provided callback to test the baseURL for preview mode
 *
 * @returns the correct API URL
 */
function _getApiUrlInContext(
  aApiUrl: URL,
  aBaseURL: URL,
  aPreviewCheck: UnaryFunction<URL, boolean>
): URL {
  // dispatch
  return _getApiUrlFromPreview(aApiUrl, aPreviewCheck(aBaseURL));
}

/**
 * Returns a base URL from the window
 *
 * @param aWindow - the optional window object
 * @param aDocument - the document object
 *
 * @returns the base URL
 */
function _getBaseUrlFromWindow(
  aWindow?: Window,
  aDocument?: Document
): URL | undefined {
  try {
    // the doc
    const doc = getDocument(aDocument, aWindow);
    // check if we have a configuration link in the document
    const baseUrlLink = pluckHref(
      elementById<HTMLAnchorElement | HTMLLinkElement>(WCH_CONFIG_BASE_URL, doc)
    );
    if (isNotNil(baseUrlLink) && isString(baseUrlLink)) {
      // resolve the URL
      return parseURL(
        urlTrailingSlash(absoluteURL(baseUrlLink, aDocument, aWindow))
      );
    }
    // test if we have a window
    const wnd = getWindow(aWindow);
    if (isNotNil(wnd)) {
      // resolve by location
      return _getBaseUrlFromLocation(wnd.location);
    }
    // fallback to document
    return getBaseUrlFromDocument(aDocument, aWindow);
  } catch (error) {
    console.error(error);
    // nothing to return
    return UNDEFINED;
  }
}

/**
 * Decodes the base URL. The base URL is the URL that all routing URLs will start with and will
 * be resolved as relative. The URL ends with a slash character.  See {@link @acoustic-content-sdk/api:APP_BASE_URL}.
 *
 * @param aDocument - optionally the document
 * @param aWindow - optionally the window
 *
 * @returns the URL
 *
 */
export function wchGetBaseURL(aDocument?: Document, aWindow?: Window): URL {
  // get the base URI
  return _getBaseUrlFromWindow(aWindow, aDocument);
}

/**
 * Exposes a provider based on a API URL and a preview callback
 *
 * @param aApiUrl - the API URL
 * @param aPreviewCheck - callback to test if the base URL is a preview URL. If empty, use the built in default check
 *
 * @returns the provider
 */
function _hubInfoUrlProvider(
  aApiUrl: HubInfoUrlProvider,
  aPreviewCheck?: UnaryFunction<URL, boolean>
): HubInfoUrlProvider {
  // dispatch
  return rxPipe(
    rxUrlFromProvider(aApiUrl),
    map((apiUrl) =>
      _getApiUrlInContext(
        apiUrl,
        wchGetBaseURL() || apiUrl,
        aPreviewCheck || _isPreviewMode
      )
    )
  );
}

/**
 * Decodes the base href of the application from the config or the doc fallback
 *
 * @param aBaseUrl - the optional base URL
 * @param aDoc - the document
 *
 * @returns the path prefix that is supposed to be recognized as URLs
 */
function _getAppBaseURL(
  aBaseUrl?: HubInfoUrlProvider,
  aDoc?: Document
): Observable<string> {
  /**
   *  test if we can decode the URL from the config
   */
  return rxPipe(
    rxUrlFromProvider(aBaseUrl),
    map(createBaseURL),
    map((fromConfig) =>
      isString(fromConfig) ? fromConfig : createBaseURL(wchGetBaseURL(aDoc))
    )
  );
}

export const selectApiUrl = pluckProperty<UrlConfig, 'apiUrl'>('apiUrl');
export const selectResourceUrl = pluckProperty<UrlConfig, 'resourceUrl'>(
  'resourceUrl'
);
export const selectBaseUrl = pluckProperty<UrlConfig, 'baseUrl'>('baseUrl');
export const selectPreviewMode = pluckProperty<UrlConfig, 'isPreviewMode'>(
  'isPreviewMode'
);

/**
 * Tests if two UrlConfig objects are equal
 *
 * @param aLeft   - left object
 * @param aRight  - right object
 *
 * @returns true if the objects are equal
 */
export function urlConfigEquals(aLeft: UrlConfig, aRight: UrlConfig): boolean {
  return (
    isEqual(aLeft, aRight) ||
    (urlEquals(selectApiUrl(aLeft), selectApiUrl(aRight)) &&
      urlEquals(selectResourceUrl(aLeft), selectResourceUrl(aRight)) &&
      urlEquals(selectBaseUrl(aLeft), selectBaseUrl(aRight)) &&
      isEqual(selectPreviewMode(aLeft), selectPreviewMode(aRight)))
  );
}

/**
 * Tests if a value is a valid url config object
 *
 * @param aValue - the value to check
 * @returns true if the value is a url config
 */
export function isUrlConfig(aValue: any): aValue is UrlConfig {
  return (
    isNotNil(aValue) &&
    isURL(selectApiUrl(aValue)) &&
    isURL(selectResourceUrl(aValue))
  );
}

/**
 * Constructs a clone
 *
 * @param aUrlConfig - the URL config
 * @returns the clone
 */
export function cloneUrlConfig(aUrlConfig: UrlConfig): UrlConfig {
  return isNotNil(aUrlConfig)
    ? {
        apiUrl: parseURL(aUrlConfig.apiUrl),
        baseUrl: parseURL(aUrlConfig.baseUrl),
        isPreviewMode: aUrlConfig.isPreviewMode,
        resourceUrl: parseURL(aUrlConfig.resourceUrl)
      }
    : aUrlConfig;
}

/**
 * Constructs a {@link UrlConfig} interface based on some optional config values.
 *
 * @param aBaseUrl - The base URL used to access WCH APIs.
 * @param aApiUrl - The base URL used to access WCH APIs.
 * @param aResourceUrl - The base URL used to access WCH delivery resources.
 * @param aDocument - The current document
 *
 * @returns the derived URL config
 */
export function wchCreateUrlConfig(
  aBaseUrl?: HubInfoUrlProvider,
  aApiUrl?: HubInfoUrlProvider,
  aResourceUrl?: HubInfoUrlProvider,
  aDocument?: Document
): Observable<UrlConfig> {
  /**
   * Decode the resource base
   */
  const docUrl = getBaseUrlFromDocument(aDocument);

  /**
   * Decode the base URL from the configuration or fall back to the global window
   */
  const baseUrl$ = rxPipe(
    _getAppBaseURL(aBaseUrl, aDocument),
    map(parseURL),
    distinctUntilChanged(),
    shareReplay(1)
  );

  /**
   * decode the fallback
   */
  const cfgFallback$ = rxPipe(
    baseUrl$,
    map((baseUrl) =>
      _mergeHubInfo(
        _getHubInfoFromBaseURL(baseUrl),
        _getHubInfoFromLinks(aDocument)
      )
    ),
    shareReplay(1)
  );

  /**
   *  the configured values
   */
  const infoApiUrl$ = rxPipe(rxUrlFromProvider(aApiUrl), shareReplay(1));
  const infoResourceUrl$ = rxPipe(
    rxUrlFromProvider(aResourceUrl),
    shareReplay(1)
  );

  /**
   *  init the base paths
   */
  const apiRoot$ = rxPipe(
    combineLatest([infoApiUrl$, infoResourceUrl$, cfgFallback$]),
    map(([infoApiUrl, infoResourceUrl, cfgFallback]) =>
      createBaseURL(
        infoApiUrl
          ? infoApiUrl
          : infoResourceUrl
          ? _getApiUrlFromResourceURL(infoResourceUrl)
          : parseURL(cfgFallback.apiUrl)
      )
    ),
    distinctUntilChanged(),
    shareReplay(1)
  );

  const resourceRoot$ = rxPipe(
    combineLatest([infoApiUrl$, infoResourceUrl$, cfgFallback$]),
    map(([infoApiUrl, infoResourceUrl, cfgFallback]) =>
      createBaseURL(
        infoResourceUrl
          ? infoResourceUrl
          : infoApiUrl
          ? _getResourceUrlFromApiURL(infoApiUrl)
          : parseURL(cfgFallback.resourceUrl)
      )
    ),
    distinctUntilChanged(),
    shareReplay(1)
  );

  /**
   * Decode the final config
   */
  return rxPipe(
    // we need contributions from all URLs
    combineLatest([apiRoot$, resourceRoot$, baseUrl$]),
    map(([apiRoot, resourceRoot, baseUrl]) => {
      // parse and assemble
      const apiUrl = parseURL(apiRoot);
      const resourceUrl = parseURL(resourceRoot);
      const isPreviewMode = _isPreviewMode(apiUrl);
      // produces the actual config
      return {
        apiUrl,
        baseUrl,
        docUrl,
        isPreviewMode,
        resourceUrl
      };
    }),
    distinctUntilChanged(urlConfigEquals)
  );
}

export {
  _hubInfoUrlProvider as wchGetHubInfoUrlProvider,
  _getBaseUrlFromWindow as getBaseUrlFromWindow,
  _mergeHubInfo as mergeHubInfo,
  _getApiUrlInContext as wchGetApiUrlInContext,
  _getHubInfoFromLinks as wchGetHubInfoFromLinks,
  _getHubInfoFromBaseURL as wchGetHubInfoFromBaseURL,
  _getResourceUrlFromApiURL as wchGetResourceUrlFromApiURL,
  _getApiUrlFromResourceURL as wchGetApiUrlFromResourceURL,
  _getLayout as wchGetLayout,
  _isPreviewMode as wchIsPreviewMode,
  _isPreviewOrigin as wchIsPreviewOrigin,
  _boxLayoutMode as wchBoxLayoutMode,
  _boxFetchLevels as wchBoxFetchLevels,
  _getCycleHandling as wchCycleHandling,
  _DEFAULT_FETCH_LEVELS as DEFAULT_FETCH_LEVELS,
  _addDebug as wchAddDebug,
  _adjustRenderingContextSearchQuery as wchAdjustRenderingContextSearchQuery,
  _adjustSitePagesSearchQuery as wchAdjustSitePagesSearchQuery,
  _resolveRenderingContext as wchResolveRenderingContext,
  _getSearchURL as wchGetSearchURL,
  _getPageSearchURL as wchGetPageSearchURL,
  _getSiteContextURL as wchGetSiteContextURL,
  _getParentPageURL as wchGetParentPageURL,
  _forEachRenderingContext as wchForEachRenderingContext,
  _forEachRenderingContexts as wchForEachRenderingContexts,
  _getRenderingContextURL as wchGetRenderingContextURL
};
