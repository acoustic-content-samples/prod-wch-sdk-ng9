import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Generator, rxPipe } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { of, OperatorFunction, EMPTY } from 'rxjs';
import { catchError, delay, switchMapTo } from 'rxjs/operators';

import { ErrorInstance } from './error.state';

export const ACTION_SET_ERROR = 'ACTION_SET_ERROR';
export type SetErrorAction<T> = PayloadAction<ErrorInstance<T>>;

export const ACTION_CLEAR_ERROR = 'ACTION_CLEAR_ERROR';
export type ClearErrorAction = Action;

/** the action to set an error */
const errorAction = createAction(ACTION_SET_ERROR);

/**
 * Constructs an action that reports an error
 *
 * @param error - the error instance
 * @returns the action, augmented with the timestamp the error occurred
 */
export const setErrorAction: <T>(aError: T) => SetErrorAction<T> = (error) =>
  errorAction({ date: Date.now(), error });

export const clearErrorAction: Generator<ClearErrorAction> = createAction(
  ACTION_CLEAR_ERROR
);

export const ACTION_CLEAR_ERRORS = 'ACTION_CLEAR_ERRORS';
export type ClearErrorsAction = Action;

export const clearErrorsAction: Generator<ClearErrorsAction> = createAction(
  ACTION_CLEAR_ERRORS
);

/**
 * Operator shortcut to catch errors and to convert them into error actions
 */
export const opSetErrorAction: OperatorFunction<
  any,
  SetErrorAction<any>
> = catchError((error) => {
  if (error?.name === 'EmptyError') {
    console.error(error);
    return EMPTY;
  }
  return of(setErrorAction(error));
});

/**
 * Side effect to periodically cleanup the last error
 */
const cleanupErrorEpic: Epic = (actions$, state$) =>
  rxPipe(
    actions$,
    ofType(ACTION_SET_ERROR),
    // cleanup 5s after the last error
    switchMapTo(rxPipe(of(clearErrorAction()), delay(5000)))
  );

export const errorEpic: Epic = combineEpics(cleanupErrorEpic);
