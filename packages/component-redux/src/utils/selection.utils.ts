import { isEqual, isNotNil, pluckPath } from '@acoustic-content-sdk/utils';
import {
  KEY_ELEMENTS,
  KEY_DESCRIPTOR,
  KEY_CANONICALPATH
} from '@acoustic-content-sdk/sites-api';
import { KEY_VALUE } from '@acoustic-content-sdk/api';

export interface ItemWithIdAndRevision {
  id?: string;
  rev?: string;
}

/**
 * Compares items based on ID and revision
 *
 * @param aLeft - left item
 * @param aRight - right item
 *
 * @returns true if the items are equal, else false
 */
export const isEqualRev = <T extends ItemWithIdAndRevision>(
  aLeft: T,
  aRight: T
) =>
  isEqual(aLeft, aRight) ||
  (isNotNil(aLeft) &&
    isNotNil(aRight) &&
    isEqual(aLeft.id, aRight.id) &&
    isEqual(aLeft.rev, aRight.rev));

/**
 * Extracts the path from the respective field on the content item
 *
 * TODO fix the field name
 */
const CANONICAL_PATH = [
  KEY_ELEMENTS,
  KEY_DESCRIPTOR,
  KEY_VALUE,
  KEY_CANONICALPATH,
  KEY_VALUE
];
export const selectCanonicalPath = pluckPath<string>(CANONICAL_PATH);

const TAGS_PATH = ['tags'];
export const selectTags = pluckPath<string[]>(TAGS_PATH, []);
