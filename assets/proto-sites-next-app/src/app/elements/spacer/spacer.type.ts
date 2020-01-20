/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { BackgroundExtensionType, isBackgroundExtensionType as V67Bg9fqa } from './../background-extension/background.extension.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '209c5579-4e6d-4e88-9c47-76de4c25c6f8';
export const TYPE_NAME = 'Spacer';
export const KEY_BACKGROUND = 'background';
export const KEY_HEIGHT = 'height';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Spacer
 * @id 209c5579-4e6d-4e88-9c47-76de4c25c6f8
 */
export interface SpacerType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "typeRef": {
     *     "id": "8c4a8b02-67a1-4849-8e2d-f90be58485c5"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: BackgroundExtensionType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "height",
     *   "label": "Spacer height",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_HEIGHT]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "typeRef": {
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}

/**
 * Tests if the value is of type SpacerElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SpacerElement else false
 */
export function isSpacerType(aValue: any): aValue is SpacerType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_BACKGROUND], V67Bg9fqa)
        && _krhmaXp(aValue[KEY_HEIGHT], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "background" property from SpacerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: BackgroundExtensionType) => UnaryFunction<SpacerType, BackgroundExtensionType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from SpacerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: BackgroundExtensionType, aCmp?: EqualsPredicate<BackgroundExtensionType>) => OperatorFunction<SpacerType, BackgroundExtensionType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "height" property from SpacerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHeight: (aDefault?: number) => UnaryFunction<SpacerType, number> = partialLeft(pluckProperty, KEY_HEIGHT);

/**
 * Selects the "height" property from SpacerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHeight: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SpacerType, number> = partialLeft(rxSelectProperty, KEY_HEIGHT);

/**
 * Selects the "commonSettings" property from SpacerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<SpacerType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SpacerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<SpacerType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
