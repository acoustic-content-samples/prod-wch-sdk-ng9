import {
  BiFunction,
  EqualsPredicate,
  isEqual,
  isNotNil
} from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import {
  getDeliveryIdFromAuthoringItem,
  ItemWithLinkedDocId
} from '../draft/draft.utils';

/**
 * Reducer function that adds an item to a record
 */
export type AddRecordReducer<T> = BiFunction<
  Record<string, T>,
  T,
  Record<string, T>
>;

/**
 * Reducer function that adds an item to a record
 */
export type RemoveRecordReducer<T> = BiFunction<
  Record<string, T>,
  string,
  Record<string, T>
>;

/**
 * Reducer function that updates an item
 */
export type ItemReducer<T> = BiFunction<T, T, T>;

function _removeRecord<T>(
  aState: Record<string, T>,
  aKey: string
): Record<string, T> {
  // check if we know the ID
  const existing = aState[aKey];
  if (isNotNil(existing)) {
    // remove from the set
    const { [aKey]: old, ...copy } = aState;
    return copy;
  }
  // return the original state
  return aState;
}

// returns the updater
function _updateRecord<T>(
  aKey: UnaryFunction<T, string>,
  aPredicate: EqualsPredicate<T>,
  aState: Record<string, T>,
  aItem: T
): Record<string, T> {
  // check if the item exists and/or changed
  const key = aKey(aItem);
  const existing = aState[key];
  // test
  if (aPredicate(existing, aItem)) {
    // no need to create a copy
    return aState;
  }
  // update
  return {
    ...aState,
    [key]: aItem
  };
}

function _updateSingleItem<T>(
  aPredicate: EqualsPredicate<T>,
  aState: T,
  aItem: T
): T {
  return isNotNil(aState) && aPredicate(aState, aItem) ? aState : aItem;
}

/**
 * Creates a reducer that adds an item to a record
 *
 * @param aKey - function to extract the key from the item
 * @param aPredicate - predicate to check if two items are equal
 *
 * @returns the reducer
 */
export function updateRecord<T>(
  aKey: UnaryFunction<T, string>,
  aPredicate: EqualsPredicate<T> = isEqual
): AddRecordReducer<T> {
  // returns the actual updater
  return (state, item) => _updateRecord(aKey, aPredicate, state, item);
}

/**
 * Creates a reducer that removes a key from a record
 *
 * @returns the reducer
 */
export function removeRecord<T>(): RemoveRecordReducer<T> {
  // returns the actual updater
  return _removeRecord;
}

export function updateSingleItem<T>(
  aPredicate: EqualsPredicate<T> = isEqual
): ItemReducer<T> {
  // returns the actual updater
  return (state, item) => _updateSingleItem(aPredicate, state, item);
}

export interface ItemWithId {
  id?: string;
}

export interface ItemWithRevision extends ItemWithId {
  rev?: string;
}

export function equalsByRevision(
  aLeft: ItemWithRevision,
  aRight: ItemWithRevision
): boolean {
  return aLeft === aRight || (aLeft && aRight && aLeft.rev === aRight.rev);
}

/**
 * Extract the delivery ID of the draft
 *
 * @param item - the item
 * @returns the delivery version of the ID
 */
export const keyById: UnaryFunction<ItemWithLinkedDocId, string> = item =>
  getDeliveryIdFromAuthoringItem(item);

export const updateItemsWithRevision: <T extends ItemWithRevision>(
  aState: Record<string, T>,
  aItem: T
) => Record<string, T> = updateRecord(keyById, equalsByRevision) as any;
