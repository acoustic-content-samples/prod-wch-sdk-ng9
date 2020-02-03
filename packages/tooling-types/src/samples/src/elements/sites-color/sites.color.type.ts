/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesColorType}.
 */
export const TYPE_ID_SITES_COLOR = '93ed78a8-cea7-4188-8584-a8bedca6ebac';
/**
 * Name of the content type for {@link SitesColorType}.
 */
export const TYPE_NAME_SITES_COLOR = 'Sites Color';
/**
 * Key name of the `colorCode` property of {@link SitesColorType}
 */
export const KEY_SITES_COLOR_COLOR_CODE = 'colorCode';
/**
 * Key name of the `key` property of {@link SitesColorType}
 */
export const KEY_SITES_COLOR_KEY = 'key';

/**
 * Delivery version of the Sites Color content type.
 *
 * See {@link TYPE_ID_SITES_COLOR} and {@link TYPE_NAME_SITES_COLOR}
 * @remarks
 * This color elements represents a specific managed color represented by a color code
 */
export interface SitesColorType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The color code
   * @remarks
   * See {@link KEY_SITES_COLOR_COLOR_CODE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The color code",
   *   "key": "colorCode",
   *   "label": "Color code"
   * }
   * ```
   */
  [KEY_SITES_COLOR_COLOR_CODE]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_COLOR_KEY}
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
  [KEY_SITES_COLOR_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesColorType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesColorType} else false
 */
export function isSitesColorType(aValue: any): aValue is SitesColorType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_COLOR_COLOR_CODE], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_COLOR_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_COLOR_COLOR_CODE} property from {@link SitesColorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesColorColorCode: (aDefault?: string) => UnaryFunction<SitesColorType,
  string> = partialLeft(pluckProperty, KEY_SITES_COLOR_COLOR_CODE);

/**
 * Selects the {@link KEY_SITES_COLOR_COLOR_CODE} property from {@link SitesColorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesColorColorCode: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesColorType, string> = partialLeft(rxSelectProperty, KEY_SITES_COLOR_COLOR_CODE);

/**
 * Selects the {@link KEY_SITES_COLOR_KEY} property from {@link SitesColorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesColorKey: (aDefault?: string) => UnaryFunction<SitesColorType,
  string> = partialLeft(pluckProperty, KEY_SITES_COLOR_KEY);

/**
 * Selects the {@link KEY_SITES_COLOR_KEY} property from {@link SitesColorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesColorKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesColorType, string> = partialLeft(rxSelectProperty, KEY_SITES_COLOR_KEY);
