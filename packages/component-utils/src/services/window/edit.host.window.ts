import { WindowType } from '@acoustic-content-sdk/component-api';
import { isEqual } from '@acoustic-content-sdk/utils';

/**
 * Returns the window that controls the application
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
