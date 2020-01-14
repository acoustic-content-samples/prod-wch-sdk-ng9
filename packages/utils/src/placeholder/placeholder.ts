import {
  AbstractElement,
  AuthoringElement,
  AuthoringGroupElement,
  AuthoringPlaceholder,
  AuthoringType,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_REFERENCE,
  KEY_ELEMENT_TYPE,
  Query,
  RenderingContext,
  TypeRef,
  WchSdkSearch
} from '@acoustic-content-sdk/api';
import {
  EMPTY,
  identity,
  Observable,
  of,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { rxCachedFunction } from '../cache/rx.cache';
import { Consumer } from '../consumers/consumer';
import { mapArray, Maybe, UNDEFINED } from '../js/js.core';
import { getProperty, pluckProperty } from '../js/pluck';
import {
  filterNotNil,
  opDistinctUntilChanged,
  safeMap,
  safeSwitchMap,
  typedPluck
} from '../operators/operators';
import {
  isNil,
  isNotEmpty,
  isNotNil,
  isPlainObject,
  isString
} from '../predicates/predicates';
import { wchAddPlaceholderToElement } from '../rendering/rendering';
import { wchForEachRenderingContext } from '../wch/wch.utils';
import {
  isMultiReferenceElement,
  isSingleReferenceElement
} from './../elements/element';
import { forEach } from './../js/js.core';
import {
  arrayFind,
  arrayPush,
  byProperty,
  cloneDeep,
  objectAssign,
  objectKeys,
  reduceToObject
} from './../js/js.utils';
import { perfMeasure } from './../perf/perf.utils';
import { isArray, isEqualTo } from './../predicates/predicates';
import { rxPipe, UNDEFINED$ } from './../rx/rx.utils';
import {
  luceneEscapeKeyValue,
  luceneEscapeKeyValueOr,
  SEARCH_MAX_ROWS
} from './../search/search.utils';

const _ELEMENTS = 'elements';

/**
 * Given a series of type IDs, return the placeholder content items
 */
export declare type PlaceholderResolver = UnaryFunction<
  string[],
  Observable<RenderingContext[]>
>;

declare type ContextMap = Record<string, RenderingContext>;

declare type RenderingContextResolver = UnaryFunction<
  RenderingContext,
  RenderingContext
>;

/**
 * Process an individual element
 */
function _handleElement(
  aElement: AbstractElement,
  aPlaceholder: AbstractElement,
  aResolver: RenderingContextResolver
): AbstractElement {
  // access the element type
  const elementType = getProperty(aElement || aPlaceholder, KEY_ELEMENT_TYPE);
  // special case for references
  if (elementType === ELEMENT_TYPE_REFERENCE) {
    // special case handling for reference elements
    if (isSingleReferenceElement(aElement, false)) {
      // resolve the element, then insert
      return wchAddPlaceholderToElement(
        { ...aElement, value: aResolver(aElement.value) },
        aPlaceholder
      );
    }
    // handle multi reference elements
    if (isMultiReferenceElement(aElement, false)) {
      // handle the multi value case
      return wchAddPlaceholderToElement(
        { ...aElement, values: mapArray(aElement.values, aResolver) },
        aPlaceholder
      );
    }
    // TODO replace the placeholder elements
  }
  // default handling
  return wchAddPlaceholderToElement(aElement, aPlaceholder);
}

/**
 * Inserts the placeholders and recurses into the rendering context structures
 *
 * @param aRenderingContext - the context to alter
 * @param aTypes - mapping from type id to placeholder context
 * @param aCycleMap - cycle protection
 * @param aResolver - the recursion pointer
 *
 * @returns the resolved context
 */
function _insertPlaceholdersRecursive(
  aRenderingContext: RenderingContext,
  aTypes: ContextMap,
  aCycleMap: ContextMap,
  aResolver: RenderingContextResolver
): RenderingContext {
  // current ID
  const id = aRenderingContext.id;
  // protect against cycles
  const existingContext = aCycleMap[id];
  if (isNotNil(existingContext)) {
    return existingContext;
  }
  // get the context for the type
  const placeholder = aTypes[aRenderingContext.typeId];
  // make the copy
  const copy = (aCycleMap[id] = { ...aRenderingContext });
  // elements
  const srcElements = getProperty(aRenderingContext, _ELEMENTS, {});
  const dstElements = getProperty(placeholder, _ELEMENTS, {});
  // merge the keys
  const allElements = { ...dstElements, ...srcElements };
  // work on the elements
  copy[_ELEMENTS] = reduceToObject(objectKeys(allElements), identity, (key) =>
    _handleElement(srcElements[key], dstElements[key], aResolver)
  );
  // returns the copied context
  return copy;
}

/**
 * Proxy function to inject the callback
 *
 * @param aRenderingContext - the context to alter
 * @param aTypes - mapping from type id to placeholder context
 * @param aCycleMap - cycle protection
 *
 * @returns the resolved context
 */
function _insertPlaceholders(
  aRenderingContext: RenderingContext,
  aTypes: ContextMap,
  aCycleMap: ContextMap
): RenderingContext {
  // the callback
  const resolver: RenderingContextResolver = (ctx) =>
    _insertPlaceholdersRecursive(ctx, aTypes, aCycleMap, resolver);
  // dispatch
  return _insertPlaceholdersRecursive(
    aRenderingContext,
    aTypes,
    aCycleMap,
    resolver
  );
}

const keyTypeOf: UnaryFunction<RenderingContext, string> = pluckProperty(
  'typeId'
);

export function wchInsertPlaceholders(
  aRenderingContext: RenderingContext,
  aResolver: PlaceholderResolver
): Observable<RenderingContext> {
  // measure
  const handle = perfMeasure('wchInsertPlaceholders');
  // list of types
  const typeToContext: ContextMap = {};
  // locate all types across all referenced contexts
  wchForEachRenderingContext(aRenderingContext, (rc) =>
    objectAssign(rc.typeId, rc, typeToContext)
  );
  // resolve all types, then dispatch
  return rxPipe(
    aResolver(objectKeys(typeToContext).sort()),
    map((rcs) =>
      _insertPlaceholders(aRenderingContext, reduceToObject(rcs, keyTypeOf), {})
    ),
    tap(handle)
  );
}

/**
 * Returns a resolver for placeholders based on WCH search
 *
 * @param aTag - the tag used to identify placeholder types
 * @param aSearch - the search service
 *
 * @returns the result
 */
export function wchPlaceholderResolver(
  aTag: string,
  aSearch: WchSdkSearch
): PlaceholderResolver {
  // implements the resolver based on search
  return (ids) => {
    // construct the query
    const query: Query = {
      q: luceneEscapeKeyValueOr('typeId', ...ids),
      fq: luceneEscapeKeyValue('tags', aTag),
      sort: 'typeId asc, lastModified asc, id asc',
      rows: SEARCH_MAX_ROWS
    };
    // execute the query
    return aSearch
      .getRenderingContexts(query)
      .pipe(filterNotNil(), typedPluck('renderingContexts'), filterNotNil());
  };
}

/**
 * Returns the authoring element from a particular key
 *
 * @param aElementKey - the element key
 * @param aType - the authoring type
 *
 * @returns the element
 */
const _getAuthoringElementFromKey = (
  aElementKey: string,
  aType: AuthoringType
): AuthoringElement =>
  arrayFind(aType[_ELEMENTS], byProperty('key', isEqualTo(aElementKey)));

/**
 * Returns the placeholder from a element
 *
 * @param aElement - the element
 * @param aType - the authoring type
 *
 * @returns the placeholder
 */
const _selectPlaceholderFromElement: UnaryFunction<
  AuthoringElement,
  AuthoringPlaceholder
> = pluckProperty('placeholder');

/**
 * Returns the eleemnt type from the element
 *
 * @param aElement - the authoring element
 * @param aType - the authoring type
 *
 * @returns the type
 */
const _selectTypeFromElement: UnaryFunction<
  AuthoringElement,
  string
> = pluckProperty(KEY_ELEMENT_TYPE);

/**
 * Decodes information from the authoring element identified
 * by the accessor expression. The method will first locate the correct authoring element
 * based on the accessor and then applies a selector to extract the desired
 * value from the element.
 *
 * @param aAccessor - the accessor expression
 * @param aType - the actual type
 * @param aSelector - the selector expression
 *
 * @returns the placeholder for the type or null or undefined
 */
function _fromAccessor<T>(
  aAccessor: string,
  aType: AuthoringType,
  aSelector: UnaryFunction<AuthoringElement, T>
): Maybe<T> {
  /** Check if the accessor is a string and split it into its components. Array indexes
   * will be represented as a single element in the split result
   */
  if (isString(aAccessor)) {
    // decode the path
    const path = aAccessor.split('.');
    // check the elements
    if (isNotEmpty(path) && path.length >= 2 && path[0] === _ELEMENTS) {
      /**
       * The odd indexes represent the names of the fields, we might need
       * to traverse the path accross group element boundaries to
       * find the correct type.
       */
      let type = aType;
      let el = _getAuthoringElementFromKey(path[1], type);
      let idx = 3;
      const len = path.length;
      while (isAuthoringGroupElement(el) && idx < len) {
        // resolve the type
        type = el.typeRef as AuthoringType;
        // resolve the next element
        el = _getAuthoringElementFromKey(path[idx], type);
        idx += 2;
      }
      // resolve
      const result = aSelector(el);
      // map to undefined
      return isNotNil(result) ? result : UNDEFINED;
    }
  }
  // nothing to return
  return UNDEFINED;
}

/**
 * Tests if a field is a content type
 *
 * @param aValue - the value to check
 * @returns true if this value is an authoring type
 */
function _isAuthoringType(aValue: any): aValue is AuthoringType {
  // some quick test
  return isNotNil(aValue) && aValue.classification === 'content-type';
}

/**
 * Tests if a field is a content type
 *
 * @param aValue - the value to check
 * @returns true if this value is an authoring type
 */
export function isAuthoringGroupElement(
  aValue: any
): aValue is AuthoringGroupElement {
  // some quick test
  return (
    isNotNil(aValue) &&
    aValue[KEY_ELEMENT_TYPE] === ELEMENT_TYPE_GROUP &&
    isPlainObject(aValue.typeRef)
  );
}

/**
 * Recursively follows all type references and registers them
 *
 * @param aType - the type to analyze
 * @param aGroups - the detected group types
 * @param aCache - the cache of the resolved authoring type
 */
function _recResolveAuthType(
  aType: AuthoringType,
  aGroups: AuthoringGroupElement[],
  aCache: Record<string, AuthoringType>
) {
  // register the type
  aCache[aType.id] = aType;
  // find all references
  const els = aType[_ELEMENTS];
  if (isArray(els)) {
    // find the types
    forEach(els.filter(isAuthoringGroupElement), (el) => {
      // add to be resolved
      arrayPush(el, aGroups);
      // check if the reference is known
      const typeRef = el.typeRef;
      if (_isAuthoringType(typeRef)) {
        // recurse
        _recResolveAuthType(typeRef, aGroups, aCache);
      }
    });
  }
}

/**
 * Recursively follows all type references and registers them
 *
 * @param aType - the type to analyze
 * @param aCache - the cache of the resolved authoring type
 */
function _recForEachAuthType(
  aType: AuthoringType,
  aCallback: Consumer<AuthoringType>,
  aCache: Record<string, AuthoringType>
) {
  // by id
  const { id } = aType;
  // check for recursion
  if (isNil(aCache[id])) {
    // register the type
    aCache[id] = aType;
    // notify about this
    aCallback(aType);
    // find all references
    const els = aType[_ELEMENTS];
    if (isArray(els)) {
      // find the types
      forEach(els, (el) => {
        if (isAuthoringGroupElement(el)) {
          // check if the reference is known
          const { typeRef } = el;
          if (_isAuthoringType(typeRef)) {
            // recurse
            _recForEachAuthType(typeRef, aCallback, aCache);
          }
        }
      });
    }
  }
}

/**
 * Resolves all typeRef
 *
 * @param aType - the authoring type
 * @returns the resolved type (a copy)
 */
export function wchResolveType(aType: AuthoringType): AuthoringType {
  // record of loose references
  const groups: AuthoringGroupElement[] = [];
  const cache: Record<string, AuthoringType> = {};
  // make a copy
  const type = cloneDeep(aType);
  // resolve
  _recResolveAuthType(type, groups, cache);
  // fill in the groups
  forEach(
    groups,
    (group) => (group.typeRef = cache[group.typeRef.id] as TypeRef)
  );
  // returns the resolved elements
  return type;
}

/**
 * Resolves all typeRef
 *
 * @param aType - the authoring type
 * @returns the resolved type (a copy)
 */
export function wchForEachType(
  aType: AuthoringType,
  aCallback: Consumer<AuthoringType>
) {
  // resolve
  _recForEachAuthType(aType, aCallback, {});
}

/**
 * Decodes the placeholder from an accessor expression
 *
 * @param aAccessor - the accessor expression
 * @param aType - the actual type
 *
 * @returns the placeholder for the type or undefined
 */
export function wchPlaceholderFromAccessor(
  aAccessor: string,
  aType: AuthoringType
): Maybe<AuthoringPlaceholder> {
  // dispatch
  return _fromAccessor(aAccessor, aType, _selectPlaceholderFromElement);
}

/**
 * Decodes the authoring element from the accessor expression
 *
 * @param aAccessor - the accessor expression
 * @param aType - the actual type
 *
 * @returns the placeholder for the type or undefined
 */
export function wchAuthoringElementFromAccessor(
  aAccessor: string,
  aType: AuthoringType
): Maybe<AuthoringElement> {
  // dispatch
  return _fromAccessor(aAccessor, aType, identity);
}

/**
 * Decodes the element type from an accessor expression
 *
 * @param aAccessor - the accessor expression
 * @param aType - the actual type
 *
 * @returns the type of the placeholder
 */
export function wchTypeFromAccessor(
  aAccessor: string,
  aType: AuthoringType
): Maybe<string> {
  // dispatch
  return _fromAccessor(aAccessor, aType, _selectTypeFromElement);
}

/**
 * Recursively resolves the authoring type across group boundaries
 *
 * @param aElement - the element
 * @param aIdx - current index into the path
 * @param aPath - the path expression
 * @param aSelector - selector of the actual item
 * @param aAuthoringTypes$  the map of types
 */
function _rxResolveType<T>(
  aElement: AuthoringElement,
  aIdx: number,
  aPath: string[],
  aSelector: UnaryFunction<AuthoringElement, T>,
  aTypeAccessor: UnaryFunction<string, Observable<AuthoringType>>,
  aScheduler: SchedulerLike
): Observable<T> {
  // check if we need to recurse
  if (isAuthoringGroupElement(aElement) && aIdx < aPath.length) {
    // resolve the type
    const { id } = aElement.typeRef;
    // resolve this type
    return isNotNil(id)
      ? _rxResolveTypeId<T>(
          id,
          aIdx,
          aPath,
          aSelector,
          aTypeAccessor,
          aScheduler
        )
      : UNDEFINED$;
  }
  // just extract the element
  const result: T = aSelector(aElement);
  // map to undefined
  return isNotNil(result) ? of(result, aScheduler) : UNDEFINED$;
}

function _rxResolveTypeId<T>(
  aId: string,
  aIdx: number,
  aPath: string[],
  aSelector: UnaryFunction<AuthoringElement, T>,
  aTypeAccessor: UnaryFunction<string, Observable<AuthoringType>>,
  aScheduler: SchedulerLike
): Observable<T> {
  // the element
  const elFromKey: UnaryFunction<AuthoringType, AuthoringElement> = (type) =>
    _getAuthoringElementFromKey(aPath[aIdx], type);
  const resolveType: UnaryFunction<AuthoringElement, Observable<T>> = (el) =>
    _rxResolveType(el, aIdx + 2, aPath, aSelector, aTypeAccessor, aScheduler);
  // build the chain
  return rxPipe(
    aTypeAccessor(aId),
    safeMap(elFromKey),
    opDistinctUntilChanged,
    safeSwitchMap(resolveType)
  );
}

/**
 * Decodes information from the authoring element identified
 * by the accessor expression. The method will first locate the correct authoring element
 * based on the accessor and then applies a selector to extract the desired
 * value from the element.
 *
 * @param aAccessor - the accessor expression
 * @param aType - the actual type
 * @param aSelector - the selector expression
 *
 * @returns the placeholder for the type or null or undefined
 */
export function rxWchFromAuthoringTypeByAccessor<T>(
  aAccessor: string,
  aTypeId: string,
  aSelector: UnaryFunction<AuthoringElement, T>,
  aTypeAccessor: UnaryFunction<string, Observable<AuthoringType>>,
  aScheduler: SchedulerLike = queueScheduler
): Observable<T> {
  /** Check if the accessor is a string and split it into its components. Array indexes
   * will be represented as a single element in the split result
   */
  if (isString(aAccessor) && isString(aTypeId)) {
    // special case for top level types
    if (aAccessor === _ELEMENTS) {
      // resolve the type directly
      return rxPipe(aTypeAccessor(aTypeId), map(aSelector));
    }
    // decode the path
    const path: string[] = aAccessor.split('.');
    // check the elements
    if (isNotEmpty(path) && path.length >= 2 && path[0] === _ELEMENTS) {
      /**
       * Cache access to the type
       */
      const typeAccessor = rxCachedFunction(aTypeAccessor);
      /**
       * The odd indexes represent the names of the fields, we might need
       * to traverse the path accross group element boundaries to
       * find the correct type.
       */
      return _rxResolveTypeId(
        aTypeId,
        1,
        path,
        aSelector,
        typeAccessor,
        aScheduler
      );
    }
  }
  // nothing to return
  return EMPTY;
}
