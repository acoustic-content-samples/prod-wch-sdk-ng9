import { filterArray, isNotEmpty, mapArray } from '@acoustic-content-sdk/utils';

/**
 * Splits the array into individual values
 *
 * @param aValue - the value, separated by ','
 * @returns the split array
 */
export const splitArray = (aValue: string): string[] =>
  filterArray(
    mapArray(aValue.split(','), (m) => m.trim()),
    isNotEmpty
  );
