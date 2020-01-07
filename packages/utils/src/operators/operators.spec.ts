import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { concat, interval, Observable, of, timer } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import {
  delay,
  map,
  shareReplay,
  take,
  tap,
  toArray
} from '../../../../node_modules/rxjs/operators';
import { parsePath } from '../path/path';
import { isString } from '../predicates/predicates';
import { rxPipe } from '../rx/rx.utils';
import { DEFAULT_FETCH_LEVELS } from '../wch/wch.utils';
import {
  cacheLast,
  filterArrayOf,
  filterNotNil,
  mapTypeOf,
  opJsonParse,
  opJsonStringify,
  opLevels,
  opPluckApiOrigin,
  opPluckCurrentPage,
  opPluckResourceOrigin,
  opShareLast,
  rxBackpressure,
  rxMemoize,
  rxPluckPath
} from './operators';

describe('operators', () => {
  const data: RenderingContextV2 = require('./rc2.json');

  it(
    'backpressure',
    marbles((m) => {
      const down$ = m.cold('---b|');

      const src$ = m.cold('aa---aaaaaa-a-a-a-a-aaa------a|');
      const expc$ = m.cold('---b---b---b---b---b---b---b----b|');

      const back$ = rxPipe(src$, rxBackpressure((buffer: any[]) => down$));

      m.expect(back$).toBeObservable(expc$);
    })
  );

  it('simple backpressure should work', () => {
    const t0 = Date.now();

    const src$ = rxPipe(interval(100), delay(1000), take(20));

    const handler = (buf: number[]) => {
      console.log('buffer', buf);
      return timer(500);
    };

    const evt$ = rxPipe(src$, rxBackpressure(handler));

    return evt$.toPromise();
  });

  it('should return the last subscribed value using cacheLast', () => {
    let subCount = 0;
    let counter = 0;
    const op$ = new Observable<number>((sub) => {
      subCount++;
      sub.next(counter++);
      return () => subCount--;
    });

    const s$ = rxPipe(op$, cacheLast());

    // first subscription
    const s1$ = rxPipe(
      s$,
      take(1),
      toArray(),
      tap((a) => expect(a).toEqual([0]))
    );

    const s2$ = rxPipe(
      s$,
      take(2),
      toArray(),
      tap((a) => expect(a).toEqual([0, 1]))
    );

    return concat(s1$, s2$).toPromise();
  });

  it('should return the last subscribed value', () => {
    let subCount = 0;
    let counter = 0;
    const op$ = new Observable<number>((sub) => {
      subCount++;
      sub.next(counter++);
      return () => subCount--;
    });

    const s$ = rxPipe(op$, shareReplay({ bufferSize: 1, refCount: true }));

    // first subscription
    rxPipe(
      s$,
      take(1),
      tap((value) => expect(value).toBe(0)),
      tap(() => expect(subCount).toBe(1))
    ).subscribe();

    // second subscription, note that the last value will not be shared
    rxPipe(
      s$,
      take(1),
      tap((value) => expect(value).toBe(1)),
      tap(() => expect(subCount).toBe(1))
    ).subscribe();
  });

  it('should show the subscriptions for shareReplay true', () => {
    let subCount = 0;
    const op$ = new Observable<number>((sub) => {
      subCount++;
      return () => subCount--;
    });

    const s = rxPipe(
      op$,
      shareReplay({ bufferSize: 1, refCount: true })
    ).subscribe();

    expect(subCount).toBe(1);
    s.unsubscribe();
    // not that opShareLast will not unsubscribe
    expect(subCount).toBe(0);
  });

  it('should show the subscriptions for shareReplay false', () => {
    let subCount = 0;
    const op$ = new Observable<number>((sub) => {
      subCount++;
      return () => subCount--;
    });

    const s = rxPipe(
      op$,
      shareReplay({ bufferSize: 1, refCount: false })
    ).subscribe();

    expect(subCount).toBe(1);
    s.unsubscribe();
    // not that opShareLast will not unsubscribe
    expect(subCount).toBe(1);
  });

  it('should show the subscriptions for opShareLast', () => {
    let subCount = 0;
    const op$ = new Observable<number>((sub) => {
      subCount++;
      return () => subCount--;
    });

    const s = rxPipe(op$, opShareLast).subscribe();

    expect(subCount).toBe(1);
    s.unsubscribe();
    // not that opShareLast will not unsubscribe
    expect(subCount).toBe(1);
  });

  it('should have a working mapTypeOf operator', () => {
    // our source sequence
    const src$ = of('a', 1, 2, 'c');
    const dst$ = rxPipe(src$, mapTypeOf(isString));

    const test$ = rxPipe(
      dst$,
      toArray(),
      map((array) => expect(array).toEqual(['a', undefined, undefined, 'c']))
    );

    return test$.toPromise();
  });

  it(
    'should have a working memoize operator',
    marbles((m) => {
      const src$ = m.cold('aaabcc|');

      // some computation
      const dst$ = rxPipe(src$, rxMemoize(map((value) => value.toUpperCase())));

      const expected$ = m.cold('A--BC-|');

      m.expect(dst$).toBeObservable(expected$);
    })
  );

  it('should serialize JSON', () => {
    const rxSrc = of(data);

    return rxPipe(
      rxSrc,
      opJsonStringify,
      opJsonParse,
      map((res) => {
        expect(res).toEqual(data);
      })
    ).toPromise();
  });

  it('should parse JSON', () => {
    const rxSrc = of(JSON.stringify(data));

    return rxPipe(
      rxSrc,
      opJsonParse,
      map((res) => {
        expect(res).toEqual(data);
      })
    ).toPromise();
  });

  it('convert levels', () => {
    const src = of(10, '10', null, 'abc');

    const dst = rxPipe(
      src,
      opLevels,
      toArray(),
      map((res) => {
        expect(res).toEqual([
          10,
          10,
          DEFAULT_FETCH_LEVELS,
          DEFAULT_FETCH_LEVELS
        ]);
      })
    );

    return dst.toPromise();
  });

  it('should filter arrays', () => {
    const src = of([1, 2, 3], ['a', 'b', 'c'], [true]);

    const dst = rxPipe(
      src,
      filterArrayOf(isString),
      toArray(),
      map((res) => {
        expect(res.length).toBe(1);
        expect(res).toEqual([['a', 'b', 'c']]);
      })
    );

    return dst.toPromise();
  });

  it(
    'pluckCurrentPage',
    marbles((m) => {
      const values = { r: data };

      const src = m.cold('r|', values).pipe(
        opPluckCurrentPage,
        rxPluckPath(parsePath('$metadata.id'))
      );

      const expected = m.cold('o|', {
        o: '5379fb5e-b859-43ae-8bdc-647abf3d235e'
      });

      m.expect(src).toBeObservable(expected);
    })
  );

  it(
    'pluckResourceOrigin',
    marbles((m) => {
      const values = { r: data };

      const src = m.cold('r|', values).pipe(opPluckResourceOrigin);

      const expected = m.cold('o|', {
        o: 'https://my9.digitalexperience.ibm.com'
      });

      m.expect(src).toBeObservable(expected);
    })
  );

  it(
    'pluckApiOrigin',
    marbles((m) => {
      const values = { r: data };

      const src = m.cold('r|', values).pipe(opPluckApiOrigin);

      const expected = m.cold('o|', {
        o: 'https://my9.digitalexperience.ibm.com'
      });

      m.expect(src).toBeObservable(expected);
    })
  );

  it(
    'filterNotNil',
    marbles((m) => {
      const values = { a: 'a', b: null, c: 'c' };

      const src = m.cold('abcabbcab|', values).pipe(filterNotNil());

      const expected = m.cold('a-ca--ca-|', values);

      m.expect(src).toBeObservable(expected);
    })
  );
});
