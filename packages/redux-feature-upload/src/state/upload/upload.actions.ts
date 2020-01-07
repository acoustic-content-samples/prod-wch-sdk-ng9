import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { UploadingProgress } from './upload.state';

export const ACTION_UPLOADING_START = 'ACTION_UPLOADING_START';

export interface UploadingStartActionPayload {
  id: string;
  fileName: string;
}

export type UploadingStartAction = PayloadAction<UploadingStartActionPayload>;

export const uploadingStartAction: UnaryFunction<
  UploadingStartActionPayload,
  UploadingStartAction
> = createAction(ACTION_UPLOADING_START);

export const ACTION_UPLOADING_END = 'ACTION_UPLOADING_END';
export type UploadingEndAction = PayloadAction<string>;

export const uploadingEndAction: UnaryFunction<
  string,
  UploadingEndAction
> = createAction(ACTION_UPLOADING_END);

export const ACTION_UPLOADING_PROGRESS = 'ACTION_UPLOADING_PROGRESS';

export interface UploadingProgressActionPayload {
  id: string;
  progress: UploadingProgress;
}

export type UploadingProgressAction = PayloadAction<
  UploadingProgressActionPayload
>;

export const uploadingProgressAction: UnaryFunction<
  UploadingProgressActionPayload,
  UploadingProgressAction
> = createAction(ACTION_UPLOADING_PROGRESS);

export type UploadActions =
  | UploadingStartAction
  | UploadingProgressAction
  | UploadingEndAction;

export type UploadActionsPayload =
  | UploadingStartActionPayload
  | UploadingProgressActionPayload
  | string;
