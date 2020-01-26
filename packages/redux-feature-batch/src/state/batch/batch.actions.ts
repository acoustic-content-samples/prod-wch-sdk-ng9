import { AuthoringAsset } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_GUARANTEE_AUTH_CONTENT_BATCH =
  'ACTION_GUARANTEE_AUTH_CONTENT_BATCH';
export type GuaranteeAuthoringContentBatchAction = PayloadAction<
  string | string[]
>;

/**
 * Makes sure to preload items as fast as possible
 */
export const guaranteeAuthoringContentBatchAction: UnaryFunction<
  string | string[],
  GuaranteeAuthoringContentBatchAction
> = createAction(ACTION_GUARANTEE_AUTH_CONTENT_BATCH);

export const ACTION_CREATE_ASSET_REPLACE_REFERENCE =
  'ACTION_CREATE_ASSET_REPLACE_REFERENCE';
export interface CreateAssetAndReplaceReferencePayload {
  /**
   * The content item to update.
   */
  contentItemId: string;
  /**
   * The id of the asset to create. Typcially
   * this is an auto generated ID on the client side.
   */
  assetId: string;
  /**
   * The file to upload.
   */
  file: File;
  /**
   * The accessor string (e.g. elements.image.id) that points to the content property that needs to be updated with the asset id.
   */
  accessor: string;
  /**
   * Optionally an asset that is used as a baseline. The action will copy
   * the relevant metadata from this asset.
   */
  asset?: AuthoringAsset;
}
export type CreateAssetAndReplaceReferenceAction = PayloadAction<
  CreateAssetAndReplaceReferencePayload
>;

/**
 * Implementation of an action that creates an asset for the provided {@link File} and replaces
 * the asset reference in the content item with the provided id.
 *
 * @param payload - the {@link CreateAssetAndReplaceReferencePayload}
 */
export const createAssetAndReplaceReferenceAction: UnaryFunction<
  CreateAssetAndReplaceReferencePayload,
  CreateAssetAndReplaceReferenceAction
> = createAction(ACTION_CREATE_ASSET_REPLACE_REFERENCE);
