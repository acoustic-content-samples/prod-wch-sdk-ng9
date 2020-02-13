import { isDevMode } from '@acoustic-content-sdk/react-utils';
import {
  createError,
  isAbsoluteURL,
  isArray,
  isFunction,
  isNil,
  isNotNil,
  isObservable,
  isPlainObject,
  isString,
  urlToString
} from '@acoustic-content-sdk/utils';

export const isDevModeOn = isDevMode;

export const isAssertOn = isDevModeOn;

export function assertDependency(aValue: any, aName: string) {
  if (isAssertOn() && !isNotNil(aValue)) {
    throw createError(`Dependency ${aValue} required.`);
  }
}

export function assertIsObservable(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isObservable(aValue)) {
    throw createError(aMessage || `Expecting ${aValue} to be an Observable.`);
  }
}

export function assertIsPlainObject(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isPlainObject(aValue)) {
    throw createError(aMessage || `Expecting ${aValue} to be a plain object.`);
  }
}

export function assertIsFunction(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isFunction(aValue)) {
    throw createError(aMessage || `Expecting ${aValue} to be a function.`);
  }
}

export function assertIsString(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isString(aValue)) {
    throw createError(aMessage || `Expecting ${aValue} to be a string.`);
  }
}

export function assertIsArray(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isArray(aValue)) {
    throw createError(aMessage || `Expecting ${aValue} to be an array.`);
  }
}

export function assertNil(aValue: any, aMessage?: string) {
  if (isAssertOn() && isNotNil(aValue)) {
    throw createError(
      aMessage || `Expecting ${aValue} to be null or undefined.`
    );
  }
}

export function assertNotNil(aValue: any, aMessage?: string) {
  if (isAssertOn() && isNil(aValue)) {
    throw createError(
      aMessage || `Expecting ${aValue} to be neither null nor undefined.`
    );
  }
}

export function assertDefined(aValue: any, aMessage?: string) {
  if (isAssertOn() && !(aValue !== undefined)) {
    throw createError(aMessage || `Expecting ${aValue} to be defined.`);
  }
}

export function assertUndefined(aValue: any, aMessage?: string) {
  if (isAssertOn() && !(aValue === undefined)) {
    throw createError(aMessage || `Expecting ${aValue} to be undefined.`);
  }
}

export function assertNull(aValue: any, aMessage?: string) {
  if (isAssertOn() && !(aValue === null)) {
    throw createError(aMessage || `Expecting ${aValue} to be null.`);
  }
}

export function assertTrue(aValue: any, aMessage?: string) {
  if (isAssertOn() && !aValue) {
    throw createError(aMessage || `Expecting ${aValue} to be true.`);
  }
}

export function assertIsAbsoluteURL(aValue: URL | string, aMessage?: string) {
  if (isAssertOn() && !isAbsoluteURL(urlToString(aValue))) {
    throw createError(aMessage || `Expecting ${aValue} to be an absolute URL.`);
  }
}
