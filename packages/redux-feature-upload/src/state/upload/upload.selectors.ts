import { UnaryFunction } from 'rxjs';

import { UploadingProgress, UploadingState } from './upload.state';

/**
 * Detects if an upload for a particular ID is in progress.
 *
 * @param aId - the ID to check
 * @returns a selector on the uploading state
 */
export const selectIsUploading = (
  aId: string
): UnaryFunction<UploadingState, boolean> => state => !!state[aId];

/**
 * Selects the upload progress for a particular ID.
 *
 * @returns selector for the upload progress
 */
export const selectUploadProgress = (
  aId: string
): UnaryFunction<UploadingState, UploadingProgress> => state => state[aId];

export function computeUploadProgressInPercent(
  uploadingProgress: UploadingProgress
) {
  if (
    uploadingProgress &&
    uploadingProgress.loaded &&
    uploadingProgress.total
  ) {
    if (uploadingProgress.loaded > 0 && uploadingProgress.total > 0) {
      return Math.ceil(
        (uploadingProgress.loaded / uploadingProgress.total) * 100
      );
    } else {
      // fallback to 0 (initial state)
      return 0;
    }
  } else {
    // error
    return -1;
  }
}
