import { WindowType } from '@acoustic-content-sdk/component-api';
import { createError } from '@acoustic-content-sdk/utils';

/**
 * Define abstract class for obtaining reference to the global window object.
 */
export abstract class WindowRef {
  get nativeWindow(): WindowType {
    throw createError('Not implemented.');
  }
}
