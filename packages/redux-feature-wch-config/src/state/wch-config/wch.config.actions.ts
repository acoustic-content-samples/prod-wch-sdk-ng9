import { WchConfig } from '@acoustic-content-sdk/edit-api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_LOAD_ACOUSTIC_CONFIG = 'ACTION_LOAD_ACOUSTIC_CONFIG';
export interface LoadWchConfigAction extends Action {}

export const ACTION_SET_ACOUSTIC_CONFIG = 'ACTION_SET_ACOUSTIC_CONFIG';
export type SetWchConfigAction = PayloadAction<WchConfig>;

export const ACTION_CLEAR_ACOUSTIC_CONFIG = 'ACTION_CLEAR_ACOUSTIC_CONFIG';
export type ClearWchConfigAction = Action;

export const loadWchConfigAction: Generator<LoadWchConfigAction> = createAction(
  ACTION_LOAD_ACOUSTIC_CONFIG
);

export const clearWchConfigAction: Generator<ClearWchConfigAction> = createAction(
  ACTION_CLEAR_ACOUSTIC_CONFIG
);

export const setWchConfigAction: UnaryFunction<
  WchConfig,
  SetWchConfigAction
> = createAction(ACTION_SET_ACOUSTIC_CONFIG);
