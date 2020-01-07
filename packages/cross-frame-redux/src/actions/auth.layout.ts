import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_AUTHORING_LAYOUT =
  'ACTION_REQUEST_AUTHORING_LAYOUT';
export type RequestAuthoringLayoutAction = Action;

export const requestAuthoringLayoutAction: Generator<
  RequestAuthoringLayoutAction
> = createAction(ACTION_REQUEST_AUTHORING_LAYOUT);
