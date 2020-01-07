import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isArray, isFunction } from '../predicates/predicates';
import {
  chunkArray,
  mapArray,
  reduceArray,
  spreadArgs,
  toArray,
  zipArgs,
  flattenArray
} from './js.core';
import { deepEquals } from './js.utils';

describe('js.core', () => {
  function _spreadTest(
    aFirst: string,
    aSecond: number,
    aThird: boolean
  ): string {
    return aFirst + aSecond + aThird;
  }

  it('should flatten an array', () => {
    // original
    const data = [[1, 2], [3], [4, 5, 6]];
    const flattened = flattenArray(data);

    expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should have a working chunk method for even chunks', () => {
    const data = [1, 2, 3, 4, 5, 6];
    const chunked = chunkArray(data, 3);

    expect(chunked).toEqual([[1, 2, 3], [4, 5, 6]]);
  });

  it('should have a working chunk method', () => {
    const data = [1, 2, 3, 4, 5, 6, 7];
    const chunked = chunkArray(data, 3);

    expect(chunked).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('should have a reduce that works with null', () => {
    const fct = (aDst: number, aValue: number) => aDst + aValue;
    const res = reduceArray(null, fct, 1);

    expect(res).toEqual(1);
  });

  it('should have a working reduce', () => {
    // source
    const args = [1, 2, 3, 4];
    const fct = (aDst: number, aValue: number) => aDst + aValue;

    const res1 = args.reduce(fct, 0);
    const res2 = reduceArray(args, fct, 0);

    expect(res1).toEqual(res2);
  });

  it('should have a working map', () => {
    // source
    const args = [1, 2, 3, 4];
    const fct = (aValue: number) => aValue * aValue;

    const res1 = args.map(fct);
    const res2 = mapArray(args, fct);

    return expect(deepEquals(res1, res2)).toBeTruthy();
  });

  it('should have a working toArray', () => {
    const a: string[] = [];

    expect(isArray(toArray(a))).toBeTruthy();
  });

  it('should be able to declare a constant', () => {
    const fct: <T>(src: Observable<T>) => Observable<T> = map((x) => x);
    expect(isFunction(fct));
  });

  it('should spread arguments', () => {
    const args: [string, number, boolean] = zipArgs('a', 0, true);
    const spread = spreadArgs(_spreadTest);

    const result = spread(args);

    expect(result).toBe('a0true');
  });

  it('should zip arguments', () => {
    const args: [string, number, boolean] = zipArgs('a', 0, true);

    expect(isArray(args)).toBeTruthy();
    expect(args[0]).toBe('a');
    expect(args[1]).toBe(0);
    expect(args[2]).toBe(true);
  });
});
