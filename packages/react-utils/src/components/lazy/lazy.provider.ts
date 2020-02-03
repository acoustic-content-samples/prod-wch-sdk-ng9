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
export type LazyComponentCreator = <R extends any[], O extends any[], T>(fct: ObservableInput<(req: R, opt: O) => CmpInput<T>>) => (req: R, opt: O) => CmpInput<T>;

/**
 * Creates a synchronous creator function for a React component
 * from an asynchronous function.
 *
 * @param fct - asynchronous function
 *
 * @returns a synchronous function
 */
export const createLazyComponent: LazyComponentCreator = internalLazyComponent as any;
