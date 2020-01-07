import { Generator, hashRandomIdentifier, UNDEFINED_TYPE } from '@acoustic-content-sdk/utils';

/**
 * Creates a unique symbol, either as a real symbol or as a random string if
 * symbols are not available.
 *
 * @returns the unique symbol
 */
export const createSymbol: Generator<symbol | string> =
  typeof Symbol === UNDEFINED_TYPE ? hashRandomIdentifier : Symbol;
