/* Copyright IBM Corp. 2018 */
import { Logger } from '@acoustic-content-sdk/api';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isArray, isString } from './../predicates/predicates';

// all origins allowed
const _ALL_ORIGINS = '*';

// the undefined origin (e.g. for file based servers)
export const NULL_ORIGIN = 'null';

/**
 * Tests the CORS headers against a list of allowed origins
 *
 * @param aOrigin - the origin header
 * @param aAllowedOrigins - the extra CORS headers
 *
 * @returns true if access is allowed, else false
 */
function _testOrigin(
  aOrigin: string,
  aAllowedOrigins: string[],
  aLogger?: Logger
): boolean {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // validate the input
  if (isString(aOrigin) && isArray(aAllowedOrigins)) {
    // locate the origin
    let len = aAllowedOrigins.length;
    while (len-- > 0) {
      // check
      const origin = aAllowedOrigins[len];
      if (aOrigin === origin || _ALL_ORIGINS === origin) {
        // ok
        return true;
      }
    }
  }
  // not allowed
  logger.warn(
    'CORS access to',
    '[',
    aOrigin,
    ']',
    'not allowed by whitelist',
    aAllowedOrigins
  );
  // ok
  return false;
}

export { _testOrigin as corsTestOrigin };
