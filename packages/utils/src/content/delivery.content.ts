import {
  DeliveryContentItem,
  DeliveryElement,
  KEY_VALUE,
  KEY_VALUES
} from '@acoustic-content-sdk/api';

import { isEqual, isNotNil } from '../predicates/predicates';
import { parsePath } from './../path/path';

/**
 * Recursive function to resolve the content item
 *
 * @param aIdx - the index into the parsed path
 * @param aPath - the parsed path
 * @param aItem - the root level item
 *
 * @returns the resolved item
 */
function internalDeliveryContentByAccessor(
  aIdx: number,
  aPath: string[],
  aItem: any
) {
  // sanity check
  if (aIdx >= aPath.length) {
    return aItem;
  }
  if (!aItem) {
    return aItem;
  }
  // name of the element
  const name = aPath[aIdx];
  const child = aItem[name];
  if (isNotNil(child)) {
    // next level
    const val = aPath[aIdx + 1];
    if (isEqual(val, KEY_VALUE)) {
      // recurse
      return internalDeliveryContentByAccessor(aIdx + 2, aPath, child);
    }
    if (isEqual(val, KEY_VALUES)) {
      // index
      const idx = aPath[aIdx + 2];
      // recurse
      return internalDeliveryContentByAccessor(aIdx + 3, aPath, child[idx]);
    }
  }
  // returns the child
  return child;
}

/**
 * Returns the element identified by the accessor string from a content item
 * in delivery format
 *
 * @param aItem - the root level item (its accessor should be  )
 * @param aAccessor - accessor expression to the item (this references the authoring path!)
 *
 * @returns the referenced value
 */
export function wchDeliveryContentByAccessor(
  aItem: DeliveryContentItem,
  aAccessor: string
): DeliveryContentItem | DeliveryElement {
  // parse the accessor
  const acc = parsePath(aAccessor);
  /** recurse, the first number is intentionally 1 and not 0, because the first element
   * in the accessor will be `elements`. In theory we might want to validate that,
   * but here we don't
   */
  return internalDeliveryContentByAccessor(1, acc, aItem);
}
