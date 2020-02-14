import { assertObject, KEY_DEBUG } from './../js/js.utils';
import { isNotNil } from './../predicates/predicates';
import { Maybe } from '../js/js.core';

/* Copyright IBM Corp. 2017 */
let COUNTER = 0;

function _getCounter() {
  return COUNTER++;
}

export type AddDebugCallback = (aDbg: any) => void;

/**
 * Adds source information
 */
function _addSourceCallback(aSource: string): AddDebugCallback {
  return (aDbg: any) => {
    aDbg.source = aSource;
    aDbg.created = new Date().toISOString();
  };
}

/**
 * Augments the object with debug information
 *
 * @param aSource - the source
 * @param aObject - the object
 *
 * @returns the object
 */
function _addDebugInfo<T>(aCallback: AddDebugCallback, aObject: T): T {
  // add
  if (isNotNil(aObject)) {
    // the debug info
    const dbg: any = assertObject(KEY_DEBUG, aObject);
    dbg.id = _getCounter();
    // augment with debug info
    aCallback(dbg);
  }
  // ok
  return aObject;
}

/**
 * Adds source information
 *
 * @param aSource - source info
 * @param aObject - the object
 *
 * @returns the original object
 */
function _addSourceDebug<T>(aSource: string, aObject: T | null | undefined): T {
  return _addDebugInfo(_addSourceCallback(aSource), aObject);
}

export {
  _addSourceCallback as dbgSourceCallback,
  _addSourceDebug as dbgAddSource,
  _addDebugInfo as dbgAdd,
  _getCounter as dbgCounter
};
