import { WindowType } from '@acoustic-content-sdk/component-api';
import { getEditHostWindow } from '@acoustic-content-sdk/component-utils';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_WINDOW
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/react-edit-api';
import { isNil } from '@acoustic-content-sdk/utils';

/**
 * Validates that we run in a consistent environment
 *
 * @param aWnd - the window
 * @returns the window or throws an exception
 */
function assertEditHostWindow(aWnd: WindowType): WindowType {
  // sanity check
  if (isNil(aWnd)) {
    throw new Error('Application must run in an edit host window.');
  }
  // returns the type
  return aWnd;
}

const createEditHostWindow = ([aWnd]: [WindowType]) =>
  assertEditHostWindow(getEditHostWindow(aWnd));

/**
 * Declares the provider
 */
export const WCH_PROVIDER_EDIT_HOST_WINDOW = createInjectableReactProvider(
  createEditHostWindow,
  WCH_CONTEXT_EDIT_HOST_WINDOW,
  [WCH_CONTEXT_WINDOW]
);
