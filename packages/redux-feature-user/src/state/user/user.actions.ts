import { User } from '@acoustic-content-sdk/api';
import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { PayloadAction } from '@acoustic-content-sdk/redux-store';

export const ACTION_LOAD_CURRENT_USER = 'ACTION_LOAD_CURRENT_USER';
export type LoadCurrentUserAction = Action;

export const ACTION_SET_CURRENT_USER = 'ACTION_SET_CURRENT_USER';
export type SetCurrentUserAction = PayloadAction<User>;

export const ACTION_CLEAR_CURRENT_USER = 'ACTION_CLEAR_CURRENT_USER';
export type ClearCurrentUserAction = Action;

export const loadCurrentUserAction: Generator<LoadCurrentUserAction> = createAction(
  ACTION_LOAD_CURRENT_USER
);

export const clearCurrentUserAction: Generator<ClearCurrentUserAction> = createAction(
  ACTION_CLEAR_CURRENT_USER
);

export const setCurrentUserAction: UnaryFunction<
  User,
  SetCurrentUserAction
> = createAction(ACTION_SET_CURRENT_USER);
