import { isNotNil, MODULE } from '@acoustic-content-sdk/utils';

/**
 * Expose some methods from the utils module that we include
 * in our module, anyway
 */
export const UTILS_MODULE = {
  [MODULE]: {
    isNotNil
  }
};
