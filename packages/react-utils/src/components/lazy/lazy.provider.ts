import { rxPipe } from '@acoustic-content-sdk/utils';
import { ComponentClass, createElement, FunctionComponent } from 'react';
import { combineLatest, from, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

import { rxComponent } from './../reactive/rx.hoc';

declare type CmpInput<T> = FunctionComponent<T> | ComponentClass<T>;

/**
 * Function that can be reused independent of the outer closure
 *
 * @param req  - requried dependencies
 * @param opt  - optional dependencies
 * @param aCreator - the delayed creator function
 *
 * @returns the component
 */
const internalCreateLazyComponent = (
  req: any[],
  opt: any[],
  aCreator: ObservableInput<(req: any[], opt: any[]) => CmpInput<any>>
): CmpInput<any> => {
  // lazy load the component
  const Delegate$ = rxPipe(
    from(aCreator),
    map((other) => other(req, opt))
  );

  // The actual implementation of the component class
  return rxComponent(
    (props$) =>
      rxPipe(
        combineLatest(props$, Delegate$),
        map(([props, Delegate]) => ({ props, Delegate }))
      ),
    ({ Delegate, props, children }) =>
      Delegate && createElement(Delegate, props, children)
  );
};

/**
 * Unsafe typing of the component creator
 *
 * @param aCreator - the async component creator
 * @returns the sync component creator
 */
const internalLazyComponent = (
  aCreator: ObservableInput<(req: any[], opt: any[]) => CmpInput<any>>
): ((req: any[], opt: any[]) => CmpInput<any>) => (
  req: any[],
  opt: any[]
): CmpInput<any> => internalCreateLazyComponent(req, opt, aCreator);

// prettier-ignore
export interface LazyComponentCreator {
  <T>(fct: ObservableInput<(req: [], opt: []) => CmpInput<T>>): (req: [], opt: []) => CmpInput<T>;
  <O0, T>(fct: ObservableInput<(req: [], opt: [O0?]) => CmpInput<T>>): (req: [], opt: [O0?]) => CmpInput<T>;
  <O0, O1, T>(fct: ObservableInput<(req: [], opt: [O0?, O1?]) => CmpInput<T>>): (req: [], opt: [O0?, O1?]) => CmpInput<T>;
  <O0, O1, O2, T>(fct: ObservableInput<(req: [], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [], opt: [O0?, O1?, O2?]) => CmpInput<T>;
  <O0, O1, O2, O3, T>(fct: ObservableInput<(req: [], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, T>(fct: ObservableInput<(req: [R0], opt: []) => CmpInput<T>>): (req: [R0], opt: []) => CmpInput<T>;
  <R0, O0, T>(fct: ObservableInput<(req: [R0], opt: [O0?]) => CmpInput<T>>): (req: [R0], opt: [O0?]) => CmpInput<T>;
  <R0, O0, O1, T>(fct: ObservableInput<(req: [R0], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, O0, O1, O2, T>(fct: ObservableInput<(req: [R0], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0], opt: [O0?, O1?, O2?]) => CmpInput<T>;
  <R0, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <R0, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, R1, T>(fct: ObservableInput<(req: [R0, R1], opt: []) => CmpInput<T>>): (req: [R0, R1], opt: []) => CmpInput<T>;
  <R0, R1, O0, T>(fct: ObservableInput<(req: [R0, R1], opt: [O0?]) => CmpInput<T>>): (req: [R0, R1], opt: [O0?]) => CmpInput<T>;
  <R0, R1, O0, O1, T>(fct: ObservableInput<(req: [R0, R1], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0, R1], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, R1, O0, O1, O2, T>(fct: ObservableInput<(req: [R0, R1], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0, R1], opt: [O0?, O1?, O2?]) => CmpInput<T>;
  <R0, R1, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0, R1], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0, R1], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <R0, R1, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0, R1], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0, R1], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, R1, R2, T>(fct: ObservableInput<(req: [R0, R1, R2], opt: []) => CmpInput<T>>): (req: [R0, R1, R2], opt: []) => CmpInput<T>;
  <R0, R1, R2, O0, T>(fct: ObservableInput<(req: [R0, R1, R2], opt: [O0?]) => CmpInput<T>>): (req: [R0, R1, R2], opt: [O0?]) => CmpInput<T>;
  <R0, R1, R2, O0, O1, T>(fct: ObservableInput<(req: [R0, R1, R2], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0, R1, R2], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, R1, R2, O0, O1, O2, T>(fct: ObservableInput<(req: [R0, R1, R2], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0, R1, R2], opt: [O0?, O1?, O2?]) => CmpInput<T>;
  <R0, R1, R2, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0, R1, R2], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0, R1, R2], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <R0, R1, R2, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0, R1, R2], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0, R1, R2], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, R1, R2, R3, T>(fct: ObservableInput<(req: [R0, R1, R2, R3], opt: []) => CmpInput<T>>): (req: [R0, R1, R2, R3], opt: []) => CmpInput<T>;
  <R0, R1, R2, R3, O0, T>(fct: ObservableInput<(req: [R0, R1, R2, R3], opt: [O0?]) => CmpInput<T>>): (req: [R0, R1, R2, R3], opt: [O0?]) => CmpInput<T>;
  <R0, R1, R2, R3, O0, O1, T>(fct: ObservableInput<(req: [R0, R1, R2, R3], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0, R1, R2, R3], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, R1, R2, R3, O0, O1, O2, T>(fct: ObservableInput<(req: [R0, R1, R2, R3], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0, R1, R2, R3], opt: [O0?, O1?, O2?]) => CmpInput<T>;<R0, R1, R2, R3, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0, R1, R2, R3], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0, R1, R2, R3], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <R0, R1, R2, R3, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0, R1, R2, R3], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0, R1, R2, R3], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4], opt: []) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4], opt: []) => CmpInput<T>;
  <R0, R1, R2, R3, R4, O0, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4], opt: [O0?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4], opt: [O0?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, O0, O1, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, O0, O1, O2, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4], opt: [O0?, O1?, O2?]) =>
  CmpInput<T>;
  <R0, R1, R2, R3, R4, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4], opt: [O0?, O1?,
  O2?, O3?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5], opt: []) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5], opt: []) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, O0, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5], opt: [O0?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5], opt: [O0?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, O0, O1, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, O0, O1, O2, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?, O2?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4,
  R5], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, R6, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5, R6], opt: []) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5, R6], opt: []) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, R6, O0, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, R6, O0, O1, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, R6, O0, O1, O2, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?, O2?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?, O2?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, R6, O0, O1, O2, O3, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>>): (req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?, O2?, O3?]) => CmpInput<T>;
  <R0, R1, R2, R3, R4, R5, R6, O0, O1, O2, O3, O4, T>(fct: ObservableInput<(req: [R0, R1, R2, R3, R4, R5, R6], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>>): (req: [R0, R1, R2,
  R3, R4, R5, R6], opt: [O0?, O1?, O2?, O3?, O4?]) => CmpInput<T>;
}

/**
 * Creates a synchronous creator function for a React component
 * from an asynchronous function.
 *
 * @param fct - asynchronous function
 *
 * @returns a synchronous function
 */
export const createLazyComponent: LazyComponentCreator = internalLazyComponent as any;
