import { Logger } from '@acoustic-content-sdk/api';
import { defer, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { rxPipe } from '../rx/rx.utils';
import { UNDEFINED_TYPE } from './../js/js.utils';
import { noop } from './../misc';
import { isFunction } from './../predicates/predicates';

/* Copyright IBM Corp. 2017 */
let COUNT = 0;

// check if we have the performance object
const bHasPerformance =
  typeof performance !== UNDEFINED_TYPE &&
  isFunction(performance.mark) &&
  isFunction(performance.measure);

function _measure(aName: string): () => void {
  if (bHasPerformance) {
    const perf = performance;
    const mark = `mark ${COUNT++}`;
    perf.mark(mark);
    return () => perf.measure(aName, mark);
  } else {
    return noop;
  }
}

// returns the current timestamp
export const currentTime =
  typeof performance !== UNDEFINED_TYPE && isFunction(performance.now)
    ? () => performance.now()
    : Date.now;

/**
 * Logs the time between two submissions
 *
 * @param aLogger - the logger
 * @param aName - identifier of this performance counter
 *
 * @returns the operator
 */
export function rxLogPerformance<T>(
  aLogger: Logger,
  aName: string,
  ...aArgs: string[]
): MonoTypeOperatorFunction<T> {
  // the pipe
  return (src$) =>
    defer<Observable<T>>(() => {
      let t0 = currentTime();
      return rxPipe(
        src$,
        tap(() => {
          const t1 = currentTime();
          aLogger.info(aName, t1 - t0, ...aArgs);
          t0 = t1;
        })
      );
    });
}

export { _measure as perfMeasure };
