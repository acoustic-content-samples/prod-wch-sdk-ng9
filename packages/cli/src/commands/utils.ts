import { isString, isStringArray } from '@acoustic-content-sdk/utils';

export function splitParams(aValue: any): string[] {
  return isString(aValue)
    ? aValue.split(',')
    : isStringArray(aValue)
    ? aValue
    : undefined;
}
