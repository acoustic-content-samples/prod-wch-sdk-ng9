import { InjectionToken } from '@angular/core';
import {
  DynamicLoggerFactory,
  LoggerFactory,
  LoggerService
} from '@acoustic-content-sdk/api';

/*
 * Token used for dependency injection of the logger.
 */
export const ACOUSTIC_TOKEN_LOGGER_FACTORY = new InjectionToken<LoggerFactory>(
  'WchLoggerFactory'
);

/*
 * Token used for dependency injection of the logger.
 */
export const ACOUSTIC_TOKEN_DYNAMIC_LOGGER_FACTORY = new InjectionToken<
  DynamicLoggerFactory
>('WchDynamicLoggerFactory');

/*
 * Token used for dependency injection of the logger service.
 */
export const ACOUSTIC_TOKEN_LOGGER_SERVICE = new InjectionToken<LoggerService>(
  'LoggerService'
);
