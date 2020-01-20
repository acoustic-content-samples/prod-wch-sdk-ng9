/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { DeliveryGroupElementMetadata, Video } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isVideo as LX1arkoBe, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '7f81225a-8827-43d1-9d52-5f83eb6ee54f';
export const TYPE_NAME = 'Video';
export const KEY_VIDEO = 'video';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Video
 * @id 7f81225a-8827-43d1-9d52-5f83eb6ee54f
 */
export interface VideoType {
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
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}

/**
 * Tests if the value is of type VideoElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type VideoElement else false
 */
export function isVideoType(aValue: any): aValue is VideoType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_VIDEO], LX1arkoBe)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "video" property from VideoType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectVideo: (aDefault?: Video) => UnaryFunction<VideoType, Video> = partialLeft(pluckProperty, KEY_VIDEO);

/**
 * Selects the "video" property from VideoType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectVideo: (aDefault?: Video, aCmp?: EqualsPredicate<Video>) => OperatorFunction<VideoType, Video> = partialLeft(rxSelectProperty, KEY_VIDEO);

/**
 * Selects the "commonSettings" property from VideoType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<VideoType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from VideoType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<VideoType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
