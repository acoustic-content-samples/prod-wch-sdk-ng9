/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as xq3eDqJmD } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as bhcW3LBlH } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { SitesStylingType, isSitesStylingType as PXA4rZXEt } from './../sites-styling/sites.styling.type';
import { SitesVerticalRuleType, isSitesVerticalRuleType as tZISUswOE } from './../sites-vertical-rule/sites.vertical.rule.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isArrayOf as LEWkq_2xn, isLink as HFqsGMCHx, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'd0f831c3-1b0a-41ba-8a6b-10f2eca3789a';
export const TYPE_NAME = 'Sites Link Bar';
export const KEY_LINKS = 'links';
export const KEY_TEXT_STYLE = 'textStyle';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_SPACING_BETWEEN_LINKS = 'spacingBetweenLinks';
export const KEY_PADDING = 'padding';
export const KEY_VERTICAL_RULE = 'verticalRule';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Link Bar
 * @id d0f831c3-1b0a-41ba-8a6b-10f2eca3789a
 */
export interface SitesLinkBarType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "link",
     *   "fieldLabel": "Links",
     *   "key": "links",
     *   "label": "Links",
     *   "maximumValues": 7,
     *   "minimumValues": 2,
     *   "required": true
     * }
     * ```
     */
    [KEY_LINKS]: Link[];

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
     *   "key": "backgroundColor",
     *   "label": "Background Color",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacingBetweenLinks",
     *   "label": "Spacing between links"
     * }
     * ```
     */
    [KEY_SPACING_BETWEEN_LINKS]?: number;

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
     *   "key": "verticalRule",
     *   "label": "Vertical Rule",
     *   "typeRef": {
     *     "id": "8e460c39-9cf6-4a78-9726-ee43ad961a8a"
     *   }
     * }
     * ```
     */
    [KEY_VERTICAL_RULE]?: SitesVerticalRuleType;

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
 * Tests if the value is of type SitesLinkBarElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesLinkBarElement else false
 */
export function isSitesLinkBarType(aValue: any): aValue is SitesLinkBarType {
    return TdFcxLjhv(aValue)
        && LEWkq_2xn(aValue[KEY_LINKS], HFqsGMCHx)
        && R8L_djGws(aValue[KEY_TEXT_STYLE], PXA4rZXEt)
        && R8L_djGws(aValue[KEY_BACKGROUND_COLOR], bhcW3LBlH)
        && R8L_djGws(aValue[KEY_ALIGNMENT], xq3eDqJmD)
        && R8L_djGws(aValue[KEY_SPACING_BETWEEN_LINKS], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_PADDING], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_VERTICAL_RULE], tZISUswOE)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
    ;
}

/**
 * Selects the "links" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLinks: (aDefault?: Link[]) => UnaryFunction<SitesLinkBarType, Link[]> = partialLeft(pluckProperty, KEY_LINKS);

/**
 * Selects the "links" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLinks: (aDefault?: Link[], aCmp?: EqualsPredicate<Link[]>) => OperatorFunction<SitesLinkBarType, Link[]> = partialLeft(rxSelectProperty, KEY_LINKS);

/**
 * Selects the "textStyle" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTextStyle: (aDefault?: SitesStylingType) => UnaryFunction<SitesLinkBarType, SitesStylingType> = partialLeft(pluckProperty, KEY_TEXT_STYLE);

/**
 * Selects the "textStyle" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTextStyle: (aDefault?: SitesStylingType, aCmp?: EqualsPredicate<SitesStylingType>) => OperatorFunction<SitesLinkBarType, SitesStylingType> = partialLeft(rxSelectProperty, KEY_TEXT_STYLE);

/**
 * Selects the "backgroundColor" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesLinkBarType, SitesColorType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesLinkBarType, SitesColorType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "alignment" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesLinkBarType, SitesAlignmentType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) => OperatorFunction<SitesLinkBarType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "spacingBetweenLinks" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpacingBetweenLinks: (aDefault?: number) => UnaryFunction<SitesLinkBarType, number> = partialLeft(pluckProperty, KEY_SPACING_BETWEEN_LINKS);

/**
 * Selects the "spacingBetweenLinks" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpacingBetweenLinks: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesLinkBarType, number> = partialLeft(rxSelectProperty, KEY_SPACING_BETWEEN_LINKS);

/**
 * Selects the "padding" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesLinkBarType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesLinkBarType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "verticalRule" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectVerticalRule: (aDefault?: SitesVerticalRuleType) => UnaryFunction<SitesLinkBarType, SitesVerticalRuleType> = partialLeft(pluckProperty, KEY_VERTICAL_RULE);

/**
 * Selects the "verticalRule" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectVerticalRule: (aDefault?: SitesVerticalRuleType, aCmp?: EqualsPredicate<SitesVerticalRuleType>) => OperatorFunction<SitesLinkBarType, SitesVerticalRuleType> = partialLeft(rxSelectProperty, KEY_VERTICAL_RULE);

/**
 * Selects the "commonSettings" property from SitesLinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesLinkBarType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesLinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesLinkBarType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
