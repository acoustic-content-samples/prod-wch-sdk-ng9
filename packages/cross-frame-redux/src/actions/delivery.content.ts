import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_DELIVERY_CONTENT =
  'ACTION_REQUEST_DELIVERY_CONTENT';
export type RequestDeliveryContentAction = Action;

export const requestDeliveryContentAction: Generator<
  RequestDeliveryContentAction
> = createAction(ACTION_REQUEST_DELIVERY_CONTENT);
