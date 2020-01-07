import { AuthoringLayoutItem } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  selectByDeliveryId,
  updateItemsWithRevision
} from '@acoustic-content-sdk/redux-utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import {
  ACTION_ADD_AUTH_LAYOUT,
  ACTION_SET_AUTH_LAYOUT,
  AddAuthoringLayoutAction,
  SetAuthoringLayoutAction
} from './auth.layout.actions';
import { AuthoringLayoutState } from './auth.layout.state';

const DEFAULT_STATE: AuthoringLayoutState = {};

export const selectAuthoringLayout: UnaryFunction<
  string,
  UnaryFunction<AuthoringLayoutState, AuthoringLayoutItem>
> = id => selectByDeliveryId(id);

const setLayout = (
  state: AuthoringLayoutState,
  action: AddAuthoringLayoutAction | SetAuthoringLayoutAction
): AuthoringLayoutState =>
  updateItemsWithRevision(state, selectPayload(action));

/**
 * reducers for authoring content
 */
export const authoringLayoutReducer: Reducer<
  AuthoringLayoutState,
  AddAuthoringLayoutAction | SetAuthoringLayoutAction
> = handleActions(
  {
    [ACTION_ADD_AUTH_LAYOUT]: setLayout,
    [ACTION_SET_AUTH_LAYOUT]: setLayout
  },
  DEFAULT_STATE
);
