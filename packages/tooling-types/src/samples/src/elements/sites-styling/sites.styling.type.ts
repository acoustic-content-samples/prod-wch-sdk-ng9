/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesStylingType}.
 */
export const TYPE_ID_SITES_STYLING = 'cfa7081a-921d-4f50-a543-027b983b01b5';
/**
 * Name of the content type for {@link SitesStylingType}.
 */
export const TYPE_NAME_SITES_STYLING = 'Sites Styling';
/**
 * Key name of the `font` property of {@link SitesStylingType}
 */
export const KEY_SITES_STYLING_FONT = 'font';
/**
 * Key name of the `size` property of {@link SitesStylingType}
 */
export const KEY_SITES_STYLING_SIZE = 'size';
/**
 * Key name of the `color` property of {@link SitesStylingType}
 */
export const KEY_SITES_STYLING_COLOR = 'color';
/**
 * Key name of the `key` property of {@link SitesStylingType}
 */
export const KEY_SITES_STYLING_KEY = 'key';

/**
 * Delivery version of the Sites Styling content type.
 *
 * See {@link TYPE_ID_SITES_STYLING} and {@link TYPE_NAME_SITES_STYLING}
 * @remarks
 * This item represents general styling information that can be applied to elements of page blocks.
 */
export interface SitesStylingType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the font to be used for a text.
   * @remarks
   * See {@link KEY_SITES_STYLING_FONT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element controls the font to be used for a text.",
   *   "key": "font",
   *   "label": "Font"
   * }
   * ```
   */
  [KEY_SITES_STYLING_FONT]?: string;

  /**
   * This element controls size.
   * @remarks
   * See {@link KEY_SITES_STYLING_SIZE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls size.",
   *   "key": "size",
   *   "label": "Size"
   * }
   * ```
   */
  [KEY_SITES_STYLING_SIZE]?: number;

  /**
   * This element controls the color.
   * @remarks
   * See {@link KEY_SITES_STYLING_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element controls the color.",
   *   "key": "color",
   *   "label": "Color"
   * }
   * ```
   */
  [KEY_SITES_STYLING_COLOR]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_STYLING_KEY}
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
  [KEY_SITES_STYLING_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesStylingType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesStylingType} else false
 */
export function isSitesStylingType(aValue: any): aValue is SitesStylingType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_STYLING_FONT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_STYLING_SIZE], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_STYLING_COLOR], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_STYLING_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_STYLING_FONT} property from {@link SitesStylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesStylingFont: (aDefault?: string) => UnaryFunction<SitesStylingType,
  string> = partialLeft(pluckProperty, KEY_SITES_STYLING_FONT);

/**
 * Selects the {@link KEY_SITES_STYLING_FONT} property from {@link SitesStylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesStylingFont: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesStylingType, string> = partialLeft(rxSelectProperty, KEY_SITES_STYLING_FONT);

/**
 * Selects the {@link KEY_SITES_STYLING_SIZE} property from {@link SitesStylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesStylingSize: (aDefault?: number) => UnaryFunction<SitesStylingType,
  number> = partialLeft(pluckProperty, KEY_SITES_STYLING_SIZE);

/**
 * Selects the {@link KEY_SITES_STYLING_SIZE} property from {@link SitesStylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesStylingSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesStylingType, number> = partialLeft(rxSelectProperty, KEY_SITES_STYLING_SIZE);

/**
 * Selects the {@link KEY_SITES_STYLING_COLOR} property from {@link SitesStylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesStylingColor: (aDefault?: string) => UnaryFunction<SitesStylingType,
  string> = partialLeft(pluckProperty, KEY_SITES_STYLING_COLOR);

/**
 * Selects the {@link KEY_SITES_STYLING_COLOR} property from {@link SitesStylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesStylingColor: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesStylingType, string> = partialLeft(rxSelectProperty, KEY_SITES_STYLING_COLOR);

/**
 * Selects the {@link KEY_SITES_STYLING_KEY} property from {@link SitesStylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesStylingKey: (aDefault?: string) => UnaryFunction<SitesStylingType,
  string> = partialLeft(pluckProperty, KEY_SITES_STYLING_KEY);

/**
 * Selects the {@link KEY_SITES_STYLING_KEY} property from {@link SitesStylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesStylingKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesStylingType, string> = partialLeft(rxSelectProperty, KEY_SITES_STYLING_KEY);
