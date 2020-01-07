import { DraftStatus, RenderingContext } from '@acoustic-content-sdk/api';

import { isNotNil } from '../predicates/predicates';

export enum ItemStatus {
  DRAFT,
  APPROVED_DRAFT,
  PENDING_DRAFT,
  PUBLISHED
}

/**
 * Decodes the item status from the rendering context. This can e.g. be used to display
 * status icons
 *
 * @param aRenderingContext - the rendering context
 *
 * @returns the item status
 */
export function getItemStatus(aRenderingContext: RenderingContext): ItemStatus {
  // decode some infos
  const { draftId, draftStatus, projectId } = aRenderingContext;
  // handle the cases
  const isDraft = isNotNil(draftId) && isNotNil(draftStatus);
  const hasProject = isNotNil(projectId);
  // test the project case
  if (hasProject && isDraft) {
    return ItemStatus.PENDING_DRAFT;
  }
  // check the non project case
  if (isDraft) {
    switch (draftStatus) {
      case DraftStatus.IN_PROGRESS:
      case DraftStatus.IN_REVIEW:
        return ItemStatus.DRAFT;
      case DraftStatus.APPROVED:
        return ItemStatus.APPROVED_DRAFT;
      default:
        // should not happen
        return ItemStatus.DRAFT;
    }
  }
  // if not a draft, assume published
  return ItemStatus.PUBLISHED;
}
