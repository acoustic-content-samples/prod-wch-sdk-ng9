import { Epic, ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Constructs an epic that convers an `ADD` action to a `SET` action
 *
 * @param aAddAction - the add action string
 * @param aSetAction - the set action string
 *
 * @returns the epic
 */
export const addToSetEpic = <T>(aAddAction: string, aSetAction: string): Epic =>
  pipe(
    // listen for the `ADD` type
    ofType(aAddAction),
    // map to the `SET` type
    map((src) => ({
      ...src,
      type: aSetAction
    }))
  );
