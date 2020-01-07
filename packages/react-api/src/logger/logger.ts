import {
  DynamicLoggerFactory,
  LoggerFactory,
  LoggerService
} from '@acoustic-content-sdk/api';

import { createReactContext } from '../utils/context';

/*
 * Token used for dependency injection of the logger.
 */
export const WCH_CONTEXT_LOGGER_FACTORY = createReactContext<LoggerFactory>(
  'WCH_CONTEXT_LOGGER_FACTORY'
);

/*
 * Token used for dependency injection of the logger.
 */
export const WCH_CONTEXT_DYNAMIC_LOGGER_FACTORY = createReactContext<
  DynamicLoggerFactory
>('WCH_CONTEXT_DYNAMIC_LOGGER_FACTORY');

/*
 * Token used for dependency injection of the logger service.
 */
export const WCH_CONTEXT_LOGGER_SERVICE = createReactContext<LoggerService>(
  'WCH_CONTEXT_LOGGER_SERVICE'
);
