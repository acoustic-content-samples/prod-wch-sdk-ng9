import { BiFunction } from '../consumers/consumer';
import { pluckLength } from './pluck';

/**
 * Performs a binary search on the array
 *
 * @param arr  - the array
 * @param x  - value to find
 * @param cmp - comparator for the values
 *
 * @returns the located match or the insertion point (-idx-1)
 */
export function binarySearch<T, K = T>(
  arr: ArrayLike<T>,
  x: K,
  cmp: BiFunction<T, K, number>
): number {
  // bounds of the loop
  let low = 0;
  let mid = 0;
  let high = pluckLength(arr) - 1;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    const res = cmp(arr[mid], x);
    if (res === 0) {
      // we found it
      return mid;
    }
    // update bounds
    if (res > 0) {
      high = mid - 1;
    } else {
      low = ++mid;
    }
  }

  return -mid - 1;
}
