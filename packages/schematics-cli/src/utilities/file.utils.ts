import { isArray, isString } from '@acoustic-content-sdk/utils';
import { relative } from 'path';

export function firstOf(
  aValue: string | string[] | null | undefined
): string | null | undefined {
  // test
  if (isString(aValue)) {
    return aValue;
  }
  if (isArray(aValue)) {
    // extract the first element
    const array: any[] = aValue;
    if (array.length > 0) {
      return firstOf(array[0]);
    }
    // nothing
    return undefined;
  }
  // nothing
  return aValue;
}

export function arrayOf(
  aValue: string | string[] | null | undefined
): string[] | null | undefined {
  // test
  if (isString(aValue)) {
    return [aValue];
  }
  // default fallback
  return aValue;
}

export function relativePath(aSrc: string, aDst: string): string {
  return relative(aSrc, aDst).replace(/\\/g, '/');
}
