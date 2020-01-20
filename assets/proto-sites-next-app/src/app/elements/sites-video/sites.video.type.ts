/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesCommonSettingsType, isSitesCommonSettingsType as hBt447kei } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata, Video } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isOptional as R8L_djGws, isVideo as rnR25psZC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'a84f2c97-33bb-45fa-8156-25141df73055';
export const TYPE_NAME = 'Sites Video';
export const KEY_VIDEO = 'video';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Sites Video
 * @id a84f2c97-33bb-45fa-8156-25141df73055
 */
export interface SitesVideoType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "video",
     *   "key": "video",
     *   "label": "Video"
     * }
     * ```
     */
    [KEY_VIDEO]?: Video;

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
 * Tests if the value is of type SitesVideoElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesVideoElement else false
 */
export function isSitesVideoType(aValue: any): aValue is SitesVideoType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_VIDEO], rnR25psZC)
        && R8L_djGws(aValue[KEY_COMMON_SETTINGS], hBt447kei)
    ;
}

/**
 * Selects the "video" property from SitesVideoType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectVideo: (aDefault?: Video) => UnaryFunction<SitesVideoType, Video> = partialLeft(pluckProperty, KEY_VIDEO);

/**
 * Selects the "video" property from SitesVideoType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectVideo: (aDefault?: Video, aCmp?: EqualsPredicate<Video>) => OperatorFunction<SitesVideoType, Video> = partialLeft(rxSelectProperty, KEY_VIDEO);

/**
 * Selects the "commonSettings" property from SitesVideoType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesVideoType, SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SitesVideoType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) => OperatorFunction<SitesVideoType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
