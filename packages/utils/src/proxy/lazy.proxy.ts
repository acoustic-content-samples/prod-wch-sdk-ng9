import { Generator } from './../generators/generator';

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

/**
 * Returns an object that is lazily constructed when first accessed
 *
 * @param aGenerator - the generator function for the object
 * @returns the object
 */
export function lazyProxy<T>(aGenerator: Generator<T>): T {
  // track the initialization status
  let bInit = false;
  // our generated value
  let value: T;
  // create the value
  const create = () => {
    bInit = true;
    return (value = aGenerator());
  };
  // access the value
  const access = () => (bInit ? value : create());
  // construct our generic proxy
  return new Proxy(access, LAZY_PROXY_HANDLER);
}
