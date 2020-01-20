/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as xq3eDqJmD } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as bhcW3LBlH } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'd550249a-83b2-4e46-96d1-519732fa5787';
export const TYPE_NAME = 'Sites Divider';
export const KEY_LINE_TYPE = 'lineType';
export const KEY_LINE_COLOR = 'lineColor';
export const KEY_OPACITY = 'opacity';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_MARGIN = 'margin';
export const KEY_LINE_WEIGHT = 'lineWeight';
export const KEY_WIDTH = 'width';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Divider
 * @id d550249a-83b2-4e46-96d1-519732fa5787
 */
export interface SitesDividerType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "lineType",
     *   "label": "Line type",
     *   "options": [
     *     {
     *       "label": "Solid",
     *       "selection": "solid"
     *     },
     *     {
     *       "label": "Dotted",
     *       "selection": "dotted"
     *     },
     *     {
     *       "label": "Dashed",
     *       "selection": "dashed"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LINE_TYPE]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "lineColor",
     *   "label": "Line color",
     *   "typeRef": {
     *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
     *   }
     * }
     * ```
     */
    [KEY_LINE_COLOR]?: SitesColorType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "opacity",
     *   "label": "Opacity"
     * }
     * ```
     */
    [KEY_OPACITY]?: number;

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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "lineWeight",
     *   "label": "Line weight",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_LINE_WEIGHT]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "width",
     *   "label": "Width"
     * }
     * ```
     */
    [KEY_WIDTH]?: number;

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
 * Tests if the value is of type SitesDividerElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesDividerElement else false
 */
export function isSitesDividerType(aValue: any): aValue is SitesDividerType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_LINE_TYPE], rCUctNoUC)
        && R8L_djGws(aValue[KEY_LINE_COLOR], bhcW3LBlH)
        && R8L_djGws(aValue[KEY_OPACITY], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_ALIGNMENT], xq3eDqJmD)
        && R8L_djGws(aValue[KEY_MARGIN], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_LINE_WEIGHT], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_WIDTH], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
    ;
}

/**
 * Selects the "lineType" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineType: (aDefault?: string) => UnaryFunction<SitesDividerType, string> = partialLeft(pluckProperty, KEY_LINE_TYPE);

/**
 * Selects the "lineType" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineType: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesDividerType, string> = partialLeft(rxSelectProperty, KEY_LINE_TYPE);

/**
 * Selects the "lineColor" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineColor: (aDefault?: SitesColorType) => UnaryFunction<SitesDividerType, SitesColorType> = partialLeft(pluckProperty, KEY_LINE_COLOR);

/**
 * Selects the "lineColor" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesDividerType, SitesColorType> = partialLeft(rxSelectProperty, KEY_LINE_COLOR);

/**
 * Selects the "opacity" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectOpacity: (aDefault?: number) => UnaryFunction<SitesDividerType, number> = partialLeft(pluckProperty, KEY_OPACITY);

/**
 * Selects the "opacity" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectOpacity: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesDividerType, number> = partialLeft(rxSelectProperty, KEY_OPACITY);

/**
 * Selects the "alignment" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesDividerType, SitesAlignmentType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) => OperatorFunction<SitesDividerType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "margin" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesDividerType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesDividerType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "lineWeight" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineWeight: (aDefault?: number) => UnaryFunction<SitesDividerType, number> = partialLeft(pluckProperty, KEY_LINE_WEIGHT);

/**
 * Selects the "lineWeight" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineWeight: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesDividerType, number> = partialLeft(rxSelectProperty, KEY_LINE_WEIGHT);

/**
 * Selects the "width" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectWidth: (aDefault?: number) => UnaryFunction<SitesDividerType, number> = partialLeft(pluckProperty, KEY_WIDTH);

/**
 * Selects the "width" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectWidth: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesDividerType, number> = partialLeft(rxSelectProperty, KEY_WIDTH);

/**
 * Selects the "commonSettings" property from SitesDividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesDividerType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesDividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesDividerType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
