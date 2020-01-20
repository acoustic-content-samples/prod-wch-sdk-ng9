/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as p_CWR7uKB, isNumber as dngnRCE8c, isOptional as _nKTVr$OH, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'd403f72d-5383-423c-ba33-5cedd61c9224';
export const TYPE_NAME = 'Sites Boundary';
export const KEY_TOP = 'top';
export const KEY_BOTTOM = 'bottom';
export const KEY_LEFT = 'left';
export const KEY_RIGHT = 'right';

/*
 * @name Sites Boundary
 * @id d403f72d-5383-423c-ba33-5cedd61c9224
 */
export interface SitesBoundaryType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "top",
     *   "label": "Top",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_TOP]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "bottom",
     *   "label": "Bottom",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_BOTTOM]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "left",
     *   "label": "Left",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_LEFT]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "right",
     *   "label": "Right",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_RIGHT]?: number;
}

/**
 * Tests if the value is of type SitesBoundaryElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesBoundaryElement else false
 */
export function isSitesBoundaryType(aValue: any): aValue is SitesBoundaryType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_TOP], dngnRCE8c)
        && _nKTVr$OH(aValue[KEY_BOTTOM], dngnRCE8c)
        && _nKTVr$OH(aValue[KEY_LEFT], dngnRCE8c)
        && _nKTVr$OH(aValue[KEY_RIGHT], dngnRCE8c)
    ;
}

/**
 * Selects the "top" property from SitesBoundaryType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTop: (aDefault?: number) => UnaryFunction<SitesBoundaryType, number> = partialLeft(pluckProperty, KEY_TOP);

/**
 * Selects the "top" property from SitesBoundaryType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTop: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_TOP);

/**
 * Selects the "bottom" property from SitesBoundaryType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBottom: (aDefault?: number) => UnaryFunction<SitesBoundaryType, number> = partialLeft(pluckProperty, KEY_BOTTOM);

/**
 * Selects the "bottom" property from SitesBoundaryType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBottom: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_BOTTOM);

/**
 * Selects the "left" property from SitesBoundaryType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLeft: (aDefault?: number) => UnaryFunction<SitesBoundaryType, number> = partialLeft(pluckProperty, KEY_LEFT);

/**
 * Selects the "left" property from SitesBoundaryType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLeft: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_LEFT);

/**
 * Selects the "right" property from SitesBoundaryType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectRight: (aDefault?: number) => UnaryFunction<SitesBoundaryType, number> = partialLeft(pluckProperty, KEY_RIGHT);

/**
 * Selects the "right" property from SitesBoundaryType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectRight: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_RIGHT);
