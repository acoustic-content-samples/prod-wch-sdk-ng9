import {
  isNotEmpty,
  mapArray,
  Predicate,
  reduceArray
} from '@acoustic-content-sdk/utils';

export const ALWAYS: Predicate<any> = () => true;
export const NEVER: Predicate<any> = () => false;

/**
 * Returns a regular expression tester from a sequence of expressions
 *
 * @param aRegexp - the expressions
 * @returns the predicate
 */
export function fromRegExp(aRegexp?: RegExp[]): Predicate<string> {
  return isNotEmpty(aRegexp)
    ? (value) =>
        reduceArray(
          aRegexp,
          (bRes: boolean, aExp: RegExp) => bRes || aExp.test(value),
          false
        )
    : ALWAYS;
}

export function fromRegExpString(aRegexp?: string[]): Predicate<string> {
  return isNotEmpty(aRegexp)
    ? fromRegExp(mapArray(aRegexp, (str) => new RegExp(str)))
    : ALWAYS;
}

export function blackWhiteList(
  aInclude?: string[],
  aExclude?: string[]
): Predicate<string> {
  // parse the lists
  const white = fromRegExpString(aInclude);
  const black = isNotEmpty(aExclude) ? fromRegExpString(aExclude) : NEVER;
  // combine
  return (aValue: string) => white(aValue) && !black(aValue);
}
