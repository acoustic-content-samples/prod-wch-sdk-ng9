/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'aa358e28-2e60-416a-97d7-d1a6dd5e165b';
export const TYPE_NAME = 'HTML';
export const KEY_CODE = 'code';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name HTML
 * @id aa358e28-2e60-416a-97d7-d1a6dd5e165b
 */
export interface HtmlType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "displayHeight": 30,
     *   "displayType": "multiLine",
     *   "elementType": "text",
     *   "helpText": "Provide your custom HTML code here. You can also include handlebar references to the current rendering context.",
     *   "key": "code",
     *   "label": "Code",
     *   "minLength": 1,
     *   "placeholder": {
     *     "show": true,
     *     "text": "Compose your HTML and Handlebar code here."
     *   }
     * }
     * ```
     */
    [KEY_CODE]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "typeRef": {
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_PADDING]?: BoundaryOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margin",
     *   "typeRef": {
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_MARGIN]?: BoundaryOptionsType;

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
 * Tests if the value is of type HtmlElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type HtmlElement else false
 */
export function isHtmlType(aValue: any): aValue is HtmlType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_CODE], Dp8dLCd6c)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_MARGIN], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "code" property from HtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCode: (aDefault?: string) => UnaryFunction<HtmlType, string> = partialLeft(pluckProperty, KEY_CODE);

/**
 * Selects the "code" property from HtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCode: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<HtmlType, string> = partialLeft(rxSelectProperty, KEY_CODE);

/**
 * Selects the "padding" property from HtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<HtmlType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from HtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<HtmlType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from HtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: BoundaryOptionsType) => UnaryFunction<HtmlType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from HtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<HtmlType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "commonSettings" property from HtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<HtmlType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from HtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<HtmlType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
