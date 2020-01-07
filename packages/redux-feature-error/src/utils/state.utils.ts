import { isNotEmpty, pluckProperty } from '@acoustic-content-sdk/utils';

// extracts the length for an array
const pluckLength = pluckProperty<ArrayLike<any>, 'length'>('length', 0);

/**
 * Limits the size of the array to a certain number
 *
 * @param aArray - the array
 * @param aMax - maximum number
 *
 * @returns the modified array
 */
function limitArray<T>(aArray: T[], aMax: number): T[] {
  // check the length
  const len = pluckLength(aArray);
  if (len > aMax) {
    // delete extra items
    aArray.splice(aMax, len - aMax);
  }
  // returns the copy
  return aArray;
}

/**
 * Prepends the value to the array, making sure not to extend a maximum size of the
 * result
 *
 * @param aValue - the new value
 * @param aArray - the current array
 * @param aMax - max number
 */
export function prependWithLimit<T>(aValue: T, aArray: T[], aMax: number): T[] {
  // make a copy
  return isNotEmpty(aArray) ? limitArray([aValue, ...aArray], aMax) : [aValue];
}
