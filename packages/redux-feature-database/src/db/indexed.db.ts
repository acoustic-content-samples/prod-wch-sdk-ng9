import { Logger, LoggerService, User } from '@acoustic-content-sdk/api';
import { isNotFromDataBase } from '@acoustic-content-sdk/redux-utils';
import { isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { from, Observable, Subscriber } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DataBase, getDataBaseScope } from './database';
import { openLocalStorageDataBase } from './local.storage';

const LOGGER = 'indexedDB';

const TABLE = 'items';

interface DataBaseItem {
  id: string;
  data: any;
}

/**
 * Reads a record from the database and returns the result
 *
 * @param aId    - ID of the record to read
 * @param aDataBase - the database
 * @returns an observable that will produce the result
 */
function readFromDataBase<T>(
  aId: string,
  aDataBase: IDBDatabase,
  logger: Logger
): Observable<T> {
  return Observable.create((aSubscriber: Subscriber<T>) => {
    try {
      // log the request
      logger.info(LOGGER, 'read', aId);
      // measure
      const t1 = Date.now();
      // construct a transaction
      const tx = aDataBase.transaction(TABLE, 'readonly');
      const store = tx.objectStore(TABLE);
      const request = store.get(aId);
      // handle the callbacks
      request.onsuccess = () => {
        // measure
        const t2 = Date.now();
        // the record
        const matching: DataBaseItem = request.result;
        if (isNotNil(matching)) {
          // log the request
          logger.info(LOGGER, 'hit', t2 - t1, aId, matching.data);
          // success
          aSubscriber.next(matching.data);
        } else {
          // log the request
          logger.info(LOGGER, 'miss', t2 - t1, aId);
        }
        // done
        aSubscriber.complete();
      };
      request.onerror = (error) => aSubscriber.error(error);
    } catch (error) {
      // bail out with the error
      aSubscriber.error(error);
    }
  });
}

/**
 * Writes a data record to the database
 *
 * @param id  - ID of the record to write
 * @param data - the actual data record
 * @param aDataBase - the database
 *
 * @returns a promise
 */
function writeToDataBase(
  id: string,
  data: any,
  aDataBase: IDBDatabase,
  logger: Logger
): PromiseLike<string> {
  return new Promise((resolve, reject) => {
    // log the write call
    logger.info(LOGGER, 'write', id);
    // open the transaction
    const tx = aDataBase.transaction(TABLE, 'readwrite');
    const store = tx.objectStore(TABLE);
    // add the item
    store.put({ id, data });
    // handle the result
    tx.oncomplete = () => {
      // log this
      logger.info(LOGGER, 'written', id);
      // success
      resolve(id);
    };
    tx.onerror = reject;
  });
}

/**
 * Checks if we have an indexed DB
 */
const HAS_INDEXED_DB = typeof indexedDB !== 'undefined';

function _openIndexedDbDataBase(
  aApiUrl: string,
  aUser: User,
  aLoggerService: LoggerService
): DataBase {
  // construct a logger
  const logger = aLoggerService.get(LOGGER);

  // internal hash
  const scope = getDataBaseScope(aApiUrl, aUser);
  // returns a promise for the db
  const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    // open the database
    const request = indexedDB.open(scope);
    request.onupgradeneeded = () => {
      // construct the table
      const db = request.result;
      db.createObjectStore(TABLE, { keyPath: 'id' });
    };
    request.onsuccess = () => {
      // log this
      logger.info(LOGGER, 'open', scope);
      // done
      resolve(request.result);
    };
    request.onerror = reject;
  });
  // the observable
  const db$ = from(dbPromise);

  /**
   * The read accessor
   *
   * @param aId - the ID of the item to read
   * @returns the result
   */
  function read<T>(aId: string): Observable<T> {
    return rxPipe(
      db$,
      mergeMap((db) => readFromDataBase<T>(aId, db, logger))
    );
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
    return isNotFromDataBase(aData)
      ? dbPromise.then((db) => writeToDataBase(aId, aData, db, logger))
      : Promise.resolve(aId);
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
export const openIndexedDbDataBase = HAS_INDEXED_DB
  ? _openIndexedDbDataBase
  : openLocalStorageDataBase;
