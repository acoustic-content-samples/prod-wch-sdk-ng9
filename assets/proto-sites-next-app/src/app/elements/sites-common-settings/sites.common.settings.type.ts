/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as t1jjvzm0n, isNotNil as p_CWR7uKB, isOptional as _nKTVr$OH, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'dba345e3-10a0-44ed-b0aa-6cffe74e1343';
export const TYPE_NAME = 'Sites Common Settings';
export const KEY_APPLY_TO_ALL = 'applyToAll';
export const KEY_HIDE_ON_MOBILE = 'hideOnMobile';

/*
 * @name Sites Common Settings
 * @id dba345e3-10a0-44ed-b0aa-6cffe74e1343
 */
export interface SitesCommonSettingsType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "applyToAll",
     *   "label": "Apply to all"
     * }
     * ```
     */
    [KEY_APPLY_TO_ALL]?: boolean;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "hideOnMobile",
     *   "label": "Hide on mobile",
     *   "locked": false
     * }
     * ```
     */
    [KEY_HIDE_ON_MOBILE]?: boolean;
}

/**
 * Tests if the value is of type SitesCommonSettingsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesCommonSettingsElement else false
 */
export function isSitesCommonSettingsType(aValue: any): aValue is SitesCommonSettingsType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_APPLY_TO_ALL], t1jjvzm0n)
        && _nKTVr$OH(aValue[KEY_HIDE_ON_MOBILE], t1jjvzm0n)
    ;
}

/**
 * Selects the "applyToAll" property from SitesCommonSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectApplyToAll: (aDefault?: boolean) => UnaryFunction<SitesCommonSettingsType, boolean> = partialLeft(pluckProperty, KEY_APPLY_TO_ALL);

/**
 * Selects the "applyToAll" property from SitesCommonSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectApplyToAll: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<SitesCommonSettingsType, boolean> = partialLeft(rxSelectProperty, KEY_APPLY_TO_ALL);

/**
 * Selects the "hideOnMobile" property from SitesCommonSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHideOnMobile: (aDefault?: boolean) => UnaryFunction<SitesCommonSettingsType, boolean> = partialLeft(pluckProperty, KEY_HIDE_ON_MOBILE);

/**
 * Selects the "hideOnMobile" property from SitesCommonSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHideOnMobile: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<SitesCommonSettingsType, boolean> = partialLeft(rxSelectProperty, KEY_HIDE_ON_MOBILE);
