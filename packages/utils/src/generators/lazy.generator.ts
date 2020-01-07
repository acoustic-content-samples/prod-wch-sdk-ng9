/* Copyright IBM Corp. 2018 */
import { Generator } from './generator';

/**
 * Creates a lazy generator for the value
 *
 * @param aGenerator - the generator
 * @returns the generator
 */
function _lazyGenerator<T>(aGenerator: Generator<T>): Generator<T> {
  // lazy value
  let value: T;
  // returns lazy value generation
  return () => value || (value = aGenerator());
}

export { _lazyGenerator as lazyGenerator };
