import { WindowRef } from './window.ref';

/** Define class that implements the abstract class and returns the native window object. */
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  get nativeWindow(): Window {
    return window;
  }
}
