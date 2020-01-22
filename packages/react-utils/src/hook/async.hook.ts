import { Generator } from '@acoustic-content-sdk/utils';
import { useEffect, useState } from 'react';
import { from, ObservableInput } from 'rxjs';

/**
 * React hook to subscribe to an observable and to automatically unsubscribe via an effect.
 *
 * @param aIn - the input, can be an observable or a promise
 * @param aInitialState - optionally the initial state
 *
 * @returns the subscribed value, may be undefined
 */
export const useAsync: <T>(
  aIn: ObservableInput<T>,
  aInitialState?: T | Generator<T>
) => T | undefined = <T>(
  aIn: ObservableInput<T>,
  aInitialState?: T | Generator<T>
) => {
  /**
   * Maintain the state
   */
  const [state, setState] = useState<T>(aInitialState);

  /**
   * Update the state whenever the input changes
   */
  useEffect(() => {
    const sub = from(aIn).subscribe(setState);
    return () => sub.unsubscribe();
  }, [aIn]);

  /**
   * Returns the decoded state
   */
  return state;
};
