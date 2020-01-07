import { UnaryFunction } from 'rxjs';

import { BiConsumer, BiFunction, Consumer } from '../consumers/consumer';
import { Predicate } from '../predicates/predicates';
import { getProperty, pluckLength } from './pluck';

export const UNDEFINED = undefined;

/**
 * Binds the second parameter
 *
 * @param aFunction - the function pointer
 * @param aSecond - the second parameter
 *
 * @returns the reduced function
 */
export const partialSecond: <T1, T2, R>(
  aFunction: BiFunction<T1, T2, R>,
  aSecond: T2
) => UnaryFunction<T1, R> = (aFunction, aSecond) => (aFirst) =>
  aFunction(aFirst, aSecond);

/**
 * Binds the first parameter
 *
 * @param aFunction - the function pointer
 * @param aFirst - the first parameter
 *
 * @returns the reduced function
 */
export const partialFirst: <T1, T2, R>(
  aFunction: BiFunction<T1, T2, R>,
  aFirst: T1
) => UnaryFunction<T2, R> = (aFunction, aFirst) => (aSecond) =>
  aFunction(aFirst, aSecond);

/**
 * Just run a callback for each element in an array
 *
 * @param aArray - the array
 * @param aConsumer - consumer callback
 */
export function forEach<T>(
  aArray: ArrayLike<T> | null | undefined,
  aConsumer: Consumer<T>
) {
  // access the length and iterate
  const len = pluckLength(aArray);
  for (let i = 0; i < len; ++i) {
    aConsumer(aArray[i]);
  }
}

/**
 * Tests every value in an array
 *
 * @param aArray - the array
 * @param aPredicate - the predicate
 */
export function arrayEvery<T>(
  aArray: ArrayLike<T> | null | undefined,
  aPredicate: (aValue: T) => boolean
): boolean {
  // access the length and iterate
  const len = pluckLength(aArray);
  for (let i = 0; i < len; ++i) {
    if (!aPredicate(aArray[i])) {
      return false;
    }
  }
  // success
  return true;
}

/**
 * Tests every value in an array
 *
 * @param aArray - the array
 * @param aReducer - the reducer function
 * @param aStart - the initial value
 *
 * @returns the result
 */
export function reduceArray<T, R>(
  aArray: ArrayLike<T> | null | undefined,
  aReducer: BiFunction<R, T, R>,
  aInitial: R
): R {
  // the value
  let r: R = aInitial;
  const len = pluckLength(aArray);
  for (let i = 0; i < len; ++i) {
    r = aReducer(r, aArray[i]);
  }
  // ok
  return r;
}

/**
 * Maps every value in an array
 *
 * @param aArray - the array
 * @param aMapper - the mapper function
 *
 * @returns the result array
 */
export function mapArray<T, R>(
  aArray: ArrayLike<T> | null | undefined,
  aMapper: UnaryFunction<T, R>
): R[] {
  // the value
  const r: R[] = [];
  const len = pluckLength(aArray);
  for (let i = 0; i < len; ++i) {
    r.push(aMapper(aArray[i]));
  }
  // ok
  return r;
}

/**
 * Flattens an array with sub-arrays into a top level array
 *
 * @param aArray - the array
 *
 * @returns the flattened array
 */
const internalConcat = Array.prototype.concat;
export function flattenArray<T>(aArray: T[][]): T[] {
  return internalConcat.apply([], aArray);
}

/**
 * Splits the array into even chunks
 *
 * @param aArray - the array
 * @param aMapper - the mapper function
 *
 * @returns the result array
 */
export function chunkArray<T>(
  aArray: ArrayLike<T> | null | undefined,
  aSize: number
): T[][] {
  // result
  const result: T[][] = [];
  // sanity check
  const len = pluckLength(aArray);
  if (len > 0) {
    // compute the number of chunks complete
    let idxStart = 0;
    let idxNext = aSize;
    while (idxNext <= len) {
      result.push(sliceArray.call(aArray, idxStart, idxNext));
      idxStart = idxNext;
      idxNext += aSize;
    }
    // the remaining chunk
    if (idxStart < len) {
      result.push(sliceArray.call(aArray, idxStart, len));
    }
  }
  // done with the result
  return result;
}

/**
 * Run a callback for each key value pair
 *
 * @param aObject - the object
 * @param aConsumer - consumer callback
 */
export function forIn<T>(
  aObject: Record<string, T> | null | undefined,
  aConsumer: BiConsumer<T, string>
) {
  // make sure we have an object
  if (aObject) {
    // tslint:disable-next-line:forin
    for (const name in aObject) {
      // actual element
      aConsumer(aObject[name], name);
    }
  }
}

/**
 * Generates a function that returns a property
 *
 * @param aObject - the object
 * @returns extractor function
 */
export const propertyFromObject = <T, K extends keyof T>(
  aValue: T,
  aDefault?: T[K] | undefined
): UnaryFunction<K, T[K]> => (aKey) => getProperty(aValue, aKey, aDefault);

/**
 * Negates a function
 *
 * @param aFct - the original function
 * @returns the negated function
 */
export const not: <T>(aFunction: Predicate<T>) => Predicate<T> = (aFct) => (
  aValue
) => !aFct(aValue);

/**
 * Performs the "or" function
 *
 * @param aLeft - left check
 * @param aRight - right check*
 * @returns the or function
 */
export const or: <T>(
  aLeft: Predicate<T>,
  aRight: Predicate<T>
) => Predicate<T> = (aLeft, aRight) => (aValue) =>
  aLeft(aValue) || aRight(aValue);

/**
 * Performs the "and" function
 *
 * @param aLeft - left check
 * @param aRight - right check
 *
 * @returns the or function
 */
export const and: <T>(
  aLeft: Predicate<T>,
  aRight: Predicate<T>
) => Predicate<T> = (aLeft, aRight) => (aValue) =>
  aLeft(aValue) && aRight(aValue);

/**
 * Performs the ternary operation
 *
 * @param aPredicate - predicate
 * @param aLeft - left function
 * @param aRight - right function
 *
 * @returns the ternary function
 */
export const ternary: <T, R>(
  aPredicate: Predicate<T>,
  aLeft: UnaryFunction<T, R>,
  aRight: UnaryFunction<T, R>
) => UnaryFunction<T, R> = (aPredicate, aLeft, aRight) => (aValue) =>
  aPredicate(aValue) ? aLeft(aValue) : aRight(aValue);

/**
 * Represents the composition of two functions
 *
 * @param aLeft - left function
 * @param aRight - right function
 *
 * @returns the composition function by first applying the left function, then the right hand side function
 */
export const compose: <T1, T2, R>(
  aLeft: UnaryFunction<T1, T2>,
  aRight: UnaryFunction<T2, R>
) => UnaryFunction<T1, R> = (aLeft, aRight) => (aValue) =>
  aRight(aLeft(aValue));

/**
 * Represents the composition of two functions
 *
 * @param aFirst - transformer of the first argument
 * @param aSecond - transformer of the second argument
 * @param aFct - final function
 *
 * @returns the transformed function
 */
export const biCompose: <S1, S2, D1, D2, R>(
  aFirst: UnaryFunction<S1, D1>,
  aSecond: UnaryFunction<S2, D2>,
  aFct: BiFunction<D1, D2, R>
) => BiFunction<S1, S2, R> = (aFirst, aSecond, aFct) => (aLeft, aRight) =>
  aFct(aFirst(aLeft), aSecond(aRight));

/**
 * Represents the composition of two functions where they have the same argument
 *
 * @param aTransform - the common transform for the arguments
 * @param aFct - final function
 *
 * @returns the transformed function
 */
export const biComposeMono: <S, D, R>(
  aTransform: UnaryFunction<S, D>,
  aFct: BiFunction<D, D, R>
) => BiFunction<S, S, R> = (aTransform, aFct) =>
  biCompose(aTransform, aTransform, aFct);

/**
 * Composes the sequence of functions
 *
 * @param aFunctions - the functions
 *
 * @returns the composition result
 */
export const composeAll: <T, R>(
  ...aFunctions: Array<(...aAny: any[]) => any>
) => UnaryFunction<T, R> = (...aFunctions: Array<(...aAny: any[]) => any>) => (
  aValue
) => reduceArray(aFunctions, (res, fct) => fct(res), aValue) as any;

/** switch the order of arguments */
export const flipArgs: <T1, T2, R>(
  aFct: BiFunction<T1, T2, R>
) => BiFunction<T2, T1, R> = (aFct) => (aRight, aLeft) => aFct(aLeft, aRight);

export interface ZippedArgs {
  <T1>(arg1: T1): [T1];
  <T1, T2>(arg1: T1, arg2: T2): [T1, T2];
  <T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T1, T2, T3];
  <T1, T2, T3, T4>(arg1: T1, arg2: T2, arg3: T3, arg4: T4): [T1, T2, T3, T4];
  <T1, T2, T3, T4, T5>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): [
    T1,
    T2,
    T3,
    T4,
    T5
  ];
}

export const sliceArray = Array.prototype.slice;

/** Make a shallow copy of the arguments.
 *
 * The alternative would have been to use Array.of, but is this supported, everywhere?
 */
function _zipArgs() {
  return sliceArray.apply(arguments);
}

/**
 * Expose the array method in a strongly typed way
 */
export const zipArgs: ZippedArgs = _zipArgs as any;

export interface SpreadArgs {
  <T1, R>(fct: (arg1: T1) => R): (args: [T1]) => R;
  <T1, T2, R>(fct: (arg1: T1, arg2: T2) => R): (args: [T1, T2]) => R;
  <T1, T2, T3, R>(fct: (arg1: T1, arg2: T2, arg3: T3) => R): (
    args: [T1, T2, T3]
  ) => R;
  <T1, T2, T3, T4, R>(fct: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R): (
    args: [T1, T2, T3, T4]
  ) => R;
  <T1, T2, T3, T4, T5, R>(
    fct: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R
  ): (args: [T1, T2, T3, T4, T5]) => R;
}

const _spreadArgs = (aFct: (...aArgs: any) => any, aScope?: any) => (
  aArgs: any[]
) => aFct.apply(aScope, aArgs);

/**
 * Wraps a function such that it accepts an array of parameters
 * instead of individual parameters.
 */
export const spreadArgs: SpreadArgs = _spreadArgs as any;

/**
 * Converts an array like to an array
 *
 * @param aValue - the array like
 * @returns the array
 */
export const toArray: <T>(aValue: ArrayLike<T>) => T[] = (aValue) =>
  sliceArray.apply(aValue);

/** maybe type */
export type Maybe<T> = NonNullable<T> | undefined;
