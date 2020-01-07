import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_LOADING_START = 'ACTION_LOADING_START';
export type LoadingStartAction = PayloadAction<string>;

export const loadingStartAction: UnaryFunction<
  string,
  LoadingStartAction
> = createAction(ACTION_LOADING_START);

export const ACTION_LOADING_END = 'ACTION_LOADING_END';
export type LoadingEndAction = PayloadAction<string>;

export const loadingEndAction: UnaryFunction<
  string,
  LoadingEndAction
> = createAction(ACTION_LOADING_END);
