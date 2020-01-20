/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBoundaryType, isSitesBoundaryType as NvTp0OQfC } from './../sites-boundary/sites.boundary.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as pZkHpFE8n } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xP$Gvt3eo, isOptional as DzrWfQ75f, isString as Rrn1mw3iz, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '85bdc88c-5b4c-4002-a665-37ba5bf95cb6';
export const TYPE_NAME = 'Sites HTML';
export const KEY_CODE = 'code';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites HTML
 * @id 85bdc88c-5b4c-4002-a665-37ba5bf95cb6
 */
export interface SitesHtmlType {
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
 * Tests if the value is of type SitesHtmlElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesHtmlElement else false
 */
export function isSitesHtmlType(aValue: any): aValue is SitesHtmlType {
    return xP$Gvt3eo(aValue)
        && DzrWfQ75f(aValue[KEY_CODE], Rrn1mw3iz)
        && DzrWfQ75f(aValue[KEY_PADDING], NvTp0OQfC)
        && DzrWfQ75f(aValue[KEY_MARGIN], NvTp0OQfC)
        && DzrWfQ75f(aValue[KEY_COMMON_SETTINGS], pZkHpFE8n)
    ;
}

/**
 * Selects the "code" property from SitesHtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCode: (aDefault?: string) => UnaryFunction<SitesHtmlType, string> = partialLeft(pluckProperty, KEY_CODE);

/**
 * Selects the "code" property from SitesHtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCode: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesHtmlType, string> = partialLeft(rxSelectProperty, KEY_CODE);

/**
 * Selects the "padding" property from SitesHtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesHtmlType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesHtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesHtmlType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from SitesHtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesHtmlType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesHtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesHtmlType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "commonSettings" property from SitesHtmlType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesHtmlType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesHtmlType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesHtmlType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
