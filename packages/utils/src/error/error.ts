import { ErrorResponse } from '@acoustic-content-sdk/api';

import {
  isArray,
  isNotNil,
  isNumber,
  isPlainObject,
  isString
} from './../predicates/predicates';

/**
 * Tests if a response is an error response
 *
 * @param aResponse - the response object
 * @returns true if the response is an error response, else false
 */
export function isErrorResponse(aResponse: any): aResponse is ErrorResponse {
  // quick check
  return (
    isPlainObject(aResponse) &&
    isString(aResponse['requestId']) &&
    isString(aResponse['service']) &&
    isString(aResponse['version']) &&
    isString(aResponse['message']) &&
    isNumber(aResponse['statusCode']) &&
    isArray(aResponse['errors'])
  );
}

export const KEY_CAUSE = 'cause';

export function createError(aMessage: string, aCause?: Error) {
  const err = new Error(aMessage);
  if (isNotNil(aCause)) {
    err[KEY_CAUSE] = aCause;
  }
  return err;
}
