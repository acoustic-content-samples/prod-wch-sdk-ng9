import { identity, UnaryFunction } from 'rxjs';
import { BiFunction } from '../consumers/consumer';
import {
  arrayGenerator,
  Generator,
  objectGenerator
} from './../generators/generator';
import {
  EqualsPredicate,
  isArray,
  isEqual,
  isFunction,
  isNotEmpty,
  isNotNil,
  isNumber,
  isPlainObject,
  isString,
  Predicate
} from './../predicates/predicates';
import {
  mapArray,
  partialSecond,
  reduceArray,
  sliceArray,
  UNDEFINED
} from './js.core';
import { getProperty, pluckLength } from './pluck';

export const KEY_DEBUG = '$$DEBUG';

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * To support PhantomJS
 */
const _keys_polyfill = (obj: any) => {
  const result: string[] = [];
  if (obj != null) {
    for (const prop in obj) {
      if (hasOwnProperty.call(obj, prop)) {
        result.push(prop);
      }
    }
  }
  return result;
};

const _safe_keys = (obj: any) => (obj != null ? Object.keys(obj) : []);

const _assign_polyfill = (target: any, ...varArgs: any[]) => {
  const to = Object(target);

  const len = varArgs.length;
  for (let index = 0; index < len; index++) {
    const nextSource = varArgs[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (const nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
};

/**
 * Make sure we have some of the central functions
 */
const _keys: typeof Object.keys =
  Object && isFunction(Object.keys) ? _safe_keys : _keys_polyfill;
const _assign: typeof Object.assign =
  Object && isFunction(Object.assign) ? Object.assign : _assign_polyfill;

/**
 * Tests if two arrays are equal
 *
 * @param aLeft - left array
 * @param aRight - right array
 * @param aPredicate - the equals predicate
 */
const _arrayEquals = <T>(
  aLeft: T[],
  aRight: T[],
  aPredicate: EqualsPredicate<T>
): boolean => {
  // compare equality
  if (aLeft === aRight) {
    return true;
  }
  // check the type
  if (isArray(aLeft) && isArray(aRight)) {
    // test length
    let lLeft = pluckLength(aLeft);
    if (lLeft === pluckLength(aRight)) {
      // check
      while (lLeft-- > 0) {
        if (!aPredicate(aLeft[lLeft], aRight[lLeft])) {
          return false;
        }
      }
      return true;
    }
  }
  // not the same
  return false;
};

/**
 * Tests if two objects are equal
 *
 * @param aLeft - left object
 * @param aRight - right object
 * @param aPredicate - the equals predicate
 */
const _objectEquals = (
  aLeft: any,
  aRight: any,
  aPredicate: EqualsPredicate<any>
): boolean => {
  // compare equality
  if (aLeft === aRight) {
    return true;
  }
  // check the type
  if (isPlainObject(aLeft) && isPlainObject(aRight)) {
    // compare the objects by key
    const leftKeys = _keys(aLeft);
    let lLeft = pluckLength(leftKeys);
    if (lLeft === pluckLength(_keys(aRight))) {
      // check
      while (lLeft-- > 0) {
        const kLeft = leftKeys[lLeft];
        if (kLeft !== KEY_DEBUG && !aPredicate(aLeft[kLeft], aRight[kLeft])) {
          return false;
        }
      }
      // ok
      return true;
    }
  }
  // not equal
  return false;
};

/**
 * Tests if two objects are identical
 *
 * @param aLeft - left object
 * @param aRight - right object
 */
const _deepEquals = (aLeft: any, aRight: any): boolean => {
  // identity check
  return (
    _objectEquals(aLeft, aRight, _deepEquals) ||
    _arrayEquals(aLeft, aRight, _deepEquals)
  );
};

/**
 * Tests if two objects are identical
 *
 * @param aLeft - left object
 * @param aRight - right object
 */
export const shallowEquals = (aLeft: any, aRight: any): boolean => {
  // identity check
  return (
    _objectEquals(aLeft, aRight, isEqual) ||
    _arrayEquals(aLeft, aRight, isEqual)
  );
};

/**
 * Pushes a value to an array
 *
 * @param aValue - the value
 * @param aArray - the array
 * @returns the array
 */
const _push = <T>(aValue: T, aArray: T[]): T[] => {
  aArray.push(aValue);
  return aArray;
};

const _anyToString = (aValue: any): string => {
  return aValue === UNDEFINED
    ? 'undefined'
    : aValue === null
    ? 'null'
    : aValue.toString();
};

/**
 * Assigns a property to an object and returns that object
 *
 * @param aKey - key to assign
 * @param aValue - value to assign
 * @param aObject - the object
 *
 * @returns the object  that was passed in
 */
const _objectAssign = <T, V>(aKey: string, aValue: V, aObject: T): T => {
  aObject[aKey] = aValue;
  return aObject;
};

/**
 * Performs a deep clone for the value, supports just plain objects and arrays
 *
 * @param aValue - the value to clone
 * @returns the cloned object
 */
function _cloneDeep(aValue: any): any {
  // clone as array
  if (isArray(aValue)) {
    // clone via map
    return mapArray(aValue, _cloneDeep);
  }
  if (isPlainObject(aValue)) {
    // clone the object
    const result = {};
    // tslint:disable-next-line:forin
    for (const key in aValue) {
      result[key] = _cloneDeep(aValue[key]);
    }
    return result;
  }
  // nothing to clone
  return aValue;
}

export type RecordKey = keyof any;

const _assertFromFunction = <T, K extends RecordKey = RecordKey>(
  aKey: K,
  aObject: any,
  aCallback: UnaryFunction<K, T>
) => aObject[aKey] || (aObject[aKey] = aCallback(aKey));

export const assertFromGenerator = <T>(
  aKey: RecordKey,
  aObject: any,
  aGenerator: Generator<T>
): T => aObject[aKey] || (aObject[aKey] = aGenerator());

export const assertObject = <T>(aKey: RecordKey, aObject: any): T =>
  assertFromGenerator<T>(aKey, aObject, objectGenerator);

export const assertArray = <T>(aKey: RecordKey, aObject: any): T[] =>
  assertFromGenerator<T[]>(aKey, aObject, arrayGenerator);

export const lastElement = <T>(aArray: T[]): T =>
  isNotEmpty(aArray) ? aArray[aArray.length - 1] : UNDEFINED;

export const firstElement = <T>(aArray: T[]): T =>
  isNotEmpty(aArray) ? aArray[0] : UNDEFINED;

export const nthElement = <T>(aArray: T[], aIndex: number): T =>
  aArray && aIndex >= 0 && aIndex < aArray.length ? aArray[aIndex] : UNDEFINED;

/**
 * Converts the value to an integer
 *
 * @param aValue - the value
 * @param aDefault - the default value in case of an error
 */
function _toInteger(aValue: any, aDefault: number): number {
  // returns the number value directly
  if (isNumber(aValue)) {
    return aValue;
  }
  if (isString(aValue)) {
    try {
      const res = Number.parseInt(aValue, 10);
      return isNaN(res) ? aDefault : res;
    } catch (err) {
      return aDefault;
    }
  }
  // else
  return aDefault;
}

const _UNDEFINED_TYPE = typeof UNDEFINED;
const _FUNCTION_TYPE = typeof _keys;

/**
 * Produces a random number within the bounds
 *
 * @param aMin - minimum bound
 * @param aMax - max bound
 * @returns the result
 */
function _random(aMin: number, aMax: number): number {
  return aMin + Math.floor(Math.random() * (aMax - aMin));
}

/**
 * Constructs a getter description
 *
 * @param aGetter - the getter
 * @returns the description of the getter
 */
function _createGetter<T>(aGetter: Generator<T>): PropertyDescriptor {
  // the descriptor
  return {
    get: aGetter,
    enumerable: true
  };
}

/**
 * Run a callback for each key value pair
 *
 * @param aObject - the object
 * @param aConsumer - consumer callback
 */
function _reduceForIn<T, R>(
  aObject: Record<string, T> | object | null | undefined,
  aFunction: (aRes: R, aValue: T, aKey: string) => R,
  aInitial: R
): R {
  // the resulting object
  let result = aInitial;
  // make sure we have an object
  if (isPlainObject(aObject)) {
    // tslint:disable-next-line:forin
    for (const name in aObject) {
      // actual element
      result = aFunction(result, aObject[name], name);
    }
  }
  // ok
  return result;
}

/**
 * Groups an array into an object given a key extractor
 *
 * @param aArray - the array
 * @param aKeyExtractor - the key extractor
 * @param aTransformer - the transformer for the values, defaults to the identity operation
 *
 * @returns the mapping
 */
function _reduceToObject<T, V = T>(
  aArray: ArrayLike<T> | null | undefined,
  aKeyExtractor: UnaryFunction<T, string>,
  aTransformer?: UnaryFunction<T, V>
): Record<string, V> {
  // the transformer
  const trfrm: UnaryFunction<T, V> = aTransformer || (identity as any);
  const result: Record<string, V> = {};
  // reduce
  return reduceArray(
    aArray,
    (res, value) => _objectAssign(aKeyExtractor(value), trfrm(value), res),
    result
  );
}

/** Generates a predicate that compares a named property of an object with another
 * predicate
 *
 * @param aKey - the key of the object to compare
 * @param aPredicate - the predicate that compares the value of the property
 *
 * @returns the final predicate
 */
export const byProperty = <T, K extends keyof T>(
  aKey: K,
  aPredicate: Predicate<T[K]>
): Predicate<T> => (aValue: T) => aPredicate(getProperty(aValue, aKey));

/**
 * Implements a wrapper function that limits the arguments to the given size
 *
 * @param aArity - the arity, i.e. the maximum number of supported arguments
 * @param aFunction - the function
 *
 * @returns  the limited function
 */
function _nary(
  aArity: number,
  aFunction: (...aValues: any[]) => any
): (...aValues: any[]) => any {
  // helper function that cuts the arguments down to a maximum number
  function _dispatch() {
    const a = arguments;
    return aFunction.apply(
      this,
      a.length > aArity ? sliceArray.call(a, 0, aArity) : a
    );
  }
  // returns the dispatcher function
  return _dispatch;
}

/**
 * Guarantees a nullary function
 *
 * @param aFunction - the original function
 * @returns the unary function
 */
export const nullary: <T>(aFunction: () => T) => () => T = (aFunction) => () =>
  aFunction();

/**
 * Guarantees a unary function
 *
 * @param aFunction - the original function
 * @returns the unary function
 */
export const unary: <T, R>(
  aFunction: UnaryFunction<T, R>
) => UnaryFunction<T, R> = (aFunction) => (aFirst) => aFunction(aFirst);

/**
 * Guarantees a binary function
 *
 * @param aFunction - the original function
 * @returns the binary function
 */
export const binary: <T1, T2, R>(
  aFunction: BiFunction<T1, T2, R>
) => BiFunction<T1, T2, R> = (aFunction) => (aFirst, aSecond) =>
  aFunction(aFirst, aSecond);

export type Function0<R> = () => R;
export type Function1<T1, R> = (t1: T1) => R;
export type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
export type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export type Function4<T1, T2, T3, T4, R> = (
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4
) => R;

export interface Partial {
  // arity 0
  <R>(func: Function0<R>): Function0<R>;
  // arity 1
  <T1, R>(func: Function1<T1, R>): Function1<T1, R>;
  <T1, R>(func: Function1<T1, R>, arg1: T1): Function0<R>;
  // arity 2
  <T1, T2, R>(func: Function2<T1, T2, R>): Function2<T1, T2, R>;
  <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1): Function1<T2, R>;
  <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, arg2: T2): Function0<R>;
  // arity 3
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>): Function3<T1, T2, T3, R>;
  <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1): Function2<
    T2,
    T3,
    R
  >;
  <T1, T2, T3, R>(
    func: Function3<T1, T2, T3, R>,
    arg1: T1,
    arg2: T2
  ): Function1<T3, R>;
  <T1, T2, T3, R>(
    func: Function3<T1, T2, T3, R>,
    arg1: T1,
    arg2: T2,
    arg3: T3
  ): Function0<R>;
  // arity 4
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>): Function4<
    T1,
    T2,
    T3,
    T4,
    R
  >;
  <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1): Function3<
    T2,
    T3,
    T4,
    R
  >;
  <T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    arg1: T1,
    arg2: T2
  ): Function2<T3, T4, R>;
  <T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    arg1: T1,
    arg2: T2,
    arg3: T3
  ): Function1<T4, R>;
  <T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4
  ): Function0<R>;
}

export interface Bind {
  // arity 0
  <TH, R>(func: Function0<R>, aThis: TH): Function0<R>;
  // arity 1
  <TH, T1, R>(func: Function1<T1, R>, aThis: TH): Function1<T1, R>;
  <TH, T1, R>(func: Function1<T1, R>, aThis: TH, arg1: T1): Function0<R>;
  // arity 2
  <TH, T1, T2, R>(func: Function2<T1, T2, R>, aThis: TH): Function2<T1, T2, R>;
  <TH, T1, T2, R>(func: Function2<T1, T2, R>, aThis: TH, arg1: T1): Function1<
    T2,
    R
  >;
  <TH, T1, T2, R>(
    func: Function2<T1, T2, R>,
    aThis: TH,
    arg1: T1,
    arg2: T2
  ): Function0<R>;
  // arity 3
  <TH, T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, aThis: TH): Function3<
    T1,
    T2,
    T3,
    R
  >;
  <TH, T1, T2, T3, R>(
    func: Function3<T1, T2, T3, R>,
    aThis: TH,
    arg1: T1
  ): Function2<T2, T3, R>;
  <TH, T1, T2, T3, R>(
    func: Function3<T1, T2, T3, R>,
    aThis: TH,
    arg1: T1,
    arg2: T2
  ): Function1<T3, R>;
  <TH, T1, T2, T3, R>(
    func: Function3<T1, T2, T3, R>,
    aThis: TH,
    arg1: T1,
    arg2: T2,
    arg3: T3
  ): Function0<R>;
  // arity 4
  <TH, T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    aThis: TH
  ): Function4<T1, T2, T3, T4, R>;
  <TH, T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    aThis: TH,
    arg1: T1
  ): Function3<T2, T3, T4, R>;
  <TH, T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    aThis: TH,
    arg1: T1,
    arg2: T2
  ): Function2<T3, T4, R>;
  <TH, T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    aThis: TH,
    arg1: T1,
    arg2: T2,
    arg3: T3
  ): Function1<T4, R>;
  <TH, T1, T2, T3, T4, R>(
    func: Function4<T1, T2, T3, T4, R>,
    aThis: TH,
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4
  ): Function0<R>;
}

function __bind() {
  const a = arguments;
  return a[0].bind(a[1], ...sliceArray.call(a, 2));
}

/**
 * Our simple implementation
 *
 * @param aFunction - the original function
 * @param aThis - the this argument
 * @param aArgs - the arguments
 *
 * @returns the final function
 */
const _bind: Bind = __bind as any;

export interface BindMember {
  // arity 0
  <TH, K extends keyof TH, V extends TH[K] & Function0<R>, R>(
    aThis: TH,
    aKey: K
  ): Function0<R>;
  // arity 1
  <TH, T1, K extends keyof TH, V extends TH[K] & Function1<T1, R>, R>(
    aThis: TH,
    aKey: K
  ): Function1<T1, R>;
  <TH, T1, K extends keyof TH, V extends TH[K] & Function1<T1, R>, R>(
    aThis: TH,
    aKey: K,
    aArg1: T1
  ): Function0<R>;
  // arity 2
  <TH, T1, T2, K extends keyof TH, V extends TH[K] & Function2<T1, T2, R>, R>(
    aThis: TH,
    aKey: K
  ): Function2<T1, T2, R>;
  <TH, T1, T2, K extends keyof TH, V extends TH[K] & Function2<T1, T2, R>, R>(
    aThis: TH,
    aKey: K,
    aArg1: T1
  ): Function1<T2, R>;
  <TH, T1, T2, K extends keyof TH, V extends TH[K] & Function2<T1, T2, R>, R>(
    aThis: TH,
    aKey: K,
    aArg1: T1,
    aArg2: T2
  ): Function0<R>;
}

/**
 * Our simple implementation
 *
 * @param aThis - the this argument
 * @param aKey - the key of the member function
 * @param aArgs - the arguments
 *
 * @returns the final function
 */
function __bindMember() {
  const a = arguments;
  const [th, name] = a;
  return a.length === 2
    ? th[name].bind(th)
    : th[name].bind(th, ...sliceArray.call(a, 2));
}

/**
 * The bind member magic
 */
const _bindMember: BindMember = __bindMember as any;

export interface BindKey {
  // arity 0
  <TH, K extends keyof TH, V extends TH[K] & Function0<R>, R>(
    aKey: K
  ): Function1<TH, R>;
  // arity 1
  <TH, T1, K extends keyof TH, V extends TH[K] & Function1<T1, R>, R>(
    aKey: K
  ): Function2<TH, T1, R>;
  <TH, T1, K extends keyof TH, V extends TH[K] & Function1<T1, R>, R>(
    aKey: K,
    aArg1: T1
  ): Function1<TH, R>;
  // arity 2
  <TH, T1, T2, K extends keyof TH, V extends TH[K] & Function2<T1, T2, R>, R>(
    aKey: K
  ): Function3<TH, T1, T2, R>;
  <TH, T1, T2, K extends keyof TH, V extends TH[K] & Function2<T1, T2, R>, R>(
    aKey: K,
    aArg1: T1
  ): Function2<TH, T2, R>;
  <TH, T1, T2, K extends keyof TH, V extends TH[K] & Function2<T1, T2, R>, R>(
    aKey: K,
    aArg1: T1,
    aArg2: T2
  ): Function1<TH, R>;
}

/**
 * Our simple implementation
 *
 * @param aKey - the key of the member function
 * @param aArgs - the arguments
 *
 * @returns the final function
 */
function __bindKey() {
  const a = arguments;
  const key = a[0];
  const args = sliceArray.call(a, 1);
  // return the function
  function ___bindKey() {
    const b = arguments;
    const th = b[0];
    const brgs = sliceArray.call(b, 1);
    // dispatch
    return th[key].apply(th, args.length > 0 ? args.concat(brgs) : brgs);
  }
  // ok
  return ___bindKey;
}

/**
 * The bind member magic
 */
const _bindKey: BindKey = __bindKey as any;

/**
 * Our simple implementation
 *
 * @param aFunction - the original function
 * @param aArgs - the arguments
 *
 * @returns the final function
 */
const _partialLeft: Partial = (
  aFunction: (...a: any[]) => any,
  ...aArgs: any[]
) => aFunction.bind(this, ...aArgs);

/**
 * Returns a function that tests if a value is equal to another value
 *
 * @param aComparison - the value to compare with
 * @returns the predicate
 */
const _isDeepEqualTo = <T>(aComparison: T): Predicate<T> =>
  _partialLeft(_deepEquals, aComparison);

/**
 * Locates an element in an array
 *
 * @param aArray -
 * @param aPredicate -
 */
export const arrayFind = <T>(
  aArray: T[] | null | undefined,
  aPredicate: Predicate<T>
): T => (aArray ? aArray.find(aPredicate) : UNDEFINED);

/**
 * Merge objects together and consider undefined or empty objects as not overridable
 *
 * @param aLeft - the left object
 * @param aRight - the right object
 *
 * @returns the resulting object
 */
function _mergeObjects<T>(aLeft: T, aRight: T): T {
  // the result
  const result: T = _assign({}, aLeft, aRight);
  // merge as we expect
  return _reduceToObject(
    _keys(result),
    identity,
    (key: string) => aRight[key] || aLeft[key]
  ) as T;
}

/**
 * Filters an array
 *
 * @param aArray - the array
 * @param aPredicate - the predicate function
 *
 * @returns the result array
 */
export function filterArray<T>(
  aArray: ArrayLike<T>,
  aPredicate: Predicate<T>
): T[] {
  // the result value
  const r: T[] = [];
  const len = pluckLength(aArray);
  for (let i = 0; i < len; ++i) {
    const item = aArray[i];
    if (aPredicate(item)) {
      r.push(item);
    }
  }
  // ok
  return r;
}

/**
 * Returns the first non null value from the list
 *
 * @param aValues - the values to check in order
 * @returns the first non null value or undefined
 */
export const fallback: <T>(...aValues: T[]) => T = partialSecond<any, any, any>(
  arrayFind,
  isNotNil
);

export {
  _mergeObjects as mergeObjects,
  _isDeepEqualTo as isDeepEqualTo,
  _partialLeft as partialLeft,
  _bind as bind,
  _bindMember as bindMember,
  _bindKey as bindKey,
  _nary as nary,
  _random as random,
  _arrayEquals as arrayEquals,
  _createGetter as createGetter,
  _objectEquals as objectEquals,
  _deepEquals as deepEquals,
  _cloneDeep as cloneDeep,
  _keys as objectKeys,
  _push as arrayPush,
  _anyToString as anyToString,
  _assertFromFunction as assertFromFunction,
  _objectAssign as objectAssign,
  _assign as assignObject,
  _toInteger as toInteger,
  _reduceToObject as reduceToObject,
  _reduceForIn as reduceForIn,
  _UNDEFINED_TYPE as UNDEFINED_TYPE,
  _FUNCTION_TYPE as FUNCTION_TYPE
};
