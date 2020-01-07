import { DynamicLoggerFactory, LoggerFactory } from '@acoustic-content-sdk/api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DYNAMIC_LOGGER_FACTORY,
  WCH_CONTEXT_LOGGER_FACTORY,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { WchLoggerService } from './wch.logger.service';

const createLoggerService = (
  aReq: never,
  [aFct, aDynamicFct]: [LoggerFactory?, DynamicLoggerFactory?]
) => new WchLoggerService(aFct, aDynamicFct);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_LOGGER_SERVICE = createInjectableReactProvider(
  createLoggerService,
  WCH_CONTEXT_LOGGER_SERVICE,
  undefined,
  [WCH_CONTEXT_LOGGER_FACTORY, WCH_CONTEXT_DYNAMIC_LOGGER_FACTORY]
);
