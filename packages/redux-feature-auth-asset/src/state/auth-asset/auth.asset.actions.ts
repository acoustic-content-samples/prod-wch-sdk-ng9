import { AuthoringAsset } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_ADD_AUTH_ASSET = 'ACTION_ADD_AUTH_ASSET';
export type AddAuthoringAssetAction = PayloadAction<AuthoringAsset>;

export const addAuthoringAssetAction: UnaryFunction<
  AuthoringAsset,
  AddAuthoringAssetAction
> = createAction(ACTION_ADD_AUTH_ASSET);

/**
 * Do not add a side effect to this action
 */
export const ACTION_SET_AUTH_ASSET = 'ACTION_SET_AUTH_ASSET';
export type SetAuthoringAssetAction = PayloadAction<AuthoringAsset>;

export const setAuthoringAssetAction: UnaryFunction<
  AuthoringAsset,
  SetAuthoringAssetAction
> = createAction(ACTION_SET_AUTH_ASSET);

export const ACTION_LOAD_AUTH_ASSET = 'ACTION_LOAD_AUTH_ASSET';
export type LoadAuthoringAssetAction = PayloadAction<string>;

export const loadAuthoringAssetAction: UnaryFunction<
  string,
  LoadAuthoringAssetAction
> = createAction(ACTION_LOAD_AUTH_ASSET);

export const ACTION_GUARANTEE_AUTH_ASSET = 'ACTION_GUARANTEE_AUTH_ASSET';
export type GuaranteeAuthoringAssetAction = PayloadAction<string>;

export const guaranteeAuthoringAssetAction: UnaryFunction<
  string,
  GuaranteeAuthoringAssetAction
> = createAction(ACTION_GUARANTEE_AUTH_ASSET);

export const ACTION_ADD_AUTH_ASSET_IF_NONEXISTENT =
  'ACTION_ADD_AUTH_ASSET_IF_NONEXISTENT';
export type AddAuthoringAssetIfNonExistentAction = AddAuthoringAssetAction;

/**
 * Adds this content item to the store only if the item does not exist, yet. If the item
 * does not exist, this triggers a {@link addAuthoringAssetAction}.
 *
 * @param aItem - the content item to add
 * @returns the action
 */
export const addAuthoringAssetIfNonExistentAction: UnaryFunction<
  AuthoringAsset,
  AddAuthoringAssetIfNonExistentAction
> = createAction(ACTION_ADD_AUTH_ASSET_IF_NONEXISTENT);
