/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '0915841f-cf93-4e3c-8ece-f22b0c41a9e6';
export const TYPE_NAME = 'Alignment options';
export const KEY_ALIGNMENT_OPTIONS = 'alignmentOptions';

/*
 * @name Alignment options
 * @id 0915841f-cf93-4e3c-8ece-f22b0c41a9e6
 */
export interface AlignmentOptionsType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
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
    [KEY_ALIGNMENT_OPTIONS]?: string;
}

/**
 * Tests if the value is of type AlignmentOptionsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type AlignmentOptionsElement else false
 */
export function isAlignmentOptionsType(aValue: any): aValue is AlignmentOptionsType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_ALIGNMENT_OPTIONS], Dp8dLCd6c)
    ;
}

/**
 * Selects the "alignmentOptions" property from AlignmentOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignmentOptions: (aDefault?: string) => UnaryFunction<AlignmentOptionsType, string> = partialLeft(pluckProperty, KEY_ALIGNMENT_OPTIONS);

/**
 * Selects the "alignmentOptions" property from AlignmentOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignmentOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<AlignmentOptionsType, string> = partialLeft(rxSelectProperty, KEY_ALIGNMENT_OPTIONS);
