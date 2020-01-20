/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as xq3eDqJmD } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as bhcW3LBlH } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { SitesSocialLinkType, isSitesSocialLinkType as XYiHbrGKr } from './../sites-social-link/sites.social.link.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, isOptionalArrayOf as LKB_By6fc, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '669768ce-44c7-4de3-83c1-a72d871e8df2';
export const TYPE_NAME = 'Sites Social Follow';
export const KEY_ICON_SET = 'iconSet';
export const KEY_SOCIAL_LINKS = 'socialLinks';
export const KEY_SIZE = 'size';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_SPACING = 'spacing';
export const KEY_PADDING = 'padding';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Social Follow
 * @id 669768ce-44c7-4de3-83c1-a72d871e8df2
 */
export interface SitesSocialFollowType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "iconSet",
     *   "label": "Icon Set"
     * }
     * ```
     */
    [KEY_ICON_SET]?: string;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "key": "socialLinks",
     *   "label": "Social Links",
     *   "required": false,
     *   "typeRef": {
     *     "id": "98f24456-bf11-4248-bca9-07e273b8dbc4"
     *   }
     * }
     * ```
     */
    [KEY_SOCIAL_LINKS]?: SitesSocialLinkType[];

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "size",
     *   "label": "Size"
     * }
     * ```
     */
    [KEY_SIZE]?: number;

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
     *   "key": "spacing",
     *   "label": "Spacing between icons​"
     * }
     * ```
     */
    [KEY_SPACING]?: number;

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
 * Tests if the value is of type SitesSocialFollowElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesSocialFollowElement else false
 */
export function isSitesSocialFollowType(aValue: any): aValue is SitesSocialFollowType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_ICON_SET], rCUctNoUC)
        && LKB_By6fc(aValue[KEY_SOCIAL_LINKS], XYiHbrGKr)
        && R8L_djGws(aValue[KEY_SIZE], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_BACKGROUND_COLOR], bhcW3LBlH)
        && R8L_djGws(aValue[KEY_ALIGNMENT], xq3eDqJmD)
        && R8L_djGws(aValue[KEY_SPACING], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_PADDING], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
    ;
}

/**
 * Selects the "iconSet" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIconSet: (aDefault?: string) => UnaryFunction<SitesSocialFollowType, string> = partialLeft(pluckProperty, KEY_ICON_SET);

/**
 * Selects the "iconSet" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIconSet: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesSocialFollowType, string> = partialLeft(rxSelectProperty, KEY_ICON_SET);

/**
 * Selects the "socialLinks" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSocialLinks: (aDefault?: SitesSocialLinkType[]) => UnaryFunction<SitesSocialFollowType, SitesSocialLinkType[]> = partialLeft(pluckProperty, KEY_SOCIAL_LINKS);

/**
 * Selects the "socialLinks" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSocialLinks: (aDefault?: SitesSocialLinkType[], aCmp?: EqualsPredicate<SitesSocialLinkType[]>) => OperatorFunction<SitesSocialFollowType, SitesSocialLinkType[]> = partialLeft(rxSelectProperty, KEY_SOCIAL_LINKS);

/**
 * Selects the "size" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSize: (aDefault?: number) => UnaryFunction<SitesSocialFollowType, number> = partialLeft(pluckProperty, KEY_SIZE);

/**
 * Selects the "size" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesSocialFollowType, number> = partialLeft(rxSelectProperty, KEY_SIZE);

/**
 * Selects the "backgroundColor" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesSocialFollowType, SitesColorType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesSocialFollowType, SitesColorType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "alignment" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesSocialFollowType, SitesAlignmentType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) => OperatorFunction<SitesSocialFollowType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "spacing" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpacing: (aDefault?: number) => UnaryFunction<SitesSocialFollowType, number> = partialLeft(pluckProperty, KEY_SPACING);

/**
 * Selects the "spacing" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpacing: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesSocialFollowType, number> = partialLeft(rxSelectProperty, KEY_SPACING);

/**
 * Selects the "padding" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesSocialFollowType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesSocialFollowType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "commonSettings" property from SitesSocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesSocialFollowType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesSocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesSocialFollowType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
