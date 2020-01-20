/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '63f1d1c5-fa92-48da-a7a2-a2b700f4b097';
export const TYPE_NAME = 'Text Alignment options';
export const KEY_ALIGNMENT_OPTIONS = 'alignmentOptions';

/*
 * @name Text Alignment options
 * @id 63f1d1c5-fa92-48da-a7a2-a2b700f4b097
 */
export interface TextAlignmentOptionsType {
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
 * Tests if the value is of type TextAlignmentOptionsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type TextAlignmentOptionsElement else false
 */
export function isTextAlignmentOptionsType(aValue: any): aValue is TextAlignmentOptionsType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_ALIGNMENT_OPTIONS], Dp8dLCd6c)
    ;
}

/**
 * Selects the "alignmentOptions" property from TextAlignmentOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignmentOptions: (aDefault?: string) => UnaryFunction<TextAlignmentOptionsType, string> = partialLeft(pluckProperty, KEY_ALIGNMENT_OPTIONS);

/**
 * Selects the "alignmentOptions" property from TextAlignmentOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignmentOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<TextAlignmentOptionsType, string> = partialLeft(rxSelectProperty, KEY_ALIGNMENT_OPTIONS);
