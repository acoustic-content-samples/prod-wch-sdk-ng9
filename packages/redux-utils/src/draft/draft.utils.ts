import { isNotNil } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';
import { BaseAuthoringItem } from '@acoustic-content-sdk/api';

const DRAFT_SUFFIX = ':draft';
const DRAFT_SUFFIX_LEN = DRAFT_SUFFIX.length;

/**
 * Makes sure to end the ID with a draft suffix
 *
 * @param aAuthoringId - the actual ID
 * @returns the ID with a draft suffix
 */
export const ensureDraftId = (aAuthoringId: string): string =>
  isDraftId(aAuthoringId) ? aAuthoringId : `${aAuthoringId}${DRAFT_SUFFIX}`;

/**
 * Tests if the authoring ID has a draft suffix
 *
 * @param aAuthoringId - the ID
 * @returns true if we have a draft suffix, else false
 */
export function isDraftId(aAuthoringId: string): boolean {
  // search from the end
  const idx = aAuthoringId.indexOf(
    DRAFT_SUFFIX,
    aAuthoringId.length - DRAFT_SUFFIX_LEN
  );
  // check
  return idx >= 0;
}

/**
 * Returns the delivery ID from an authoring ID, i.e. strips off the ':draft' suffix from the ID
 *
 * @param authoringId - the authoring ID
 * @returns the resulting delivery ID
 */
export const getDeliveryId: UnaryFunction<string, string> = (authoringId) => {
  // sanity check
  if (isNotNil(authoringId)) {
    // search from the end
    const idx = authoringId.indexOf(
      DRAFT_SUFFIX,
      authoringId.length - DRAFT_SUFFIX_LEN
    );
    return idx >= 0 ? authoringId.substr(0, idx) : authoringId;
  }
  // nothing special
  return authoringId;
};

export interface ItemWithLinkedDocId {
  readonly id?: string;
  readonly linkedDocId?: string;
}

/**
 * Returns the delivery ID from an authoring item.
 *
 * @param authoringItem - the authoring item
 * @returns the resulting delivery ID
 */
export const getDeliveryIdFromAuthoringItem: UnaryFunction<
  ItemWithLinkedDocId | BaseAuthoringItem,
  string
> = (authoringItem) => {
  // decompose
  const { linkedDocId, id } = authoringItem;
  // sanity check
  return isNotNil(linkedDocId) ? linkedDocId : getDeliveryId(id);
};
