import { Logger } from '@acoustic-content-sdk/api';
import { CacheAccessor, createLruCache } from '@acoustic-content-sdk/utils';

/**
 * Constructs a new LRU cache instance
 *
 * @param aLogger - the logger
 * @returns the cache accessor
 */
export function createCache<T>(aLogger: Logger): CacheAccessor<T> {
  // log this
  aLogger.info('Creating cache ...');
  // do not log for performance reasons
  return createLruCache();
}
