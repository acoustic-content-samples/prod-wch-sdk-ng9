import { BiFunction } from '../consumers/consumer';
import { isEqual, isNil } from '../predicates/predicates';

/**
 * Comparison operator
 */
export type Comparator<T> = BiFunction<T, T, number>;

/**
 * Exports a comparator for numbers
 *
 * @param aLeft - left value to compare
 * @param aRight - right value to compare
 *
 * @returns the result
 */
export const cmpNumbers: Comparator<number> = (aLeft, aRight) =>
  aLeft < aRight ? -1 : aLeft > aRight ? +1 : 0;

/**
 * Exports a comparator for numbers
 *
 * @param aLeft - left value to compare
 * @param aRight - right value to compare
 *
 * @returns the result
 */
export const cmpStrings: Comparator<string> = (aLeft, aRight) =>
  aLeft.localeCompare(aRight);

/**
 * Generates a safe comparator that also works if the arguments are nil
 *
 * @param aComparator - the original comparator
 * @returns a safe version of the comparator
 */
export function safeCmp<T>(aComparator: Comparator<T>): Comparator<T> {
  return (aLeft, aRight) =>
    isEqual(aLeft, aRight)
      ? 0
      : isNil(aLeft)
      ? -1
      : isNil(aRight)
      ? +1
      : aComparator(aLeft, aRight);
}
