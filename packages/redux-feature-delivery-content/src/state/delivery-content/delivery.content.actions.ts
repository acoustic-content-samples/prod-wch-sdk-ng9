import {
  AuthoringAsset,
  AuthoringContentItem,
  AuthoringLayoutItem,
  AuthoringType,
  ContentItemWithLayout
} from '@acoustic-content-sdk/api';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { PayloadAction } from '@acoustic-content-sdk/redux-store';

export const ACTION_ADD_DELIVERY_CONTENT = 'ACTION_ADD_DELIVERY_CONTENT';
export type AddDeliveryContentAction = PayloadAction<ContentItemWithLayout>;

export const addDeliveryContentAction: UnaryFunction<
  ContentItemWithLayout,
  AddDeliveryContentAction
> = createAction(ACTION_ADD_DELIVERY_CONTENT);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_DELIVERY_CONTENT = 'ACTION_SET_DELIVERY_CONTENT';
export type SetDeliveryContentAction = PayloadAction<ContentItemWithLayout>;

export const setDeliveryContentAction: UnaryFunction<
  ContentItemWithLayout,
  SetDeliveryContentAction
> = createAction(ACTION_SET_DELIVERY_CONTENT);

export const ACTION_RESOLVE_CONTENT_ITEM = 'ACTION_RESOLVE_CONTENT_ITEM';

export interface ResolveContentItemPayload {
  contentItem: AuthoringContentItem;
  contentTypes: Record<string, AuthoringType>;
  assets: Record<string, AuthoringAsset>;
  layouts: Record<string, AuthoringLayoutItem>;
  apiURL: URL;
}

export type ResolveContentItemAction = PayloadAction<ResolveContentItemPayload>;

export const resolveContentItemAction: UnaryFunction<
  ResolveContentItemPayload,
  ResolveContentItemAction
> = createAction(ACTION_RESOLVE_CONTENT_ITEM);

export const ACTION_ADD_DELIVERY_CONTENT_IF_NONEXISTENT =
  'ACTION_ADD_DELIVERY_CONTENT_IF_NONEXISTENT';
export type AddDeliveryContentIfNonExistentAction = AddDeliveryContentAction;

/**
 * Adds this content item to the store only if the item does not exist, yet. If the item
 * does not exist, this triggers a {@link addDeliveryContentAction}.
 *
 * @param aItem - the content item to add
 * @returns the action
 */
export const addDeliveryContentIfNonExistentAction: UnaryFunction<
  ContentItemWithLayout,
  AddDeliveryContentIfNonExistentAction
> = createAction(ACTION_ADD_DELIVERY_CONTENT_IF_NONEXISTENT);
