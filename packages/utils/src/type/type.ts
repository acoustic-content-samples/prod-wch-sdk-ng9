import {
  AuthoringType,
  DeliveryReferenceElement,
  DeliveryType,
  KEY_ID,
  KEY_METADATA
} from '@acoustic-content-sdk/api';
import { identity, UnaryFunction } from 'rxjs';

import { pluckPath } from '../path/path';
import { isNotEmpty } from '../predicates/predicates';

const idExtractor = pluckPath<string>([KEY_METADATA, KEY_ID]);

/**
 * Tests if a value is a delivery reference element
 *
 * @param aValue - value to test
 * @returns true if the value is a reference element
 */
export function isDeliveryReferenceElement(
  aValue: any
): aValue is DeliveryReferenceElement {
  return isNotEmpty(idExtractor(aValue));
}

/**
 * Converts an authoring layout item to a delivery layout item
 */
export const authoringTypeToDeliveryType: UnaryFunction<
  AuthoringType,
  DeliveryType
> = identity;
