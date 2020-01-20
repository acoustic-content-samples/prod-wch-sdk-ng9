/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as p_CWR7uKB, isOptional as _nKTVr$OH, isString as jq7sQRd7u, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'd0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5';
export const TYPE_NAME = 'Sites Alignment';
export const KEY_ALIGNMENT_OPTIONS = 'alignmentOptions';

/*
 * @name Sites Alignment
 * @id d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5
 */
export interface SitesAlignmentType {
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
 * Tests if the value is of type SitesAlignmentElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesAlignmentElement else false
 */
export function isSitesAlignmentType(aValue: any): aValue is SitesAlignmentType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_ALIGNMENT_OPTIONS], jq7sQRd7u)
    ;
}

/**
 * Selects the "alignmentOptions" property from SitesAlignmentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignmentOptions: (aDefault?: string) => UnaryFunction<SitesAlignmentType, string> = partialLeft(pluckProperty, KEY_ALIGNMENT_OPTIONS);

/**
 * Selects the "alignmentOptions" property from SitesAlignmentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignmentOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesAlignmentType, string> = partialLeft(rxSelectProperty, KEY_ALIGNMENT_OPTIONS);
