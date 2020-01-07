import { Logger } from '@acoustic-content-sdk/api';
import { pipe, MonoTypeOperatorFunction, noop, Observable } from 'rxjs';
import {
  dematerialize,
  map,
  materialize,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { UNDEFINED } from '../js/js.core';
import { opDistinctUntilChanged } from '../operators/operators';
import { isFlagSet } from '../predicates/predicates';
import { rxPipe } from '../rx/rx.utils';
import { NOOP_LOGGER } from './noop.logger';

/**
 * Checks what to log
 */
export enum RxLogger {
  NEXT = 1,
  DONE = 2,
  ERROR = 4,
  ALL = 7
}

/**
 * Returns a function that logs particular aspects of a subscription
 *
 * @param aMode - the aspects to log
 * @returns the logger callback
 */
const _rxLoggerMember: <T>(
  aMode: number
) => (
  aLogger: Logger,
  ...aArgs: any[]
) => (...aValues: any[]) => MonoTypeOperatorFunction<T> = (aMode) => {
  // check what to log
  const bLogNext = isFlagSet(aMode, RxLogger.NEXT);
  const bLogDone = isFlagSet(aMode, RxLogger.DONE);
  const bLogError = isFlagSet(aMode, RxLogger.ERROR);
  // dispatch
  return (aLogger: Logger, ...aArgs: any[]) => {
    // logger fallback
    const logger = aLogger || NOOP_LOGGER;
    // fallback on the arguments
    const args = aArgs || [];
    // return the actual function
    return (...aValues: any[]) => {
      // fallback on the values
      const values = aValues || [];
      // the functions
      const fctNext = bLogNext
        ? logger.info.bind(logger, ...args, ...values)
        : UNDEFINED;
      const fctDone = bLogDone
        ? logger.info.bind(logger, ...args, ...values)
        : UNDEFINED;
      const fctError = bLogError
        ? logger.error.bind(logger, ...args, ...values)
        : UNDEFINED;
      // tap into the desired functions
      return tap(fctNext, fctError, fctDone);
    };
  };
};

/**
 * Function that perform an info logging in an rx pipeline onto a given logger with
 * a particular prefix
 *
 * @param aLogger - the logger to log to
 * @param aArgs - prefix arguments prepended for each logging statement
 *
 * @returns function that takes a context object for logging
 *
 * @example
  const info = rxInfo(logger);

  stream.pipe(
    info('onValue')
  )
 *
 */
export const rxNext: <T>(
  aLogger: Logger,
  ...aArgs: any[]
) => (...aValues: any[]) => MonoTypeOperatorFunction<T> = _rxLoggerMember(
  RxLogger.NEXT
);

/**
 * Function that perform an info logging in an rx pipeline onto a given logger with
 * a particular prefix
 *
 * @param aLogger - the logger to log to
 * @param aArgs - prefix arguments prepended for each logging statement
 *
 * @returns function that takes a context object for logging
 *
 * @example
      const info = rxInfo(logger);

      stream.pipe(
        info('onValue')
      )
 *
 */
export const rxLogAll: <T>(
  aLogger: Logger,
  ...aArgs: any[]
) => (...aValues: any[]) => MonoTypeOperatorFunction<T> = _rxLoggerMember(
  RxLogger.ALL
);

/**
 * Function that perform an info logging in an rx pipeline onto a given logger with
 * a particular prefix
 *
 * @param aLogger - the logger to log to
 * @param aArgs - prefix arguments prepended for each logging statement
 *
 * @returns function that takes a context object for logging
 */
export const rxError: <T>(
  aLogger: Logger,
  ...aArgs: any[]
) => (...aValues: any[]) => MonoTypeOperatorFunction<T> = _rxLoggerMember(
  RxLogger.ERROR
);

export { _rxLoggerMember as rxLog };

/**
 * Returns a function that logs particular aspects of a subscription
 *
 * @param aMode - the aspects to log
 * @returns the logger callback
 */
export const rxLogMember: <T>(
  aMode: number
) => (
  aLogger$: Observable<Logger>,
  ...aArgs: any[]
) => (...aValues: any[]) => MonoTypeOperatorFunction<T> = <T>(aMode) => {
  // check what to log
  const bLogNext = isFlagSet(aMode, RxLogger.NEXT);
  const bLogDone = isFlagSet(aMode, RxLogger.DONE);
  const bLogError = isFlagSet(aMode, RxLogger.ERROR);
  // dispatch
  return (aLogger$: Observable<Logger>, ...aArgs: any[]) => {
    // fallback on the arguments
    const args = aArgs || [];
    // operator
    const op = (...aValues: any[]) => {
      // fallback on the values
      const values = aValues || [];
      // construct the pie
      return rxPipe(
        aLogger$,
        opDistinctUntilChanged,
        map((aLogger) => {
          // logger fallback
          const logger = aLogger || NOOP_LOGGER;
          // the functions
          const fctNext = bLogNext
            ? logger.info.bind(logger, ...args, ...values)
            : noop;
          const fctDone = bLogDone
            ? logger.info.bind(logger, ...args, ...values)
            : noop;
          const fctError = bLogError
            ? logger.error.bind(logger, ...args, ...values)
            : noop;
          // returns the functions
          return [fctNext, fctError, fctDone];
        })
      );
    };
    // returns the operator
    return (...aValues: any[]) => {
      // construct the operator chain
      const chain: MonoTypeOperatorFunction<T> = pipe(
        materialize(),
        withLatestFrom(op(...aValues)),
        tap(([src, [next, error, done]]) => src.do(next, error, done)),
        map(([src]) => src),
        dematerialize()
      );
      // apply the chain to the actual stream
      return (src$) => rxPipe(src$, chain);
    };
  };
};

/**
 * Function that perform an info logging in an rx pipeline onto a given logger with
 * a particular prefix
 *
 * @param aLogger - the logger to log to
 * @param aArgs - prefix arguments prepended for each logging statement
 *
 * @returns function that takes a context object for logging
 */
export const rxLogNext: <T>(
  aLogger$: Observable<Logger>,
  ...aArgs: any[]
) => (...aValues: any[]) => MonoTypeOperatorFunction<T> = rxLogMember(
  RxLogger.NEXT
);
