import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { UPLOADING_FEATURE } from './upload.id';
import { uploadingReducer } from './upload.reducer';
import { UploadingState } from './upload.state';

export interface UploadingFeatureState {
  [UPLOADING_FEATURE]: UploadingState;
}

export const uploadingFeatureReducer = {
  [UPLOADING_FEATURE]: uploadingReducer
};
/**
 * Select the uploading feature
 */
export const selectUploadingFeature = selectFeature<UploadingState>(
  UPLOADING_FEATURE
);
