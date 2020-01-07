import { isNotNil, isString } from '@acoustic-content-sdk/utils';

export const DB_KEY = 'ecec4405-7fb1-4b86-8d27-7338eea45683';
export const DB_VALUE = 'e3257dbc-1ca8-4d57-94a2-37934960f39f';

/**
 * Tests if a value is not from a database
 *
 * @param aValue - the value
 * @returns true if the value exists and if it is not from the database, else false
 */
export function isNotFromDataBase(aValue: any): boolean {
  return isNotNil(aValue) && aValue[DB_KEY] !== DB_VALUE;
}

/**
 * Adds a key to the item marking it as coming from the local data base
 *
 * @param aValue - the value to work with
 * @return a value with the marker
 */
export function markAsFromDataBase<T>(aValue: T): T {
  // add the key
  const value: any = aValue;
  // just add our internal key
  return isString(aValue)
    ? aValue
    : {
        ...value,
        [DB_KEY]: DB_VALUE
      };
}

/**
 * Removes the database marker from the object
 *
 * @param aValue - the value to work with
 * @return a value without the marker
 */
export function removeDataBaseMarker<T>(aValue: T): T {
  // add the key
  const value: any = aValue;
  // remove
  const dbKey = value[DB_KEY];
  if (dbKey === DB_VALUE) {
    // remove the key from the element
    const { [DB_KEY]: key, ...copy } = value;
    // return the object with the db key removed
    return copy;
  }
  // nothing to do
  return aValue;
}
