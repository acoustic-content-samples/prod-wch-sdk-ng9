import { LoggerService, User } from '@acoustic-content-sdk/api';
import { isNotFromDataBase } from '@acoustic-content-sdk/redux-utils';
import {
  isNotNil,
  jsonParse,
  jsonStringify
} from '@acoustic-content-sdk/utils';
import { defer, EMPTY, Observable, of } from 'rxjs';

import { DataBase, getDataBaseScope } from './database';
import { openNoopDataBase } from './noop.database';

// the logger string
const LOGGER = 'LocalStorage';

/**
 * Checks if we have local storage
 */
const HAS_LOCAL_STORAGE = typeof localStorage !== 'undefined';

function _openLocalStorageDataBase(
  aApiUrl: string,
  aUser: User,
  aLoggerService: LoggerService
): DataBase {
  // construct a logger
  const logger = aLoggerService.get(LOGGER);

  // shortcut
  const storage = localStorage;

  // internal hash
  const scope = getDataBaseScope(aApiUrl, aUser);

  /** Prefixes the ID with the scope */
  function createId(aId: string): string {
    return `[${scope}][${aId}]`;
  }

  /**
   * The read accessor
   *
   * @param aId - the ID of the item to read
   * @returns the result
   */
  function read<T>(aId: string): Observable<T> {
    // make sure to read when requested
    return defer(() => {
      // load the data
      const data = storage.getItem(createId(aId));
      // some logging
      if (isNotNil(data)) {
        // log
        logger.info('hit', aId);
        // returns the data item
        return of(jsonParse<T>(data));
      } else {
        // log
        logger.info('miss', aId);
        // nothing
        return EMPTY;
      }
    });
  }

  /**
   * The write accessor
   *
   * @param aId - the ID of the item to read
   * @param aData - the data record
   * @returns the result
   */
  function write(aId: string, aData: any): PromiseLike<string> {
    /** Do not write cached data back */
    if (isNotFromDataBase(aData)) {
      // log
      logger.info('writing', aId);
      // add the data set
      storage.setItem(createId(aId), jsonStringify(aData));
    }
    // return immediately
    return Promise.resolve(aId);
  }

  /**
   * Returns the accessors
   */
  return {
    read,
    write
  };
}

/**
 * Returns our implementation of the database
 */
export const openLocalStorageDataBase = HAS_LOCAL_STORAGE
  ? _openLocalStorageDataBase
  : openNoopDataBase;
