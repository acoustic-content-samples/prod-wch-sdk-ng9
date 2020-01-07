import {
  isArray,
  isArrayLike,
  isArrayLikeOf,
  isArrayOf,
  isBoolean,
  isEqualTo,
  isFunction,
  isNil,
  isNotNil,
  isNumber,
  isPlainObject,
  isString,
  isStringArray,
  isStringArrayLike
} from './predicates';

describe('predicates', () => {
  it('should have a correct isNotNil', () => {
    expect(isNotNil(null)).toBeFalsy();
    expect(isNotNil(undefined)).toBeFalsy();
    expect(isNotNil(0)).toBeTruthy();
    expect(isNotNil(false)).toBeTruthy();
    expect(isNotNil('')).toBeTruthy();
  });

  it('should have a correct isNil', () => {
    expect(isNil(null)).toBeTruthy();
    expect(isNil(undefined)).toBeTruthy();
    expect(isNil(0)).toBeFalsy();
    expect(isNil(false)).toBeFalsy();
    expect(isNil('')).toBeFalsy();
  });

  it('should be able to check string for array', () => {
    const a = '';

    expect(isArray(a)).toBeFalsy();
    expect(isArrayLike(a)).toBeTruthy();
  });

  it('isArrayLike should do a negative match', () => {
    const obj = {};

    expect(isArray(obj)).toBeFalsy();
    expect(isArrayLike(obj)).toBeFalsy();
  });

  it('should have a working isEqualTo', () => {
    const pred = isEqualTo('abc');

    expect(pred('abc')).toBeTruthy();
    expect(pred('abcd')).toBeFalsy();
  });

  it('should test an array', () => {
    const stringArray = ['a', 'b'];

    expect(isStringArray(stringArray)).toBeTruthy();
    expect(isArrayOf(stringArray, isNumber)).toBeFalsy();
  });

  it('should test an array like', () => {
    const stringArray = ['a', 'b'];

    expect(isStringArrayLike(stringArray)).toBeTruthy();
    expect(isArrayLikeOf(stringArray, isNumber)).toBeFalsy();
  });

  it('should work for boolean', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();
    expect(isBoolean('true')).toBeFalsy();
    expect(isBoolean('false')).toBeFalsy();
  });

  it('should detect a plain object', () => {
    expect(isPlainObject({ foo: 'bar' })).toBeTruthy();
    expect(isPlainObject({})).toBeTruthy();
  });

  it('should reject non plain objects', () => {
    function Foo() {
      this.abc = {};
    }

    expect(isPlainObject(/foo/)).toBeFalsy();
    expect(isPlainObject(function() {})).toBeFalsy();
    expect(isPlainObject(1)).toBeFalsy();
    expect(isPlainObject(['foo', 'bar'])).toBeFalsy();
    expect(isPlainObject([])).toBeFalsy();
    expect(isPlainObject(new Foo())).toBeFalsy();
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject(Object.create(null))).toBeTruthy();
  });

  it('should have a working isFunction', () => {
    // sanity check
    expect(isFunction('abc')).toBeFalsy();
    expect(isFunction('')).toBeFalsy();
    expect(isFunction(null)).toBeFalsy();
    expect(isFunction(undefined)).toBeFalsy();
    expect(isFunction(describe)).toBeTruthy();
  });

  it('should have a working isString', () => {
    // sanity check
    const a = 'replace';
    expect(isString(`test ${a}`)).toBeTruthy();
    expect(isString('a' + 'v')).toBeTruthy();
    expect(isString('abc')).toBeTruthy();
    expect(isString('')).toBeTruthy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString(describe)).toBeFalsy();
  });
});
