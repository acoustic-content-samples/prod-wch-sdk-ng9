import { UnaryFunction } from 'rxjs';
import { isArray, isPlainObject } from './../predicates/predicates';
import {
  assertArray,
  assertObject,
  binary,
  bind,
  bindMember,
  deepEquals,
  mergeObjects,
  partialLeft,
  reduceToObject,
  unary,
  objectKeys
} from './js.utils';
import { pluckProperty } from './pluck';

describe('js.utils', () => {
  function fct1(aValue: number): string {
    return `number: ${aValue}`;
  }

  class MyTest {
    constructor(private aInstance: string) {}

    myMember(aFirst: string, aSecond: number): string {
      return this.aInstance + aFirst + aSecond;
    }
  }

  it('should have a working keys for null or empty objects', () => {
    expect(objectKeys(null)).toEqual([]);
    expect(objectKeys(undefined)).toEqual([]);
  });

  it('should have a working keys', () => {
    const data = { a: 'a', b: 'b', c: 'c' };

    expect(objectKeys(data)).toEqual(['a', 'b', 'c']);
    expect(objectKeys(data)).toEqual(Object.keys(data));
  });

  it('should have a working mergeObjects', () => {
    const left: Record<string, string> = { a: 'va', b: undefined };
    const right: Record<string, string> = { a: undefined, b: 'vb', c: 'vc' };

    const merged = mergeObjects(left, right);
    expect(merged).toEqual({ a: 'va', b: 'vb', c: 'vc' });

    // compare to the built in merge
    const builtIn = { ...left, ...right };
    expect(builtIn).toEqual({ a: undefined, b: 'vb', c: 'vc' });
  });

  it('should have a working reduceToObject', () => {
    const array: Array<{ key: string; value: number }> = [
      { key: 'key2', value: 2 },
      { key: 'key1', value: 1 }
    ];

    const obj = reduceToObject(
      array,
      pluckProperty('key'),
      (o) => `value ${o.value}`
    );

    expect(obj).toBeDefined();
    expect(obj).toHaveProperty('key1', 'value 1');
    expect(obj).toHaveProperty('key2', 'value 2');
  });

  it('should limit function numbers to 2', () => {
    function withDefault(
      aFirst: string,
      aSecond: string,
      aThird?: string
    ): string {
      return aFirst + aSecond + aThird;
    }

    const uDefault = binary(withDefault);

    expect(uDefault('first', 'second')).toBe('firstsecondundefined');
    expect(uDefault.call(undefined, 'first', 'second', 'third')).toBe(
      'firstsecondundefined'
    );
    expect(withDefault.call(undefined, 'first', 'second', 'third')).toBe(
      'firstsecondthird'
    );
  });

  it('should limit function numbers to 1', () => {
    function withDefault(aFirst: string, aSecond?: string): string {
      return aFirst + aSecond;
    }

    const uDefault = unary(withDefault);

    expect(uDefault('first')).toBe('firstundefined');
    expect(uDefault.call(undefined, 'first', 'second')).toBe('firstundefined');
    expect(withDefault.call(undefined, 'first', 'second')).toBe('firstsecond');
  });

  it('should implement bind', () => {
    const obj = new MyTest('instance');

    const fct: UnaryFunction<number, string> = bind(obj.myMember, obj, 'first');

    const result = fct(1);

    expect(result).toBe('instancefirst1');
  });

  it('should implement bindMember', () => {
    const obj = new MyTest('instance');

    const fct: UnaryFunction<number, string> = bindMember(
      obj,
      'myMember',
      'first'
    );

    const result = fct(1);

    expect(result).toBe('instancefirst1');
  });

  it('should implement partials', () => {
    const res = partialLeft(fct1, 5);

    expect(res()).toBe('number: 5');
  });

  it('should correctly implement deep equals', () => {
    // some test object
    const test = {
      a: 'b',
      array: ['a', { c: 'd' }],
      d: 1,
      e: false
    };
    // make the identity check
    expect(deepEquals(test, test)).toBeTruthy();

    // clone this
    const cloned = JSON.parse(JSON.stringify(test));
    expect(test).not.toBe(cloned);
    // do the deep check
    expect(deepEquals(test, cloned)).toBeTruthy();

    // clone this
    const wrongCloned = JSON.parse(JSON.stringify(test));
    wrongCloned.array[1] = 'c';
    expect(test).not.toBe(wrongCloned);

    // do the deep check
    expect(deepEquals(test, wrongCloned)).toBeFalsy();
  });

  it('should have a working assignObject and assignArray', () => {
    // test host
    const host = {};
    const r1 = assertObject('o', host);
    expect(isPlainObject(r1)).toBeTruthy();
    const r2 = assertObject('o', host);
    expect(r1).toEqual(r2);

    const r3: any = assertArray('a', host);
    expect(isArray(r3)).toBeTruthy();
    const r4: any = assertObject('a', host);
    expect(r3).toEqual(r4);
  });
});
