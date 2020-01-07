import { AuthoringAsset, AuthoringContentItem } from '@acoustic-content-sdk/api';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { PayloadAction } from '@acoustic-content-sdk/redux-store';

export type AuthoringSaveItem = AuthoringContentItem | AuthoringAsset | string;
export type AuthoringSaveBatchItems = AuthoringSaveItem[];

export const ACTION_SAVE_AUTH_BATCH = 'ACTION_SAVE_AUTH_BATCH';
export type SaveAuthoringBatchAction = PayloadAction<AuthoringSaveBatchItems>;

export const saveAuthoringBatchAction: UnaryFunction<
  AuthoringSaveBatchItems,
  SaveAuthoringBatchAction
> = createAction(ACTION_SAVE_AUTH_BATCH);

export const ACTION_SAVE_AUTH_BATCH_INTERNAL =
  'ACTION_SAVE_AUTH_BATCH_INTERNAL';
export type SaveAuthoringBatchInternalAction = PayloadAction<
  AuthoringSaveBatchItems
>;

export const saveAuthoringBatchInternalAction: UnaryFunction<
  AuthoringSaveBatchItems,
  SaveAuthoringBatchInternalAction
> = createAction(ACTION_SAVE_AUTH_BATCH_INTERNAL);

export const ACTION_SAVE_START = 'ACTION_SAVE_START';
export type SaveStartAction = PayloadAction<AuthoringSaveBatchItems>;

export const saveStartAction: UnaryFunction<
  AuthoringSaveBatchItems,
  SaveStartAction
> = createAction(ACTION_SAVE_START);

export const ACTION_SAVE_END = 'ACTION_SAVE_END';
export type SaveEndAction = PayloadAction<AuthoringSaveBatchItems>;

export const saveEndAction: UnaryFunction<
  AuthoringSaveBatchItems,
  SaveEndAction
> = createAction(ACTION_SAVE_END);
