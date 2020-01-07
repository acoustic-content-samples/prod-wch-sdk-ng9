import { BaseAuthoringItem, ContentItem } from '@acoustic-content-sdk/api';
import { isNotNil, pluckProperty } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { assertIsNotDraftId } from '../asserts/asserts';

/**
 * Extracts the classification property
 */
export const selectClassification: UnaryFunction<
  BaseAuthoringItem | ContentItem,
  string
> = pluckProperty('classification');

/**
 * Nothing to select
 *
 * @returns undefined
 */
function selectNothing<T>(): T {
  return undefined;
}

/**
 * Constructs a selector that validates that the ID is a delivery ID (not a draft ID) and selects
 * based on that ID from the state
 *
 * @param aId - the ID
 * @returns a selector for that ID based on some state
 */
export function selectByDeliveryId<T>(
  aId?: string
): UnaryFunction<Record<string, T>, T> {
  // execute the selection
  if (isNotNil(aId)) {
    // sanity check
    assertIsNotDraftId(aId, 'id');
    // returns the selector
    return pluckProperty(aId);
  }
  // nothing to select
  return selectNothing;
}
