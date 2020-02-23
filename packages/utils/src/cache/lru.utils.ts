import { Logger } from '@acoustic-content-sdk/api';

import { cmpNumbers } from '../compare/compare';
import { arrayPush } from '../js/js.utils';
import { pluckLength } from '../js/pluck';
import { binarySearch } from '../js/search';
import { NOOP_LOGGER } from '../logger/noop.logger';
import { currentTime } from '../perf/perf.utils';
import { isNotNil } from '../predicates/predicates';
import { CacheAccessor, CacheCallback } from './cache.utils';

declare type CacheValue<V> = [string, V, number];

/**
 * Only do a cleanup every n seconds
 */
const CLEANUP_DELTA = 5000;

/**
 * Compare values such that they are ordered by expiration timestamp
 *
 * @param aLeft  - left value
 * @param aRight - right value
 *
 * @returns the result of the comparison
 */
const compareValues = <V>(aLeft: CacheValue<V>, aRight: number): number =>
  cmpNumbers(aLeft[2], aRight);

/** Default timeout */
const DEFAULT_TIMEOUT = 30 * 1000;

/** Default count */
const DEFAULT_MAXCOUNT = 100;

/** Time of next cleanup */
const nextCleanup = () => ((Math.random() + 1) * CLEANUP_DELTA) / 2;

/**
 * Performs a cleanup for expired entries
 *
 * @param aCache - the array of the cache
 * @param aDict  - the dictionary of the cache
 * @param aKey - access key
 * @param aMaxTime - the current timestamp
 *
 * @returns timestamp of next cleanup
 */
function cleanup<T>(
  aCache: CacheValue<T>[],
  aDict: Record<string, CacheValue<T>>,
  aMaxTime: number,
  aLogger: Logger
): number {
  // find the max time
  const idx = binarySearch(aCache, aMaxTime, compareValues);
  const del = idx >= 0 ? idx : -idx - 1;
  // remove these entries
  if (del > 0) {
    // remove the cache entries from the dict
    for (let i = del - 1; i >= 0; --i) {
      // key of the entry to remove
      const key = aCache[i][0];
      // delete from the dictionary
      delete aDict[key];
      // log this
      aLogger.info('Expiring', key);
    }
    // remove old entries
    aCache.splice(0, del);
  }
  // next cleanup
  return aMaxTime + nextCleanup();
}

declare type CacheState<T> = [
  // nextClean
  number,
  // cache
  Array<CacheValue<T>>,
  // dict
  Record<string, CacheValue<T>>,
  // timeout
  number,
  // maxSize
  number
];

function getFromCache<T>(
  aKey: string,
  aCallback: CacheCallback<T>,
  aLogger: Logger,
  aState: CacheState<T>
): T {
  // decompose
  const [nextClean, cache, dict, timeout, maxSize] = aState;
  // current time
  const cur = currentTime();
  const expiry = cur + timeout;
  // check for a hit
  const cacheHit: CacheValue<T> = dict[aKey];
  if (isNotNil(cacheHit)) {
    /**
     * Move entry to the end of the array. We expect to find it
     */
    const idx = binarySearch(cache, cacheHit[2], compareValues);
    if (idx < pluckLength(cache) - 1) {
      // remove the old entry
      cache.splice(idx, 1);
      // add new entry to the end
      arrayPush(cacheHit, cache);
    }
    // update the timeout
    cacheHit[2] = expiry;
    /**
     * Cleanup expired entries
     */
    if (cur >= nextClean) {
      // next clean
      aState[0] = cleanup(cache, dict, cur, aLogger);
    }
    // log the hit
    aLogger.info('Cache Hit', aKey);
    // return the value
    return cacheHit[1];
  }
  // log the miss
  aLogger.info('Cache Miss', aKey);
  // cleanup expired entries
  if (cur >= nextClean) {
    // next clean
    aState[0] = cleanup(cache, dict, cur, aLogger);
  }
  // check if the cache is too large
  const len = pluckLength(cache);
  if (len >= maxSize) {
    // remove the eldest entries
    cache.splice(0, len - maxSize + 1);
  }
  // new entry
  aLogger.info('Creating new entry', aKey);
  const newValue: T = aCallback(aKey, aLogger);
  // insert a new entry
  const cacheMiss: CacheValue<T> = [aKey, newValue, expiry];
  // insert
  arrayPush(cacheMiss, cache);
  dict[aKey] = cacheMiss;
  // return the value
  return newValue;
}

/**
 * Constructs a new cache
 *
 * @param aTimeout - timeout
 * @param aMaxValues - number of maximum cache entries
 *
 * @returns the accessor function
 */
export const createLruCache = <V>(
  aTimeout?: number,
  aMaxValues?: number,
  aLogger?: Logger
): CacheAccessor<V> => {
  // cache state
  const state: CacheState<V> = [
    currentTime() + nextCleanup(),
    [],
    {},
    aTimeout || DEFAULT_TIMEOUT,
    aMaxValues || DEFAULT_MAXCOUNT
  ];
  // fallback logger
  const logger = aLogger || NOOP_LOGGER;

  // returns the getter
  return (
    aKey: string,
    aCallback: CacheCallback<V>,
    aInnerLogger?: Logger
  ): V => getFromCache(aKey, aCallback, aInnerLogger || logger, state);
};
