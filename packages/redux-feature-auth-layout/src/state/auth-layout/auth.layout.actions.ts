import { AuthoringLayoutItem } from '@acoustic-content-sdk/api';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { PayloadAction } from '@acoustic-content-sdk/redux-store';

export const ACTION_ADD_AUTH_LAYOUT = 'ACTION_ADD_AUTH_LAYOUT';
export type AddAuthoringLayoutAction = PayloadAction<AuthoringLayoutItem>;

export const addAuthoringLayoutAction: UnaryFunction<
  AuthoringLayoutItem,
  AddAuthoringLayoutAction
> = createAction(ACTION_ADD_AUTH_LAYOUT);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_AUTH_LAYOUT = 'ACTION_SET_AUTH_LAYOUT';
export type SetAuthoringLayoutAction = PayloadAction<AuthoringLayoutItem>;

export const setAuthoringLayoutAction: UnaryFunction<
  AuthoringLayoutItem,
  SetAuthoringLayoutAction
> = createAction(ACTION_SET_AUTH_LAYOUT);

export const ACTION_LOAD_AUTH_LAYOUT = 'ACTION_LOAD_AUTH_LAYOUT';
export type LoadAuthoringLayoutAction = PayloadAction<string>;

export const loadAuthoringLayoutAction: UnaryFunction<
  string,
  LoadAuthoringLayoutAction
> = createAction(ACTION_LOAD_AUTH_LAYOUT);

export const ACTION_GUARANTEE_AUTH_LAYOUT = 'ACTION_GUARANTEE_AUTH_LAYOUT';
export type GuaranteeAuthoringLayoutAction = PayloadAction<string>;

export const guaranteeAuthoringLayoutAction: UnaryFunction<
  string,
  GuaranteeAuthoringLayoutAction
> = createAction(ACTION_GUARANTEE_AUTH_LAYOUT);

export const ACTION_ADD_AUTH_LAYOUT_IF_NONEXISTENT =
  'ACTION_ADD_AUTH_LAYOUT_IF_NONEXISTENT';
export type AddAuthoringLayoutIfNonExistentAction = AddAuthoringLayoutAction;

/**
 * Adds this content item to the store only if the item does not exist, yet. If the item
 * does not exist, this triggers a {@link addAuthoringLayoutAction}.
 *
 * @param aItem - the content item to add
 * @returns the action
 */
export const addAuthoringLayoutIfNonExistentAction: UnaryFunction<
  AuthoringLayoutItem,
  AddAuthoringLayoutIfNonExistentAction
> = createAction(ACTION_ADD_AUTH_LAYOUT_IF_NONEXISTENT);
