/* Copyright IBM Corp. 2018 */
import { RenderingContextProvider } from '@acoustic-content-sdk/api';
import { identity, isObservable, UnaryFunction } from 'rxjs';

import { arrayEvery, not, partialSecond, UNDEFINED } from '../js/js.core';

export type IsPredicate<T> = (aValue: any | null | undefined) => aValue is T;

export type Predicate<T> = (aValue: T | null | undefined) => boolean;

export type EqualsPredicate<T> = (aLeft: T, aRight: T) => boolean;

export function isEqual<T>(aLeft: T, aRight: T): boolean {
  return aLeft === aRight;
}

/**
 * helper
 */
const internalToString = Object.prototype.toString;

/**
 * Returns a function that tests if a value is equal to another value
 *
 * @param aComparison - the value to compare with
 * @returns the predicate
 */
export const isEqualTo = <T, R = T>(
  aComparison: T,
  aTransform?: UnaryFunction<R, T>
): Predicate<R> => {
  // the transform
  const trfrm: UnaryFunction<R, T> = aTransform || (identity as any);
  // execute the operation
  return (aValue) => isEqual(trfrm(aValue), aComparison);
};

/**
 * Invokes the native toString method
 *
 * @param aValue - value to call for
 * @returns the result of the method
 */
function _applyToString(aValue: any): string {
  return internalToString.apply(aValue);
}

/**
 * Never predicate, that never is true
 */
const _isNever: IsPredicate<never> = (() => false) as any;

/**
 * Tests if an object is a function
 *
 * @param aValue - value to test
 */
const _isFunction: IsPredicate<Function> = isEqualTo(
  _applyToString(_applyToString),
  _applyToString
) as any;

/**
 * Tests if a value is an array
 */
const _isArray: IsPredicate<any[]> = isEqualTo(
  _applyToString([]),
  _applyToString
) as any;

/**
 * Tests if an object is a string
 *
 * @param aValue - value to test
 */
const _isString: IsPredicate<string> = isEqualTo(
  _applyToString(''),
  _applyToString
) as any;

/**
 * TypeOf as a function
 *
 * @param aValue - value to check
 * @returns the type
 */
export const typeOf = (aValue: any) => typeof aValue;

/**
 * Tests if a value is a number value
 *
 * @param aValue - the value
 * @returns true if the value is number, else false
 */
export const isNumber: IsPredicate<number> = isEqualTo(
  typeOf(0),
  typeOf
) as any;

/**
 * Tests if a value is like an array, i.e. it has the length property
 *
 * @param aValue - the value
 * @returns true if the object is like an array, else false
 */
const _isArrayLike: IsPredicate<ArrayLike<any>> = ((aValue: any) =>
  _isNotNil(aValue) && isNumber(aValue.length)) as any;

/**
 * Tests if a value is a date
 *
 * @param aValue - the value
 * @returns true if the value is date, else false
 */
function _isDate(aValue: any): aValue is Date {
  return aValue instanceof Date;
}

/**
 * Tests if a value is a boolean value
 *
 * @param aValue - the value
 * @returns true if the value is boolean, else false
 */
const _isBoolean: IsPredicate<boolean> = isEqualTo(typeOf(!0), typeOf) as any;

/**
 * Checks for undefined
 *
 * @param aObject - object to check
 * @returns the return value
 */
export const isUndefined: IsPredicate<undefined> = isEqualTo(UNDEFINED) as any;

/**
 * Checks for undefined
 *
 * @param aObject - object to check
 * @returns the return value
 */
const _isNull: IsPredicate<null> = isEqualTo(null) as any;

/**
 * Checks for nil
 *
 * @param aObject - object to check
 * @returns the return value
 */
const _isNil: (aObject: any) => aObject is null | undefined = ((aValue) =>
  aValue == null) as any;

/**
 * Checks for nil
 *
 * @param aObject - object to check
 * @returns the return value
 */
const _isNotNil: <T>(aObject: T | null | undefined) => aObject is T = ((
  aValue
) => aValue != null) as any;

function getGrandPrototypeOf(aValue: any) {
  const parent = Object.getPrototypeOf(aValue);
  return parent != null ? Object.getPrototypeOf(parent) : parent;
}

/**
 * Tests for a plain object
 *
 * @param aObject - the object to test
 */
function _isPlainObject(aObject: any): aObject is object {
  return aObject != null && getGrandPrototypeOf(aObject) == null;
}

/**
 * Tests if a URL is an absolute URL
 *
 * @param aUrl - the URL string
 * @returns true if the URL is absolute, else false
 */
const _isAbsoluteUrl: IsPredicate<string> = (aUrl: any): aUrl is string =>
  _isString(aUrl) &&
  (aUrl.startsWith('http://') || aUrl.startsWith('https://'));

/**
 * Tests if all elements of the array are of a particular type
 *
 * @param aValue - the value to test
 * @param aPredicate - the predicate to test each element with
 *
 * @returns true if the value is an array and all elements are of the specific type
 */
function _isArrayOf<T>(aValue: any, aPredicate: IsPredicate<T>): aValue is T[] {
  // test each array member
  return _isArray(aValue) && arrayEvery(aValue, aPredicate);
}

/**
 * Tests if all elements of the array are of a particular type
 *
 * @param aValue - the value to test
 * @param aPredicate - the predicate to test each element with
 *
 * @returns true if the value is an array and all elements are of the specific type
 */
function _isArrayLikeOf<T>(
  aValue: any,
  aPredicate: IsPredicate<T>
): aValue is ArrayLike<T> {
  // test each array member
  return arrayEvery(aValue, aPredicate);
}

/**
 * Tests if all elements of the array are of type string
 *
 * @param aValue - the value to test
 * @param aPredicate - the predicate to test each element with
 *
 * @returns true if the value is an array and all elements are of the specific type
 */
const _isStringArray: IsPredicate<string[]> = partialSecond(
  _isArrayOf,
  _isString
) as any;

/**
 * Tests if all elements of the array are of type string
 *
 * @param aValue - the value to test
 * @param aPredicate - the predicate to test each element with
 *
 * @returns true if the value is an array and all elements are of the specific type
 */
const _isStringArrayLike: IsPredicate<ArrayLike<string>> = partialSecond(
  _isArrayLikeOf,
  _isString
) as any;

/**
 * Tests if all fields of an object are of a particular type
 *
 * @param aValue - the value to test
 * @param aPredicate - the predicate to test each element with
 *
 * @returns true if the value is an array and all elements are of the specific type
 */
function _isObjectOf<T>(
  aValue: any,
  aPredicate: IsPredicate<T>
): aValue is { [key: string]: T } {
  // test if the value is an object
  if (!_isPlainObject(aValue)) {
    return false;
  }
  // test each object
  // tslint:disable-next-line:forin
  for (const key in aValue) {
    // test
    if (!aPredicate(aValue[key])) {
      return false;
    }
  }
  // ok
  return true;
}

/**
 * Tests if an array is empty
 *
 * @param aArray - the array
 * @returns true if the array is empty, else false
 */
export const isEmpty: Predicate<any[]> = (aArray) =>
  aArray && aArray.length <= 0;

/**
 * Tests if an array is not empty
 *
 * @param aArray - the array
 * @returns true if the array is not empty, else false
 */
const _isNotEmpty = <T>(arr: any): arr is ArrayLike<T> => !!(arr && arr.length);

/**
 * Tests if the array does not exist or if it is empty
 *
 * @param aArray - the array
 *
 * @returns true if the array is nil or empty, else false
 */
const _isNilOrEmpty = not(_isNotEmpty);

/**
 * Tests if all fields of an object are of a particular type
 *
 * @param aValue - the value to test
 * @param aPredicate - the predicate to test each element with
 *
 * @returns true if the value is an array and all elements are of the specific type
 */
function _isParseableAsDate(aValue: any): aValue is string | number | Date {
  // check if the value can be parsed as a string
  return (
    _isNotNil(aValue) &&
    (_isString(aValue) || isNumber(aValue) || _isDate(aValue))
  );
}

export function isFlagSet(aValue: number, aFlag: number): boolean {
  /* tslint:disable:no-bitwise */
  return isEqual(aValue & aFlag, aFlag);
}

/**
 * Tests is an object is a rendering context provider
 *
 * @returns true if the object is rendering context, else false
 */
export function isRenderingContextProvider(
  aValue: any
): aValue is RenderingContextProvider {
  return aValue && isObservable(aValue.onRenderingContext);
}

export function isURL(aValue: any): aValue is URL {
  return (
    _isNotNil(aValue) && _isString(aValue.href) && _isString(aValue.origin)
  );
}

export function isOptional<T>(
  aValue: any,
  aPredicate: IsPredicate<T>
): aValue is T {
  return _isNil(aValue) || aPredicate(aValue);
}

export function isOptionalArrayOf<T>(
  aValue: any,
  aPredicate: IsPredicate<T>
): aValue is T[] {
  return _isNil(aValue) || _isArrayOf(aValue, aPredicate);
}

export {
  _isNil as isNil,
  _isNotNil as isNotNil,
  _isString as isString,
  _isBoolean as isBoolean,
  isObservable,
  _isAbsoluteUrl as isAbsoluteURL,
  _isArray as isArray,
  _isArrayLike as isArrayLike,
  _isFunction as isFunction,
  _isDate as isDate,
  _isParseableAsDate as isParseableAsDate,
  _isPlainObject as isPlainObject,
  _isStringArray as isStringArray,
  _isStringArrayLike as isStringArrayLike,
  _isArrayOf as isArrayOf,
  _isArrayLikeOf as isArrayLikeOf,
  _isObjectOf as isObjectOf,
  _isNotEmpty as isNotEmpty,
  _isNilOrEmpty as isNilOrEmpty,
  _isNever as isNever
};
