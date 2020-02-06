import { WindowType } from '@acoustic-content-sdk/component-api';
import { isEqual, pluckProperty } from '@acoustic-content-sdk/utils';

/**
 * Selects the origin from the window
 */
const selectOrigin = pluckProperty<any, 'origin'>('origin');

/**
 * Validates that the origin of both windows is the same, otherwise throws an exception
 *
 * @param aLeft  - left window to check
 * @param aRight - right window to check
 */
export function assertSameOrigin(aLeft: WindowType, aRight: WindowType) {
  // quick check
  if (!isEqual(aLeft, aRight)) {
    // check
    const leftOrigin = selectOrigin(aLeft);
    const rightOrigin = selectOrigin(aRight);
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
