import {
  createVersionString,
  LoggerService,
  WchSdkVersion
} from '@acoustic-content-sdk/api';

import { boxLoggerService } from './noop.logger.service';

/**
 * Logs version information for a module
 *
 * @param aVersion - the version
 * @param aModule  - the module
 * @param aLogSvc - the logger service
 */
export function logModule(
  aVersion: WchSdkVersion,
  aModule: string,
  aLogSvc?: LoggerService
) {
  // logger service
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(aModule);
  // log the startup
  logger.info(createVersionString(aVersion));
}
