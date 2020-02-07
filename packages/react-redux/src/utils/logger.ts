import { createLog4jsLoggerService } from '@acoustic-content-sdk/log4js-logger';
import { lazyGenerator } from '@acoustic-content-sdk/utils';
import { join } from 'path';

export const LOGGER_ROOT = join(__dirname, '..', '..', '..', '..', 'logs');

/**
 * Returns a pre-configured logger used for testing purposes
 *
 * @returns the logger service
 */
export const getLoggerService = lazyGenerator(() =>
  createLog4jsLoggerService(LOGGER_ROOT)
);
