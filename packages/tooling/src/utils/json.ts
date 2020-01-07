import {
  cmpNumbers,
  forEach,
  isArray,
  isPlainObject,
  isString,
  mapArray,
  objectKeys
} from '@acoustic-content-sdk/utils';

const KEY_WEIGHTS: { [key: string]: number } = {
  name: 1,
  description: 2,
  id: 3,
  classification: 4
};

function _getKey(aName: string): number {
  return KEY_WEIGHTS[aName] || Number.MAX_SAFE_INTEGER;
}

function _compareName(aLeft: string, aRight: string): number {
  // first by key
  let c = cmpNumbers(_getKey(aLeft), _getKey(aRight));
  if (c === 0) {
    c = aLeft.localeCompare(aRight);
  }
  // ok
  return c;
}

/**
 * Performs an inplace canonicalization of a JSON object
 *
 * @param aData - the JSON object
 * @returns the canonicalized object
 */
export function canonicalizeJson(aData: any): any {
  // handle
  if (isArray(aData)) {
    return mapArray(aData, canonicalizeJson);
  }
  if (isPlainObject(aData)) {
    // sort the keys
    const copy: any = {};
    forEach(
      objectKeys(aData).sort(_compareName),
      (k) => (copy[k] = canonicalizeJson(aData[k]))
    );
    return copy;
  }
  // nothing to do
  return aData;
}

export function serializeJson(aData: any): string | undefined {
  return aData ? JSON.stringify(aData, undefined, 2) : undefined;
}

export function cleanupFields<T>(aData: T): T {
  // check if we can normalize
  if (Buffer.isBuffer(aData) || isString(aData)) {
    return aData;
  }
  // make a copy and remove the keys
  const copy: any = { ...aData };
  // remove redundant fields
  delete copy.path;
  delete copy.publishing;
  delete copy.links;
  // ok
  return copy;
}
