/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as RX05_LHoj } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as TgKLZShW } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as lLVmTfpBc } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as fUYDdt9$q } from './../sites-common-settings/sites.common.settings.type';
import { SitesLineHeightType, isSitesLineHeightType as jbgviOyJD } from './../sites-line-height/sites.line.height.type';
import { SitesStylingType, isSitesStylingType as tny3LGQPa } from './../sites-styling/sites.styling.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as tnWMtKrDr, isNotNil as tgb0zYfmk, isNumber as BleAkOa2k, isOptional as r7f9leBwp, isString as BaUcdvJ$t, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'dee92057-69e3-489b-b13b-15f9b28770a1';
export const TYPE_NAME = 'Sites Button';
export const KEY_LABEL = 'label';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_STYLE = 'style';
export const KEY_LINK = 'link';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_LINE_HEIGHT = 'lineHeight';
export const KEY_CORNER_RADIUS = 'cornerRadius';
export const KEY_PADDING = 'padding';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Button
 * @id dee92057-69e3-489b-b13b-15f9b28770a1
 */
export interface SitesButtonType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "label",
     *   "label": "Button label",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Button text"
     *   }
     * }
     * ```
     */
    [KEY_LABEL]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "typeRef": {
     *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: SitesColorType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "style",
     *   "label": "Style",
     *   "typeRef": {
     *     "id": "cfa7081a-921d-4f50-a543-027b983b01b5"
     *   }
     * }
     * ```
     */
    [KEY_STYLE]?: SitesStylingType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "link",
     *   "label": "Link"
     * }
     * ```
     */
    [KEY_LINK]?: Link;

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
     *   "label": "Line height",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "cornerRadius",
     *   "label": "Corner radius",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_CORNER_RADIUS]?: number;

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
 * Tests if the value is of type SitesButtonElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesButtonElement else false
 */
export function isSitesButtonType(aValue: any): aValue is SitesButtonType {
    return tgb0zYfmk(aValue)
        && r7f9leBwp(aValue[KEY_LABEL], BaUcdvJ$t)
        && r7f9leBwp(aValue[KEY_BACKGROUND_COLOR], lLVmTfpBc)
        && r7f9leBwp(aValue[KEY_STYLE], tny3LGQPa)
        && r7f9leBwp(aValue[KEY_LINK], tnWMtKrDr)
        && r7f9leBwp(aValue[KEY_ALIGNMENT], RX05_LHoj)
        && r7f9leBwp(aValue[KEY_LINE_HEIGHT], jbgviOyJD)
        && r7f9leBwp(aValue[KEY_CORNER_RADIUS], BleAkOa2k)
        && r7f9leBwp(aValue[KEY_PADDING], TgKLZShW)
        && r7f9leBwp(aValue[KEY_COMMON_SETTINGS], fUYDdt9$q)
    ;
}

/**
 * Selects the "label" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLabel: (aDefault?: string) => UnaryFunction<SitesButtonType, string> = partialLeft(pluckProperty, KEY_LABEL);

/**
 * Selects the "label" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLabel: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesButtonType, string> = partialLeft(rxSelectProperty, KEY_LABEL);

/**
 * Selects the "backgroundColor" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesButtonType, SitesColorType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesButtonType, SitesColorType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "style" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStyle: (aDefault?: SitesStylingType) => UnaryFunction<SitesButtonType, SitesStylingType> = partialLeft(pluckProperty, KEY_STYLE);

/**
 * Selects the "style" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStyle: (aDefault?: SitesStylingType, aCmp?: EqualsPredicate<SitesStylingType>) => OperatorFunction<SitesButtonType, SitesStylingType> = partialLeft(rxSelectProperty, KEY_STYLE);

/**
 * Selects the "link" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLink: (aDefault?: Link) => UnaryFunction<SitesButtonType, Link> = partialLeft(pluckProperty, KEY_LINK);

/**
 * Selects the "link" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLink: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) => OperatorFunction<SitesButtonType, Link> = partialLeft(rxSelectProperty, KEY_LINK);

/**
 * Selects the "alignment" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesButtonType, SitesAlignmentType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) => OperatorFunction<SitesButtonType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "lineHeight" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineHeight: (aDefault?: SitesLineHeightType) => UnaryFunction<SitesButtonType, SitesLineHeightType> = partialLeft(pluckProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "lineHeight" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineHeight: (aDefault?: SitesLineHeightType, aCmp?: EqualsPredicate<SitesLineHeightType>) => OperatorFunction<SitesButtonType, SitesLineHeightType> = partialLeft(rxSelectProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "cornerRadius" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCornerRadius: (aDefault?: number) => UnaryFunction<SitesButtonType, number> = partialLeft(pluckProperty, KEY_CORNER_RADIUS);

/**
 * Selects the "cornerRadius" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCornerRadius: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesButtonType, number> = partialLeft(rxSelectProperty, KEY_CORNER_RADIUS);

/**
 * Selects the "padding" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesButtonType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesButtonType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "commonSettings" property from SitesButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesButtonType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesButtonType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
