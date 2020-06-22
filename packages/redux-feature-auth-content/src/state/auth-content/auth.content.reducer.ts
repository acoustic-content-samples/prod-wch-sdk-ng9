import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  getDeliveryId,
  updateItemsWithRevision,
  keyById
} from '@acoustic-content-sdk/redux-utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_ADD_AUTH_CONTENT,
  ACTION_REMOVE_AUTH_CONTENT,
  ACTION_SET_AUTH_CONTENT,
  AddAuthoringContentAction,
  AuthoringContentActions,
  AuthoringContentActionsPayload,
  RemoveAuthoringContentAction,
  SetAuthoringContentAction,
  UpdateAuthoringContentAction,
  ACTION_UPDATE_AUTH_CONTENT
} from './auth.content.actions';
import { AuthoringContentState } from './auth.content.state';

const DEFAULT_STATE: AuthoringContentState = {};

const setContentItem = (
  state: AuthoringContentState,
  action: AddAuthoringContentAction | SetAuthoringContentAction
): AuthoringContentState =>
  updateItemsWithRevision(state, selectPayload(action));

const updateContentItem = (
  state: AuthoringContentState,
  action: UpdateAuthoringContentAction
): AuthoringContentState => {
  const item = selectPayload(action);
  const key = keyById(item);
  return {
    ...state,
    [key]: item
  };
};

function removeContentItem(
  state: AuthoringContentState,
  action: RemoveAuthoringContentAction
): AuthoringContentState {
  // select the payload
  const id = getDeliveryId(selectPayload(action));
  // remove from the set
  const { [id]: old, ...copy } = state;
  // remove
  return copy;
}

/**
 * reducers for authoring content
 */
export const authoringContentReducer: Reducer<
  AuthoringContentState,
  AuthoringContentActions
> = handleActions<AuthoringContentState, AuthoringContentActionsPayload>(
  {
    [ACTION_UPDATE_AUTH_CONTENT]: updateContentItem,
    [ACTION_ADD_AUTH_CONTENT]: setContentItem,
    [ACTION_SET_AUTH_CONTENT]: setContentItem,
    [ACTION_REMOVE_AUTH_CONTENT]: removeContentItem
  },
  DEFAULT_STATE
);
