import {
  isArray,
  isNil,
  isNotNil,
  isString,
  luceneEscapeKeyValue,
  luceneEscapeKeyValueAnd,
  luceneEscapeKeyValueOr,
  luceneEscapeTerm,
  MODULE,
  reduceArray,
  reduceForIn,
  rxPipe
} from '@acoustic-content-sdk/utils';

/**
 * Expose some methods from the utils module that we include
 * in our module, anyway
 */
export const UTILS_MODULE = {
  [MODULE]: {
    isNotNil,
    isNil,
    rxPipe,
    isString,
    isArray,
    reduceForIn,
    reduceArray,
    luceneEscapeKeyValue,
    luceneEscapeKeyValueAnd,
    luceneEscapeKeyValueOr,
    luceneEscapeTerm
  }
};
