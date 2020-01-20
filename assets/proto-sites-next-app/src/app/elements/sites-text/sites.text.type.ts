/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as xq3eDqJmD } from './../sites-alignment/sites.alignment.type';
import { SitesBackgroundType, isSitesBackgroundType as VGmGEEYLh } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as bhcW3LBlH } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { SitesLineHeightType, isSitesLineHeightType as V0jaRSMBc } from './../sites-line-height/sites.line.height.type';
import { SitesStylingType, isSitesStylingType as PXA4rZXEt } from './../sites-styling/sites.styling.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isOptional as R8L_djGws, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '373c81a5-d86b-4740-8f11-62fcbccfca08';
export const TYPE_NAME = 'Sites Text';
export const KEY_TEXT = 'text';
export const KEY_TEXT_STYLE = 'textStyle';
export const KEY_LINK_COLOR = 'linkColor';
export const KEY_BACKGROUND = 'background';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_LINE_HEIGHT = 'lineHeight';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Text
 * @id 373c81a5-d86b-4740-8f11-62fcbccfca08
 */
export interface SitesTextType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "formattedtext",
     *   "key": "text",
     *   "label": "text",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Text"
     *   }
     * }
     * ```
     */
    [KEY_TEXT]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "textStyle",
     *   "label": "Text Style",
     *   "typeRef": {
     *     "id": "cfa7081a-921d-4f50-a543-027b983b01b5"
     *   }
     * }
     * ```
     */
    [KEY_TEXT_STYLE]?: SitesStylingType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "linkColor",
     *   "label": "Link Color",
     *   "typeRef": {
     *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
     *   }
     * }
     * ```
     */
    [KEY_LINK_COLOR]?: SitesColorType;

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
     *   "key": "alignment",
     *   "label": "Alignment",
     *   "typeRef": {
     *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
     *   }
     * }
     * ```
     */
    [KEY_ALIGNMENT]?: SitesAlignmentType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "lineHeight",
     *   "label": "Line Height",
     *   "typeRef": {
     *     "id": "e5e97340-b03b-42ea-9d03-f8bc214f42b0"
     *   }
     * }
     * ```
     */
    [KEY_LINE_HEIGHT]?: SitesLineHeightType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "typeRef": {
     *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
     *   }
     * }
     * ```
     */
    [KEY_PADDING]?: SitesBoundaryType;

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
 * Tests if the value is of type SitesTextElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesTextElement else false
 */
export function isSitesTextType(aValue: any): aValue is SitesTextType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_TEXT], rCUctNoUC)
        && R8L_djGws(aValue[KEY_TEXT_STYLE], PXA4rZXEt)
        && R8L_djGws(aValue[KEY_LINK_COLOR], bhcW3LBlH)
        && R8L_djGws(aValue[KEY_BACKGROUND], VGmGEEYLh)
        && R8L_djGws(aValue[KEY_ALIGNMENT], xq3eDqJmD)
        && R8L_djGws(aValue[KEY_LINE_HEIGHT], V0jaRSMBc)
        && R8L_djGws(aValue[KEY_PADDING], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_MARGIN], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
    ;
}

/**
 * Selects the "text" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectText: (aDefault?: string) => UnaryFunction<SitesTextType, string> = partialLeft(pluckProperty, KEY_TEXT);

/**
 * Selects the "text" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectText: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesTextType, string> = partialLeft(rxSelectProperty, KEY_TEXT);

/**
 * Selects the "textStyle" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTextStyle: (aDefault?: SitesStylingType) => UnaryFunction<SitesTextType, SitesStylingType> = partialLeft(pluckProperty, KEY_TEXT_STYLE);

/**
 * Selects the "textStyle" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTextStyle: (aDefault?: SitesStylingType, aCmp?: EqualsPredicate<SitesStylingType>) => OperatorFunction<SitesTextType, SitesStylingType> = partialLeft(rxSelectProperty, KEY_TEXT_STYLE);

/**
 * Selects the "linkColor" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLinkColor: (aDefault?: SitesColorType) => UnaryFunction<SitesTextType, SitesColorType> = partialLeft(pluckProperty, KEY_LINK_COLOR);

/**
 * Selects the "linkColor" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLinkColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesTextType, SitesColorType> = partialLeft(rxSelectProperty, KEY_LINK_COLOR);

/**
 * Selects the "background" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesTextType, SitesBackgroundType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) => OperatorFunction<SitesTextType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "alignment" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesTextType, SitesAlignmentType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) => OperatorFunction<SitesTextType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "lineHeight" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineHeight: (aDefault?: SitesLineHeightType) => UnaryFunction<SitesTextType, SitesLineHeightType> = partialLeft(pluckProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "lineHeight" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineHeight: (aDefault?: SitesLineHeightType, aCmp?: EqualsPredicate<SitesLineHeightType>) => OperatorFunction<SitesTextType, SitesLineHeightType> = partialLeft(rxSelectProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "padding" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesTextType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesTextType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesTextType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesTextType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "commonSettings" property from SitesTextType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesTextType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesTextType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesTextType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
