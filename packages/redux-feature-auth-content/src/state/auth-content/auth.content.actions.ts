import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export type AuthoringContentSaveItem = AuthoringContentItem | string;
export type AuthoringContentBatchItems = AuthoringContentSaveItem[];

export const ACTION_ADD_AUTH_CONTENT = 'ACTION_ADD_AUTH_CONTENT';
export type AddAuthoringContentAction = PayloadAction<AuthoringContentItem>;

export const ACTION_SAVE_AUTH_CONTENT_BATCH = 'ACTION_SAVE_AUTH_CONTENT_BATCH';
export type SaveAuthoringContentBatchAction = PayloadAction<
  AuthoringContentBatchItems
>;

export const saveAuthoringContentBatchAction: UnaryFunction<
  AuthoringContentBatchItems,
  SaveAuthoringContentBatchAction
> = createAction(ACTION_SAVE_AUTH_CONTENT_BATCH);

export const addAuthoringContentAction: UnaryFunction<
  AuthoringContentItem,
  AddAuthoringContentAction
> = createAction(ACTION_ADD_AUTH_CONTENT);

export const ACTION_REMOVE_AUTH_CONTENT = 'ACTION_REMOVE_AUTH_CONTENT';
export type RemoveAuthoringContentAction = PayloadAction<string>;

export const removeAuthoringContentAction: UnaryFunction<
  string,
  RemoveAuthoringContentAction
> = createAction(ACTION_REMOVE_AUTH_CONTENT);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_AUTH_CONTENT = 'ACTION_SET_AUTH_CONTENT';
export type SetAuthoringContentAction = PayloadAction<AuthoringContentItem>;

export const setAuthoringContentAction: UnaryFunction<
  AuthoringContentItem,
  SetAuthoringContentAction
> = createAction(ACTION_SET_AUTH_CONTENT);

export const ACTION_LOAD_AUTH_CONTENT = 'ACTION_LOAD_AUTH_CONTENT';
export type LoadAuthoringContentAction = PayloadAction<string>;

export const ACTION_SAVE_AUTH_CONTENT = 'ACTION_SAVE_AUTH_CONTENT';
export type SaveAuthoringContentAction = PayloadAction<
  AuthoringContentSaveItem
>;

export const ACTION_AUTH_CONTENT_PROPERTY_UPDATE =
  'ACTION_AUTH_CONTENT_PROPERTY_UPDATE';
export interface AuthContentPropertyUpdatePayload {
  id: string;
  accessor: AccessorType;
  value: any;
}
export type AuthContentPropertyUpdateAction = PayloadAction<
  AuthContentPropertyUpdatePayload
>;

const _authContentPropertyUpdateAction = createAction(
  ACTION_AUTH_CONTENT_PROPERTY_UPDATE
);
export const authContentPropertyUpdateAction = (
  id: string,
  accessor: AccessorType,
  value: any
): AuthContentPropertyUpdateAction =>
  _authContentPropertyUpdateAction({ id, accessor, value });

export const loadAuthoringContentAction: UnaryFunction<
  string,
  LoadAuthoringContentAction
> = createAction(ACTION_LOAD_AUTH_CONTENT);

export const saveAuthoringContentAction: UnaryFunction<
  AuthoringContentSaveItem,
  SaveAuthoringContentAction
> = createAction(ACTION_SAVE_AUTH_CONTENT);

export const ACTION_GUARANTEE_AUTH_CONTENT = 'ACTION_GUARANTEE_AUTH_CONTENT';
export type GuaranteeAuthoringContentAction = PayloadAction<string>;

/**
 * Loads the content item if it does not exist. If the item does not exist, this triggers a {@link loadAuthoringContentAction}.
 *
 * @param aId - the ID of the item to load
 * @returns the action
 */
export const guaranteeAuthoringContentAction: UnaryFunction<
  string,
  GuaranteeAuthoringContentAction
> = createAction(ACTION_GUARANTEE_AUTH_CONTENT);

export const ACTION_ADD_AUTH_CONTENT_IF_NONEXISTENT =
  'ACTION_ADD_AUTH_CONTENT_IF_NONEXISTENT';
export type AddAuthoringContentIfNonExistentAction = AddAuthoringContentAction;

/**
 * Adds this content item to the store only if the item does not exist, yet. If the item
 * does not exist, this triggers a {@link addAuthoringContentAction}.
 *
 * @param aItem - the content item to add
 * @returns the action
 */
export const addAuthoringContentIfNonExistentAction: UnaryFunction<
  AuthoringContentItem,
  AddAuthoringContentIfNonExistentAction
> = createAction(ACTION_ADD_AUTH_CONTENT_IF_NONEXISTENT);

export const ACTION_AUTH_CONTENT_EMBED_ITEM = 'ACTION_AUTH_CONTENT_EMBED_ITEM';
export interface AuthContentEmbedItemPayload {
  // ID of the element to embed into
  id: AuthoringContentItem | string;
  // target accessor
  accessor: AccessorType;
  // the item to actually embed
  item: AuthoringContentItem | string;
  // insert vs replace
  bInsert?: boolean;
}
export type AuthContentEmbedItemAction = PayloadAction<
  AuthContentEmbedItemPayload
>;

export const authContentEmbedItem: UnaryFunction<
  AuthContentEmbedItemPayload,
  AuthContentEmbedItemAction
> = createAction(ACTION_AUTH_CONTENT_EMBED_ITEM);

export type AuthoringContentActions =
  | AddAuthoringContentAction
  | SetAuthoringContentAction
  | RemoveAuthoringContentAction;

export type AuthoringContentActionsPayload = AuthoringContentItem | string;
