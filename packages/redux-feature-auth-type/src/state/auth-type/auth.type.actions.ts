import { AuthoringType } from '@acoustic-content-sdk/api';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { PayloadAction } from '@acoustic-content-sdk/redux-store';

export const ACTION_ADD_AUTH_CONTENT_TYPE = 'ACTION_ADD_AUTH_CONTENT_TYPE';
export type AddAuthoringContentTypeAction = PayloadAction<AuthoringType>;

export const addAuthoringContentTypeAction: UnaryFunction<
  AuthoringType,
  AddAuthoringContentTypeAction
> = createAction(ACTION_ADD_AUTH_CONTENT_TYPE);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_AUTH_CONTENT_TYPE = 'ACTION_SET_AUTH_CONTENT_TYPE';
export type SetAuthoringContentTypeAction = PayloadAction<AuthoringType>;

export const setAuthoringContentTypeAction: UnaryFunction<
  AuthoringType,
  SetAuthoringContentTypeAction
> = createAction(ACTION_SET_AUTH_CONTENT_TYPE);

export const ACTION_LOAD_AUTH_CONTENT_TYPE = 'ACTION_LOAD_AUTH_CONTENT_TYPE';
export type LoadAuthoringContentTypeAction = PayloadAction<string>;

export const loadAuthoringContentTypeAction: UnaryFunction<
  string,
  LoadAuthoringContentTypeAction
> = createAction(ACTION_LOAD_AUTH_CONTENT_TYPE);

export const ACTION_GUARANTEE_AUTH_CONTENT_TYPE =
  'ACTION_GUARANTEE_AUTH_CONTENT_TYPE';
export type GuaranteeAuthoringContentTypeAction = PayloadAction<string>;

/**
 * Loads the content type if it does not exist. If the type does not exist, this triggers a {@link loadAuthoringContentTypeAction}.
 *
 * @param aId - the ID of the type to load
 * @returns the action
 */
export const guaranteeAuthoringContentTypeAction: UnaryFunction<
  string,
  GuaranteeAuthoringContentTypeAction
> = createAction(ACTION_GUARANTEE_AUTH_CONTENT_TYPE);

export const ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT =
  'ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT';
export type AddAuthoringContentTypeIfNonExistentAction = AddAuthoringContentTypeAction;

/**
 * Adds this content type to the store only if the type does not exist, yet. If the type
 * does not exist, this triggers a {@link addAuthoringContentTypeAction}.
 *
 * @param aType - the content type to add
 * @returns the action
 */
export const addAuthoringContentTypeIfNonExistentAction: UnaryFunction<
  AuthoringType,
  AddAuthoringContentTypeIfNonExistentAction
> = createAction(ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT);
