import {
  createInjectableReactProvider,
  WCH_CONTEXT_LOGGER_FACTORY
} from '@acoustic-content-sdk/react-api';
import {
  ReactLoggerConfigService,
  WCH_CONTEXT_REACT_LOGGER_CONFIG
} from '../config/wch.logger.config';
import { ReactLoggerFactory } from './logger.factory';

const createLoggerFactory = (aReq: never, [cfg]: [ReactLoggerConfigService?]) =>
  new ReactLoggerFactory(cfg);

/**
 * Implements the `WCH_CONTEXT_LOGGER_FACTORY` using the `ng2-logger` implementation. Provide the `WCH_CONTEXT_REACT_LOGGER_CONFIG` context
 * to configure this logger.
 */
export const WCH_PROVIDER_LOGGER_FACTORY = createInjectableReactProvider(
  createLoggerFactory,
  WCH_CONTEXT_LOGGER_FACTORY,
  undefined,
  [WCH_CONTEXT_REACT_LOGGER_CONFIG]
);
