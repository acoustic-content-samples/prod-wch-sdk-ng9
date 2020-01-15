/* Copyright IBM Corp. 2017 */

const TOKEN_EXP = /\$\{([^\}]+)\}/g;

/**
 * Replaces a string and resolves the tokens relative to the context object
 *
 * @param aValue - the value
 * @param aContext - the context object
 *
 * @returns the replaced token
 */
export function replaceWithTokens(aValue: string, aContext: any): string {
  // replace all
  return aValue.replace(TOKEN_EXP, (match, token) => {
    // construct a new function
    const f = new Function(`'use strict';return this.${token}`);
    return f.call(aContext);
  });
}
