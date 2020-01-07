import { UNDEFINED_TYPE } from './../js/js.utils';
import { jsonParse, jsonStringify, JSONValue } from './../json/json.utils';
import { isNil, isNotNil } from './../predicates/predicates';

/* Copyright IBM Corp. 2017 */

export interface ClientStorage {
  get(aKey: string): JSONValue | null | undefined;

  put(aKey: string, aValue: JSONValue);
}

/**
 * Adds some namespaceing to the key
 *
 * @param aKey - the original key
 * @param aPrefix - the prefix
 * @param aSuffix - the suffix
 * @returns the enriched key
 */
function createKey(aKey: string, aPrefix: string, aSuffix: string): string {
  return aPrefix + aKey + aSuffix;
}

function isQuotaExceeded(e) {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          // DOMException.QUOTA_EXCEEDED_ERR
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

export class ClientStorageOnLocalStorage implements ClientStorage {
  private readonly prefix: string;
  private readonly suffix: string;

  constructor(private storage: Storage, scope: string) {
    // construct our prefixes
    this.prefix = scope + '[';
    this.suffix = ']';
  }

  get(aKey: string): JSONValue {
    try {
      const result = jsonParse<JSONValue>(
        this.storage.getItem(createKey(aKey, this.prefix, this.suffix))
      );
      return result;
    } catch (e) {
      // log in debug mode
    }
  }

  put(aKey: string, aValue: JSONValue) {
    try {
      // put
      this.storage.setItem(
        createKey(aKey, this.prefix, this.suffix),
        jsonStringify(aValue)
      );
    } catch (e) {}
  }
}

export class EmptyClientStorage implements ClientStorage {
  get(aKey: string): JSONValue {
    return null;
  }

  put(aKey: string, aValue: JSONValue) {
    // ignore
  }
}

/**
 * Returns our storage object from a storage instance
 *
 * @param aStorage - the storage
 * @returns the storage object
 */
export function clientStorageFromStorage(
  aStorage: Storage | null | undefined,
  aScope: string
): ClientStorage {
  return isNil(aStorage)
    ? new EmptyClientStorage()
    : new ClientStorageOnLocalStorage(aStorage, aScope);
}

/**
 * Returns our storage object from the window
 *
 * @param aScope - the scope
 * @param aWindow - the optional window
 * @returns the storage object
 */
export function clientStorageFromWindow(
  aScope: string,
  aWindow?: Window
): ClientStorage {
  // try to locate the local storage APIs
  return isNotNil(aWindow) && isNotNil(aWindow.localStorage)
    ? clientStorageFromStorage(aWindow.localStorage, aScope)
    : typeof localStorage !== UNDEFINED_TYPE
    ? clientStorageFromStorage(localStorage, aScope)
    : new EmptyClientStorage();
}
