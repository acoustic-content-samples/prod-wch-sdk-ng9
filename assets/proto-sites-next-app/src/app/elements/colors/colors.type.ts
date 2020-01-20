/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '1321a547-287a-477b-a7ec-d191e2cdb70a';
export const TYPE_NAME = 'Colors';
export const KEY_COLOR_CODE = 'colorCode';

/*
 * @name Colors
 * @id 1321a547-287a-477b-a7ec-d191e2cdb70a
 */
export interface ColorsType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "colorCode",
     *   "label": "Color code"
     * }
     * ```
     */
    [KEY_COLOR_CODE]?: string;
}

/**
 * Tests if the value is of type ColorsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type ColorsElement else false
 */
export function isColorsType(aValue: any): aValue is ColorsType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_COLOR_CODE], Dp8dLCd6c)
    ;
}

/**
 * Selects the "colorCode" property from ColorsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectColorCode: (aDefault?: string) => UnaryFunction<ColorsType, string> = partialLeft(pluckProperty, KEY_COLOR_CODE);

/**
 * Selects the "colorCode" property from ColorsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectColorCode: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<ColorsType, string> = partialLeft(rxSelectProperty, KEY_COLOR_CODE);
