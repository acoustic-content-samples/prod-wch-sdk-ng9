import { WindowType } from '@acoustic-content-sdk/component-api';

/** Define abstract class for obtaining reference to the global window object. */
export abstract class WindowRef {
  get nativeWindow(): WindowType {
    throw new Error('Not implemented.');
  }
}
