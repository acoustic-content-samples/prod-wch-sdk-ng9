import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_URL_CONFIG = 'ACTION_REQUEST_URL_CONFIG';
export type RequestUrlConfigAction = Action;

export const requestUrlConfigAction: Generator<
  RequestUrlConfigAction
> = createAction(ACTION_REQUEST_URL_CONFIG);
