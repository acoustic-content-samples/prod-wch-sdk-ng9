import { LoggerService } from '@acoustic-content-sdk/api';
import { identity } from 'rxjs';

import { constGenerator } from '../generators/generator';
import { ternary } from '../js/js.core';
import { isNotNil } from '../predicates/predicates';
import { NOOP_LOGGER } from './noop.logger';

/**
 * Fallback logger service that exposes noop loggers
 *
 * @returns the service
 */
export const NOOP_LOGGER_SERVICE: LoggerService = {
  get: (aName: string) => NOOP_LOGGER
};

/**
 * Function to return the NOOP_LOGGER service in case the logger service
 * passed in is nil
 *
 * @param aLogSvc - optional logger service
 * @returns the resulting service
 */
export const boxLoggerService = ternary<LoggerService, LoggerService>(
  isNotNil,
  identity,
  constGenerator(NOOP_LOGGER_SERVICE)
);
