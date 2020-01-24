/** Copyright IBM Corp. 2018 */
import { constGenerator, Generator } from './generator';

/**
 * Creates a lazy generator for the value
 *
 * @param aGenerator - the generator
 * @returns the generator
 */
export const lazyGenerator = <T>(aGenerator: Generator<T>): Generator<T> => {
  // dynamic accessor
  let access: Generator<T> = () => (access = constGenerator(aGenerator()))();
  // returns lazy value generation
  return () => access();
};
