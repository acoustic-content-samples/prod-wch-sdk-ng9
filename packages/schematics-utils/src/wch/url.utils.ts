/* Copyright IBM Corp. 2017 */
import { isString } from '@acoustic-content-sdk/utils';

/*
 * Makes sure our path ends with a proper trailing slash
 */
function _ensureTrailingSlash(aUrl: string): string {
  return aUrl.endsWith('/') ? aUrl : aUrl + '/';
}

function _hasTrailingSlash(aUrl: string): boolean {
  return !!(aUrl && isString(aUrl) && aUrl.endsWith('/'));
}

export {
  _ensureTrailingSlash as ensureTrailingSlash,
  _hasTrailingSlash as hasTrailingSlash
};
