import {
  AuthoringElement,
  AuthoringGroupElement,
  AuthoringLayoutMapping,
  AuthoringLayoutMappingMapping,
  AuthoringType,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  DeliveryContentItem,
  DeliveryContentMetadata,
  DeliveryGroupElement,
  DeliveryReferenceElement,
  DeliverySelectedLayouts,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_REFERENCE,
  ExtendedContextV2,
  KEY_ACCESSOR,
  KEY_ID,
  KEY_METADATA,
  KEY_TYPE_ID,
  KEY_TYPE_REF,
  Layout,
  Logger,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { rxDiff } from '@acoustic-content-sdk/diff';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  of,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';

import { rxCachedFunction } from '../cache/rx.cache';
import { hashString, hashToIdentifier, longHash } from '../hash/hash.utils';
import { escapeHtml } from '../html/html';
import { forIn, mapArray, spreadArgs, UNDEFINED } from '../js/js.core';
import {
  anyToString,
  arrayPush,
  objectAssign,
  reduceForIn,
  reduceToObject,
  shallowEquals
} from '../js/js.utils';
import { getProperty, pluckLength, pluckProperty } from '../js/pluck';
import { jsonStringify } from '../json/json.utils';
import { DEFAULT_LAYOUT_MODE } from '../layouts/layout';
import { rxLogAll, rxNext } from '../logger/rx.logger';
import {
  opDistinctUntilChanged,
  opReplayLast,
  opShareLast,
  safeSwitchMap
} from '../operators/operators';
import { pluckPath } from '../path/path';
import { rxWchFromAuthoringTypeByAccessor } from '../placeholder/placeholder';
import {
  isArray,
  isEqual,
  isNil,
  isNilOrEmpty,
  isNotEmpty,
  isNotNil
} from '../predicates/predicates';
import { rxPipe, UNDEFINED$ } from '../rx/rx.utils';

const USE_DEBOUNCE_TIME = true;
const USE_ASSERTS = false;
const USE_DIFF = false;

const KEY_ELEMENTS = 'elements';
const KEY_SELECTED_LAYOUTS = 'selectedLayouts';

const EMPTY_STRING = '';

const CLASSIFICATION_MARKUP_TEMPLATE = 'markup-template';

/**
 * Helper function to log diffs
 *
 * @param aLogger - logger used for the diffs
 * @returns the generator function
 */
function createDiff<T extends object>(
  aLogger: Logger
): UnaryFunction<string, MonoTypeOperatorFunction<T>> {
  return USE_DIFF ? rxDiff<T>(aLogger) : () => tap<T>();
}

function hash(aValue: any): string {
  return hashToIdentifier(
    hashString(longHash(), aValue ? jsonStringify(aValue) : EMPTY_STRING)
  );
}

function assertNotNil(aValue: any, aHint: string) {
  if (USE_ASSERTS && isNil(aValue)) {
    // tslint:disable-next-line:no-console
    console.warn('assertNotNil', aValue, aHint);
  }
}

/**
 * Selects the accessor from the rendering context
 */
const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);

interface SelectedLayoutsMetadata {
  selectedLayouts?: DeliverySelectedLayouts;
}

interface SelectedLayoutsProvider {
  $metadata?: SelectedLayoutsMetadata;
}

const templateExtractor = pluckProperty<Layout, 'template'>('template');
const metadataExtractor = pluckProperty<
  DeliveryContentItem,
  typeof KEY_METADATA
>(KEY_METADATA);

const selectedLayoutsExtractor = pluckPath<DeliverySelectedLayouts>([
  KEY_METADATA,
  KEY_SELECTED_LAYOUTS
]);

const idExtractor = pluckPath<string>([KEY_METADATA, KEY_ID]);

const typeFromContentExtractor = pluckPath<string>([KEY_METADATA, KEY_TYPE_ID]);
const typeFromGroupExtractor = pluckPath<string>([KEY_TYPE_REF, KEY_TYPE_ID]);
const typeFromAuthoringElementExtractor = pluckPath<string>([
  KEY_TYPE_REF,
  KEY_ID
]);

/**
 * Maps from string to the rendering context
 */
declare type ContextMap = Record<string, Observable<string>>;

/**
 * Contains the IDs in the current rendering path
 */
declare type ContextPath = Record<string, string>;

declare type PartialRenderingContext = Exclude<RenderingContextV2, '$context'>;

declare type DeliveryElementType =
  | DeliveryContentItem[keyof DeliveryContentItem]
  | DeliveryContentItem
  | DeliveryContentItem[];
declare type RenderingElementType = RenderingContextV2[keyof RenderingContextV2];

export type MarkupTemplate = UnaryFunction<
  RenderingContextV2,
  Observable<string>
>;

declare type TypeInfo = Record<string, AuthoringElement>;

declare type LayoutMappingInfo = Record<string, string>;

const EMPTY_LAYOUT_MAPPING_INFO: LayoutMappingInfo = {};

/**
 * the context used to render an item
 */
interface Context {
  pending: ContextMap;
  path: ContextPath;
}

const typeKeyExtractor = pluckProperty<AuthoringElement, 'key'>('key');

const typeElementsExtractor = pluckProperty<AuthoringType, typeof KEY_ELEMENTS>(
  KEY_ELEMENTS
);

/**
 * Produces some error markup
 *
 * @param error - the error object
 * @param aId - ID of the rendered item
 * @param aAccessor - accessor string
 *
 * @returns the actual error markup
 */
const errorMarkup = (
  error: any,
  aId: string,
  aAccessor: string = KEY_ELEMENTS
) =>
  of(
    `<pre>${escapeHtml(anyToString(error))} @ ${escapeHtml(aId)}#${escapeHtml(
      aAccessor
    )}</pre>`
  );

/**
 * Produces an error if the ID is missing
 */
const missingIdMarkup = (aId: string) => errorMarkup('Missing ID.', aId);

/**
 * Tests if the ID is invalid
 */
const isInvalidId = isNilOrEmpty;

/**
 * Convers the authoring type to a more useful structure
 *
 * @param aType - the type to convert
 * @returns the type info, organized by keys
 */
const authTypeToTypeInfo = (aType: AuthoringType): TypeInfo =>
  reduceToObject(typeElementsExtractor(aType), typeKeyExtractor);

const layoutModeFromMappingExtractor = pluckProperty<
  AuthoringLayoutMappingMapping,
  'layoutMode'
>('layoutMode', DEFAULT_LAYOUT_MODE);

const layoutIdFromLayoutExtractor = pluckPath<string>(['defaultLayout', 'id']);

const layoutModeFromSelectedExtractor = pluckProperty<any, 'layoutMode'>(
  'layoutMode',
  DEFAULT_LAYOUT_MODE
);

const layoutIdFromSelectedExtractor = pluckPath<string>(['layout', 'id']);

const selectedLayoutsToLayoutMappingInfo = (
  aSelectedLayouts?: DeliverySelectedLayouts
): LayoutMappingInfo =>
  reduceToObject(
    aSelectedLayouts,
    layoutModeFromSelectedExtractor,
    layoutIdFromSelectedExtractor
  );

/**
 * Converts the layout mapping info down to a mapping from layout mode
 * to layout ID
 *
 * @param aMapping - the layout mapping
 *
 * @returns the mapping information
 */
const authLayoutMappingToLayoutMappingInfo = (
  aMapping: AuthoringLayoutMapping
): LayoutMappingInfo =>
  isNotNil(aMapping)
    ? reduceToObject<AuthoringLayoutMappingMapping, string>(
        aMapping.mappings,
        layoutModeFromMappingExtractor,
        layoutIdFromLayoutExtractor
      )
    : EMPTY_LAYOUT_MAPPING_INFO;

/**
 * Reconstruct the elements object
 *
 * @param aKeys - the keys of the target object
 * @param aValues - the values of the target object
 *
 * @returns the reconstructed object
 */
function createElements(aKeys: string[], aValues: RenderingElementType[]) {
  // length
  let len = pluckLength(aKeys);
  const dst = {};
  while (len--) {
    objectAssign(aKeys[len], aValues[len], dst);
  }
  // ok
  return dst as PartialRenderingContext;
}

/**
 * Implements a cached function from a callback and a transform
 *
 * @param aCallback - the callback function that should be cached
 * @param aTransform - the transformation
 *
 * @returns a function that implements the desired caching
 */
function cachedTransform<T, R>(
  aCallback: UnaryFunction<string, Observable<T>>,
  aTransform: UnaryFunction<T, R>
): UnaryFunction<string, Observable<R>> {
  return rxCachedFunction((aID) => rxPipe(aCallback(aID), map(aTransform)));
}

/**
 * Decodes the desired layout from the layout mapping info
 *
 * @param aLayoutMode - the mode
 * @param aInfo - the info
 *
 * @returns the layout
 */
const layoutIdFromLayoutMappingInfo = (
  aLayoutMode: string,
  aInfo: LayoutMappingInfo
): string =>
  aLayoutMode !== DEFAULT_LAYOUT_MODE
    ? aInfo[aLayoutMode] || aInfo[DEFAULT_LAYOUT_MODE]
    : aInfo[aLayoutMode];

/**
 * Actually apply the handlebars template, applying performance metrics
 *
 * @param aTemplate - template
 * @param aContext - context
 * @param aLogOperator - logging operator
 *
 * @returns the rendered string
 */
const applyTemplateWithMetrics = (
  aTemplate: MarkupTemplate,
  aContext: RenderingContextV2,
  aLogger: Logger
): Observable<string> => {
  // select the accessor
  const { $metadata } = aContext;
  const { id, accessor } = $metadata;
  // apply the template
  return rxPipe(
    aTemplate(aContext),
    catchError((error) => errorMarkup(error, id, accessor)),
    tap(() => aLogger.info('applyTemplateWithMetrics', id, accessor))
  );
};

/**
 * Copies the keys from the type and the values from the context into a new object
 *
 * @param aType  - the type to copy
 * @param aContext - the context
 *
 * @returns the keys
 */
const copyKeys = (aType: TypeInfo, aContext: RenderingContextV2) =>
  reduceForIn(
    aType,
    (aDst, aElement: AuthoringElement, aKey: string) =>
      objectAssign(aKey, aContext[aKey], aDst),
    {}
  );

const LOGGER = 'createMarkupRendererV2';

/**
 * Constructs a new renderer that applies a handlebars transform to produce rendered markup. The
 * markup will be kept current whenever any of the underlying data changes.
 *
 * @param aDeliveryContent - callback function to load a content item
 * @param aMarkupTemplate - callback function to load the markup template from the delivery content item
 * @param aLogger  - optional logger
 * @param aScheduler - optional scheduler
 *
 * @returns a function that maps from content item ID to an obervable of the rendered markup
 */
export function createMarkupRendererV2(
  aDeliveryContent: UnaryFunction<string, Observable<DeliveryContentItem>>,
  aAuthoringType: UnaryFunction<string, Observable<AuthoringType>>,
  aLayoutMapping: UnaryFunction<string, Observable<AuthoringLayoutMapping>>,
  aLayout: UnaryFunction<string, Observable<Layout>>,
  aMarkupTemplate: UnaryFunction<string, Observable<MarkupTemplate>>,
  aExtendedContext$: Observable<ExtendedContextV2>,
  aLoggerService: LoggerService,
  aScheduler: SchedulerLike = queueScheduler
): (aId: string, aLayoutMode?: string) => Observable<string> {
  // construct a logger
  const logger = aLoggerService.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  const logAll: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxLogAll(
    logger
  );
  const diff: <T extends object>(
    aInfo: string
  ) => MonoTypeOperatorFunction<T> = createDiff(logger);
  // some utility operators
  const combineArray = <T>(aArray: ObservableInput<T>[]) =>
    USE_DEBOUNCE_TIME
      ? rxPipe(combineLatest(aArray, aScheduler), debounceTime(0))
      : combineLatest(aArray, aScheduler);
  const combinePair = <T1, T2>(
    aLeft: ObservableInput<T1>,
    aRight: ObservableInput<T2>
  ) =>
    USE_DEBOUNCE_TIME
      ? rxPipe(combineLatest(aLeft, aRight, aScheduler), debounceTime(0))
      : combineLatest(aLeft, aRight, aScheduler);
  const single = <T>(aValue: T) => of(aValue, aScheduler);

  // implements a cached function callback
  function rxCached<T>(
    aDelegate: UnaryFunction<string, Observable<T>>,
    aName: string
  ): UnaryFunction<string, Observable<T>> {
    // construct the function
    const delegate = rxCachedFunction(aDelegate);
    // wrap the cached function with logging
    return (id) => rxPipe(delegate(id), logAll(aName, id));
  }

  // cached version of the callbacks
  const authoringType = rxCached(aAuthoringType, CLASSIFICATION_CONTENT_TYPE);
  const deliveryContent = rxCached(aDeliveryContent, CLASSIFICATION_CONTENT);
  const layoutMapping = rxCached(aLayoutMapping, CLASSIFICATION_LAYOUT_MAPPING);
  const layout = rxCached(aLayout, CLASSIFICATION_LAYOUT);
  const markupTemplate = rxCached(
    aMarkupTemplate,
    CLASSIFICATION_MARKUP_TEMPLATE
  );

  /**
   * Definition of the empty string
   */
  const EMPTY_STRING$ = single(EMPTY_STRING);

  /**
   * Some derived caches
   */
  const typeInfo = cachedTransform(authoringType, authTypeToTypeInfo);
  const layoutMappingInfo = cachedTransform(
    layoutMapping,
    authLayoutMappingToLayoutMappingInfo
  );

  /**
   * Decodes the typeid from the content item and takes the accessor string
   * in the metadata into account
   *
   * @param aItem - the content item to decode the type from
   * @returns the resolved item
   */
  const getTypeIdFromContentItem = (
    aItem: DeliveryContentItem
  ): Observable<string> => {
    // select the root type and the accessor
    const typeId = typeFromContentExtractor(aItem);
    const accessor = selectAccessor(aItem);
    // special case for the root level type
    return isEqual(accessor, KEY_ELEMENTS)
      ? single(typeId)
      : rxWchFromAuthoringTypeByAccessor(
          accessor,
          typeId,
          typeFromAuthoringElementExtractor,
          authoringType,
          aScheduler
        );
  };

  /**
   * Decodes the layout id from a type or provider
   *
   * @param aTypeId - the type ID
   * @param aLayoutMode - the layout mode
   * @param aProvider - the selected layout provider
   *
   * @returns the decoded layout
   */
  function getLayoutId(
    aTypeId: string,
    aLayoutMode: string,
    aProvider: SelectedLayoutsProvider
  ): Observable<string> {
    // extract the selected layout
    const layoutId = layoutIdFromLayoutMappingInfo(
      aLayoutMode,
      selectedLayoutsToLayoutMappingInfo(selectedLayoutsExtractor(aProvider))
    );
    // if set on the object, return it
    if (isNotNil(layoutId)) {
      return single(layoutId);
    }
    // else fallback to the type
    return isNotEmpty(aTypeId)
      ? rxPipe(
          layoutMappingInfo(aTypeId),
          map((info) => layoutIdFromLayoutMappingInfo(aLayoutMode, info))
        )
      : UNDEFINED$;
  }

  /**
   * Decodes the layout template from a type or provider
   *
   * @param aTypeId - the type ID
   * @param aLayoutMode - the layout mode
   * @param aProvider - the selected layout provider
   *
   * @returns the decoded layout
   */
  const getLayoutTemplate = (
    aTypeId: string,
    aLayoutMode: string,
    aProvider: SelectedLayoutsProvider
  ): Observable<string> =>
    rxPipe(
      getLayoutId(aTypeId, aLayoutMode, aProvider),
      opDistinctUntilChanged,
      safeSwitchMap(layout),
      map(templateExtractor),
      log('getLayoutTemplate', aTypeId, aLayoutMode)
    );

  /**
   * Decodes the markup template from a type or provider
   *
   * @param aTypeId - the type ID
   * @param aLayoutMode - the layout mode
   * @param aProvider - the selected layout provider
   *
   * @returns the markup template
   */
  const getTemplate = (
    aTypeId: string,
    aLayoutMode: string,
    aProvider: SelectedLayoutsProvider
  ): Observable<MarkupTemplate> =>
    rxPipe(
      getLayoutTemplate(aTypeId, aLayoutMode, aProvider),
      opDistinctUntilChanged,
      safeSwitchMap(markupTemplate)
    );

  // we only need to compute the context, once
  const extendedContext$ = aExtendedContext$;

  /**
   * Actually apply the handlebars template
   *
   * @param aTemplate - template
   * @param aContext - context
   *
   * @returns the rendered string
   */
  function applyTemplate(
    aTemplate: MarkupTemplate,
    aContext: RenderingContextV2
  ): Observable<string> {
    // sanity check
    return isNotNil(aTemplate) && isNotNil(aContext)
      ? applyTemplateWithMetrics(aTemplate, aContext, logger)
      : EMPTY_STRING$;
  }

  /**
   * Maps a single reference element
   *
   * @param aElement  - the reference element
   * @param aLayoutMode - the layout mode
   * @param aCtx - the context
   *
   * @returns the mapped type
   */
  const mapReferenceElement = (
    aElement: DeliveryReferenceElement,
    aLayoutMode: string,
    aCtx: Context
  ): Observable<RenderingElementType> => {
    // extract the ID
    const id = idExtractor(aElement);
    // produce markup if we have a valid ID reference
    return isInvalidId(id)
      ? of(aElement)
      : rxPipe(
          render(id, aLayoutMode, aCtx),
          map(($markup) => ({ ...aElement, $markup }))
        );
  };

  /**
   * Maps a single reference element
   *
   * @param aElement  - the reference element
   * @param aLayoutMode - the layout mode
   * @param aCtx - the context
   *
   * @returns the mapped type
   */
  function mapReferenceElements(
    aElement: DeliveryReferenceElement[],
    aLayoutMode: string,
    aCtx: Context
  ): Observable<RenderingElementType> {
    // handle the array case
    return combineArray(
      mapArray(aElement, (el) => mapReferenceElement(el, aLayoutMode, aCtx))
    );
  }

  /**
   * Maps a group element
   *
   * @param aElement  - the reference element
   * @param aLayoutMode - the layout mode
   * @param aCtx - the context
   *
   * @returns the mapped type
   */
  function mapGroupElement(
    aType: AuthoringGroupElement,
    aElement: DeliveryGroupElement,
    aMetadata: DeliveryContentMetadata,
    aLayoutMode: string,
    aCtx: Context
  ): Observable<RenderingElementType> {
    // type id
    const typeId = typeFromGroupExtractor(aType);
    assertNotNil(typeId, 'typeid');
    // locate the markup template for the element
    const markupTemplate$ = getTemplate(typeId, aLayoutMode, aElement);

    const { $metadata } = aElement;
    assertNotNil($metadata, KEY_METADATA);

    // augment metadata
    const augMetadata = {
      ...aMetadata,
      [KEY_SELECTED_LAYOUTS]: UNDEFINED,
      ...$metadata
    };
    // resolve the type
    const typeInfo$ = typeInfo(typeId);
    // construct the rendering context
    const renderingContext$ = rxPipe(
      typeInfo$,
      switchMap((ti) =>
        createRenderingContext(aElement, augMetadata, ti, aLayoutMode, aCtx)
      ),
      diff('renderingContext'),
      opReplayLast
    );
    // accessor
    const accessor = selectAccessor(aElement);
    assertNotNil(accessor, 'accessor');
    // transformed markup
    const markup$ = rxPipe(
      combinePair(markupTemplate$, renderingContext$),
      switchMap(spreadArgs(applyTemplate)),
      startWith(EMPTY_STRING),
      opDistinctUntilChanged,
      log('markup', accessor)
    );
    /**
     * Extract the elements from the rendering context, not the element. This
     * guarantees that we copy over the nested, generated $markup fields.
     */
    const partial$ = rxPipe(
      combinePair(typeInfo$, renderingContext$),
      map(spreadArgs(copyKeys))
    );
    // construct the new element
    return rxPipe(
      combinePair(markup$, partial$),
      map(([$markup, partial]) => ({
        ...partial,
        $metadata,
        $markup
      }))
    );
  }

  const mapGroupElements = (
    aType: AuthoringGroupElement,
    aElements: DeliveryGroupElement[],
    aMetadata: DeliveryContentMetadata,
    aLayoutMode: string,
    aCtx: Context
  ): Observable<RenderingElementType> =>
    combineArray(
      mapArray(aElements, (el) =>
        mapGroupElement(aType, el, aMetadata, aLayoutMode, aCtx)
      )
    );

  /**
   * Maps a single element by resolving the markups
   *
   * @param aType - type information about the element
   * @param aElement - the element to map
   * @param $metadata - metadata object of the top level context
   * @param aCtx - the execution context
   * @param aScheduler - the scheduler
   *
   * @returns an observable of the contexualized element
   */
  function mapElement(
    aType: AuthoringElement,
    aElement: DeliveryElementType,
    $metadata: DeliveryContentMetadata,
    aLayoutMode: string,
    aCtx: Context
  ): Observable<RenderingElementType> {
    // sanity check
    if (isNotNil(aType)) {
      // quick check to see if we need to process the element
      const { elementType } = aType;
      switch (elementType) {
        case ELEMENT_TYPE_GROUP:
          return isArray(aElement)
            ? mapGroupElements(
                aType as AuthoringGroupElement,
                aElement as DeliveryGroupElement[],
                $metadata,
                aLayoutMode,
                aCtx
              )
            : mapGroupElement(
                aType as AuthoringGroupElement,
                aElement as DeliveryGroupElement,
                $metadata,
                aLayoutMode,
                aCtx
              );
        case ELEMENT_TYPE_REFERENCE:
          // TODO reference could be empty
          return isArray(aElement)
            ? mapReferenceElements(
                aElement as DeliveryReferenceElement[],
                aLayoutMode,
                aCtx
              )
            : mapReferenceElement(
                aElement as DeliveryReferenceElement,
                aLayoutMode,
                aCtx
              );
      }
    }
    // default
    return single(aElement);
  }

  /**
   * Augments the element as a rendering context
   *
   * @param aItem - the content item
   * @param accessor - the accessor expression
   * @param aCtx - the context object
   */
  function createRenderingContext(
    aItem: DeliveryContentItem | DeliveryGroupElement,
    $metadata: DeliveryContentMetadata,
    aTypeInfo: TypeInfo,
    aLayoutMode: string,
    aCtx: Context
  ): Observable<RenderingContextV2> {
    // sanoty check
    assertNotNil(aTypeInfo, 'aTypeInfo');
    // extract keys and values
    const keys: string[] = [];
    const values: Observable<RenderingElementType>[] = [];
    // map
    forIn(aItem, (el, key) => {
      arrayPush(key, keys);
      arrayPush(
        mapElement(
          getProperty(aTypeInfo, key),
          el,
          $metadata,
          aLayoutMode,
          aCtx
        ),
        values
      );
    });
    // return the context
    const partial$ = rxPipe(
      combineArray(values),
      map((els) => createElements(keys, els))
    );
    // create the full context
    return rxPipe(
      combinePair(partial$, extendedContext$),
      map(([partial, $context]) => ({ ...partial, $context, $metadata }))
    );
  }

  /**
   * Construct the render function on top of the store
   *
   * @param aID - the ID
   * @param aLayoutMode - the layout mode
   * @param aCtx - the context object
   *
   * @returns an observable with the rendered markup
   */
  function render(
    aID: string,
    aLayoutMode: string,
    aCtx: Context
  ): Observable<string> {
    // quick check
    if (isInvalidId(aID)) {
      return missingIdMarkup(aID);
    }
    // decompose
    const { path, pending } = aCtx;
    // check for recursive calls
    if (isNotNil(path[aID])) {
      // nothing to return
      return EMPTY_STRING$;
    }
    // render
    logger.info('rendering', aID);
    // final markup
    let markup$: Observable<string>;
    // cycle protection
    path[aID] = aID;
    // check if we are already computing the markup
    const pending$ = pending[aID];
    if (isNotNil(pending$)) {
      // render
      logger.info('reusing pending computation for', aID);
      // reuse pending computation
      markup$ = pending$;
    } else {
      // select the content
      const content$ = deliveryContent(aID);
      // select the type
      const typeId$ = rxPipe(
        content$,
        switchMap(getTypeIdFromContentItem),
        opDistinctUntilChanged,
        log('typeId'),
        opShareLast
      );
      // get the compiled layout from the store
      const template$ = rxPipe(
        combineLatest([content$, typeId$]),
        switchMap(([content, typeId]) =>
          getTemplate(typeId, aLayoutMode, content)
        ),
        opDistinctUntilChanged
      );
      // types
      const typeInfo$ = rxPipe(typeId$, switchMap(typeInfo));
      // build the rendering context
      const renderingContext$ = rxPipe(
        combinePair(typeInfo$, content$),
        switchMap(([ti, content]) =>
          isNotNil(ti) && isNotNil(content)
            ? createRenderingContext(
                content,
                metadataExtractor(content),
                ti,
                aLayoutMode,
                aCtx
              )
            : UNDEFINED$
        ),
        diff('renderingContext'),
        distinctUntilChanged(shallowEquals)
      );
      // apply the template
      markup$ = rxPipe(
        combinePair(template$, renderingContext$),
        switchMap(spreadArgs(applyTemplate)),
        startWith(EMPTY_STRING),
        opDistinctUntilChanged,
        log('markup', aID)
      );
      // update the map
      pending[aID] = markup$;
    }

    // done
    delete path[aID];
    // ok
    return markup$;
  }

  // log some warnings
  if (USE_DIFF) {
    // tslint:disable-next-line:no-console
    console.warn(`Diffing enabled for [${__filename}], remove for production!`);
  }
  if (USE_ASSERTS) {
    // tslint:disable-next-line:no-console
    console.warn(
      `Assertions enabled for [${__filename}], remove for production!`
    );
  }

  /**
   * First step in the computation of the final markup
   *
   * @param aID - the ID
   * @returns the resulting markup
   */
  return (aID: string, aLayoutMode = DEFAULT_LAYOUT_MODE): Observable<string> =>
    render(aID, aLayoutMode, {
      pending: {},
      path: {}
    });
}
