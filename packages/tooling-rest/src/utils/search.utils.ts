/* Copyright IBM Corp. 2017 */

/**
 * Escapes a term according to lucence syntax
 *
 * @param aTerm - term to escape
 * @returns the escaped term
 */
export function luceneEscapeTerm(aTerm: string): string {
  return aTerm.replace(/[\s\+\-\&\|\!\(\)\{\}\[\]\^\"\~\*\?\:\\]/g, '\\$&');
}

/**
 * Escapes the values that have to be escaped in a quoted term
 *
 * @param aTerm  - term to escape
 * @returns the escaped term
 */
function _escapeQuotes(aTerm: string): string {
  return aTerm.replace(/[\"\\]/g, '\\$&');
}

/**
 * Escapes a term according to lucence syntax
 *
 * @param aTerm  - term to escape
 * @returns the escaped term
 */
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
export function luceneEscapeKeyValue(
  aKey: string,
  aTerm: string | null | undefined
): string {
  return aTerm ? _keyValue(aKey, _escapeAndQuoteTerm(aTerm)) : `NOT(${aKey}:*)`;
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
  aTerms: string[] = []
): string {
  // fix the operator
  const joiner = ` ${aJoiner} `;
  // escape
  return _keyValue(
    aKey,
    aTerms
      .map(_escapeAndQuoteTerm)
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
export function luceneEscapeKeyValueAnd(
  aKey: string,
  ...aTerms: string[]
): string {
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
export function luceneEscapeKeyValueOr(
  aKey: string,
  ...aTerms: string[]
): string {
  return _escapeKeyValueJoin(aKey, 'OR', aTerms);
}
