import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_AUTHORING_CONTENT =
  'ACTION_REQUEST_AUTHORING_CONTENT';
export type RequestAuthoringContentAction = Action;

export const requestAuthoringContentAction: Generator<
  RequestAuthoringContentAction
> = createAction(ACTION_REQUEST_AUTHORING_CONTENT);
