/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesAlignmentType}.
 */
export const TYPE_ID_SITES_ALIGNMENT = 'd0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5';
/**
 * Name of the content type for {@link SitesAlignmentType}.
 */
export const TYPE_NAME_SITES_ALIGNMENT = 'Sites Alignment';
/**
 * Key name of the `alignmentOptions` property of {@link SitesAlignmentType}
 */
export const KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS = 'alignmentOptions';
/**
 * Key name of the `key` property of {@link SitesAlignmentType}
 */
export const KEY_SITES_ALIGNMENT_KEY = 'key';

/**
 * Delivery version of the Sites Alignment content type.
 *
 * See {@link TYPE_ID_SITES_ALIGNMENT} and {@link TYPE_NAME_SITES_ALIGNMENT}
 * @remarks
 * This element controls block alignment
 */
export interface SitesAlignmentType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the block alignment
   * @remarks
   * See {@link KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the block alignment",
   *   "key": "alignmentOptions",
   *   "label": "Alignment options",
   *   "options": [
   *     {
   *       "label": "Left",
   *       "selection": "left"
   *     },
   *     {
   *       "label": "Center",
   *       "selection": "center"
   *     },
   *     {
   *       "label": "Right",
   *       "selection": "right"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_ALIGNMENT_KEY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element is used to uniquely identify this element in the current content item",
   *   "key": "key",
   *   "label": "Key"
   * }
   * ```
   */
  [KEY_SITES_ALIGNMENT_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesAlignmentType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesAlignmentType} else false
 */
export function isSitesAlignmentType(aValue: any): aValue is SitesAlignmentType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_ALIGNMENT_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS} property from {@link SitesAlignmentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesAlignmentAlignmentOptions: (aDefault?: string) => UnaryFunction<SitesAlignmentType,
  string> = partialLeft(pluckProperty, KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS);

/**
 * Selects the {@link KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS} property from {@link SitesAlignmentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesAlignmentAlignmentOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesAlignmentType, string> = partialLeft(rxSelectProperty, KEY_SITES_ALIGNMENT_ALIGNMENT_OPTIONS);

/**
 * Selects the {@link KEY_SITES_ALIGNMENT_KEY} property from {@link SitesAlignmentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesAlignmentKey: (aDefault?: string) => UnaryFunction<SitesAlignmentType,
  string> = partialLeft(pluckProperty, KEY_SITES_ALIGNMENT_KEY);

/**
 * Selects the {@link KEY_SITES_ALIGNMENT_KEY} property from {@link SitesAlignmentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesAlignmentKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesAlignmentType, string> = partialLeft(rxSelectProperty, KEY_SITES_ALIGNMENT_KEY);
