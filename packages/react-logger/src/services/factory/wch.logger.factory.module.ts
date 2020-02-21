import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_LOGGER_FACTORY
} from '@acoustic-content-sdk/react-api';
import {
  ReactLoggerConfigService,
  ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG
} from '../config/wch.logger.config';
import { ReactLoggerFactory } from './logger.factory';

const createLoggerFactory = (aReq: never, [cfg]: [ReactLoggerConfigService?]) =>
  new ReactLoggerFactory(cfg);

/**
 * Implements the `ACOUSTIC_CONTEXT_LOGGER_FACTORY` using the `ng2-logger` implementation. Provide the `ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG` context
 * to configure this logger.
 */
export const ACOUSTIC_PROVIDER_LOGGER_FACTORY = createInjectableReactProvider(
  createLoggerFactory,
  ACOUSTIC_CONTEXT_LOGGER_FACTORY,
  undefined,
  [ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG]
);
