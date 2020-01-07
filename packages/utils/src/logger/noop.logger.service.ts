import { LoggerService } from '@acoustic-content-sdk/api';

import { NOOP_LOGGER } from './noop.logger';

/**
 * Fallback logger service that exposes noop loggers
 *
 * @returns the service
 */
export const NOOP_LOGGER_SERVICE: LoggerService = {
  get: (aName: string) => NOOP_LOGGER
};
