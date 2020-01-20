/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { BackgroundExtensionType, isBackgroundExtensionType as V67Bg9fqa } from './../background-extension/background.extension.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ButtonGroupType, isButtonGroupType as vNiQReyby } from './../button-group/button.group.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { CustomImageGroupType, isCustomImageGroupType as nwSka6pKf } from './../custom-image-group/custom.image.group.type';
import { TextGroupType, isTextGroupType as v4P7rZoZG } from './../text-group/text.group.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'e98ba889-d5e4-4b9b-8c42-e3a5c35a10d3';
export const TYPE_NAME = 'Promotion';
export const KEY_BACKGROUND = 'background';
export const KEY_MARGINS = 'margins';
export const KEY_TEXT_GROUP = 'textGroup';
export const KEY_IMAGE_GROUP = 'imageGroup';
export const KEY_BUTTON_GROUP = 'buttonGroup';
export const KEY_COMMON_SETTINGS = 'commonSettings';
export const KEY_LAYOUT = 'layout';

/*
 * @name Promotion
 * @id e98ba889-d5e4-4b9b-8c42-e3a5c35a10d3
 */
export interface PromotionType {
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
     *   "elementType": "group",
     *   "key": "margins",
     *   "label": "Margins",
     *   "typeRef": {
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_MARGINS]?: BoundaryOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "textGroup",
     *   "label": "Text",
     *   "typeRef": {
     *     "id": "f71e2d31-6536-4016-9f89-c6848d0f4b55"
     *   }
     * }
     * ```
     */
    [KEY_TEXT_GROUP]?: TextGroupType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "imageGroup",
     *   "label": "Image",
     *   "typeRef": {
     *     "id": "39bd65fc-2733-4c8a-a700-3075f127fb2d"
     *   }
     * }
     * ```
     */
    [KEY_IMAGE_GROUP]?: CustomImageGroupType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "buttonGroup",
     *   "label": "Button",
     *   "typeRef": {
     *     "id": "2d9f0c5e-8a89-4b8c-abfc-7d2de4f623dd"
     *   }
     * }
     * ```
     */
    [KEY_BUTTON_GROUP]?: ButtonGroupType;

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

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "layout",
     *   "label": "Layout",
     *   "options": [
     *     {
     *       "label": "Image Left",
     *       "selection": "image-left"
     *     },
     *     {
     *       "label": "Image Right",
     *       "selection": "image-right"
     *     },
     *     {
     *       "label": "Image Top",
     *       "selection": "image-top"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LAYOUT]?: string;
}

/**
 * Tests if the value is of type PromotionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PromotionElement else false
 */
export function isPromotionType(aValue: any): aValue is PromotionType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_BACKGROUND], V67Bg9fqa)
        && _krhmaXp(aValue[KEY_MARGINS], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_TEXT_GROUP], v4P7rZoZG)
        && _krhmaXp(aValue[KEY_IMAGE_GROUP], nwSka6pKf)
        && _krhmaXp(aValue[KEY_BUTTON_GROUP], vNiQReyby)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
        && _krhmaXp(aValue[KEY_LAYOUT], Dp8dLCd6c)
    ;
}

/**
 * Selects the "background" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: BackgroundExtensionType) => UnaryFunction<PromotionType, BackgroundExtensionType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: BackgroundExtensionType, aCmp?: EqualsPredicate<BackgroundExtensionType>) => OperatorFunction<PromotionType, BackgroundExtensionType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "margins" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargins: (aDefault?: BoundaryOptionsType) => UnaryFunction<PromotionType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_MARGINS);

/**
 * Selects the "margins" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargins: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<PromotionType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_MARGINS);

/**
 * Selects the "textGroup" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTextGroup: (aDefault?: TextGroupType) => UnaryFunction<PromotionType, TextGroupType> = partialLeft(pluckProperty, KEY_TEXT_GROUP);

/**
 * Selects the "textGroup" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTextGroup: (aDefault?: TextGroupType, aCmp?: EqualsPredicate<TextGroupType>) => OperatorFunction<PromotionType, TextGroupType> = partialLeft(rxSelectProperty, KEY_TEXT_GROUP);

/**
 * Selects the "imageGroup" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImageGroup: (aDefault?: CustomImageGroupType) => UnaryFunction<PromotionType, CustomImageGroupType> = partialLeft(pluckProperty, KEY_IMAGE_GROUP);

/**
 * Selects the "imageGroup" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImageGroup: (aDefault?: CustomImageGroupType, aCmp?: EqualsPredicate<CustomImageGroupType>) => OperatorFunction<PromotionType, CustomImageGroupType> = partialLeft(rxSelectProperty, KEY_IMAGE_GROUP);

/**
 * Selects the "buttonGroup" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectButtonGroup: (aDefault?: ButtonGroupType) => UnaryFunction<PromotionType, ButtonGroupType> = partialLeft(pluckProperty, KEY_BUTTON_GROUP);

/**
 * Selects the "buttonGroup" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectButtonGroup: (aDefault?: ButtonGroupType, aCmp?: EqualsPredicate<ButtonGroupType>) => OperatorFunction<PromotionType, ButtonGroupType> = partialLeft(rxSelectProperty, KEY_BUTTON_GROUP);

/**
 * Selects the "commonSettings" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<PromotionType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<PromotionType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "layout" property from PromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLayout: (aDefault?: string) => UnaryFunction<PromotionType, string> = partialLeft(pluckProperty, KEY_LAYOUT);

/**
 * Selects the "layout" property from PromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PromotionType, string> = partialLeft(rxSelectProperty, KEY_LAYOUT);
