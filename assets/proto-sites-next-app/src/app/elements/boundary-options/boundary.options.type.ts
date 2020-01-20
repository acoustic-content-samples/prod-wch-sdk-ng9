/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '9c5e08f5-e54d-42c4-b855-c73eb0908022';
export const TYPE_NAME = 'Boundary options';
export const KEY_TOP = 'top';
export const KEY_BOTTOM = 'bottom';
export const KEY_LEFT = 'left';
export const KEY_RIGHT = 'right';

/*
 * @name Boundary options
 * @id 9c5e08f5-e54d-42c4-b855-c73eb0908022
 */
export interface BoundaryOptionsType {
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
 * Tests if the value is of type BoundaryOptionsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type BoundaryOptionsElement else false
 */
export function isBoundaryOptionsType(aValue: any): aValue is BoundaryOptionsType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_TOP], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_BOTTOM], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_LEFT], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_RIGHT], hSMeY2NBd)
    ;
}

/**
 * Selects the "top" property from BoundaryOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTop: (aDefault?: number) => UnaryFunction<BoundaryOptionsType, number> = partialLeft(pluckProperty, KEY_TOP);

/**
 * Selects the "top" property from BoundaryOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTop: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<BoundaryOptionsType, number> = partialLeft(rxSelectProperty, KEY_TOP);

/**
 * Selects the "bottom" property from BoundaryOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBottom: (aDefault?: number) => UnaryFunction<BoundaryOptionsType, number> = partialLeft(pluckProperty, KEY_BOTTOM);

/**
 * Selects the "bottom" property from BoundaryOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBottom: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<BoundaryOptionsType, number> = partialLeft(rxSelectProperty, KEY_BOTTOM);

/**
 * Selects the "left" property from BoundaryOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLeft: (aDefault?: number) => UnaryFunction<BoundaryOptionsType, number> = partialLeft(pluckProperty, KEY_LEFT);

/**
 * Selects the "left" property from BoundaryOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLeft: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<BoundaryOptionsType, number> = partialLeft(rxSelectProperty, KEY_LEFT);

/**
 * Selects the "right" property from BoundaryOptionsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectRight: (aDefault?: number) => UnaryFunction<BoundaryOptionsType, number> = partialLeft(pluckProperty, KEY_RIGHT);

/**
 * Selects the "right" property from BoundaryOptionsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectRight: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<BoundaryOptionsType, number> = partialLeft(rxSelectProperty, KEY_RIGHT);
