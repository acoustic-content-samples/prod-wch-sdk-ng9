/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as tgb0zYfmk, isOptional as r7f9leBwp, isString as BaUcdvJ$t, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'e5e97340-b03b-42ea-9d03-f8bc214f42b0';
export const TYPE_NAME = 'Sites Line Height';
export const KEY_LINE_HEIGHT_OPTIONS = 'lineHeightOptions';

/*
 * @name Sites Line Height
 * @id e5e97340-b03b-42ea-9d03-f8bc214f42b0
 */
export interface SitesLineHeightType {
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
 * Tests if the value is of type SitesLineHeightElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesLineHeightElement else false
 */
export function isSitesLineHeightType(aValue: any): aValue is SitesLineHeightType {
    return tgb0zYfmk(aValue)
        && r7f9leBwp(aValue[KEY_LINE_HEIGHT_OPTIONS], BaUcdvJ$t)
    ;
}

/**
 * Selects the "lineHeightOptions" property from SitesLineHeightType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineHeightOptions: (aDefault?: string) => UnaryFunction<SitesLineHeightType, string> = partialLeft(pluckProperty, KEY_LINE_HEIGHT_OPTIONS);

/**
 * Selects the "lineHeightOptions" property from SitesLineHeightType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineHeightOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesLineHeightType, string> = partialLeft(rxSelectProperty, KEY_LINE_HEIGHT_OPTIONS);
