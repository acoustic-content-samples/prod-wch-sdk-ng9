/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as vm356GF0B } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as BjAyc24Gl } from './../sites-boundary/sites.boundary.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as NFJFV7WXq } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isImage as vM_aht0Iv, isNotNil as p_CWR7uKB, isOptional as _nKTVr$OH, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'c8295d37-7235-495e-8d40-f3b8bafe4099';
export const TYPE_NAME = 'Sites Image';
export const KEY_IMAGE = 'image';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Image
 * @id c8295d37-7235-495e-8d40-f3b8bafe4099
 */
export interface SitesImageType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "acceptType": [
     *     "jpg",
     *     "jpeg",
     *     "png",
     *     "gif"
     *   ],
     *   "elementType": "image",
     *   "key": "image",
     *   "label": "Image"
     * }
     * ```
     */
    [KEY_IMAGE]?: Image;

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
 * Tests if the value is of type SitesImageElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesImageElement else false
 */
export function isSitesImageType(aValue: any): aValue is SitesImageType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_IMAGE], vM_aht0Iv)
        && _nKTVr$OH(aValue[KEY_ALIGNMENT], vm356GF0B)
        && _nKTVr$OH(aValue[KEY_PADDING], BjAyc24Gl)
        && _nKTVr$OH(aValue[KEY_MARGIN], BjAyc24Gl)
        && _nKTVr$OH(aValue[KEY_COMMON_SETTINGS], NFJFV7WXq)
    ;
}

/**
 * Selects the "image" property from SitesImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: Image) => UnaryFunction<SitesImageType, Image> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from SitesImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<SitesImageType, Image> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "alignment" property from SitesImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesImageType, SitesAlignmentType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from SitesImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) => OperatorFunction<SitesImageType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "padding" property from SitesImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesImageType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesImageType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from SitesImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesImageType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesImageType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "commonSettings" property from SitesImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesImageType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesImageType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
