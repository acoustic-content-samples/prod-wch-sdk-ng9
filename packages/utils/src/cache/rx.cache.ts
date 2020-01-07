import { Observable, UnaryFunction } from 'rxjs';

import { assertFromFunction } from '../js/js.utils';
import { opCacheLast } from '../operators/operators';
import { rxPipe } from '../rx/rx.utils';
import { CacheAccessor, CacheCallback } from './cache.utils';

function defaultCacheAccessor<T>(): CacheAccessor<T> {
  // general cache
  const cache: Record<string, Observable<T>> = {};
  // returns the accessor
  return (aKey: string, aCallback: CacheCallback<T>) =>
    assertFromFunction(aKey, cache, aCallback);
}

/**
 * Implements a function that caches the result of another function
 *
 * @param aDelegate - the delegate function to cache
 * @returns a cached wrapper
 */
export function rxCachedFunction<T>(
  aDelegate: UnaryFunction<string, Observable<T>>,
  aAccessor?: CacheAccessor<Observable<T>>
): UnaryFunction<string, Observable<T>> {
  // general cache
  const accessor = aAccessor || defaultCacheAccessor();
  // the callback
  const callback = (id: string) => rxPipe(aDelegate(id), opCacheLast);
  // implement the cache callback
  return (id: string) => accessor(id, callback);
}
