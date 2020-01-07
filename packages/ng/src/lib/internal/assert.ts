import {
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
import { BehaviorSubject } from 'rxjs';

/**
 * Flag that indicates if dev mode is enabled
 */
let DEV_MODE_ENABLED = true;

/**
 * Subject that allows us to modify the dev mode
 */
export const DEV_MODE_SUBJECT = new BehaviorSubject<boolean>(DEV_MODE_ENABLED);

/**
 * Listen for mode changes
 */
DEV_MODE_SUBJECT.subscribe((mode) => (DEV_MODE_ENABLED = mode));

export function isDevModeOn() {
  return DEV_MODE_ENABLED;
}

export function isAssertOn() {
  return isDevModeOn();
}

export function assertDependency(aValue: any, aName: string) {
  if (isAssertOn() && !isNotNil(aValue)) {
    throw new Error(`Dependency ${aValue} required.`);
  }
}

export function assertIsObservable(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isObservable(aValue)) {
    throw new Error(aMessage || `Expecting ${aValue} to be an Observable.`);
  }
}

export function assertIsPlainObject(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isPlainObject(aValue)) {
    throw new Error(aMessage || `Expecting ${aValue} to be a plain object.`);
  }
}

export function assertIsFunction(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isFunction(aValue)) {
    throw new Error(aMessage || `Expecting ${aValue} to be a function.`);
  }
}

export function assertIsString(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isString(aValue)) {
    throw new Error(aMessage || `Expecting ${aValue} to be a string.`);
  }
}

export function assertIsArray(aValue: any, aMessage?: string) {
  if (isAssertOn() && !isArray(aValue)) {
    throw new Error(aMessage || `Expecting ${aValue} to be an array.`);
  }
}

export function assertNil(aValue: any, aMessage?: string) {
  if (isAssertOn() && isNotNil(aValue)) {
    throw new Error(aMessage || `Expecting ${aValue} to be null or undefined.`);
  }
}

export function assertNotNil(aValue: any, aMessage?: string) {
  if (isAssertOn() && isNil(aValue)) {
    throw new Error(
      aMessage || `Expecting ${aValue} to be neither null nor undefined.`
    );
  }
}

export function assertDefined(aValue: any, aMessage?: string) {
  if (isAssertOn() && !(aValue !== undefined)) {
    throw new Error(aMessage || `Expecting ${aValue} to be defined.`);
  }
}

export function assertUndefined(aValue: any, aMessage?: string) {
  if (isAssertOn() && !(aValue === undefined)) {
    throw new Error(aMessage || `Expecting ${aValue} to be undefined.`);
  }
}

export function assertNull(aValue: any, aMessage?: string) {
  if (isAssertOn() && !(aValue === null)) {
    throw new Error(aMessage || `Expecting ${aValue} to be null.`);
  }
}

export function assertTrue(aValue: any, aMessage?: string) {
  if (isAssertOn() && !aValue) {
    throw new Error(aMessage || `Expecting ${aValue} to be true.`);
  }
}

export function assertIsAbsoluteURL(aValue: URL | string, aMessage?: string) {
  if (isAssertOn() && !isAbsoluteURL(urlToString(aValue))) {
    throw new Error(aMessage || `Expecting ${aValue} to be an absolute URL.`);
  }
}
