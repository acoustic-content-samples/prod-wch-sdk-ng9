/* Copyright IBM Corp. 2017 */
import { isNotEmpty, isString } from '@acoustic-content-sdk/utils';

/*
 * Makes sure our path ends with a proper trailing slash
 */
export function ensureTrailingSlash(aUrl: string): string {
  return aUrl.endsWith('/') ? aUrl : aUrl + '/';
}

/*
 * Makes sure our path starts with a proper trailing slash
 */
export function ensureLeadingSlash(aUrl: string): string {
  return aUrl.startsWith('/') ? aUrl : '/' + aUrl;
}

export function hasTrailingSlash(aUrl: string): boolean {
  return !!(aUrl && isString(aUrl) && aUrl.endsWith('/'));
}

function trimPath(aDir: string): string {
  const hasLeading = aDir.startsWith('/');
  const hasTrailing = aDir.endsWith('/');
  const len = aDir.length;
  // path without trailing slash
  const noTrailing = hasTrailing ? aDir.substring(0, len - 1) : aDir;
  // add leading slash
  return hasLeading ? noTrailing : `/${noTrailing}`;
}

export function ensureDirPath(aDir: string): string {
  return isNotEmpty(aDir) ? (aDir === '/' ? '' : trimPath(aDir)) : '';
}

/**
 * Make sure the path starts with a slash
 *
 * @param aPath - the path
 * @returns the path
 */
export const fixPath = (aPath: string): string =>
  isNotEmpty(aPath) ? ensureDirPath(aPath.replace(/\\/g, '/')) : '';
