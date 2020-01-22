import { isString, isStringArray } from '@acoustic-content-sdk/utils';
import { isAbsolute, join, normalize } from 'path';

export function splitParams(aValue: any): string[] {
  return isString(aValue)
    ? aValue.split(',')
    : isStringArray(aValue)
    ? aValue
    : undefined;
}

export function getFullPath(aRoot: string, aDir: string): string {
  return normalize(isAbsolute(aDir) ? aDir : join(aRoot, aDir));
}
