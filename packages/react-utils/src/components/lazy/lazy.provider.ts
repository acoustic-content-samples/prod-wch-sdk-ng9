import { ReactComponent } from '@acoustic-content-sdk/react-api';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { createElement } from 'react';
import { combineLatest, from, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

import { rxComponent } from './../reactive/rx.hoc';

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
  aCreator: ObservableInput<(req: any[], opt: any[]) => ReactComponent<any>>
): ReactComponent<any> => {
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
  aCreator: ObservableInput<(req: any[], opt: any[]) => ReactComponent<any>>
): ((req: any[], opt: any[]) => ReactComponent<any>) => (
  req: any[],
  opt: any[]
): ReactComponent<any> => internalCreateLazyComponent(req, opt, aCreator);

// prettier-ignore
export interface LazyComponentCreator {
  // no dependencies
  <T>(fct: ObservableInput<(req?: never, opt?: never) => ReactComponent<T>>): (req?: never, opt?: never) => ReactComponent<T>;
  // only required dependencies
  <R1, T>(fct: ObservableInput<(req: [R1], opt?: never) => ReactComponent<T>>): (req: [R1], opt?: never) => ReactComponent<T>;
  <R1, R2, T>(fct: ObservableInput<(req: [R1, R2], opt?: never) => ReactComponent<T>>):  (req: [R1, R2], opt?: never) => ReactComponent<T>;
  <R1, R2, R3, T>(fct: ObservableInput<(req: [R1, R2, R3], opt?: never) => ReactComponent<T>>): (req: [R1, R2, R3], opt?: never) => ReactComponent<T>;
  <R1, R2, R3, R4, T>(fct: ObservableInput<(req: [R1, R2, R3, R4], opt?: never) => ReactComponent<T>>): (req: [R1, R2, R3, R4], opt?: never) => ReactComponent<T>;
  // only optional dependencies
  <O1, T>(fct: ObservableInput<(req: never, opt:[O1?]) => ReactComponent<T>>): (req: never, opt:[O1?]) => ReactComponent<T>;
  <O1, O2, T>(fct: ObservableInput<(req: never, opt:[O1?, O2?]) => ReactComponent<T>>): (req: never, opt:[O1?, O2?]) => ReactComponent<T>;
  <O1, O2, O3, T>(fct: ObservableInput<(req: never, opt:[O1?, O2?, O3?]) => ReactComponent<T>>): (req: never, opt:[O1?, O2?, O3?]) => ReactComponent<T>;
  <O1, T>(fct: ObservableInput<(req: [], opt:[O1?]) => ReactComponent<T>>): (req: [], opt:[O1?]) => ReactComponent<T>;
  <O1, O2, T>(fct: ObservableInput<(req: [], opt:[O1?, O2?]) => ReactComponent<T>>): (req: [], opt:[O1?, O2?]) => ReactComponent<T>;
  <O1, O2, O3, T>(fct: ObservableInput<(req: [], opt:[O1?, O2?, O3?]) => ReactComponent<T>>): (req: [], opt:[O1?, O2?, O3?]) => ReactComponent<T>;
  // one required and optional dependencies
  <R1, O1, T>(fct: ObservableInput<(req: [R1], opt:[O1?]) => ReactComponent<T>>): (req: [R1], opt:[O1?]) => ReactComponent<T>;
  <R1, O1, O2, T>(fct: ObservableInput<(req: [R1], opt:[O1?, O2?]) => ReactComponent<T>>): (req: [R1], opt:[O1?, O2?]) => ReactComponent<T>;
  // two required and optional dependencies
  <R1, R2, O1, T>(fct: ObservableInput<(req: [R1, R2], opt:[O1?]) => ReactComponent<T>>): (req: [R1, R2], opt:[O1?]) => ReactComponent<T>;
  <R1, R2, O1, O2, T>(fct: ObservableInput<(req: [R1, R2], opt:[O1?, O2?]) => ReactComponent<T>>): (req: [R1, R2], opt:[O1?, O2?]) => ReactComponent<T>;
  // three required and optional dependencies
  <R1, R2, R3, O1, T>(fct: ObservableInput<(req: [R1, R2, R3], opt:[O1?]) => ReactComponent<T>>): (req: [R1, R2, R3], opt:[O1?]) => ReactComponent<T>;
  <R1, R2, R3, O1, O2, T>(fct: ObservableInput<(req: [R1, R2, R3], opt:[O1?, O2?]) => ReactComponent<T>>): (req: [R1, R2, R3], opt:[O1?, O2?]) => ReactComponent<T>;
  // four required and optional dependencies
  <R1, R2, R3, R4, O1, T>(fct: ObservableInput<(req: [R1, R2, R3, R4], opt:[O1?]) => ReactComponent<T>>): (req: [R1, R2, R3, R4], opt:[O1?]) => ReactComponent<T>;
  // five required and optional dependencies
  <R1, R2, R3, R4, R5, O1, T>(fct: ObservableInput<(req: [R1, R2, R3, R4, R5], opt:[O1?]) => ReactComponent<T>>): (req: [R1, R2, R3, R4, R5], opt:[O1?]) => ReactComponent<T>;
  // six required and optional dependencies
  <R1, R2, R3, R4, R5, R6, O1, T>(fct: ObservableInput<(req: [R1, R2, R3, R4, R5, R6], opt:[O1?]) => ReactComponent<T>>): (req: [R1, R2, R3, R4, R5, R6], opt:[O1?]) => ReactComponent<T>;
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
