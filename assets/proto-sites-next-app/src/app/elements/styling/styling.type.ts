/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb';
export const TYPE_NAME = 'Styling';
export const KEY_FONT = 'font';
export const KEY_SIZE = 'size';
export const KEY_COLOR = 'color';

/*
 * @name Styling
 * @id a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb
 */
export interface StylingType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "font",
     *   "label": "Font"
     * }
     * ```
     */
    [KEY_FONT]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "size",
     *   "label": "Size"
     * }
     * ```
     */
    [KEY_SIZE]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "color",
     *   "label": "Color"
     * }
     * ```
     */
    [KEY_COLOR]?: string;
}

/**
 * Tests if the value is of type StylingElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type StylingElement else false
 */
export function isStylingType(aValue: any): aValue is StylingType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_FONT], Dp8dLCd6c)
        && _krhmaXp(aValue[KEY_SIZE], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_COLOR], Dp8dLCd6c)
    ;
}

/**
 * Selects the "font" property from StylingType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFont: (aDefault?: string) => UnaryFunction<StylingType, string> = partialLeft(pluckProperty, KEY_FONT);

/**
 * Selects the "font" property from StylingType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFont: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<StylingType, string> = partialLeft(rxSelectProperty, KEY_FONT);

/**
 * Selects the "size" property from StylingType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSize: (aDefault?: number) => UnaryFunction<StylingType, number> = partialLeft(pluckProperty, KEY_SIZE);

/**
 * Selects the "size" property from StylingType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<StylingType, number> = partialLeft(rxSelectProperty, KEY_SIZE);

/**
 * Selects the "color" property from StylingType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectColor: (aDefault?: string) => UnaryFunction<StylingType, string> = partialLeft(pluckProperty, KEY_COLOR);

/**
 * Selects the "color" property from StylingType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectColor: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<StylingType, string> = partialLeft(rxSelectProperty, KEY_COLOR);
