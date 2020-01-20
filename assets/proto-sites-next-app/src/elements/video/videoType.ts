/**
 * Do not modify this file, it is auto-generated.
 */
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, SingleVideoElement, Video } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleVideoElement as _isSingleVideoElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '7f81225a-8827-43d1-9d52-5f83eb6ee54f';
export const TYPE_NAME = 'Video';
export const KEY_VIDEO = 'video';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Video
 * @id 7f81225a-8827-43d1-9d52-5f83eb6ee54f
 */
export interface Video {

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
    [KEY_VIDEO]?: SingleVideoElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Common settings",
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: SingleCommonSettingsElement;
}

export interface VideoElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '7f81225a-8827-43d1-9d52-5f83eb6ee54f'
    };
}

export interface SingleVideoElement extends VideoElement {
    value: Video;
}

export interface MultiVideoElement extends VideoElement {
    values: Video[];
}

/**
 * Tests if the value is of type VideoElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type VideoElement else false
 */
export function isVideo(aValue: any): aValue is Video {
    return !!aValue
        && (!aValue[KEY_VIDEO] || _isSingleVideoElement(aValue[KEY_VIDEO], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleVideoElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleVideoElement else false
 */
export function isSingleVideoElement(aValue: any, bOptional?: boolean): aValue is SingleVideoElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isVideo(aValue.value));
}

/**
 * Tests if the value is of type MultiVideoElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiVideoElement else false
 */
export function isMultiVideoElement(aValue: any, bOptional?: boolean): aValue is MultiVideoElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isVideo));
}

/*
 * @name Video
 * @id 7f81225a-8827-43d1-9d52-5f83eb6ee54f
 */
export interface VideoType {

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
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Common settings",
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}
