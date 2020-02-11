import { LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  isEqual,
  NOOP_LOGGER_SERVICE,
  pluckPath
} from '@acoustic-content-sdk/utils';

/**
 * Selects the origin from the window
 */
const selectOrigin = pluckPath<string>(['location', 'origin']);

const LOGGER = 'EditHostWindow';

/**
 * Validates that the origin of both windows is the same, otherwise throws an exception
 *
 * @param aLeft  - left window to check
 * @param aRight - right window to check
 * @param aLogSvc - optionally the logger service
 */
export function assertSameOrigin(
  aLeft: WindowType,
  aRight: WindowType,
  aLogSvc?: LoggerService
) {
  // quick check
  if (!isEqual(aLeft, aRight)) {
    // check
    const leftOrigin = selectOrigin(aLeft);
    const rightOrigin = selectOrigin(aRight);
    // test the origin
    if (!isEqual(leftOrigin, rightOrigin)) {
      // logging
      const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
      const logger = logSvc.get(LOGGER);
      // bail out
      logger.error(`Origin [${leftOrigin}] does not match [${rightOrigin}]`);
    }
  }
}

/**
 * Returns the window that controls the application. This is either the parent
 * window or the opener window.
 *
 * @param aCurrentWindow - the current window
 * @returns the controlling window
 */
export function getEditHostWindow(aCurrentWindow: WindowType): WindowType {
  // access the parent object
  const wnd = aCurrentWindow as any;
  const parent = wnd.parent;
  return isEqual(parent, wnd) ? wnd.opener : parent;
}
