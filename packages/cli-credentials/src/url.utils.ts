/* Copyright IBM Corp. 2017 */
import { isString } from 'lodash';

/*
 * Makes sure our path ends with a proper trailing slash
 */
export function ensureTrailingSlash(aUrl: string): string {
  return aUrl.endsWith('/') ? aUrl : aUrl + '/';
}

export function removeTrailingSlash(aUrl: string): string {
  return aUrl.endsWith('/') ? aUrl.substr(0, aUrl.length - 1) : aUrl;
}

export function hasTrailingSlash(aUrl: string): boolean {
  return !!(aUrl && isString(aUrl) && aUrl.endsWith('/'));
}
