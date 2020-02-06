import { WindowRef } from './window.ref';

/**
 * Defines a class that implements the abstract class and returns
 * the native window object from the browser.
 */
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  /**
   * Returns the native window object
   */
  get nativeWindow(): Window {
    return window;
  }
}
