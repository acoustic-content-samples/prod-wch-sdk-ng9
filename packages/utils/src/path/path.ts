import { UnaryFunction } from 'rxjs';

import { createLruCache } from '../cache/lru.utils';
import { partialSecond, reduceArray } from '../js/js.core';
import { binary } from '../js/js.utils';
import { getProperty, valueOrDefault } from '../js/pluck';
import { isNotNil, isNil, isUndefined } from '../predicates/predicates';

const RE_ESCAPE_CHAR = /\\(\\)?/g;

// property name expression
const RE_PROP_NAME = /([^\.\[\]]+)|\[(\d+|)]|\['((?:[^\']|\\\')+)'\]|\["((?:[^\"]|\\\")+)"\]/gm;

const _unescape = (aValue: string): string =>
  aValue.replace(RE_ESCAPE_CHAR, '$1');

/**
 * Converts `string` to a property path array.
 */
const _parsePath: UnaryFunction<string, string[]> = (aPath) => {
  // parse
  const result: string[] = [];
  let m: RegExpExecArray;

  while ((m = RE_PROP_NAME.exec(aPath)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === RE_PROP_NAME.lastIndex) {
      RE_PROP_NAME.lastIndex++;
    }
    // the match
    const [total, prop, idx, single, double] = m;
    const key = isNotNil(prop)
      ? prop
      : isNotNil(idx)
      ? idx
      : isNotNil(single)
      ? _unescape(single)
      : isNotNil(double)
      ? _unescape(double)
      : total;
    result.push(key);
  }
  // ok
  return result;
};

/**
 * Our parsing function, we assume that the resulting array is read only
 */
export const parsePath: UnaryFunction<string, string[]> = partialSecond(
  createLruCache<string[]>(),
  _parsePath
);

// make sure this version only uses one parameter
const _binaryProperty = binary(getProperty);

/**
 * Extracts the value of the path for the property
 *
 * @param aValue - the value
 * @param aPath - the path
 * @param aDefault - optional default value if the path could not be resolved
 *
 * @returns the actual property
 */
export const getPath: <T>(
  aValue: any,
  aPath: ArrayLike<string>,
  aDefault?: T
) => T = (aValue, aPath, aDefault) =>
  valueOrDefault(reduceArray(aPath, _binaryProperty, aValue), aDefault);

/**
 * Returns a function that plucks the given path from an object
 *
 * @param aPath - the path to pluck
 * @returns the pluck function
 */
export function pluckPath<T>(
  aPath: string[],
  aDefault?: T
): UnaryFunction<any, T> {
  return (aValue) => getPath(aValue, aPath, aDefault);
}
