/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as NVPjsLNsq, isNumber as hxPz3acLB, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '6854f419-3b8b-4410-8d33-134a485d05a3';
export const TYPE_NAME = 'Sites Navigation Component';
export const KEY_STARTING_WITH_NAVIGATION_LEVEL = 'startingWithNavigationLevel';
export const KEY_NUMBER_OF_NAVIGATION_LEVELS = 'numberOfNavigationLevels';

/*
 * @name Sites Navigation Component
 * @id 6854f419-3b8b-4410-8d33-134a485d05a3
 */
export interface SitesNavigationComponentType {
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
     *   "key": "startingWithNavigationLevel",
     *   "label": "Starting with Navigation Level",
     *   "required": true
     * }
     * ```
     */
    [KEY_STARTING_WITH_NAVIGATION_LEVEL]: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "numberOfNavigationLevels",
     *   "label": "Number of Navigation Levels",
     *   "required": true
     * }
     * ```
     */
    [KEY_NUMBER_OF_NAVIGATION_LEVELS]: number;
}

/**
 * Tests if the value is of type SitesNavigationComponentElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesNavigationComponentElement else false
 */
export function isSitesNavigationComponentType(aValue: any): aValue is SitesNavigationComponentType {
    return NVPjsLNsq(aValue)
        && hxPz3acLB(aValue[KEY_STARTING_WITH_NAVIGATION_LEVEL])
        && hxPz3acLB(aValue[KEY_NUMBER_OF_NAVIGATION_LEVELS])
    ;
}

/**
 * Selects the "startingWithNavigationLevel" property from SitesNavigationComponentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStartingWithNavigationLevel: (aDefault?: number) => UnaryFunction<SitesNavigationComponentType, number> = partialLeft(pluckProperty, KEY_STARTING_WITH_NAVIGATION_LEVEL);

/**
 * Selects the "startingWithNavigationLevel" property from SitesNavigationComponentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStartingWithNavigationLevel: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesNavigationComponentType, number> = partialLeft(rxSelectProperty, KEY_STARTING_WITH_NAVIGATION_LEVEL);

/**
 * Selects the "numberOfNavigationLevels" property from SitesNavigationComponentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectNumberOfNavigationLevels: (aDefault?: number) => UnaryFunction<SitesNavigationComponentType, number> = partialLeft(pluckProperty, KEY_NUMBER_OF_NAVIGATION_LEVELS);

/**
 * Selects the "numberOfNavigationLevels" property from SitesNavigationComponentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectNumberOfNavigationLevels: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesNavigationComponentType, number> = partialLeft(rxSelectProperty, KEY_NUMBER_OF_NAVIGATION_LEVELS);
