/* Copyright IBM Corp. 2017 */
import {
  combineLatest,
  Observable,
  of,
  UnaryFunction,
  defer,
  Unsubscribable,
  using
} from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { hashRandomIdentifier } from '../hash/hash.utils';
import { rxPipe } from '../rx/rx.utils';
import { createCache } from './cache.utils';
import { rxCachedFunction } from './rx.cache';
import { Generator } from '../generators/generator';
import { createLruCache } from './lru.utils';

describe('cache.utils', () => {
  it('should unsubscribe from cache as expected', () => {
    // subscribe count
    let count = 0;
    // resource
    const resFct: Generator<Unsubscribable> = () => {
      count++;
      return { unsubscribe: () => count-- };
    };
    const obFct: UnaryFunction<Unsubscribable, Observable<number>> = (fct) =>
      of(count);
    // the observable
    const delegate = rxCachedFunction((id) => using(resFct, obFct));
    const one$ = delegate('');
    // test subscription
    one$.subscribe().unsubscribe();

    expect(count).toEqual(0);
  });

  it('should unsubscribe as expected', () => {
    // subscribe count
    let count = 0;
    // resource
    const resFct: Generator<Unsubscribable> = () => {
      count++;
      return { unsubscribe: () => count-- };
    };
    const obFct: UnaryFunction<Unsubscribable, Observable<number>> = (fct) =>
      of(count);
    // the observable
    const delegate = (id) => using(resFct, obFct);
    const one$ = delegate('');
    // test subscription
    one$.subscribe().unsubscribe();

    expect(count).toEqual(0);
  });

  it('should subscribe to a cached value', () => {
    const delegate: UnaryFunction<string, Observable<string>> = (id) =>
      defer(() => of(`${id}${hashRandomIdentifier()}`));

    // cache
    const cached = rxCachedFunction(delegate);
    // subscribe to two values
    const cached$ = rxPipe(cached('abc'), first());
    // access two values from the cache, we expect the same result
    const totalCached$ = rxPipe(
      combineLatest([cached$, cached$]),
      tap(([a, b]) => expect(a).toEqual(b))
    );
    // subscribe to two values
    const notCached$ = rxPipe(delegate('abc'), first());
    // access two values from the cache, we expect the same result
    const totalNotCached$ = rxPipe(
      combineLatest([notCached$, notCached$]),
      tap(([a, b]) => expect(a).not.toEqual(b))
    );

    return combineLatest([totalCached$, totalNotCached$]).toPromise();
  });

  it('should handle get', () => {
    const cache = createCache();
    // our instance
    const inst = {};

    const result1 = cache('test', (key) => inst);
    const result2 = cache('test', (key) => inst);

    expect(result1).toBe(result2);
  });

  it('should handle get for LRU', () => {
    const cache = createLruCache();
    // our instance
    const inst = {};

    const result1 = cache('test', (key) => inst);
    const result2 = cache('test', (key) => inst);

    expect(result1).toBe(result2);
  });
});
