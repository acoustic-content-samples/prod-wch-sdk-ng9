import {
  BaseAuthoringItem,
  BaseDeliveryItem,
  ContentItem
} from "@acoustic-content-sdk/api";
import {
  ItemWithId,
  ItemWithLinkedDocId
} from "@acoustic-content-sdk/redux-utils";
import {
  isAbsoluteURL,
  isNotNil,
  pluckProperty
} from "@acoustic-content-sdk/utils";
import { UnaryFunction } from "rxjs";

// plucks the ID from an item
export const selectId: UnaryFunction<
  ItemWithId | BaseAuthoringItem | BaseDeliveryItem | ItemWithLinkedDocId,
  string
> = pluckProperty("id");

// plucks the draft id if it exists, else the delivery id
export const selectAuthoringId: UnaryFunction<ContentItem, string> = item =>
  item.draftId || item.id;

/**
 * Tests if a value is a valid URL
 *
 * @param aValue  - the value to test
 * @returns true if the value is a valid URL
 */
export function isValidUrl(aValue: any): aValue is URL {
  return (
    isNotNil(aValue) && isNotNil(aValue.href) && isAbsoluteURL(aValue.href)
  );
}
