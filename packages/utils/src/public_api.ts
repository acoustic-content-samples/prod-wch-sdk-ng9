/* Copyright IBM Corp. 2018 */

/**
 * This library contains a set of utility functions to help implementing applications of libraries against [Watson Content Hub](https://www.ibm.com/products/watson-content-hub).
 *
 * Some functions are very general purpose helper functions. We use them instead of 'lodash' to reduce size and improve speed.
 *
 * @packageDocumentation
 */

export { CacheAccessor, CacheCallback, createCache } from './cache/cache.utils';
export { createLruCache } from './cache/lru.utils';
export { rxCachedFunction } from './cache/rx.cache';
export { getCategoryLeaf } from './categories/categories';
export { cmpNumbers, cmpStrings, Comparator, safeCmp } from './compare/compare';
export { BiConsumer, BiFunction, Consumer } from './consumers/consumer';
export { wchDeliveryContentByAccessor } from './content/delivery.content';
export {
  isAuthoringGroup,
  isAuthoringImage,
  isAuthoringReference,
  isAuthoringReferenceValue,
  isAuthoringText,
  isAuthoringVideo
} from './content/elements';
export { dbgAddSource, dbgCounter } from './debug/debug.utils';
export {
  isCategory,
  isCategoryElement,
  isDateElement,
  isElement,
  isElementType,
  isFile,
  isFileElement,
  isFormattedTextElement,
  isGroupElement,
  isImage,
  isImageElement,
  isLink,
  isLinkElement,
  isLocation,
  isLocationElement,
  isMultiDateElement,
  isMultiFileElement,
  isMultiFormattedTextElement,
  isMultiGroupElement,
  isMultiImageElement,
  isMultiLinkElement,
  isMultiNumberElement,
  isMultiOptionSelectionElement,
  isMultiProductElement,
  isMultiReferenceElement,
  isMultiTextElement,
  isMultiToggleElement,
  isMultiVideoElement,
  isNumberElement,
  isOptionSelectionElement,
  isProductElement,
  isReferenceElement,
  isSingleDateElement,
  isSingleFileElement,
  isSingleFormattedTextElement,
  isSingleGroupElement,
  isSingleImageElement,
  isSingleLinkElement,
  isSingleNumberElement,
  isSingleOptionSelectionElement,
  isSingleProductElement,
  isSingleReferenceElement,
  isSingleTextElement,
  isSingleToggleElement,
  isSingleVideoElement,
  isTextElement,
  isToggleElement,
  isValueOf,
  isVideo,
  isVideoElement
} from './elements/element';
export {
  getAuthoringConfigElements,
  getAuthoringContentElements,
  isAuthoringConfigElement,
  isAuthoringContentElement
} from './elements/type';
export { createError, isErrorResponse } from './error/error';
export {
  constGenerator,
  fromGeneratorOrT,
  Generator,
  GeneratorOrT
} from './generators/generator';
export { lazyGenerator } from './generators/lazy.generator';
export {
  hashRandomClassName,
  hashRandomIdentifier,
  hashRandomLinkName,
  hashString,
  hashToClassName,
  hashToIdentifier,
  hashToLinkName,
  longHash
} from './hash/hash.utils';
export { escapeHtml } from './html/html';
export {
  DEFAULT_HTTP_RESOURCE_OPTIONS,
  httpCreateTimer,
  httpGetJsonResource,
  httpGetStringResource,
  HttpOptions,
  HttpService,
  Request,
  sendJsonRequest,
  sendRequest,
  sendTextRequest
} from './http/http.utils';
export {
  cmpByLocalizedContext,
  isLocalizedText,
  localizedText,
  pluckLocale,
  pluckText
} from './i18n/localized';
export { cancelExecuteLater, executeLater } from './idle/idle';
export {
  and,
  biCompose,
  biComposeMono,
  chunkArray,
  compose,
  composeAll,
  flattenArray,
  flipArgs,
  forEach,
  forIn,
  mapArray,
  Maybe,
  not,
  or,
  partialFirst,
  partialSecond,
  propertyFromObject,
  reduceArray,
  spreadArgs,
  SpreadArgs,
  ternary,
  toArray,
  zipArgs,
  ZippedArgs
} from './js/js.core';
export {
  anyToString,
  arrayEquals,
  arrayPush,
  assertArray,
  assertFromFunction,
  assertFromGenerator,
  assertObject,
  assignObject,
  binary,
  bind,
  Bind,
  bindKey,
  BindKey,
  bindMember,
  BindMember,
  byProperty,
  cloneDeep,
  createGetter,
  deepEquals,
  filterArray,
  firstElement,
  Function0,
  Function1,
  Function2,
  Function3,
  Function4,
  FUNCTION_TYPE,
  isDeepEqualTo,
  lastElement,
  mergeObjects,
  nary,
  nullary,
  objectAssign,
  objectEquals,
  objectKeys,
  Partial,
  partialLeft,
  reduceForIn,
  reduceToObject,
  shallowEquals,
  toInteger,
  unary,
  UNDEFINED_TYPE
} from './js/js.utils';
export { getProperty, pluckProperty } from './js/pluck';
export { binarySearch } from './js/search';
export {
  JSONArray,
  JSONObject,
  jsonParse,
  jsonStringEscape,
  jsonStringify,
  JSONValue
} from './json/json.utils';
export {
  authoringLayoutMappingToDeliveryLayoutMapping,
  authoringLayoutToDeliveryLayout,
  DEFAULT_LAYOUT_MAPPING,
  DEFAULT_LAYOUT_MODE,
  LAYOUT_TYPE_ANGULAR,
  LAYOUT_TYPE_HANDLEBARS
} from './layouts/layout';
export { rxLayoutIdFromRenderingContext } from './layouts/rx.layout';
export {
  createConsoleLogger,
  createEmptyLogger
} from './logger/console.logger';
export { createLoggerService } from './logger/logger.service';
export {
  boxLoggerService,
  NOOP_LOGGER_SERVICE
} from './logger/noop.logger.service';
export {
  rxError,
  rxLog,
  rxLogAll,
  RxLogger,
  rxLogMember,
  rxLogNext,
  rxNext
} from './logger/rx.logger';
export { logModule } from './logger/version';
export { createMessageHandler } from './messages/message.event';
export { createNavigateByPathHandler } from './messages/navigate.by.path.handler';
export { createRefreshHandler } from './messages/refresh.handler';
export { createSetModeHandler } from './messages/set.mode.handler';
export { createSubscribeActiveRouteHandler } from './messages/subscribe.active.route.handler';
export { createUnsubscribeHandler } from './messages/subscribe.handler';
export { createSubscribeModeHandler } from './messages/subscribe.mode.handler';
export { createSubscribeRouteHandler } from './messages/subscribe.route.handler';
export { identity, noop } from './misc';
export {
  cacheLast,
  deepDistinctUntilChanged,
  filterArrayOf,
  filterBoolean,
  filterNotNil,
  filterNumber,
  filterObject,
  filterString,
  filterTypeOf,
  mapDefault,
  mapTypeOf,
  opBoxLayoutMode,
  opCacheLast,
  opDeepDistinctUntilChanged,
  opDistinctUntilChanged,
  opFalse,
  opFilterBoolean,
  opFilterNever,
  opFilterNotNil,
  opFilterNumber,
  opFilterObject,
  opFilterString,
  opJsonParse,
  opLevels,
  opNot,
  opPageArrayDistinctUntilChanged,
  opPageDistinctUntilChanged,
  opPluckApiOrigin,
  opPluckCurrentPage,
  opPluckDistinctPage,
  opPluckResourceOrigin,
  opReplayLast,
  opShallowDistinctUntilChanged,
  opShareLast,
  opTrue,
  pageArrayDistinctUntilChanged,
  pageDistinctUntilChanged,
  pluckApiOrigin,
  pluckCurrentPage,
  pluckResourceOrigin,
  replayLast,
  rxBackpressure,
  rxMemoize,
  rxPluckPath,
  rxSelectPath,
  rxSelectProperty,
  safeMergeMap,
  safeSwitchMap,
  shareLast,
  switchMapDefault,
  typedPluck
} from './operators/operators';
export { getPath, parsePath, pluckPath } from './path/path';
export { perfMeasure } from './perf/perf.utils';
export {
  isAuthoringGroupElement,
  PlaceholderResolver,
  rxWchFromAuthoringTypeByAccessor,
  wchAuthoringElementFromAccessor,
  wchForEachType,
  wchInsertPlaceholders,
  wchPlaceholderFromAccessor,
  wchPlaceholderResolver,
  wchResolveType,
  wchTypeFromAccessor
} from './placeholder/placeholder';
export {
  EqualsPredicate,
  isAbsoluteURL,
  isArray,
  isArrayLike,
  isArrayLikeOf,
  isArrayOf,
  isBoolean,
  isDate,
  isEmpty,
  isEqual,
  isEqualTo,
  isFunction,
  isNever,
  isNil,
  isNilOrEmpty,
  isNotEmpty,
  isNotNil,
  isNumber,
  isObjectOf,
  isObservable,
  isOptional,
  isOptionalArrayOf,
  isPlainObject,
  IsPredicate,
  isRenderingContextProvider,
  isString,
  isStringArray,
  isUndefined,
  isURL,
  Predicate
} from './predicates/predicates';
export { lazyProxy } from './proxy/lazy.proxy';
export {
  createDeliveryContentItem,
  createDeliveryContentItemWithMetadata
} from './rendering/convert';
export { isMetadata, isRenderingContextV2 } from './rendering/predicates';
export { createMarkupRendererV2, MarkupTemplate } from './rendering/renderer';
export {
  RenderingContextInterceptors,
  wchAddTypings,
  wchDecodeAccessor,
  wchDecodeExpression,
  wchElementFromRenderingContext,
  wchPrepareRenderingContextInterceptors,
  wchSelectAccessor
} from './rendering/rendering';
export { getItemStatus, ItemStatus } from './rendering/status';
export {
  createConsumerOnSubject,
  createGetterOnObservable,
  createObservableAdaptor,
  createObserverConsumer,
  createSetterOnSubject,
  createSingleSubject,
  EMPTY_JSON_OBSERVABLE,
  EMPTY_STRING_OBSERVABLE,
  FALSE$,
  fromObservableOrT,
  generateItem,
  idleFrameScheduler,
  NULL$,
  ObservableOrT,
  ObserverConsumer,
  rxCompose,
  RxCompose,
  rxPipe,
  RxPipe,
  rxWithSubscriptionCount,
  safeUnsubscribe,
  safeUnsubscribeAll,
  thisThenThat,
  thisThenThats,
  TRUE$,
  UNDEFINED$
} from './rx/rx.utils';
export {
  luceneEscapeKeyValue,
  luceneEscapeKeyValueAnd,
  luceneEscapeKeyValueOr,
  luceneEscapeTerm,
  SEARCH_MAX_ROWS
} from './search/search.utils';
export {
  pageArrayEquals,
  pageCloneSitePage,
  pageCreatePartialSiteContextForSitePage,
  pageCreateSiteContextFromSearchResult,
  pageEquals,
  pageFromRenderingContext,
  pageGetEncodedPath,
  siteContextEquals,
  SiteInformation,
  wchGetSiteURL
} from './site/site.utils';
export { EMPTY_SITE_CONTEXT } from './site/sites.constants';
export { StaticResources } from './static/static.resources';
export {
  ClientStorage,
  clientStorageFromWindow
} from './storage/clientstorage';
export { ClientStorageService } from './storage/storage.service';
export { kebabCase } from './strings/kebab.case';
export {
  authoringTypeToDeliveryType,
  isDeliveryReferenceElement
} from './type/type';
export {
  absoluteURL,
  cloneURL,
  getBaseUrlFromDocument,
  getLinksByRel,
  getOrigin,
  ParsedQuery,
  parseQueryString,
  parseURL,
  pathForSearch,
  queryToCanonicalString,
  queryToString,
  urlEquals,
  urlSlashes,
  urlToString,
  slugify,
  uniquifyPath,
  isValidPath
} from './url/url.utils';
export { MODULE, VERSION } from './version';
export { isEqualVersion } from './version/version';
export {
  cloneUrlConfig,
  DEFAULT_FETCH_LEVELS,
  EMPTY_RENDERING_CONTEXT,
  getBaseUrlFromWindow,
  isUrlConfig,
  KEY_CYCLE,
  KEY_LAYOUT_MODE,
  KEY_LEVELS,
  KEY_RENDERING_CONTEXT,
  KEY_RENDERING_CONTEXT_MAP,
  mergeHubInfo,
  RenderingContextMap,
  rxUrlFromProvider,
  selectApiUrl,
  selectBaseUrl,
  selectPreviewMode,
  selectResourceUrl,
  UNDEFINED_RENDERING_CONTEXT,
  urlConfigEquals,
  urlFromProvider,
  wchAddDebug,
  wchAdjustRenderingContextSearchQuery,
  wchAdjustSitePagesSearchQuery,
  wchBoxFetchLevels,
  wchBoxLayoutMode,
  wchCreateUrlConfig,
  wchCycleHandling,
  wchForEachRenderingContext,
  wchGetApiUrlFromResourceURL,
  wchGetApiUrlInContext,
  wchGetBaseURL,
  wchGetHubInfoFromBaseURL,
  wchGetHubInfoFromLinks,
  wchGetHubInfoUrlProvider,
  wchGetLayout,
  wchGetPageSearchURL,
  wchGetParentPageURL,
  wchGetResourceUrlFromApiURL as wchGetDeliveryUrlFromApiURL,
  wchGetResourceUrlFromApiURL,
  wchGetSearchURL,
  wchGetSiteContextURL,
  wchIsPreviewMode,
  wchResolveRenderingContext
} from './wch/wch.utils';
