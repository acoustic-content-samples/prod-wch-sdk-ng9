import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_WCH_CONFIG = 'ACTION_REQUEST_WCH_CONFIG';
export type RequestWchConfigAction = Action;

export const requestWchConfigAction: Generator<
  RequestWchConfigAction
> = createAction(ACTION_REQUEST_WCH_CONFIG);
