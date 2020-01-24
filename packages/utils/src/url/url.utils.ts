import { UnaryFunction } from 'rxjs';

import { constGenerator } from '../generators/generator';
import {
  compose,
  mapArray,
  reduceArray,
  ternary,
  toArray,
  UNDEFINED
} from '../js/js.core';
import { pluckProperty } from '../js/pluck';
import { getPath } from '../path/path';
import { getDocument, getWindow } from './../dom/dom.utils';
import {
  anyToString,
  arrayPush,
  objectKeys,
  partialLeft,
  reduceForIn,
  reduceToObject
} from './../js/js.utils';
import { identity } from './../misc';
import {
  isAbsoluteURL,
  isArray,
  isEqual,
  isFunction,
  isNil,
  isNotNil,
  isPlainObject,
  isString
} from './../predicates/predicates';

/** Copyright IBM Corp. 2018 */

// removes starting and trailing slashes
const SLASH_REGEXP = /^(?:\/)*(.*?)(?:\/)*$/;

const pluckBaseURI = pluckProperty<Document, 'baseURI'>('baseURI');
const pluckURL = pluckProperty<Document, 'URL'>('URL');

const pluckBaseURL = (aDoc: Document) => pluckBaseURI(aDoc) || pluckURL(aDoc);

const SLASH = '/';

/**
 * Makes sure that a path starts and ends with slash
 *
 * @param aUrl - the url
 * @returns the fixed URL
 */
function _ensureStartingAndTrailingSlash(aUrl?: string): string {
  // special cases
  return !aUrl || aUrl === SLASH ? SLASH : `/${SLASH_REGEXP.exec(aUrl)[1]}/`;
}

/**
 * Makes sure our path ends with a proper trailing slash
 */
function _ensureTrailingSlash(aUrl: string): string {
  return aUrl.endsWith(SLASH) ? aUrl : aUrl + SLASH;
}

/**
 * Regular expression to parse a URL according to
 *
 * {@link https://tools.ietf.org/html/rfc3986#appendix-B}
 */
const PARSE_URL = /^(((?:[^:\/?#]+):)?(?:\/\/([^\/?#]*))?)([^?#]*)(\?(?:[^#]*))?(#(?:.*))?$/;

const PARSE_HOST = /^([^:]+)(?:\:(\d+))?$/;

/** Fallback to an empty string if the value is not defined */
const _fallbackToEmpty: UnaryFunction<string | undefined, string> = ternary(
  isNotNil,
  identity,
  constGenerator('')
);

/**
 * Parses the URL string by applying a regular expression. Avoiding the use of the URL constructor
 * which is not available on some platforms, notably not on Angular universal.
 *
 * @param aUrl - the URL string
 * @returns the URL object
 */
function _parseUrlString(aUrl: string): URL {
  // split
  const [href, origin, protocol, host, pathname, search, hash] = PARSE_URL.exec(
    aUrl
  );
  const [, hostname, port] = PARSE_HOST.exec(host);
  const toString = constGenerator(aUrl);
  const res = {
    href: _fallbackToEmpty(href),
    protocol: _fallbackToEmpty(protocol),
    host: _fallbackToEmpty(host),
    hostname: _fallbackToEmpty(hostname),
    port: _fallbackToEmpty(port),
    pathname: _fallbackToEmpty(pathname),
    search: _fallbackToEmpty(search),
    hash: _fallbackToEmpty(hash),
    origin: _fallbackToEmpty(origin),
    username: '',
    password: '',
    searchParams: undefined,
    toString,
    toJSON: toString
  };
  // ok
  return res;
}

/**
 * Parses a URL or string into a URL object
 *
 * @param aURL - the URL
 * @returns the parsed URL object
 */
const _parseURL: UnaryFunction<
  URL | string | null | undefined,
  URL | null | undefined
> = ternary(isString, _parseUrlString, identity);

/**
 * Clones the URL object into a bean
 *
 * @param aURL - the URL object
 * @returns the URL bean
 */
const _cloneURL: UnaryFunction<URL, URL> = ternary(
  isNotNil,
  compose(
    _urlToString,
    _parseURL
  ),
  identity
);

/** Copyright IBM Corp. 2017 */
const encode = encodeURIComponent;
const decode = decodeURIComponent;

/**
 * Adds a key value pair to an array, so the array can later be joined via '&'
 *
 * @param aEncodedKey - the already encoded key
 * @param aValue - the value
 * @param aArray - the array to push to
 *
 * @returns the original array
 */
function _push(aEncodedKey: string, aArray: string[], aValue: any): string[] {
  return arrayPush(aEncodedKey + '=' + encode(anyToString(aValue)), aArray);
}

/**
 * Reducer function used to reduce encoded key value pairs into an array
 *
 * @param aTokens - target array
 * @param aValue - the value to add, can be any[] or any
 * @param aKey - the unencoded key
 *
 * @returns the resulting array
 */
function _reduceTokens(aTokens: string[], aValue: any, aKey: string): string[] {
  // encoded key
  return isArray(aValue)
    ? reduceArray(aValue, partialLeft(_push, encode(aKey)), aTokens)
    : _push(encode(aKey), aTokens, aValue);
}

/**
 * Converts various inputs into a query string.
 *
 * @param aValue - the input
 * @returns the result of the serialization
 */
function _buildQueryString(aValue: any): string | null | undefined {
  // handle the null and string case
  return isString(aValue) || isNil(aValue)
    ? aValue
    : // handle the key value pair case
    isPlainObject(aValue)
    ? reduceForIn<any, string[]>(aValue, _reduceTokens, []).join('&')
    : // fallback to implicit toString
      anyToString(aValue);
}

/**
 * Converts various inputs into a query string.
 *
 * @param aValue - the input
 * @returns the result of the serialization
 */
function _buildSortedQueryString(aValue: any): string | null | undefined {
  // handle the null and string case
  return isNil(aValue)
    ? aValue
    : isString(aValue)
    ? _buildSortedQueryString(_parseQuery(aValue))
    : // handle the key value pair case
    isPlainObject(aValue)
    ? reduceArray(
        objectKeys(aValue).sort(),
        (aDst: string[], aKey: string) =>
          _reduceTokens(aDst, aValue[aKey], aKey),
        []
      ).join('&')
    : // fallback to implicit toString
      _buildSortedQueryString(_parseQuery(anyToString(aValue)));
}

export type ParsedQuery = Record<string, string | string[]>;

/**
 * Correct decoding for value
 *
 * @param aValue - the value
 * @returns the value
 */
function _decodeQueryArg(aValue: string): string {
  return isNotNil(aValue) ? decode(aValue.replace('+', ' ')) : aValue;
}

/**
 * Parses the query string into key/value pairs
 *
 * @param aQuery - the query string
 * @returns the query result object
 */
function _parseQuery(aQuery: string): ParsedQuery {
  // the result object
  const result: ParsedQuery = {};
  // sanity check
  if (isNotNil(aQuery)) {
    // split the query
    const nvs = aQuery.split('&');
    const nvsLen = nvs.length;
    for (let i = 0; i < nvsLen; ++i) {
      // split
      let key: string;
      let value: string;
      const nv = nvs[i];
      const idx = nv.indexOf('=');
      if (idx >= 0) {
        // split key and value
        key = _decodeQueryArg(nv.substring(0, idx));
        value = _decodeQueryArg(nv.substring(idx + 1));
      } else {
        key = _decodeQueryArg(nv);
        value = undefined;
      }
      // update
      if (result.hasOwnProperty(key)) {
        // check for the type
        const oldValue = result[key];
        if (isArray(oldValue)) {
          oldValue.push(value);
        } else {
          result[key] = [oldValue, value];
        }
      } else {
        result[key] = value;
      }
    }
  }
  // ok
  return result;
}

/**
 * Extracts the base URL from the current document
 *
 * @param aDoc - the document
 * @returns the URL
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base}
 */
function _getBaseUrlFromDocument(
  aDoc?: Document,
  aWindow?: Window
): URL | undefined {
  try {
    // try to resolve the document
    const doc = getDocument(aDoc, aWindow);
    return isNotNil(doc)
      ? _parseURL(_ensureTrailingSlash(pluckBaseURL(aDoc)))
      : UNDEFINED;
  } catch (error) {
    // nothing to return
    return UNDEFINED;
  }
}

/**
 * Shortcut to convert a URL to a string
 *
 * @param aURL - the URL
 * @returns the resulting string
 */
function _urlToString(aURL: URL | string): string {
  return isNotNil(aURL) ? aURL.toString() : undefined;
}

function _getPathForSearch(aPath: string): string {
  // construct the search string
  const segments = mapArray(aPath.split(SLASH).filter(Boolean), decode);
  segments.splice(0, 0, '');
  return segments.join(SLASH);
}

/**
 * Accesor function of the element by rel
 */
const _pluckRel = pluckProperty<HTMLLinkElement, 'rel'>('rel');

/**
 * Accesor function of the element by href
 */
const _pluckHref = pluckProperty<HTMLLinkElement | URL, 'href'>('href');

/**
 * Returns all links in the document, ordered by rel
 *
 * @param aDocument - */
function _getLinksByRel(
  aDocument?: Document,
  aWindow?: Window
): Record<string, string> {
  // fallback
  const doc = getDocument(aDocument, aWindow);
  return isNotNil(doc) && isFunction(doc.getElementsByTagName)
    ? reduceToObject(
        toArray(doc.getElementsByTagName('link')),
        _pluckRel,
        _pluckHref
      )
    : {};
}

/**
 * Makes sure the URL is absolute, resolved against the base URL
 *
 * @param aUrl - the URL
 * @param aDoc - the document
 * @param aWindow - the window
 *
 * @returns the resolved URL
 */
function _absoluteURL(aUrl: string, aDoc?: Document, aWindow?: Window): string {
  // try to resolve
  return isAbsoluteURL(aUrl) ? aUrl : `${getOrigin(aDoc, aWindow)}${aUrl}`;
}

/**
 * Returns the orign from the doc
 *
 * @param aDoc - document
 * @param aWindow - window
 *
 * @returns the origin
 */
export function getOrigin(aDoc?: Document, aWindow?: Window): string {
  // try to access the doc
  try {
    const url = pluckBaseURL(getDocument(aDoc));
    if (isAbsoluteURL(url)) {
      // parse and return origin
      return _parseURL(url).origin;
    }
  } catch (error) {}
  try {
    // try the window next
    return getPath(getWindow(aWindow), ['location', 'origin']);
  } catch (error) {}
  // nothing
  return UNDEFINED;
}

export function createBaseURL(aUrl: URL | string): string {
  const url = _parseURL(aUrl);
  return isNotNil(url)
    ? _ensureTrailingSlash(`${url.origin}${url.pathname}`)
    : undefined;
}

/**
 * Tests if two URL objects are equal
 *
 * @param aLeft - left object
 * @param aRight - right object
 *
 * @returns true if the objects are equal, else false
 */
export function urlEquals(aLeft: URL, aRight: URL): boolean {
  return (
    isEqual(aLeft, aRight) ||
    (isNotNil(aLeft) &&
      isNotNil(aRight) &&
      isEqual(_pluckHref(aLeft), _pluckHref(aRight)))
  );
}

export {
  _absoluteURL as absoluteURL,
  _getLinksByRel as getLinksByRel,
  _getPathForSearch as pathForSearch,
  _getBaseUrlFromDocument as getBaseUrlFromDocument,
  _ensureStartingAndTrailingSlash as urlSlashes,
  _buildQueryString as queryToString,
  _buildSortedQueryString as queryToCanonicalString,
  _parseQuery as parseQueryString,
  _urlToString as urlToString,
  _ensureTrailingSlash as urlTrailingSlash,
  _cloneURL as cloneURL,
  _parseURL as parseURL
};
