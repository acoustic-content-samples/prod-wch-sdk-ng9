import {
  forkJoin,
  Observable,
  Observer,
  of,
  OperatorFunction,
  ReplaySubject
} from 'rxjs';
import { take } from 'rxjs/operators';

export function rxForkJoin<T>(
  aObservables: Array<Observable<T>>
): Observable<T[]> {
  // check the array
  return aObservables && aObservables.length > 0
    ? forkJoin(...aObservables)
    : of([]);
}

export function rxCacheSingle<T>(aObservable: Observable<T>): Observable<T> {
  // helper subject
  const subject = new ReplaySubject<T>(1);
  // status flag
  let bSubscribed = false;
  // create the subscriber
  return Observable.create((aObserver: Observer<T>) => {
    // have we already subscribed?
    if (!bSubscribed) {
      bSubscribed = true;
      aObservable.pipe(take(1)).subscribe(subject);
    }
    // ok
    subject.pipe(take(1)).subscribe(aObserver);
  });
}

export interface RxPipe {
  <T1, T2>(aSrc: Observable<T1>, aOp1: OperatorFunction<T1, T2>): Observable<
    T2
  >;
  <T1, T2, T3>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>
  ): Observable<T3>;
  <T1, T2, T3, T4>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>
  ): Observable<T4>;
  <T1, T2, T3, T4, T5>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>
  ): Observable<T5>;
  <T1, T2, T3, T4, T5, T6>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>
  ): Observable<T6>;
  <T1, T2, T3, T4, T5, T6, T7>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>
  ): Observable<T7>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>,
    aOp7: OperatorFunction<T7, T8>
  ): Observable<T8>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>,
    aOp7: OperatorFunction<T7, T8>,
    aOp8: OperatorFunction<T8, T9>
  ): Observable<T9>;
  <T, R>(
    aSrc: Observable<T>,
    ...operations: Array<OperatorFunction<any, any>>
  ): Observable<R>;
}

const _slice = Array.prototype.slice;

function __pipe() {
  const a = arguments;
  const th = a[0];
  return th.pipe.apply(th, _slice.call(a, 1));
}

export const rxPipe: RxPipe = __pipe as any;
