import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_AUTHORING_TYPE = 'ACTION_REQUEST_AUTHORING_TYPE';
export type RequestAuthoringTypeAction = Action;

export const requestAuthoringTypeAction: Generator<
  RequestAuthoringTypeAction
> = createAction(ACTION_REQUEST_AUTHORING_TYPE);
