import {
  DynamicLoggerFactory,
  Logger,
  LoggerFactory,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  WCH_TOKEN_DYNAMIC_LOGGER_FACTORY,
  WCH_TOKEN_LOGGER_FACTORY
} from '@acoustic-content-sdk/ng-api';
import {
  assertFromFunction,
  createConsoleLogger,
  createEmptyLogger,
  createSingleSubject,
  isNotNil,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { isDevModeOn } from './../../internal/assert';

/**
 * Default logger factory depends on the development config
 */
const getDefaultLoggerFactory = () => ({
  create: isDevModeOn() ? createConsoleLogger : createEmptyLogger
});

@Injectable({ providedIn: 'root' })
export class WchLoggerService implements LoggerService, OnDestroy {
  /**
   * Done trigger
   */
  private readonly done$ = createSingleSubject();

  get: (name: string) => Logger;

  constructor(
    @Optional() @Inject(WCH_TOKEN_LOGGER_FACTORY) aFactory: LoggerFactory,
    @Optional()
    @Inject(WCH_TOKEN_DYNAMIC_LOGGER_FACTORY)
    aDynamicFactory: DynamicLoggerFactory
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
        ? rxPipe(aDynamicFactory.get().pipe(startWith(aFactory)))
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

  ngOnDestroy() {
    this.done$.next();
  }
}
