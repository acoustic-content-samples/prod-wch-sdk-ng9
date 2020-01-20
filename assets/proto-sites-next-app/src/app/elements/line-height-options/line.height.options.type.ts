/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '5b94254c-71a0-42aa-b979-e21ffbae12b2';
export const TYPE_NAME = 'Line height options';
export const KEY_LINE_HEIGHT_OPTIONS = 'lineHeightOptions';

/*
 * @name Line height options
 * @id 5b94254c-71a0-42aa-b979-e21ffbae12b2
 */
export interface LineHeightOptionsType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
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
    [KEY_LINE_HEIGHT_OPTIONS]?: string;
}

/**
 * Tests if the value is of type LineHeightOptionsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type LineHeightOptionsElement else false
 */
export function isLineHeightOptionsType(aValue: any): aValue is LineHeightOptionsType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_LINE_HEIGHT_OPTIONS], Dp8dLCd6c)
    ;
}

/**
 * Selects the "lineHeightOptions" property from LineHeightOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineHeightOptions: (aDefault?: string) => UnaryFunction<LineHeightOptionsType, string> = partialLeft(pluckProperty, KEY_LINE_HEIGHT_OPTIONS);

/**
 * Selects the "lineHeightOptions" property from LineHeightOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineHeightOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<LineHeightOptionsType, string> = partialLeft(rxSelectProperty, KEY_LINE_HEIGHT_OPTIONS);
