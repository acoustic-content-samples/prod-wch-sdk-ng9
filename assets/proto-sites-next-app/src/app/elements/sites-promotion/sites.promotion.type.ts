/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as VGmGEEYLh } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesButtonType, isSitesButtonType as P4s6zvq7I } from './../sites-button/sites.button.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { SitesImageType, isSitesImageType as P$OxV1wsJ } from './../sites-image/sites.image.type';
import { SitesTextType, isSitesTextType as jYIip5Djt } from './../sites-text/sites.text.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isOptional as R8L_djGws, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '0b1c47a9-eb31-49ec-8fd7-89ca21a36b36';
export const TYPE_NAME = 'Sites Promotion';
export const KEY_BACKGROUND = 'background';
export const KEY_MARGIN = 'margin';
export const KEY_TEXT = 'text';
export const KEY_IMAGE = 'image';
export const KEY_BUTTON = 'button';
export const KEY_COMMON_SETTINGS = 'commonSettings';
export const KEY_LAYOUT = 'layout';

/*
 * @name Sites Promotion
 * @id 0b1c47a9-eb31-49ec-8fd7-89ca21a36b36
 */
export interface SitesPromotionType {
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
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margin",
     *   "typeRef": {
     *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
     *   }
     * }
     * ```
     */
    [KEY_MARGIN]?: SitesBoundaryType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "text",
     *   "label": "Text",
     *   "typeRef": {
     *     "id": "373c81a5-d86b-4740-8f11-62fcbccfca08"
     *   }
     * }
     * ```
     */
    [KEY_TEXT]?: SitesTextType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "image",
     *   "label": "Image",
     *   "typeRef": {
     *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
     *   }
     * }
     * ```
     */
    [KEY_IMAGE]?: SitesImageType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "button",
     *   "label": "Button",
     *   "typeRef": {
     *     "id": "dee92057-69e3-489b-b13b-15f9b28770a1"
     *   }
     * }
     * ```
     */
    [KEY_BUTTON]?: SitesButtonType;

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
 * Tests if the value is of type SitesPromotionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesPromotionElement else false
 */
export function isSitesPromotionType(aValue: any): aValue is SitesPromotionType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_BACKGROUND], VGmGEEYLh)
        && R8L_djGws(aValue[KEY_MARGIN], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_TEXT], jYIip5Djt)
        && R8L_djGws(aValue[KEY_IMAGE], P$OxV1wsJ)
        && R8L_djGws(aValue[KEY_BUTTON], P4s6zvq7I)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
        && R8L_djGws(aValue[KEY_LAYOUT], rCUctNoUC)
    ;
}

/**
 * Selects the "background" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesPromotionType, SitesBackgroundType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) => OperatorFunction<SitesPromotionType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "margin" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesPromotionType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesPromotionType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "text" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectText: (aDefault?: SitesTextType) => UnaryFunction<SitesPromotionType, SitesTextType> = partialLeft(pluckProperty, KEY_TEXT);

/**
 * Selects the "text" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectText: (aDefault?: SitesTextType, aCmp?: EqualsPredicate<SitesTextType>) => OperatorFunction<SitesPromotionType, SitesTextType> = partialLeft(rxSelectProperty, KEY_TEXT);

/**
 * Selects the "image" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: SitesImageType) => UnaryFunction<SitesPromotionType, SitesImageType> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) => OperatorFunction<SitesPromotionType, SitesImageType> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "button" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectButton: (aDefault?: SitesButtonType) => UnaryFunction<SitesPromotionType, SitesButtonType> = partialLeft(pluckProperty, KEY_BUTTON);

/**
 * Selects the "button" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectButton: (aDefault?: SitesButtonType, aCmp?: EqualsPredicate<SitesButtonType>) => OperatorFunction<SitesPromotionType, SitesButtonType> = partialLeft(rxSelectProperty, KEY_BUTTON);

/**
 * Selects the "commonSettings" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesPromotionType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesPromotionType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "layout" property from SitesPromotionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLayout: (aDefault?: string) => UnaryFunction<SitesPromotionType, string> = partialLeft(pluckProperty, KEY_LAYOUT);

/**
 * Selects the "layout" property from SitesPromotionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesPromotionType, string> = partialLeft(rxSelectProperty, KEY_LAYOUT);
