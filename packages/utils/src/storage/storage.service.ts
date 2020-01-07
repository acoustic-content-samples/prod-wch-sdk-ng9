import { UrlConfig } from '@acoustic-content-sdk/api';
import { dbgAddSource } from './../debug/debug.utils';
import { hashString, hashToIdentifier, longHash } from './../hash/hash.utils';
import { JSONValue } from './../json/json.utils';
import { urlToString } from './../url/url.utils';
import { ClientStorage, clientStorageFromWindow } from './clientstorage';

const LOGGER = 'ClientStorageService';

export class ClientStorageService implements ClientStorage {
  // override ClientStorage
  get: (aKey: string) => JSONValue;
  put: (aKey: string, aValue: JSONValue) => void;

  constructor(aUrlsService: UrlConfig, aWindow?: Window) {
    // this references
    const that = this;

    // access the resource URL
    const _deliveryRoot = urlToString(aUrlsService.resourceUrl) || '';
    const _scope = hashToIdentifier(
      Math.abs(hashString(longHash(), _deliveryRoot))
    );

    // construct the object
    const _storage = clientStorageFromWindow(_scope, aWindow);

    // set the getters
    that.get = (aKey: string): JSONValue => {
      // dispatch
      const result = _storage.get(aKey);
      // ok
      return dbgAddSource(LOGGER, result);
    };

    that.put = (aKey: string, aValue: JSONValue): void => {
      // dispatch
      _storage.put(aKey, aValue);
    };
  }
}
