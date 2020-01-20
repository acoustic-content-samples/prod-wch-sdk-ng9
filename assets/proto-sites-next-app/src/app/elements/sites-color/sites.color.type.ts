/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as p_CWR7uKB, isOptional as _nKTVr$OH, isString as jq7sQRd7u, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '93ed78a8-cea7-4188-8584-a8bedca6ebac';
export const TYPE_NAME = 'Sites Color';
export const KEY_COLOR_CODE = 'colorCode';

/*
 * @name Sites Color
 * @id 93ed78a8-cea7-4188-8584-a8bedca6ebac
 */
export interface SitesColorType {
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
 * Tests if the value is of type SitesColorElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesColorElement else false
 */
export function isSitesColorType(aValue: any): aValue is SitesColorType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_COLOR_CODE], jq7sQRd7u)
    ;
}

/**
 * Selects the "colorCode" property from SitesColorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectColorCode: (aDefault?: string) => UnaryFunction<SitesColorType, string> = partialLeft(pluckProperty, KEY_COLOR_CODE);

/**
 * Selects the "colorCode" property from SitesColorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectColorCode: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesColorType, string> = partialLeft(rxSelectProperty, KEY_COLOR_CODE);
