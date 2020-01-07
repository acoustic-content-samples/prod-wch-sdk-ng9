import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { UploadingFeatureState } from './upload.feature';
import { UPLOADING_FEATURE } from './upload.id';
import { uploadingReducer } from './upload.reducer';
import { UploadingState } from './upload.state';

/**
 * Exposes the feature module selector
 */
export const uploadingFeature = createReduxFeatureModule<
  UploadingState,
  UploadingFeatureState
>(UPLOADING_FEATURE, uploadingReducer);
