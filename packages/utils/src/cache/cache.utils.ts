/** Copyright IBM Corp. 2017 */
import { Logger } from '@acoustic-content-sdk/api';

import { NOOP_LOGGER } from './../logger/noop.logger';
import { perfMeasure } from './../perf/perf.utils';

/** Copyright IBM Corp. 2017 */
export type CacheCallback<V> = (aKey: string, aLogger?: Logger) => V;
export type CacheAccessor<V> = (
  aKey: string,
  aCallback: CacheCallback<V>,
  aLogger?: Logger
) => V;

declare type CacheValue<V> = [string, V, boolean, number];
declare type CacheImpl<V> = Array<CacheValue<V>>;

/** Default timeout */
const DEFAULT_TIMEOUT = 30 * 1000;

/** Default count */
const DEFAULT_MAXCOUNT = 100;

// returns the current timestamp
const currentTime = Date.now;

/**
 * Constructs a new cache
 *
 * @param aTimeout - timeout
 * @param aMaxValues - maximum cache entries
 *
 * @returns the accessor function
 */
export const createCache = <V>(
  aTimeout?: number,
  aMaxValues?: number,
  aLogger?: Logger
): CacheAccessor<V> => {
  /**
   * Maximum number of items in the cache
   */
  const timeout = aTimeout || DEFAULT_TIMEOUT;
  const cache: CacheImpl<V> = [];

  let hits = 0;
  let miss = 0;

  const logger = aLogger || NOOP_LOGGER;

  // returns the getter
  return (
    aKey: string,
    aCallback: CacheCallback<V>,
    aInnerLogger?: Logger
  ): V => {
    // log this
    const handle = perfMeasure(`Cache[${aKey}]`);
    // logger
    const log = aInnerLogger || logger;
    // current time for length check
    const cur = currentTime();
    const len = cache.length;
    // found item and last valid index
    let maxIdx = len;
    let item: V;
    let bStale = true;
    for (let i = len - 1; i >= 0 && (bStale || !item); --i) {
      // current item
      const current = cache[i];
      // eligible for garbage collection
      if (bStale && (bStale = current[3] < cur)) {
        // if dirty, preserve it
        if (current[1]) {
          // update
          current[2] = false;
          current[3] = cur + timeout;
          // add to the end
          cache.push(current);
        } else {
          // log the removal
          log.info('Cache Remove', current);
        }
        // update the pointer
        maxIdx = i;
      }
      // check if we have a hit
      if (!item && aKey === current[0]) {
        // return this item
        item = current[1];
        current[2] = true;
        // increment hits
        hits++;
        // log the hit
        log.info('Cache Hit', current, hits, miss, hits / miss);
      }
    }
    // remove items we do not need any more
    if (maxIdx < len) {
      /**
       * Remove items, dirty items had been added to the end, already
       */
      cache.splice(maxIdx, len - maxIdx);
    }
    // check if we need to add a new value
    if (!item) {
      // create the value
      item = aCallback(aKey, log);
      // add the entry
      const entry: CacheValue<V> = [aKey, item, false, cur + timeout];
      cache.push(entry);
      // increment misses
      miss++;
      // log this
      log.info('Cache Miss', entry, hits, miss, hits / miss);
    }
    // done
    handle();
    // ok
    return item;
  };
};
