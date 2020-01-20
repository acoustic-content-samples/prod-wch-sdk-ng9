/**
 * Do not modify this file, it is auto-generated.
 */
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, MultiReferenceElement, RenderingContext, SingleNumberElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isMultiReferenceElement as _isMultiReferenceElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '7952a5b2-57d0-4a1b-a008-d37c7d7f5261';
export const TYPE_NAME = 'Image group';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_SPACING = 'spacing';
export const KEY_MARGIN = 'margin';
export const KEY_IMAGES = 'images';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Image group
 * @id 7952a5b2-57d0-4a1b-a008-d37c7d7f5261
 */
export interface ImageGroup {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Colors",
     *     "id": "1321a547-287a-477b-a7ec-d191e2cdb70a"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: SingleColorsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacing",
     *   "label": "Spacing between images",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_SPACING]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margins",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Boundary options",
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_MARGIN]?: SingleBoundaryOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "reference",
     *   "fieldLabel": "Image",
     *   "key": "images",
     *   "label": "Images",
     *   "maximumValues": 5,
     *   "minimumValues": 2,
     *   "required": true,
     *   "restrictTypes": [
     *     {
     *       "name": "Image",
     *       "id": "b7b05524-87ed-4509-b6fb-972f2cbf26d5"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_IMAGES]: MultiReferenceElement;

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

export interface ImageGroupElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '7952a5b2-57d0-4a1b-a008-d37c7d7f5261'
    };
}

export interface SingleImageGroupElement extends ImageGroupElement {
    value: ImageGroup;
}

export interface MultiImageGroupElement extends ImageGroupElement {
    values: ImageGroup[];
}

/**
 * Tests if the value is of type ImageGroupElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type ImageGroupElement else false
 */
export function isImageGroup(aValue: any): aValue is ImageGroup {
    return !!aValue
        && (!aValue[KEY_BACKGROUND_COLOR] || _isSingleColorsElement(aValue[KEY_BACKGROUND_COLOR], true))
        && (!aValue[KEY_SPACING] || _isSingleNumberElement(aValue[KEY_SPACING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        && _isMultiReferenceElement(aValue[KEY_IMAGES], false)
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleImageGroupElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleImageGroupElement else false
 */
export function isSingleImageGroupElement(aValue: any, bOptional?: boolean): aValue is SingleImageGroupElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isImageGroup(aValue.value));
}

/**
 * Tests if the value is of type MultiImageGroupElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiImageGroupElement else false
 */
export function isMultiImageGroupElement(aValue: any, bOptional?: boolean): aValue is MultiImageGroupElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isImageGroup));
}

/*
 * @name Image group
 * @id 7952a5b2-57d0-4a1b-a008-d37c7d7f5261
 */
export interface ImageGroupType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Colors",
     *     "id": "1321a547-287a-477b-a7ec-d191e2cdb70a"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: ColorsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacing",
     *   "label": "Spacing between images",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_SPACING]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margins",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Boundary options",
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_MARGIN]?: BoundaryOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "reference",
     *   "fieldLabel": "Image",
     *   "key": "images",
     *   "label": "Images",
     *   "maximumValues": 5,
     *   "minimumValues": 2,
     *   "required": true,
     *   "restrictTypes": [
     *     {
     *       "name": "Image",
     *       "id": "b7b05524-87ed-4509-b6fb-972f2cbf26d5"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_IMAGES]: RenderingContext;

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
