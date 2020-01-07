/* Copyright IBM Corp. 2017 */
import { EMPTY, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { marbles } from 'rxjs-marbles';
import { map, tap, toArray, take } from 'rxjs/operators';
import { isObservable } from './../predicates/predicates';
import {
  fromObservableOrT,
  ObservableOrT,
  rxCompose,
  rxPipe,
  thisThenThats,
  rxWithSubscriptionCount,
  createConsumerOnSubject
} from './../rx/rx.utils';
import { hashRandomIdentifier } from '../hash/hash.utils';

describe('rx.utils', () => {
  it('should have a createConsumerOnSubject', () => {
    const subject = new BehaviorSubject<string>('initial');
    const consumer = createConsumerOnSubject(subject);

    const value = hashRandomIdentifier();
    consumer(value);

    expect(subject.value).toBe(value);
  });

  it(
    'should unsubscribe the this-then-that observables',
    marbles((m) => {
      let src1 = 0;
      let src2 = 0;

      const src1$ = rxPipe(
        m.cold('aaa'),
        rxWithSubscriptionCount((c) => (src1 = c))
      );
      const src2$ = rxPipe(
        m.cold('--bbb'),
        rxWithSubscriptionCount((c) => (src2 = c))
      );

      const combined$ = rxPipe(thisThenThats(src1$, src2$), take(5));
      const expected$ = m.cold('aabb(b|)');

      m.expect(combined$).toBeObservable(expected$);

      expect(src1).toBe(0);
      expect(src2).toBe(0);
    })
  );

  it('should have a working rxCompose', () => {
    const op = rxCompose(
      map<number, number>((i) => i * i),
      map<number, number>((i) => i * i)
    );

    const src$ = of(2);

    return rxPipe(
      src$,
      op,
      tap((res) => expect(res).toBe(16))
    ).toPromise();
  });

  it('should support an observable fromObservableOrT', () => {
    const o: ObservableOrT<string> = of(() => 'value');

    return rxPipe(
      fromObservableOrT(o),
      map((value) => expect(value).toBe('value'))
    ).toPromise();
  });

  it('should support an observable fromObservableOrT', () => {
    const o: ObservableOrT<string> = of('value');

    return rxPipe(
      fromObservableOrT(o),
      map((value) => expect(value).toBe('value'))
    ).toPromise();
  });

  it('should support a simple fromObservableOrT', () => {
    const o: ObservableOrT<string> = 'value';

    return rxPipe(
      fromObservableOrT(o),
      map((value) => expect(value).toBe('value'))
    ).toPromise();
  });

  it('should work for the pipe function', () => {
    const rxStart: Observable<string> = of('a', 'b', 'c');

    const rxEnd = rxPipe(
      rxStart,
      map((a) => a + a),
      map((a) => a.toUpperCase())
    );

    return rxEnd
      .pipe(
        toArray(),
        map((res) => expect(res).toEqual(['AA', 'BB', 'CC']))
      )
      .toPromise();
  });

  it('should test for observable', () => {
    const s = new Subject();
    expect(isObservable(s)).toBeTruthy();
    expect(isObservable(s)).toBeTruthy();

    const o = EMPTY.pipe(map((s1) => s1));
    expect(isObservable(o)).toBeTruthy();

    // negative check
    const o1 = {};
    expect(isObservable(o1)).toBeFalsy();
  });

  it(
    'should ensure that thisThenThat works our of order',
    marbles((m) => {
      // prepare the sources
      const src1 = m.cold('--bbbbbbbb|');
      const src2 = m.cold('aa-aa-aaa|');
      const src3 = m.cold('--------ccc|');

      const chain = thisThenThats(src1, src2, src3);

      const result = m.cold('aa-aa-aaccc|');

      m.expect(chain).toBeObservable(result);
    })
  );

  it(
    'should ensure that thisThenThat is working',
    marbles((m) => {
      // prepare the sources
      const src1 = m.cold('aa-aa-aaa|');
      const src2 = m.cold('--bbbbbbbb|');
      const src3 = m.cold('--------ccc|');

      const chain = thisThenThats(src1, src2, src3);

      const result = m.cold('aabbbbbbccc|');

      m.expect(chain).toBeObservable(result);
    })
  );

  it(
    'should ensure that thisThenThat is working with an empty sequence',
    marbles((m) => {
      // prepare the sources
      const src1 = m.cold('|');
      const src2 = m.cold('--bbbbbbbb|');
      const src3 = m.cold('--------ccc|');

      const chain = thisThenThats(src1, src2, src3);

      const result = m.cold('--bbbbbbccc|');

      m.expect(chain).toBeObservable(result);
    })
  );

  it(
    'should ensure that thisThenThat is working with a empty sequences',
    marbles((m) => {
      // prepare the sources
      const src1 = m.cold('|');
      const src2 = m.cold('|');
      const src3 = m.cold('--------ccc|');

      const chain = thisThenThats(src1, src2, src3);

      const result = m.cold('--------ccc|');

      m.expect(chain).toBeObservable(result);
    })
  );
});
