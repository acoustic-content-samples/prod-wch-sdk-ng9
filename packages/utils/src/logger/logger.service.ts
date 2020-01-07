import { Logger, LoggerFactory, LoggerService } from '@acoustic-content-sdk/api';

import { assertFromFunction } from '../js/js.utils';

/**
 * Constructs a logger service on the basis of a logger factory. The service
 * makes sure not to create the same logger multiple times
 *
 * @param aLoggerFactory  - the factory
 *
 * @returns the service
 */
export function createLoggerService(
  aLoggerFactory: LoggerFactory
): LoggerService {
  // registry of loggers
  const registry: Record<string, Logger> = {};
  // creator function
  const creator = (aName: string) => aLoggerFactory.create(aName);

  // accessor of the logger
  const get = (aName: string): Logger =>
    assertFromFunction(aName, registry, creator);

  return { get };
}
