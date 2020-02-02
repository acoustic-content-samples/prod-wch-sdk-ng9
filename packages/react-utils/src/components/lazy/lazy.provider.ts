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
  // no dependencies
  <T>(fct: ObservableInput<(req?: never, opt?: never) => CmpInput<T>>): (req?: never, opt?: never) => CmpInput<T>;
  // only required dependencies
  <R1, T>(fct: ObservableInput<(req: [R1], opt?: never) => CmpInput<T>>): (req: [R1], opt?: never) => CmpInput<T>;
  <R1, R2, T>(fct: ObservableInput<(req: [R1, R2], opt?: never) => CmpInput<T>>):  (req: [R1, R2], opt?: never) => CmpInput<T>;
  <R1, R2, R3, T>(fct: ObservableInput<(req: [R1, R2, R3], opt?: never) => CmpInput<T>>): (req: [R1, R2, R3], opt?: never) => CmpInput<T>;
  <R1, R2, R3, R4, T>(fct: ObservableInput<(req: [R1, R2, R3, R4], opt?: never) => CmpInput<T>>): (req: [R1, R2, R3, R4], opt?: never) => CmpInput<T>;
  // only optional dependencies
  <O1, T>(fct: ObservableInput<(req: never, opt:[O1?]) => CmpInput<T>>): (req: never, opt:[O1?]) => CmpInput<T>;
  <O1, O2, T>(fct: ObservableInput<(req: never, opt:[O1?, O2?]) => CmpInput<T>>): (req: never, opt:[O1?, O2?]) => CmpInput<T>;
  <O1, O2, O3, T>(fct: ObservableInput<(req: never, opt:[O1?, O2?, O3?]) => CmpInput<T>>): (req: never, opt:[O1?, O2?, O3?]) => CmpInput<T>;
  <O1, T>(fct: ObservableInput<(req: [], opt:[O1?]) => CmpInput<T>>): (req: [], opt:[O1?]) => CmpInput<T>;
  <O1, O2, T>(fct: ObservableInput<(req: [], opt:[O1?, O2?]) => CmpInput<T>>): (req: [], opt:[O1?, O2?]) => CmpInput<T>;
  <O1, O2, O3, T>(fct: ObservableInput<(req: [], opt:[O1?, O2?, O3?]) => CmpInput<T>>): (req: [], opt:[O1?, O2?, O3?]) => CmpInput<T>;
  // one required and optional dependencies
  <R1, O1, T>(fct: ObservableInput<(req: [R1], opt:[O1?]) => CmpInput<T>>): (req: [R1], opt:[O1?]) => CmpInput<T>;
  <R1, O1, O2, T>(fct: ObservableInput<(req: [R1], opt:[O1?, O2?]) => CmpInput<T>>): (req: [R1], opt:[O1?, O2?]) => CmpInput<T>;
  // two required and optional dependencies
  <R1, R2, O1, T>(fct: ObservableInput<(req: [R1, R2], opt:[O1?]) => CmpInput<T>>): (req: [R1, R2], opt:[O1?]) => CmpInput<T>;
  <R1, R2, O1, O2, T>(fct: ObservableInput<(req: [R1, R2], opt:[O1?, O2?]) => CmpInput<T>>): (req: [R1, R2], opt:[O1?, O2?]) => CmpInput<T>;
  // three required and optional dependencies
  <R1, R2, R3, O1, T>(fct: ObservableInput<(req: [R1, R2, R3], opt:[O1?]) => CmpInput<T>>): (req: [R1, R2, R3], opt:[O1?]) => CmpInput<T>;
  <R1, R2, R3, O1, O2, T>(fct: ObservableInput<(req: [R1, R2, R3], opt:[O1?, O2?]) => CmpInput<T>>): (req: [R1, R2, R3], opt:[O1?, O2?]) => CmpInput<T>;
  // four required and optional dependencies
  <R1, R2, R3, R4, O1, T>(fct: ObservableInput<(req: [R1, R2, R3, R4], opt:[O1?]) => CmpInput<T>>): (req: [R1, R2, R3, R4], opt:[O1?]) => CmpInput<T>;
  // five required and optional dependencies
  <R1, R2, R3, R4, R5, O1, T>(fct: ObservableInput<(req: [R1, R2, R3, R4, R5], opt:[O1?]) => CmpInput<T>>): (req: [R1, R2, R3, R4, R5], opt:[O1?]) => CmpInput<T>;
  // six required and optional dependencies
  <R1, R2, R3, R4, R5, R6, O1, T>(fct: ObservableInput<(req: [R1, R2, R3, R4, R5, R6], opt:[O1?]) => CmpInput<T>>): (req: [R1, R2, R3, R4, R5, R6], opt:[O1?]) => CmpInput<T>;
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
