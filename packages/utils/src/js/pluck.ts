import { UnaryFunction } from 'rxjs';

/**
 * Returns a value or the default
 *
 * @param aValue - the value
 * @param aDefault - the default
 *
 * @returns the value or the default
 */
export const valueOrDefault = <T>(aValue: T, aDefault: T | undefined) =>
  aValue !== undefined ? aValue : aDefault;

/**
 * Generates a function that returns a property
 *
 * @param aKey - the key
 * @returns extractor function
 */
export const getProperty = <T, K extends keyof T>(
  aValue: T,
  aKey: K,
  aDefault?: T[K] | undefined
): T[K] => (aValue ? valueOrDefault(aValue[aKey], aDefault) : aDefault);

/**
 * Generates a function that returns a property
 *
 * @param aKey - the key
 * @returns extractor function
 */
export const pluckProperty = <T, K extends keyof T>(
  aKey: K,
  aDefault?: T[K] | undefined
): UnaryFunction<T, T[K]> => (aValue) => getProperty(aValue, aKey, aDefault);

/** Plucks the length property */
export const pluckLength = pluckProperty<ArrayLike<any>, 'length'>('length', 0);
