/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as _4RmgQx9_, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'eeff476e-0559-444f-97d1-486a10a86b80';
export const TYPE_NAME = 'Common settings';
export const KEY_APPLY_TO_ALL = 'applyToAll';
export const KEY_HIDE_ON_MOBILE = 'hideOnMobile';

/*
 * @name Common settings
 * @id eeff476e-0559-444f-97d1-486a10a86b80
 */
export interface CommonSettingsType {
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
 * Tests if the value is of type CommonSettingsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type CommonSettingsElement else false
 */
export function isCommonSettingsType(aValue: any): aValue is CommonSettingsType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_APPLY_TO_ALL], _4RmgQx9_)
        && _krhmaXp(aValue[KEY_HIDE_ON_MOBILE], _4RmgQx9_)
    ;
}

/**
 * Selects the "applyToAll" property from CommonSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectApplyToAll: (aDefault?: boolean) => UnaryFunction<CommonSettingsType, boolean> = partialLeft(pluckProperty, KEY_APPLY_TO_ALL);

/**
 * Selects the "applyToAll" property from CommonSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectApplyToAll: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<CommonSettingsType, boolean> = partialLeft(rxSelectProperty, KEY_APPLY_TO_ALL);

/**
 * Selects the "hideOnMobile" property from CommonSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHideOnMobile: (aDefault?: boolean) => UnaryFunction<CommonSettingsType, boolean> = partialLeft(pluckProperty, KEY_HIDE_ON_MOBILE);

/**
 * Selects the "hideOnMobile" property from CommonSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHideOnMobile: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<CommonSettingsType, boolean> = partialLeft(rxSelectProperty, KEY_HIDE_ON_MOBILE);
