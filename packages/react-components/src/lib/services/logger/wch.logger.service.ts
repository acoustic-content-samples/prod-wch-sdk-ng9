import {
  DynamicLoggerFactory,
  Logger,
  LoggerFactory,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  assertFromFunction,
  createConsoleLogger,
  createEmptyLogger,
  createSingleSubject,
  isNotNil,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { EMPTY, Observable, of, Unsubscribable } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { isDevModeOn } from './../../internal/assert';

/**
 * Default logger factory depends on the development config
 */
const getDefaultLoggerFactory = () => ({
  create: isDevModeOn() ? createConsoleLogger : createEmptyLogger
});

export class WchLoggerService implements LoggerService, Unsubscribable {
  get: (name: string) => Logger;

  /**
   * Done trigger
   */
  private readonly done$ = createSingleSubject();

  constructor(
    aFactory?: LoggerFactory,
    aDynamicFactory?: DynamicLoggerFactory
  ) {
    const that = this;

    /**
     *  check the flags
     */
    const bFactory = isNotNil(aFactory);
    const bDynamicFactory = isNotNil(aDynamicFactory);

    /**
     *  subscribe to the loggers
     */
    const loggerFactories$: Observable<LoggerFactory> = bFactory
      ? bDynamicFactory
        ? rxPipe(rxPipe(aDynamicFactory.get(), startWith(aFactory)))
        : of(aFactory)
      : bDynamicFactory
      ? aDynamicFactory.get()
      : EMPTY;

    /**
     *  registry of proxies
     */
    const proxyRegistry: Record<string, Logger> = {};

    /**
     * Registry of live loggers
     */
    let registry: Record<string, Logger> = {};

    let loggerFactory: LoggerFactory = getDefaultLoggerFactory();

    const createLoggerDelegate = (aName: string): Logger =>
      loggerFactory.create(aName);

    const getLoggerDelegate = (aName: string): Logger =>
      assertFromFunction(aName, registry, createLoggerDelegate);

    function createLoggerProxy(aName: string): Logger {
      return {
        error: (msg: string, ...data: any[]) =>
          getLoggerDelegate(aName).error(msg, ...data),
        info: (msg: string, ...data: any[]) =>
          getLoggerDelegate(aName).info(msg, ...data),
        warn: (msg: string, ...data: any[]) =>
          getLoggerDelegate(aName).warn(msg, ...data)
      };
    }

    const getLogger = (aName: string): Logger =>
      assertFromFunction(aName, proxyRegistry, createLoggerProxy);

    // register for new loggers
    rxPipe(loggerFactories$, takeUntil(this.done$)).subscribe((fct) => {
      // reset the factories
      registry = {};
      loggerFactory = fct || getDefaultLoggerFactory();
    });

    /**
     *  assign
     */
    that.get = getLogger;
  }

  unsubscribe() {
    this.done$.next();
  }
}
