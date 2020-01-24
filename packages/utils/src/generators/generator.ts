import { isFunction } from './../predicates/predicates';

/* Copyright IBM Corp. 2018 */

export type Generator<T> = () => T | null | undefined;

export type GeneratorOrT<T> = T | (() => GeneratorOrT<T>);

export const arrayGenerator = <T>(): T[] => [];
export const objectGenerator = (): any => ({});

export const constGenerator = <T>(aValue: T) => () => aValue;

export const fromGeneratorOrT = <T>(aValue: GeneratorOrT<T>) =>
  isFunction(aValue) ? fromGeneratorOrT(aValue()) : aValue;
