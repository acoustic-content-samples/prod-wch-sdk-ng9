/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as tgb0zYfmk, isNumber as BleAkOa2k, isOptional as r7f9leBwp, isString as BaUcdvJ$t, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'cfa7081a-921d-4f50-a543-027b983b01b5';
export const TYPE_NAME = 'Sites Styling';
export const KEY_FONT = 'font';
export const KEY_SIZE = 'size';
export const KEY_COLOR = 'color';

/*
 * @name Sites Styling
 * @id cfa7081a-921d-4f50-a543-027b983b01b5
 */
export interface SitesStylingType {
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
 * Tests if the value is of type SitesStylingElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesStylingElement else false
 */
export function isSitesStylingType(aValue: any): aValue is SitesStylingType {
    return tgb0zYfmk(aValue)
        && r7f9leBwp(aValue[KEY_FONT], BaUcdvJ$t)
        && r7f9leBwp(aValue[KEY_SIZE], BleAkOa2k)
        && r7f9leBwp(aValue[KEY_COLOR], BaUcdvJ$t)
    ;
}

/**
 * Selects the "font" property from SitesStylingType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFont: (aDefault?: string) => UnaryFunction<SitesStylingType, string> = partialLeft(pluckProperty, KEY_FONT);

/**
 * Selects the "font" property from SitesStylingType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFont: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesStylingType, string> = partialLeft(rxSelectProperty, KEY_FONT);

/**
 * Selects the "size" property from SitesStylingType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSize: (aDefault?: number) => UnaryFunction<SitesStylingType, number> = partialLeft(pluckProperty, KEY_SIZE);

/**
 * Selects the "size" property from SitesStylingType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesStylingType, number> = partialLeft(rxSelectProperty, KEY_SIZE);

/**
 * Selects the "color" property from SitesStylingType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectColor: (aDefault?: string) => UnaryFunction<SitesStylingType, string> = partialLeft(pluckProperty, KEY_COLOR);

/**
 * Selects the "color" property from SitesStylingType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectColor: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesStylingType, string> = partialLeft(rxSelectProperty, KEY_COLOR);
