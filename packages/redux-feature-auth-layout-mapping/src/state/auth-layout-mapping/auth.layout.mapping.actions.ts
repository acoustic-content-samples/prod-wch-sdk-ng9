import { AuthoringLayoutMapping } from '@acoustic-content-sdk/api';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { PayloadAction } from '@acoustic-content-sdk/redux-store';

export const ACTION_ADD_AUTH_LAYOUT_MAPPING = 'ACTION_ADD_AUTH_LAYOUT_MAPPING';
export type AddAuthoringLayoutMappingAction = PayloadAction<
  AuthoringLayoutMapping
>;

export const addAuthoringLayoutMappingAction: UnaryFunction<
  AuthoringLayoutMapping,
  AddAuthoringLayoutMappingAction
> = createAction(ACTION_ADD_AUTH_LAYOUT_MAPPING);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_AUTH_LAYOUT_MAPPING = 'ACTION_SET_AUTH_LAYOUT_MAPPING';
export type SetAuthoringLayoutMappingAction = PayloadAction<
  AuthoringLayoutMapping
>;

export const setAuthoringLayoutMappingAction: UnaryFunction<
  AuthoringLayoutMapping,
  SetAuthoringLayoutMappingAction
> = createAction(ACTION_SET_AUTH_LAYOUT_MAPPING);

export const ACTION_LOAD_AUTH_LAYOUT_MAPPING =
  'ACTION_LOAD_AUTH_LAYOUT_MAPPING';
export type LoadAuthoringLayoutMappingAction = PayloadAction<string>;

export const loadAuthoringLayoutMappingAction: UnaryFunction<
  string,
  LoadAuthoringLayoutMappingAction
> = createAction(ACTION_LOAD_AUTH_LAYOUT_MAPPING);

export const ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING =
  'ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING';
export type GuaranteeAuthoringLayoutMappingAction = PayloadAction<string>;

export const guaranteeAuthoringLayoutMappingAction: UnaryFunction<
  string,
  GuaranteeAuthoringLayoutMappingAction
> = createAction(ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING);

export const ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING_BY_TYPE =
  'ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING_BY_TYPE';
export type GuaranteeAuthoringLayoutMappingByTypeAction = PayloadAction<string>;

export const guaranteeAuthoringLayoutMappingByTypeAction: UnaryFunction<
  string,
  GuaranteeAuthoringLayoutMappingByTypeAction
> = createAction(ACTION_GUARANTEE_AUTH_LAYOUT_MAPPING_BY_TYPE);

export const ACTION_ADD_AUTH_LAYOUT_MAPPING_IF_NONEXISTENT =
  'ACTION_ADD_AUTH_LAYOUT_MAPPING_IF_NONEXISTENT';
export type AddAuthoringLayoutMappingIfNonExistentAction = AddAuthoringLayoutMappingAction;

/**
 * Adds this content item to the store only if the item does not exist, yet. If the item
 * does not exist, this triggers a {@link addAuthoringLayoutMappingAction}.
 *
 * @param aItem - the content item to add
 * @returns the action
 */
export const addAuthoringLayoutMappingIfNonExistentAction: UnaryFunction<
  AuthoringLayoutMapping,
  AddAuthoringLayoutMappingIfNonExistentAction
> = createAction(ACTION_ADD_AUTH_LAYOUT_MAPPING_IF_NONEXISTENT);
