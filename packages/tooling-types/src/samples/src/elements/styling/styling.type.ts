/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link StylingType}.
 */
export const TYPE_ID_STYLING = 'a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb';
/**
 * Name of the content type for {@link StylingType}.
 */
export const TYPE_NAME_STYLING = 'Styling';
/**
 * Key name of the `font` property of {@link StylingType}
 */
export const KEY_STYLING_FONT = 'font';
/**
 * Key name of the `size` property of {@link StylingType}
 */
export const KEY_STYLING_SIZE = 'size';
/**
 * Key name of the `color` property of {@link StylingType}
 */
export const KEY_STYLING_COLOR = 'color';
/**
 * Key name of the `key` property of {@link StylingType}
 */
export const KEY_STYLING_KEY = 'key';

/**
 * Delivery version of the Styling content type.
 *
 * See {@link TYPE_ID_STYLING} and {@link TYPE_NAME_STYLING}
 * @remarks
 * This item provides general styling information
 */
export interface StylingType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the font to be used for a text.
   * @remarks
   * See {@link KEY_STYLING_FONT}
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
  [KEY_STYLING_FONT]?: string;

  /**
   * This element controls the size.
   * @remarks
   * See {@link KEY_STYLING_SIZE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the size.",
   *   "key": "size",
   *   "label": "Size"
   * }
   * ```
   */
  [KEY_STYLING_SIZE]?: number;

  /**
   * This element controls the color.
   * @remarks
   * See {@link KEY_STYLING_COLOR}
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
  [KEY_STYLING_COLOR]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_STYLING_KEY}
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
  [KEY_STYLING_KEY]?: string;
}

/**
 * Tests if the value is of type {@link StylingType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link StylingType} else false
 */
export function isStylingType(aValue: any): aValue is StylingType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_STYLING_FONT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_STYLING_SIZE], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_STYLING_COLOR], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_STYLING_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_STYLING_FONT} property from {@link StylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStylingFont: (aDefault?: string) => UnaryFunction<StylingType,
  string> = partialLeft(pluckProperty, KEY_STYLING_FONT);

/**
 * Selects the {@link KEY_STYLING_FONT} property from {@link StylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStylingFont: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<StylingType, string> = partialLeft(rxSelectProperty, KEY_STYLING_FONT);

/**
 * Selects the {@link KEY_STYLING_SIZE} property from {@link StylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStylingSize: (aDefault?: number) => UnaryFunction<StylingType,
  number> = partialLeft(pluckProperty, KEY_STYLING_SIZE);

/**
 * Selects the {@link KEY_STYLING_SIZE} property from {@link StylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStylingSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<StylingType, number> = partialLeft(rxSelectProperty, KEY_STYLING_SIZE);

/**
 * Selects the {@link KEY_STYLING_COLOR} property from {@link StylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStylingColor: (aDefault?: string) => UnaryFunction<StylingType,
  string> = partialLeft(pluckProperty, KEY_STYLING_COLOR);

/**
 * Selects the {@link KEY_STYLING_COLOR} property from {@link StylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStylingColor: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<StylingType, string> = partialLeft(rxSelectProperty, KEY_STYLING_COLOR);

/**
 * Selects the {@link KEY_STYLING_KEY} property from {@link StylingType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStylingKey: (aDefault?: string) => UnaryFunction<StylingType,
  string> = partialLeft(pluckProperty, KEY_STYLING_KEY);

/**
 * Selects the {@link KEY_STYLING_KEY} property from {@link StylingType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStylingKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<StylingType, string> = partialLeft(rxSelectProperty, KEY_STYLING_KEY);
