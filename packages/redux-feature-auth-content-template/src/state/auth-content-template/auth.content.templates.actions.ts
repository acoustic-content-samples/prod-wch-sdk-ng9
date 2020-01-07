import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { addPrefix, PrefixedId } from './auth.content.templates.state';

export const ACTION_ADD_AUTH_CONTENT_TEMPLATE =
  'ACTION_ADD_AUTH_CONTENT_TEMPLATE';
export type AddAuthoringContentTemplateAction = PayloadAction<
  AuthoringContentItem
>;

export const addAuthoringContentTemplateAction: UnaryFunction<
  AuthoringContentItem,
  AddAuthoringContentTemplateAction
> = createAction(ACTION_ADD_AUTH_CONTENT_TEMPLATE);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_AUTH_CONTENT_TEMPLATE =
  'ACTION_SET_AUTH_CONTENT_TEMPLATE';
export type SetAuthoringContentTemplateAction = PayloadAction<
  AuthoringContentItem
>;

export const setAuthoringContentTemplateAction: UnaryFunction<
  AuthoringContentItem,
  SetAuthoringContentTemplateAction
> = createAction(ACTION_SET_AUTH_CONTENT_TEMPLATE);

export const ACTION_LOAD_AUTH_CONTENT_TEMPLATE =
  'ACTION_LOAD_AUTH_CONTENT_TEMPLATE';
export type LoadAuthoringContentTemplateAction = PayloadAction<PrefixedId>;

const internalLoadAuthoringContentTemplateAction: UnaryFunction<
  PrefixedId,
  LoadAuthoringContentTemplateAction
> = createAction(ACTION_LOAD_AUTH_CONTENT_TEMPLATE);

export const loadAuthoringContentTemplateAction: UnaryFunction<
  string,
  LoadAuthoringContentTemplateAction
> = (id) => internalLoadAuthoringContentTemplateAction(addPrefix(id));

export const ACTION_GUARANTEE_AUTH_CONTENT_TEMPLATE =
  'ACTION_GUARANTEE_AUTH_CONTENT_TEMPLATE';
export type GuaranteeAuthoringContentTemplateAction = PayloadAction<PrefixedId>;

/**
 * Loads the content type if it does not exist. If the type does not exist, this triggers a {@link loadAuthoringContentTemplateAction}.
 *
 * @param aId - the ID of the type to load
 * @returns the action
 */
const internalGuaranteeAuthoringContentTemplateAction: UnaryFunction<
  PrefixedId,
  GuaranteeAuthoringContentTemplateAction
> = createAction(ACTION_GUARANTEE_AUTH_CONTENT_TEMPLATE);

export const guaranteeAuthoringContentTemplateAction: UnaryFunction<
  string,
  GuaranteeAuthoringContentTemplateAction
> = (id) => internalGuaranteeAuthoringContentTemplateAction(addPrefix(id));

export const ACTION_ADD_AUTH_CONTENT_TEMPLATE_IF_NONEXISTENT =
  'ACTION_ADD_AUTH_CONTENT_TEMPLATE_IF_NONEXISTENT';
export type AddAuthoringContentTypeIfNonExistentAction = AddAuthoringContentTemplateAction;

/**
 * Adds this content type to the store only if the type does not exist, yet. If the type
 * does not exist, this triggers a {@link addAuthoringContentTemplateAction}.
 *
 * @param aType - the content type to add
 * @returns the action
 */
export const addAuthoringContentTypeIfNonExistentAction: UnaryFunction<
  AuthoringContentItem,
  AddAuthoringContentTypeIfNonExistentAction
> = createAction(ACTION_ADD_AUTH_CONTENT_TEMPLATE_IF_NONEXISTENT);
