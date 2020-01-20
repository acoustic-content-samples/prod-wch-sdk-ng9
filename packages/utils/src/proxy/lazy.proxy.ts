import { lazyGenerator } from '../generators/lazy.generator';
import { UNDEFINED } from '../js/js.core';
import { Generator } from './../generators/generator';

/**
 * We can use one single handler instance for all of our proxies because the
 * target object will be the generator function.
 */
const LAZY_PROXY_HANDLER: ProxyHandler<any> = {
  getPrototypeOf: (target: Generator<any>) => Reflect.getPrototypeOf(target()),
  setPrototypeOf: (target: Generator<any>, v: any) =>
    Reflect.setPrototypeOf(target(), v),
  isExtensible: (target: Generator<any>) => Reflect.isExtensible(target()),
  preventExtensions: (target: Generator<any>) =>
    Reflect.preventExtensions(target()),
  getOwnPropertyDescriptor: (target: Generator<any>, p: PropertyKey) =>
    Reflect.getOwnPropertyDescriptor(target(), p),
  has: (target: Generator<any>, p: PropertyKey) => Reflect.has(target(), p),
  get: (target: Generator<any>, p: PropertyKey, receiver: any) =>
    Reflect.get(target(), p, receiver),
  set: (target: Generator<any>, p: PropertyKey, value: any, receiver: any) =>
    Reflect.set(target(), p, value, receiver),
  deleteProperty: (target: Generator<any>, p: PropertyKey) =>
    Reflect.deleteProperty(target(), p),
  defineProperty: (
    target: Generator<any>,
    p: PropertyKey,
    attributes: PropertyDescriptor
  ) => Reflect.defineProperty(target(), p, attributes),
  enumerate: (target: Generator<any>) => Reflect.enumerate(target()) as any,
  ownKeys: (target: Generator<any>) => Reflect.ownKeys(target()),
  apply: (target: Generator<any>, thisArg: any, argArray?: any) =>
    Reflect.apply(target(), thisArg, argArray),
  construct: (target: Generator<any>, argArray: any, newTarget?: any) =>
    Reflect.construct(target(), argArray, newTarget)
};

const HAS_PROXY = typeof Proxy !== UNDEFINED && typeof Reflect !== UNDEFINED;

const nativeProxy = <T>(aGenerator: Generator<T>): T =>
  new Proxy(lazyGenerator(aGenerator), LAZY_PROXY_HANDLER);

const fallbackProxy = <T>(aGenerator: Generator<T>): T => aGenerator();

/**
 * Returns an object that is lazily constructed when first accessed
 *
 * @param aGenerator - the generator function for the object
 * @returns the object
 */
export const lazyProxy = HAS_PROXY ? nativeProxy : fallbackProxy;
