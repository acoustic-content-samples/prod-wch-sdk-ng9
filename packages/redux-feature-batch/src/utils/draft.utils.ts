import { BaseAuthoringItem } from "@acoustic-content-sdk/api";
import {
  getProperty,
  isNil,
  isNotNil,
  objectAssign,
  reduceArray
} from "@acoustic-content-sdk/utils";

export const DRAFT_SUFFIX = ":draft";
export const DRAFT_SUFFIX_LEN = DRAFT_SUFFIX.length;

export interface ItemWithLinkedDocId {
  readonly id?: string;
  readonly linkedDocId?: string;
}

/**
 * Generates an overlay from items in an array such that drafts overlay ready items.
 *
 * @param aItems - the array of items
 * @returns the overlay, ordered by ready ID
 */
export function draftOverlay<T extends ItemWithLinkedDocId | BaseAuthoringItem>(
  aItems: T[]
): Record<string, T> {
  // overlay
  return reduceArray(
    aItems,
    (aDst: Record<string, T>, aItem: T) => {
      // the id
      const { id, linkedDocId } = aItem;
      /**
       * If we have a linkedDocId then this is a draft and should be used in any case
       */
      if (isNotNil(linkedDocId)) {
        objectAssign(linkedDocId, aItem, aDst);
      } else {
        /** first check if we already have an element, do not override it in that case */
        const old = getProperty(aDst, id);
        if (isNil(old)) {
          objectAssign(id, aItem, aDst);
        }
      }
      // the target doc
      return aDst;
    },
    {}
  );
}
