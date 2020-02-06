import { WindowType } from '@acoustic-content-sdk/component-api';
import { WCH_TOKEN_WINDOW } from '@acoustic-content-sdk/ng-api';
import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, PLATFORM_ID } from '@angular/core';

import { BrowserWindowRef } from './browser.window.ref';
import { WindowRef } from './window.ref';

/**
 * Create an factory function that returns the native window object.
 */
export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: Object
): WindowType {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 */
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 */
const windowProvider: FactoryProvider = {
  provide: WCH_TOKEN_WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID]
};

/**
 * Create an array of providers.
 */
export const BROWSER_WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
