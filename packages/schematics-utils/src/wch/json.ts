import { Generator, isArray, isNil, isPlainObject } from '@acoustic-content-sdk/utils';

const _keys = Object.keys;

const KEY_WEIGHTS: { [key: string]: number } = {
  name: 1,
  description: 2,
  id: 3,
  classification: 4
};

function _compareNumber(aLeft: number, aRight: number): number {
  return aLeft < aRight ? -1 : aLeft > aRight ? +1 : 0;
}

function _getKey(aName: string): number {
  return KEY_WEIGHTS[aName] || Number.MAX_SAFE_INTEGER;
}

function _compareName(aLeft: string, aRight: string): number {
  // first by key
  let c = _compareNumber(_getKey(aLeft), _getKey(aRight));
  if (c === 0) {
    c = aLeft.localeCompare(aRight);
  }
  // ok
  return c;
}

function _canonicalize(aData: any): any {
  // handle
  if (isArray(aData)) {
    const copy: any[] = [];
    aData.forEach(v => copy.push(_canonicalize(v)));
    return copy;
  }
  if (isPlainObject(aData)) {
    // sort the keys
    const copy: any = {};
    _keys(aData)
      .sort(_compareName)
      .forEach(k => (copy[k] = _canonicalize(aData[k])));
    return copy;
  }
  // nothing to do
  return aData;
}

export function serializeJson(aData: any): string | undefined {
  return aData ? JSON.stringify(aData, undefined, 2) : undefined;
}

export function updateField(
  aName: string,
  aGenerator: Generator<string>,
  aObj: any
): any {
  const oldValue = aObj[aName];
  if (isNil(oldValue)) {
    // update with the generated value
    aObj[aName] = aGenerator();
  }
  return aObj;
}

export { _canonicalize as canonicalizeJSON };
