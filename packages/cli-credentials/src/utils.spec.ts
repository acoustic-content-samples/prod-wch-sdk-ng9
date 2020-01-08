import { isString, isFunction, isArray } from './utils';

describe('utils', () => {
  it('should check for strings', () => {
    expect(isString('')).toBeTruthy();
    expect(isString('hello')).toBeTruthy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString({})).toBeFalsy();
  });

  it('should check for functions', () => {
    expect(isFunction(isFunction)).toBeTruthy();
    expect(isFunction(isString)).toBeTruthy();
    expect(isFunction(null)).toBeFalsy();
    expect(isFunction(undefined)).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
  });
});
