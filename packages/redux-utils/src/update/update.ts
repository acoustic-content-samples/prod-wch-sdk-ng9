import { Logger, LoggerService } from "@acoustic-content-sdk/api";
import {
  arrayPush,
  BiFunction,
  forEach,
  Generator,
  isNil,
  isNotNil,
  NOOP_LOGGER_SERVICE,
  objectKeys,
  parsePath,
  getPath,
  isEqual,
  isUndefined
} from "@acoustic-content-sdk/utils";
import { UnaryFunction } from "rxjs";

const createNew = (aIsArray: boolean) => (aIsArray ? [] : {});
const createCopy = (aIsArray: boolean, aSrc: any) =>
  aIsArray ? [...aSrc] : { ...aSrc };

const isKeyArray = (aKey: string) => /\d+/.test(aKey);

/**
 * Facade that offers the modification functions for a json object.
 * The original JSON object will not be modified and the modified
 * object will only contain the minimum number of modifications.
 */
export interface Updater<T> {
  /**
   * Replaces the value pointed to by the accessor with a new value.
   * All values across the parent path will be cloned (shallow) if
   * they do not have a clone, yet.
   *
   * Pass `undefined` as the new value to delete the value.
   *
   * Returns the modified version of the top level object.
   */
  set: BiFunction<string, any, T>;
  /**
   * Removes the value pointed to by the accessor.
   * All values across the parent path will be cloned (shallow) if
   * they do not have a clone, yet.
   *
   * Returns the modified version of the top level object.
   */
  del: UnaryFunction<string, T>;
  /**
   * Inserts a new value into an array pointed to by the accessor.
   * All values across the parent path will be cloned (shallow) if
   * they do not have a clone, yet.
   *
   * Pass `undefined` as the new value to delete the value.
   *
   * Returns the modified version of the top level object.
   */
  add: BiFunction<string, any, T>;
  /**
   * Returns the top level, modified object
   */
  get: Generator<T>;
}

const SEPARATOR = "/";

const createPrefix = (aPath: string[], aIdx: number) =>
  aPath.slice(0, aIdx).join(SEPARATOR);

const KEY_ROOT = "";

// list of nodes that have already been cloned
function getModifiable(
  aPath: string[],
  aIdx: number,
  aIsArray: boolean,
  aMod: Record<string, any>,
  aRoot: any,
  aLogger: Logger
): any {
  // target the top level object
  if (aIdx < 0) {
    // root
    return aMod[KEY_ROOT] || (aMod[KEY_ROOT] = createCopy(aIsArray, aRoot));
  }
  // prefix
  const prefix = createPrefix(aPath, aIdx + 1);
  // check if we already have a element
  const exValue = aMod[prefix];
  if (isNotNil(exValue)) {
    return exValue;
  }
  // current key
  const key = aPath[aIdx];
  const keyIsArray = isKeyArray(key);
  // get the parent
  const parent = getModifiable(
    aPath,
    aIdx - 1,
    keyIsArray,
    aMod,
    aRoot,
    aLogger
  );
  // log this
  aLogger.info("Shallow clone of", aPath);
  // test for an existing key
  const existing = parent[key];
  const modified = isNotNil(existing)
    ? createCopy(aIsArray, existing)
    : createNew(aIsArray);
  // update our records
  return (parent[key] = aMod[prefix] = modified);
}

/**
 * Invalidate all key prefixes
 *
 * @param aPath  - the parsed accessor path
 * @param aIdx  - index of the key
 * @param aMod - the record to update
 */
function invalidate(aPath: string[], aIdx: number, aMod: Record<string, any>) {
  // invalidate all entries that would be overridden by this update
  let prefix = createPrefix(aPath, aIdx);
  delete aMod[prefix];
  prefix += SEPARATOR;
  forEach(objectKeys(aMod), modKey => {
    if (modKey.startsWith(prefix)) {
      delete aMod[modKey];
    }
  });
}

function init(
  aPath: string[],
  aMod: Record<string, any>,
  aRoot: any,
  aLogger: Logger
) {
  // make a copy
  const len = aPath.length;
  // current key
  const key = aPath[len - 1];
  const keyIsArray = isKeyArray(key);
  const parent = getModifiable(
    aPath,
    len - 2,
    keyIsArray,
    aMod,
    aRoot,
    aLogger
  );
  // get the config
  return [key, keyIsArray, parent];
}

function setValue<T>(
  aAccessor: string,
  aNewValue: any,
  aMod: Record<string, any>,
  aRoot: T,
  aLogger: Logger
): T {
  // log
  aLogger.info("setValue", aAccessor, aNewValue);
  // parse
  const path = parsePath(aAccessor);
  // check if we need to update
  const root: T = aMod[KEY_ROOT] || aRoot;
  const oldValue = getPath(root, path);
  if (isEqual(oldValue, aNewValue)) {
    // nothing special to do
    return root;
  }
  // parse the accessor
  const [key, keyIsArray, parent] = init(path, aMod, aRoot, aLogger);
  // check if we have to delete
  if (isNil(aNewValue)) {
    // delete from an array
    if (keyIsArray) {
      // delete the item from the array
      parent.splice(key, 1);
    } else {
      // remove the key
      delete parent[key];
    }
  } else {
    // set the key
    parent[key] = aNewValue;
  }
  // invalidate
  invalidate(path, path.length, aMod);
  // returns the updated value
  return aMod[KEY_ROOT];
}

function addValue<T>(
  aAccessor: string,
  aNewValue: any,
  aMod: Record<string, any>,
  aRoot: any,
  aLogger: Logger
): T {
  // log
  aLogger.info("addValue", aAccessor, aNewValue);
  // dispatch for the delete case
  if (isNil(aNewValue)) {
    return setValue(aAccessor, aNewValue, aMod, aRoot, aLogger);
  }
  // parse
  const path = parsePath(aAccessor);
  // parse the accessor
  const [key, keyIsArray, parent] = init(path, aMod, aRoot, aLogger);
  // insert from an array
  if (keyIsArray) {
    // insert the item into the parent
    parent.splice(key, 0, aNewValue);
    // invalidate
    invalidate(path, path.length - 1, aMod);
  } else {
    // test for an existing key
    const existing = parent[key];
    const modified = isNotNil(existing)
      ? createCopy(true, existing)
      : createNew(true);
    // prefix
    const prefix = createPrefix(path, path.length);
    // append the item
    parent[key] = aMod[prefix] = arrayPush(aNewValue, modified);
    // invalidate
    invalidate(path, path.length, aMod);
  }
  // returns the updated value
  return aMod[KEY_ROOT];
}

const LOGGER = "JsonUpdater";

/**
 * Constructs a function that updates one or more values in a json object.
 *
 * @param aValue - the JSON structure to update
 *
 * @returns updater functions
 */
export function createUpdater<T>(
  aValue: T,
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
): Updater<T> {
  // logger
  const logger = aLogSvc.get(LOGGER);
  // list of modifications
  const mod: Record<string, any> = {};
  // curry
  const add = (aAccessor, aNewValue) =>
    addValue<T>(aAccessor, aNewValue, mod, aValue, logger);
  const set = (aAccessor, aNewValue) =>
    setValue<T>(aAccessor, aNewValue, mod, aValue, logger);
  const get = () => mod[KEY_ROOT] || aValue;
  const del = aAccessor => set(aAccessor, undefined);
  // returns the new set
  return { add, set, get, del };
}
