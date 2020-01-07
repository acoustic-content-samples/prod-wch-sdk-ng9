import { LoggerService } from '@acoustic-content-sdk/api';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { createContext } from 'react';

/**
 * Exposes a react context that carries the logger service
 */
export const LoggerServiceContext = createContext<LoggerService>(
  NOOP_LOGGER_SERVICE
);
