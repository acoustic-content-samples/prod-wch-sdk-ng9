import { Generator, cloneDeep, deepEquals } from '@acoustic-content-sdk/utils';

/**
 * Creates a function that validates that an object has not changed. Note
 * that this should only be used for debugging purposes, since it makes
 * a deep copy of the value to test for the invariance
 *
 * @param aValue - the value to test
 *
 * @returns the validator
 */
export function invarianceChecker(aValue: any): Generator<boolean> {
  // make a deep copy to test against
  const copy = cloneDeep(aValue);
  // returns the test code
  return () => deepEquals(copy, aValue);
}
