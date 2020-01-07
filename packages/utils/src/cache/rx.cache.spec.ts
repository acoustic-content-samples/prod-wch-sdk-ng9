import { rxPipe, rxWithSubscriptionCount } from '../rx/rx.utils';
import { of } from 'rxjs';
import { rxCachedFunction } from './rx.cache';
import { marbles } from 'rxjs-marbles';
import { tap } from 'rxjs/operators';

describe('rx.cache', () => {
  it(
    'should unsubscribe from cache as expected',
    marbles((m) => {
      // subscription count
      let sub = 0;
      let subMax = 0;
      // the sequence
      const seq$ = rxPipe(
        of('a'),
        rxWithSubscriptionCount((count) => {
          sub = count;
          subMax = Math.max(subMax, count);
        })
      );
      // function
      const fct = () => seq$;
      const cachedFct = rxCachedFunction(fct);
      // get the value
      const values$ = cachedFct('abc');
      values$.subscribe();
      const expected$ = m.cold('(a|)');
      m.expect(values$).toBeObservable(expected$);
      // check
      expect(sub).toBe(0);
      expect(subMax).toBe(1);
    })
  );
});
