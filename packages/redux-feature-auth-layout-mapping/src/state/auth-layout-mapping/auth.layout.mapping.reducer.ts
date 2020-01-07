import { AuthoringLayoutMapping } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  selectByDeliveryId,
  updateItemsWithRevision
} from '@acoustic-content-sdk/redux-utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import {
  ACTION_ADD_AUTH_LAYOUT_MAPPING,
  ACTION_SET_AUTH_LAYOUT_MAPPING,
  AddAuthoringLayoutMappingAction,
  SetAuthoringLayoutMappingAction
} from './auth.layout.mapping.actions';
import { AuthoringLayoutMappingState } from './auth.layout.mapping.state';

const DEFAULT_STATE: AuthoringLayoutMappingState = {};

export const selectAuthoringLayoutMapping: UnaryFunction<
  string,
  UnaryFunction<AuthoringLayoutMappingState, AuthoringLayoutMapping>
> = id => selectByDeliveryId(id);

const setLayoutMapping = (
  state: AuthoringLayoutMappingState,
  action: AddAuthoringLayoutMappingAction | SetAuthoringLayoutMappingAction
): AuthoringLayoutMappingState =>
  updateItemsWithRevision(state, selectPayload(action));

/**
 * reducers for authoring content
 */
export const authoringLayoutMappingReducer: Reducer<
  AuthoringLayoutMappingState,
  AddAuthoringLayoutMappingAction | SetAuthoringLayoutMappingAction
> = handleActions(
  {
    [ACTION_ADD_AUTH_LAYOUT_MAPPING]: setLayoutMapping,
    [ACTION_SET_AUTH_LAYOUT_MAPPING]: setLayoutMapping
  },
  DEFAULT_STATE
);
