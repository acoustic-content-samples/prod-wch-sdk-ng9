import { SchematicContext } from '@angular-devkit/schematics';
import { Logger, LoggerFactory, LoggerService } from '@acoustic-content-sdk/api';
import {
  createLoggerService as _createLoggerService,
  isNotNil,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';

export const NOOP_LOGGER = NOOP_LOGGER_SERVICE.get('default');

/**
 * Constructs the logger service on top of the context
 *
 * @param context  - context
 *
 * @returns the logger service
 */
export function createLoggerService(context: SchematicContext): LoggerService {
  // access the logger
  const logger = context.logger;
  if (isNotNil(logger)) {
    // create the logger factory
    const create = (aName: string): Logger => {
      const delegate = logger.createChild(aName);

      const error = (msg: string, ...data: any[]) =>
        delegate.error(msg, { data });
      const info = (msg: string, ...data: any[]) =>
        delegate.debug(msg, { data });
      const warn = (msg: string, ...data: any[]) =>
        delegate.warn(msg, { data });

      return { error, info, warn };
    };
    const logFct: LoggerFactory = { create };
    // contruct the service
    return _createLoggerService(logFct);
  }
  // noop
  return NOOP_LOGGER_SERVICE;
}
