import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_REQUEST_AUTHORING_LAYOUT_MAPPING =
  'ACTION_REQUEST_AUTHORING_LAYOUT_MAPPING';
export type RequestAuthoringLayoutMappingAction = Action;

export const requestAuthoringLayoutMappingAction: Generator<
  RequestAuthoringLayoutMappingAction
> = createAction(ACTION_REQUEST_AUTHORING_LAYOUT_MAPPING);
