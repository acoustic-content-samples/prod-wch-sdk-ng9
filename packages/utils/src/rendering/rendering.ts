import {
  AbstractElement,
  CategoryElement,
  ELEMENT_TYPE_CATEGORY,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_FILE,
  ELEMENT_TYPE_FORMATTED_TEXT,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_LINK,
  ELEMENT_TYPE_LOCATION,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_PRODUCT,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_TOGGLE,
  ELEMENT_TYPE_VIDEO,
  KEY_ELEMENT_TYPE,
  KEY_VALUE,
  KEY_VALUES,
  RenderingContext,
  RenderingContextInterceptor
} from '@acoustic-content-sdk/api';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  of,
  OperatorFunction,
  UnaryFunction
} from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { mapArray, reduceArray, UNDEFINED } from '../js/js.core';
import { getProperty, pluckLength } from '../js/pluck';
import { getPath, parsePath, pluckPath } from '../path/path';
import { rxPipe } from '../rx/rx.utils';
import { Generator } from './../generators/generator';
import { forEach, forIn } from './../js/js.core';
import {
  arrayPush,
  assertObject,
  objectAssign,
  objectKeys,
  reduceForIn
} from './../js/js.utils';
import { identity, noop } from './../misc';
import {
  isArray,
  isFunction,
  isNil,
  isNotEmpty,
  isNotNil,
  isString,
  isStringArrayLike
} from './../predicates/predicates';

// indication for placeholder meta information
export const KEY_PLACEHOLDER = '$$PLACEHOLDER';

const _ELEMENTS = 'elements';

/**
 * Function that extracts a value
 */
declare type ValueExtractor<T> = UnaryFunction<any, T | T[] | null>;

/**
 * extractors
 */
const _EXTRACTORS: Record<string, ValueExtractor<any>> = {};

/**
 * Decodes a value into a date object
 *
 * @param aValue - the value
 * @returns the object
 */
const _parseDate = (aValue: number | string | Date): Date =>
  new Date(aValue as any);

// splits a category into its segments
const _parseCategory = (aCategory: string): string[] => aCategory.split('/');

/**
 * Parses a category element by adding a parsed value
 *
 * @param aCategory - the category
 * @returns the augmented category
 */
function _parseCategories(aCategory: any): CategoryElement {
  // analyze
  const value = aCategory.categories;
  // augment
  aCategory.categoryPaths = isStringArrayLike(value)
    ? mapArray(value, _parseCategory)
    : [];
  // ok
  return aCategory;
}

/** Nothing to do for extraction */
const identityExtractor = identity;

/**
 * Extracts the 'values' field if it is an array, else the 'value' field
 *
 * @param aValue - */
function valueValuesExtractor(aValue: any): any | any[] {
  let value;
  return isArray((value = aValue[KEY_VALUES])) ? value : aValue[KEY_VALUE];
}

/**
 * Extracts the 'values' field if it is an array, else the object itself
 *
 * @param aValue - */
function valuesExtractor(aValue: any): any | any[] {
  let value;
  return isArray((value = aValue[KEY_VALUES])) ? value : aValue;
}

/**
 * Converts a value
 */
declare type ValueConverter<T, R> = UnaryFunction<T, R>;

/**
 * Identity conversion
 */
const identityConverter = identity;

/**
 * Converts a value to a date object
 */
const dateConverter = _parseDate;

/**
 * Converts a category to a parsed category object
 */
const categoryConverter = _parseCategories;

/**
 * Converts a group element into a simpler structure
 */
const groupReducer = (res, el, name) =>
  objectAssign(name, (_EXTRACTORS[el[KEY_ELEMENT_TYPE]] || identity)(el), res);
const groupConverter = (aGroupElement: any): any =>
  reduceForIn(aGroupElement, groupReducer, {});

/**
 * Assigns a single value property
 *
 * @param aName - key of the element
 * @param aValue - the value to assign
 * @param aSingleType - single value classifier
 * @param aMultiType - multi value classifier
 * @param aRenderingContext - the rendering context
 */
function _setSingleValue<T>(
  aName: string,
  aValue: T,
  aSingleType: string,
  aMultiType: string,
  aRenderingContext: any
) {
  // single element
  assertObject(aSingleType, aRenderingContext)[aName] = aValue;
  // multi value
  assertObject(aMultiType, aRenderingContext)[aName] = [aValue];
}

/**
 * Assigns a multi value property
 *
 * @param aName - key of the element
 * @param aValue - the value to assign
 * @param aSingleType - single value classifier
 * @param aMultiType - multi value classifier
 * @param aRenderingContext - the rendering context
 */
function _setMultiValue<T>(
  aName: string,
  aValue: T[],
  aSingleType: string,
  aMultiType: string,
  aRenderingContext: any
) {
  // single element
  if (pluckLength(aValue) > 0) {
    assertObject(aSingleType, aRenderingContext)[aName] = aValue[0];
  }
  // multi value
  assertObject(aMultiType, aRenderingContext)[aName] = aValue;
}

/**
 * Returns a combined function that extracts a value and converts it
 *
 * @param aExtractor - the extractor function
 * @param aConverter - the converter
 *
 * @returns the function
 */
function _extractAndConvert<T, R>(
  aExtractor: ValueExtractor<T>,
  aConverter: ValueConverter<T, R>
): ValueExtractor<R> {
  // returns the conversion function
  return (aValue) => {
    // analyze
    const extracted: T | T[] = aExtractor(aValue);
    return isArray(extracted)
      ? aConverter === identityConverter
        ? ((extracted as any) as R[])
        : mapArray(extracted, aConverter)
      : isNotNil(extracted)
      ? aConverter(extracted)
      : null;
  };
}

/**
 * Assigns the value object for elements that have their single value property represented
 * as 'value' and multi value property as 'values'.
 */
function _handleElement<T, R>(
  aSingleType: string,
  aMultiType: string,
  aName: string,
  aElement: any,
  aRenderingContext: any,
  aExtractor: ValueExtractor<T>
) {
  // analyze
  const extracted: T | T[] = aExtractor(aElement);
  // check
  if (isArray(extracted)) {
    // multi values
    _setMultiValue(
      aName,
      extracted,
      aSingleType,
      aMultiType,
      aRenderingContext
    );
  } else if (isNotNil(extracted)) {
    // single value
    _setSingleValue(
      aName,
      extracted,
      aSingleType,
      aMultiType,
      aRenderingContext
    );
  }
}

declare type PlaceholderHandlerType = (
  aElement: AbstractElement,
  aPlaceholder: AbstractElement
) => any;

/**
 * Handlers for element types that resolve elements by their placeholders.
 */
let _LAZY_PLACEHOLDER_HANDLERS: Record<string, PlaceholderHandlerType>;

/**
 * Adds a placeholder to a single value element
 *
 * @param aElement - the element
 * @param aValue - the placeholder value
 *
 * @returns the element
 */
function _insertValuePlaceholder(
  aElement: AbstractElement,
  aPlaceholder: AbstractElement
): AbstractElement {
  // set the placeholder if required
  return isNil(aElement) || isNil(aElement[KEY_VALUE])
    ? ({
        ...aElement,
        ...aPlaceholder,
        [KEY_PLACEHOLDER]: true
      } as AbstractElement)
    : aElement;
}

/**
 * Test if an element is empty. That's the case if it just defines
 * the element type, but nohing else
 *
 * @param aElement - the element
 * @returns true if the element is empty, else false
 */
function _isElementEmpty(aElement: AbstractElement) {
  return objectKeys(aElement).length <= 1;
}

/**
 * Adds a placeholder to a direct value element
 *
 * @param aElement - the element
 * @param aValue - the placeholder value
 *
 * @returns the element
 */
function _insertDirectPlaceholder(
  aElement: AbstractElement,
  aPlaceholder: AbstractElement
): AbstractElement {
  // set the placeholder if required
  return isNil(aElement) || _isElementEmpty(aElement)
    ? ({
        ...aElement,
        ...aPlaceholder,
        [KEY_PLACEHOLDER]: true
      } as AbstractElement)
    : aElement;
}

/**
 * Inserts a sequence of elements into the target array
 *
 * @param aValues - values to insert
 * @param aArray - target array
 *
 * @returns the target array
 */
const _pushArray = <T>(aValues: T[], aArray: T[]): T[] => {
  aArray.push(...aValues);
  return aArray;
};

const mapToPlc = () => -1;

/**
 * Adds a placeholder to a single value element
 *
 * @param aElement - the element
 * @param aValues - the placeholder values
 * @returns the element
 */
function _insertValuesPlaceholder(
  aElement: AbstractElement,
  aPlaceholder: AbstractElement
): AbstractElement {
  // the placeholder values
  const plcValues = aPlaceholder[KEY_VALUES];
  // check if we have a value
  if (isNil(aElement) || isNil(aElement[KEY_VALUES])) {
    // assign the original array
    const res = {
      ...aElement,
      ...aPlaceholder,
      [KEY_PLACEHOLDER]: isArray(plcValues) ? mapArray(plcValues, mapToPlc) : []
    };
    // ok
    return res;
  }
  // insert the placeholders in between each element
  else if (isArray(plcValues)) {
    // index placeholders
    const plcIdx = mapArray(plcValues, mapToPlc);
    // augment
    const res = {
      ...aElement,
      ...aPlaceholder,
      [KEY_VALUES]: reduceArray(
        aElement[KEY_VALUES],
        (r, value) => _pushArray(plcValues, arrayPush(value, r)),
        [...plcValues]
      ),
      [KEY_PLACEHOLDER]: aElement[KEY_VALUES].reduce(
        (r, value, idx) => _pushArray(plcIdx, arrayPush(idx, r)),
        [...plcIdx]
      )
    };
    // ok
    return res;
  }

  // nothing special to do
  return aElement;
}

/**
 * Insert a placeholder into a value/values structure
 *
 * @param aElement - the element
 * @param aType - the type
 *
 * @returns the replaced element
 */
function _insertValueValuesPlaceholder(
  aElement: AbstractElement,
  aPlaceholder: AbstractElement
): AbstractElement {
  // test if we have a placeholder
  if (isNotNil(aPlaceholder)) {
    // work based on the type
    const type = aPlaceholder.elementType;
    // extract the value
    const ext = getProperty(_EXTRACTORS, type, identity);
    const value = ext(aPlaceholder);
    // override
    return isArray(value)
      ? _insertValuesPlaceholder(aElement, aPlaceholder)
      : isNotNil(value)
      ? _insertValuePlaceholder(aElement, aPlaceholder)
      : aElement;
  }
  // return the original element
  return aElement;
}

/**
 * Insert a placeholder into a raw/values structure
 *
 * @param aElement - the element
 * @param aType - the type
 *
 * @returns the replaced element
 */
function _insertDirectValuesPlaceholder(
  aElement: AbstractElement,
  aPlaceholder: AbstractElement
): AbstractElement {
  // test if we have a placeholder
  if (isNotNil(aPlaceholder)) {
    // work based on the type
    const type = aPlaceholder.elementType;
    // extract the value
    const ext = getProperty(_EXTRACTORS, type, identity);
    const value = ext(aPlaceholder);
    // override
    return isArray(value)
      ? _insertValuesPlaceholder(aElement, aPlaceholder)
      : isNotNil(value)
      ? _insertDirectPlaceholder(aElement, aPlaceholder)
      : aElement;
  }
  // return the original element
  return aElement;
}

declare type HandlerType = (
  aName: string,
  aElement: any,
  aRenderingContext: any
) => void;

/**
 * Very simple way to convert the value into a plural form
 *
 * @param aValue - the value
 * @returns the plural form of the value
 */
function _pluralize(aValue: string): string {
  return aValue + 's';
}

/**
 * Handlers for element types that copy the actual element data to a strongly typed location
 * into the rendering context.
 */
let _LAZY_HANDLERS: { [key: string]: HandlerType };

enum HandlerKind {
  SINGLE_VALUE = 1,
  MULTI_VALUES,
  SINGLE
}

/**
 * Records the keys of the registered handlers
 */
let _LAZY_HANDLER_KEYS: { [key: string]: HandlerKind };

/**
 * Registers the values element by type ID, plural is formed by appending an 's'.
 *
 * @param aType - the type
 */
function _valueValuesElement<T, R>(
  aType: string,
  aConverter: ValueConverter<T, R>
) {
  // fields
  const types = _pluralize(aType);
  const extractor = _extractAndConvert(valueValuesExtractor, aConverter);
  // returns the handler
  const handler = (aName: string, aElement: any, aRenderingContext: any) =>
    _handleElement(aType, types, aName, aElement, aRenderingContext, extractor);
  // register
  _LAZY_HANDLERS[aType] = handler;
  // register the kind
  _LAZY_HANDLER_KEYS[aType] = HandlerKind.SINGLE_VALUE;
  _LAZY_HANDLER_KEYS[types] = HandlerKind.MULTI_VALUES;
  // register the typed extractor
  _EXTRACTORS[aType] = extractor;
  // placeholder handler
  _LAZY_PLACEHOLDER_HANDLERS[aType] = _insertValueValuesPlaceholder;
}

/**
 * Registers the values element by type ID, plural is formed by appending an 's'.
 *
 * @param aType - the type
 */
function _valuesElement<T, R>(aType: string, aConverter: ValueConverter<T, R>) {
  // fields
  const types = _pluralize(aType);
  const extractor = _extractAndConvert(valuesExtractor, aConverter);
  // returns the handler
  const handler = (aName: string, aElement: any, aRenderingContext: any) =>
    _handleElement(aType, types, aName, aElement, aRenderingContext, extractor);
  // register
  _LAZY_HANDLERS[aType] = handler;
  // register the kind
  _LAZY_HANDLER_KEYS[aType] = HandlerKind.SINGLE;
  _LAZY_HANDLER_KEYS[types] = HandlerKind.MULTI_VALUES;
  // register the typed extractor
  _EXTRACTORS[aType] = extractor;
  // placeholder handler
  _LAZY_PLACEHOLDER_HANDLERS[aType] = _insertDirectValuesPlaceholder;
}

/**
 * Registers all types in the array
 *
 * @param aTypes - the types
 */
const _valueValuesElements = (aTypes: ArrayLike<string>) =>
  forEach(aTypes, (type) => _valueValuesElement(type, identityConverter));

/**
 * Registers all types in the array
 *
 * @param aTypes - the types
 */
const _valuesElements = (aTypes: ArrayLike<string>) =>
  forEach(aTypes, (type) => _valuesElement(type, identityConverter));

/**
 * Registers the date group element handler. This one is special, because it flattens the data structure
 */
const _groupElement = () =>
  _valueValuesElement(ELEMENT_TYPE_GROUP, groupConverter);

/**
 * Registers the date element handler. This one is special, because it converts
 * the date strings into date objects.
 */
const _dateElement = () =>
  _valueValuesElement(ELEMENT_TYPE_DATE, dateConverter);

/**
 * Registers the category element handler. This one is special, because it splits categories
 * into paths.
 */
function _categoryElement() {
  // plural
  const type = ELEMENT_TYPE_CATEGORY;
  // the extractors
  const extractor = _extractAndConvert(valuesExtractor, categoryConverter);
  // returns the handler
  const handler = (
    aName: string,
    aElement: CategoryElement,
    aRenderingContext: any
  ) => (assertObject(type, aRenderingContext)[aName] = extractor(aElement));
  // register
  _LAZY_HANDLERS[type] = handler;
  // register the kind
  _LAZY_HANDLER_KEYS[type] = HandlerKind.SINGLE;
  // register the typed extractor
  _EXTRACTORS[type] = extractor;
}

const _ignoreElement = noop;

/**
 * Makes sure we have initialized the handlers
 */
const _assertHandlers = () => {
  // check if we have handlers
  if (
    isNil(_LAZY_HANDLERS) ||
    isNil(_LAZY_HANDLER_KEYS) ||
    isNil(_LAZY_PLACEHOLDER_HANDLERS)
  ) {
    // construct
    _LAZY_HANDLERS = {};
    _LAZY_HANDLER_KEYS = {};
    _LAZY_PLACEHOLDER_HANDLERS = {};
    // register the types that use 'value' for single and 'values' for multi elements
    _valueValuesElements([
      ELEMENT_TYPE_TEXT,
      ELEMENT_TYPE_PRODUCT,
      ELEMENT_TYPE_FORMATTED_TEXT,
      ELEMENT_TYPE_NUMBER,
      ELEMENT_TYPE_OPTION_SELECTION,
      ELEMENT_TYPE_TOGGLE,
      ELEMENT_TYPE_REFERENCE
    ]);
    // special case handling for groups
    _groupElement();
    // special case handling for dates
    _dateElement();
    // special case handling for categories
    _categoryElement();
    // register the types that have inline values
    _valuesElements([
      ELEMENT_TYPE_FILE,
      ELEMENT_TYPE_LINK,
      ELEMENT_TYPE_IMAGE,
      ELEMENT_TYPE_VIDEO,
      ELEMENT_TYPE_LOCATION
    ]);
  }
};

/**
 * Adds typings next to the elements
 *
 * @param aRenderingContext - the rendering context to modify
 * @returns the context
 */
export function wchAddTypings(
  aRenderingContext: RenderingContext
): RenderingContext {
  // initialize properly
  _assertHandlers();
  // iterate
  forIn(aRenderingContext[_ELEMENTS], (element, name) =>
    (_LAZY_HANDLERS[element[KEY_ELEMENT_TYPE]] || _ignoreElement)(
      name,
      element,
      aRenderingContext
    )
  );
  // returns the context
  return aRenderingContext;
}

/**
 * Helper function that inserts a placeholder into an element
 */
function _addPlaceholderToElement(aElement: any, aType: AbstractElement): any {
  // initialize properly
  _assertHandlers();
  // access the type
  const elementType = getProperty(aType, KEY_ELEMENT_TYPE);
  // check the type
  const handler = _LAZY_PLACEHOLDER_HANDLERS[elementType];
  return isFunction(handler) && isNotNil(aType)
    ? handler(aElement, aType)
    : aElement;
}

/**
 * Decodes the expression back to an expression into elements. The expression might point either
 * to the optimized element or to the elements structure itself.
 *
 * @param aExpression - the original expression
 * @returns the decoded expression
 */
function _decodeExpression(aExpression: string): string {
  // initialize properly
  _assertHandlers();
  // check for the first dot
  const idx = aExpression.indexOf('.');
  if (idx >= 0) {
    // check if we have a mapping
    const key = aExpression.substr(0, idx);
    const kind = _LAZY_HANDLER_KEYS[key];
    if (isNotNil(kind)) {
      // check the element name
      const idx1 = aExpression.indexOf('.', idx + 1);
      const name =
        idx1 > idx
          ? aExpression.substring(idx + 1, idx1)
          : aExpression.substr(idx + 1);
      // extract the name
      switch (kind) {
        case HandlerKind.SINGLE_VALUE:
          return `${_ELEMENTS}.${name}.${KEY_VALUE}`;
        case HandlerKind.MULTI_VALUES:
          return `${_ELEMENTS}.${name}.${KEY_VALUES}`;
        case HandlerKind.SINGLE:
          return `${_ELEMENTS}.${name}`;
      }
    }
  }
  // just as is
  return aExpression;
}

// can't use a symbol since we use this aross libraries
const KEY_EXPRESSION = '45b01348-de92-44a0-8103-7b7dc471ad8c';

// gets an expression
declare type ExpressionGetter = Generator<string>;

/**
 * Returns the property binding expression from the getter of a property. A property is always bound to
 * a top level element, NOT to an inner value of a group expression.
 *
 * @param aPrototype - the prototype object
 * @param aPropertyKey - the property key
 *
 * @returns the expression or undefined if it does not exist
 */
function _getExpressionFromProperty(
  aPrototype: any,
  aPropertyKey: string
): string | null | undefined {
  // check if we have a property descriptor
  let obj = aPrototype;
  while (obj) {
    // access the descriptor
    const desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(
      obj,
      aPropertyKey
    );
    if (desc) {
      // check if we have a getter
      const getter = desc.get;
      if (isFunction(getter)) {
        // access the expression
        const expGetter = getter[KEY_EXPRESSION] as ExpressionGetter;
        if (isFunction(expGetter)) {
          // compute it
          return expGetter();
        }
      }
    }
    // walk up
    obj = Object.getPrototypeOf(obj);
  }
  // nothing
  return undefined;
}

// matches any valid expression
const PROPERTY_REGEX = /^([^\[]+)(\[\d+\])?$/;

/**
 * Tranlates the accessor to an expression
 *
 * @param aPrototype - the object
 * @param aAccessor - the accessor string, possibly indexed
 *
 * @returns  the accessor expression, relative to the rendering context
 */
function _getExpressionFromAccessor(
  aPrototype: any,
  aAccessor: string
): string | undefined {
  // split the accessor
  const tokens: string[] = aAccessor.trim().split('.');
  // check if the
  if (tokens.length > 0) {
    // resolve the property of the first token
    const [firstTotal, firstKey, firstIndex] = PROPERTY_REGEX.exec(tokens[0]);
    if (firstKey === _ELEMENTS) {
      // this is an expression directly into the elements structure, use as is
      return aAccessor;
    }
    // the root expression
    const expression: string[] = [
      _getExpressionFromProperty(aPrototype, firstKey) || firstKey
    ];
    if (isNotNil(firstIndex)) {
      expression.push(firstIndex);
    }
    // resolve the remaining items
    const len = tokens.length;
    let idx = 1;
    while (idx < len) {
      // split
      const [total, key, index] = PROPERTY_REGEX.exec(tokens[idx++]);
      // test the index signature
      if (isNotNil(index)) {
        // append
        expression.push('.', key, '.', KEY_VALUES, index);
      } else {
        expression.push('.', key, '.', KEY_VALUE);
      }
    }
    // ok
    return expression.join('');
  }
  // nothing special to return
  return aAccessor;
}

export interface RenderingContextInterceptors {
  opRenderingContext: MonoTypeOperatorFunction<RenderingContext>;
  opRenderingContexts: MonoTypeOperatorFunction<RenderingContext[]>;
}

// converts from a single rendering context to an array
const opRcToRcs: OperatorFunction<RenderingContext, RenderingContext[]> = (
  onRc
) =>
  rxPipe(
    onRc,
    map((rc) => [rc])
  );

// converts an array back to a single context
const opRcsToRc: OperatorFunction<RenderingContext[], RenderingContext> = (
  onRcs
) =>
  rxPipe(
    onRcs,
    filter((rcs) => rcs && rcs.length > 0),
    map((rcs) => rcs[0])
  );

const NOOP_INTERCEPTORS: RenderingContextInterceptors = {
  opRenderingContext: identity,
  opRenderingContexts: identity
};

/**
 * Prepare a list of interceptors
 */
function _prepareRenderingContextInterceptors(
  aRenderingContextInterceptors: RenderingContextInterceptor[]
): RenderingContextInterceptors {
  // quick check for the empty case
  if (!isNotEmpty(aRenderingContextInterceptors)) {
    // returns the noop
    return NOOP_INTERCEPTORS;
  }
  // result sets
  const arrRenderingContext: Array<MonoTypeOperatorFunction<
    RenderingContext
  >> = [];
  const arrRenderingContexts: Array<MonoTypeOperatorFunction<
    RenderingContext[]
  >> = [];
  // handle
  forEach(aRenderingContextInterceptors, (ic) => {
    // extract
    const op = ic.opRenderingContext;
    const ops = ic.opRenderingContexts;
    // test
    const bOp = isNotNil(op);
    const bOps = isNotNil(ops);
    // handle the single case
    if (bOp) {
      arrRenderingContext.push(op);
    } else if (bOps) {
      // transform
      arrRenderingContext.push((onRc) =>
        rxPipe(onRc, opRcToRcs, ops, opRcsToRc)
      );
    }
    // handle the multi case
    if (bOps) {
      arrRenderingContexts.push(ops);
    } else if (bOp) {
      // transform
      arrRenderingContexts.push((onRcs) =>
        rxPipe(
          onRcs,
          switchMap((rcs) =>
            combineLatest(...mapArray(rcs, (rc) => rxPipe(of(rc), op)))
          )
        )
      );
    }
  });
  // combine into single operators
  const opRenderingContext: MonoTypeOperatorFunction<RenderingContext> = isNotEmpty(
    arrRenderingContext
  )
    ? (opRc) => rxPipe(opRc, ...arrRenderingContext)
    : identity;
  const opRenderingContexts: MonoTypeOperatorFunction<RenderingContext[]> = isNotEmpty(
    arrRenderingContexts
  )
    ? (opRcs) => rxPipe(opRcs, ...arrRenderingContexts)
    : identity;
  // done
  return { opRenderingContext, opRenderingContexts };
}

/**
 * Decodes an element from the accessor
 *
 * @param aAccessor - the accessor expression
 * @param aContext - the rendering context
 *
 * @returns the element or undefineds
 */
export function wchElementFromRenderingContext(
  aContext: RenderingContext,
  aAccessor: string
): AbstractElement {
  // check
  if (isString(aAccessor)) {
    // decode the path
    const path = parsePath(aAccessor);
    // check the elements
    if (isNotEmpty(path) && path.length >= 2 && path[0] === _ELEMENTS) {
      // last elements might be value, values or an index
      const len = path.length;
      const p =
        path[len - 1] === KEY_VALUE || path[len - 1] === KEY_VALUES
          ? path.slice(0, len - 1)
          : path[len - 2] === KEY_VALUES
          ? path.slice(0, len - 2)
          : path;
      // extract
      return getPath(aContext, p);
    }
  }
  // nothing to return
  return UNDEFINED;
}

// element types with inline values
const _INLINE_VALUES = [
  ELEMENT_TYPE_FILE,
  ELEMENT_TYPE_LINK,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_VIDEO,
  ELEMENT_TYPE_LOCATION,
  ELEMENT_TYPE_CATEGORY
];

/**
 * parses a path expression
 *
 * @param aExpression - the expression string
 * @returns function that selects the expression string
 */
function _selectAccessor(aAccessor: string): UnaryFunction<any, any> {
  // parse the path
  const path = parsePath(aAccessor);
  // check if we need a fallback
  const len = path.length;
  if (len > 0 && path[len - 1] === KEY_VALUE) {
    // remove the last segment
    const fallback = path.slice(0, -1);
    // implement the fallback logic
    return (obj) => {
      // base object
      const base = getPath<AbstractElement>(obj, fallback);
      // check if this is one of the strange types
      const elementType = getProperty(base, KEY_ELEMENT_TYPE);
      return _INLINE_VALUES.indexOf(elementType) >= 0
        ? base
        : getProperty(base as any, KEY_VALUE);
    };
  }
  // default
  return pluckPath(path);
}

export {
  _addPlaceholderToElement as wchAddPlaceholderToElement,
  _selectAccessor as wchSelectAccessor,
  _decodeExpression as wchDecodeExpression,
  _getExpressionFromAccessor as wchDecodeAccessor,
  _prepareRenderingContextInterceptors as wchPrepareRenderingContextInterceptors
};
