import {
  DeliveryContentMetadata,
  KEY_ACCESSOR,
  KEY_ID,
  KEY_METADATA,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { isPlainObject, isString } from '../predicates/predicates';

/**
 * Tests if the object is valid metadata
 *
 * @param aValue - value to check
 * @returns true if the value is metadata
 */
export function isMetadata(aValue: any): aValue is DeliveryContentMetadata {
  return (
    isPlainObject(aValue) &&
    isString(aValue[KEY_ID]) &&
    isString(aValue[KEY_ACCESSOR])
  );
}

/**
 * Tests if the object is a valid rendering context
 *
 * @param aValue - value to check
 * @returns true if the value is a rendering context
 */
export function isRenderingContextV2(
  aValue: any
): aValue is RenderingContextV2 {
  return isPlainObject(aValue) && isMetadata(aValue[KEY_METADATA]);
}
