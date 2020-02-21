import {
  DynamicLoggerFactory,
  LoggerFactory,
  LoggerService
} from '@acoustic-content-sdk/api';

import { createReactContext } from '../utils/context';

/*
 * Token used for dependency injection of the LoggerFactory.
 */
export const ACOUSTIC_CONTEXT_LOGGER_FACTORY = createReactContext<LoggerFactory>(
  'ACOUSTIC_CONTEXT_LOGGER_FACTORY'
);

/*
 * Token used for dependency injection of the DynamicLoggerFactory.
 */
export const ACOUSTIC_CONTEXT_DYNAMIC_LOGGER_FACTORY = createReactContext<
  DynamicLoggerFactory
>('ACOUSTIC_CONTEXT_DYNAMIC_LOGGER_FACTORY');

/*
 * Token used for dependency injection of the LoggerService.
 */
export const ACOUSTIC_CONTEXT_LOGGER_SERVICE = createReactContext<LoggerService>(
  'ACOUSTIC_CONTEXT_LOGGER_SERVICE'
);
