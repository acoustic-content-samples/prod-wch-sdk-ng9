import { mapArray } from '../js/js.core';
import { isNotNil } from '../predicates/predicates';

/* Copyright IBM Corp. 2017 */

// maximum allowed value of rows
const _VALUE_MAX_ROWS = 0x7fffffff;

/**
 * Escapes a term according to lucence syntax
 *
 * @param aTerm - */
function _escapeTerm(aTerm: string): string {
  return aTerm.replace(/[\s\+\-\&\|\!\(\)\{\}\[\]\^\"\~\*\?\:\\]/g, '\\$&');
}

/**
 * Escapes the values that have to be escaped in a quoted term
 *
 * @param aTerm - */
function _escapeQuotes(aTerm: string): string {
  return aTerm.replace(/[\"\\]/g, '\\$&');
}

/**
 * Escapes a term according to lucence syntax
 *
 * @param aTerm - */
function _escapeAndQuoteTerm(aTerm: string): string {
  return `\"${_escapeQuotes(aTerm)}\"`;
}

/**
 * Generates a key value selector. There is no need to enclose the value in double quotes, since the value
 * is escaped, anyway.
 *
 * @param aKey - the search key
 * @param aValue - the escaped value
 *
 * @returns the result of the escaping
 */
function _keyValue(aKey: string, aValue: string): string {
  return `${aKey}:(${aValue})`;
}

/**
 * Generates a search selector and escapes the value. If the value is missing
 * the method generates an expression that searches for missing values.
 *
 * @param aKey - the search key
 * @param aTerm - the unescaped value
 *
 * @returns the result of the escaping
 */
function _escapeKeyValue(
  aKey: string,
  aTerm: string | null | undefined
): string {
  return isNotNil(aTerm)
    ? _keyValue(aKey, _escapeAndQuoteTerm(aTerm))
    : `NOT(${aKey}:*)`;
}

/**
 * Generates a search selector using a logical concatenation of the values
 *
 * @param aKey - the search key
 * @param aJoiner - the operator, without spaces
 * @param aTerms - the unescaped value
 *
 * @returns the result of the escaping
 */
function _escapeKeyValueJoin(
  aKey: string,
  aJoiner: string,
  aTerms: string[]
): string {
  // fix the operator
  const joiner = ` ${aJoiner} `;
  // escape
  return _keyValue(
    aKey,
    mapArray(aTerms, _escapeAndQuoteTerm)
      .sort()
      .join(joiner)
  );
}

/**
 * Generates a selector and joins with 'AND'
 *
 * @param aKey - the search key
 * @param aTerms - the unescaped value
 *
 * @returns the result of the escaping
 */
function _escapeKeyValueAnd(aKey: string, ...aTerms: string[]): string {
  return _escapeKeyValueJoin(aKey, 'AND', aTerms);
}

/**
 * Generates a selector and joins with 'OR'
 *
 * @param aKey - the search key
 * @param aTerms - the unescaped value
 *
 * @returns the result of the escaping
 */
function _escapeKeyValueOr(aKey: string, ...aTerms: string[]): string {
  return _escapeKeyValueJoin(aKey, 'OR', aTerms);
}

export {
  _escapeTerm as luceneEscapeTerm,
  _escapeKeyValue as luceneEscapeKeyValue,
  _escapeKeyValueAnd as luceneEscapeKeyValueAnd,
  _escapeKeyValueOr as luceneEscapeKeyValueOr,
  _VALUE_MAX_ROWS as SEARCH_MAX_ROWS
};
