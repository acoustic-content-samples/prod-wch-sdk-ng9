/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as VGmGEEYLh } from './../sites-background/sites.background.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'b2a9542d-b432-48b3-8322-2464765f323b';
export const TYPE_NAME = 'Sites Spacer';
export const KEY_BACKGROUND = 'background';
export const KEY_HEIGHT = 'height';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Spacer
 * @id b2a9542d-b432-48b3-8322-2464765f323b
 */
export interface SitesSpacerType {
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
     *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: SitesBackgroundType;

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
     *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: SitesCommonSettingsType;
}

/**
 * Tests if the value is of type SitesSpacerElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesSpacerElement else false
 */
export function isSitesSpacerType(aValue: any): aValue is SitesSpacerType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_BACKGROUND], VGmGEEYLh)
        && R8L_djGws(aValue[KEY_HEIGHT], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
    ;
}

/**
 * Selects the "background" property from SitesSpacerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesSpacerType, SitesBackgroundType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from SitesSpacerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) => OperatorFunction<SitesSpacerType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "height" property from SitesSpacerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHeight: (aDefault?: number) => UnaryFunction<SitesSpacerType, number> = partialLeft(pluckProperty, KEY_HEIGHT);

/**
 * Selects the "height" property from SitesSpacerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHeight: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesSpacerType, number> = partialLeft(rxSelectProperty, KEY_HEIGHT);

/**
 * Selects the "commonSettings" property from SitesSpacerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesSpacerType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesSpacerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesSpacerType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
