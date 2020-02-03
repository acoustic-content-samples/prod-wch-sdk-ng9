/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesLineHeightType}.
 */
export const TYPE_ID_SITES_LINE_HEIGHT = 'e5e97340-b03b-42ea-9d03-f8bc214f42b0';
/**
 * Name of the content type for {@link SitesLineHeightType}.
 */
export const TYPE_NAME_SITES_LINE_HEIGHT = 'Sites Line Height';
/**
 * Key name of the `lineHeightOptions` property of {@link SitesLineHeightType}
 */
export const KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS = 'lineHeightOptions';
/**
 * Key name of the `key` property of {@link SitesLineHeightType}
 */
export const KEY_SITES_LINE_HEIGHT_KEY = 'key';

/**
 * Delivery version of the Sites Line Height content type.
 *
 * See {@link TYPE_ID_SITES_LINE_HEIGHT} and {@link TYPE_NAME_SITES_LINE_HEIGHT}
 * @remarks
 * This item controls the line hight of a text block
 */
export interface SitesLineHeightType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element selects the specific line hight to be applied to a text block
   * @remarks
   * See {@link KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element selects the specific line hight to be applied to a text block",
   *   "key": "lineHeightOptions",
   *   "label": "Line height options",
   *   "options": [
   *     {
   *       "label": ".8",
   *       "selection": "0.8"
   *     },
   *     {
   *       "label": "1",
   *       "selection": "1"
   *     },
   *     {
   *       "label": "1.5",
   *       "selection": "1.5"
   *     },
   *     {
   *       "label": "2",
   *       "selection": "2"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_LINE_HEIGHT_KEY}
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
  [KEY_SITES_LINE_HEIGHT_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesLineHeightType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesLineHeightType} else false
 */
export function isSitesLineHeightType(aValue: any): aValue is SitesLineHeightType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_LINE_HEIGHT_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS} property from {@link SitesLineHeightType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLineHeightLineHeightOptions: (aDefault?: string) => UnaryFunction<SitesLineHeightType,
  string> = partialLeft(pluckProperty, KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS);

/**
 * Selects the {@link KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS} property from {@link SitesLineHeightType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLineHeightLineHeightOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesLineHeightType, string> = partialLeft(rxSelectProperty, KEY_SITES_LINE_HEIGHT_LINE_HEIGHT_OPTIONS);

/**
 * Selects the {@link KEY_SITES_LINE_HEIGHT_KEY} property from {@link SitesLineHeightType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLineHeightKey: (aDefault?: string) => UnaryFunction<SitesLineHeightType,
  string> = partialLeft(pluckProperty, KEY_SITES_LINE_HEIGHT_KEY);

/**
 * Selects the {@link KEY_SITES_LINE_HEIGHT_KEY} property from {@link SitesLineHeightType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLineHeightKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesLineHeightType, string> = partialLeft(rxSelectProperty, KEY_SITES_LINE_HEIGHT_KEY);
