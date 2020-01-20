/**
 * Do not modify this file, it is auto-generated.
 */
import { AlignmentOptionsType, SingleAlignmentOptionsElement, isSingleAlignmentOptionsElement as _isSingleAlignmentOptionsElement } from './../alignment-options/alignmentOptionsType';
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, Image, SingleImageElement, SingleNumberElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleImageElement as _isSingleImageElement, isSingleNumberElement as _isSingleNumberElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'b7b05524-87ed-4509-b6fb-972f2cbf26d5';
export const TYPE_NAME = 'Image';
export const KEY_IMAGE = 'image';
export const KEY_ALT_TEXT = 'altText';
export const KEY_HYPERLINK = 'hyperlink';
export const KEY_ALIGN = 'align';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_WIDTH = 'width';
export const KEY_HEIGHT = 'height';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Image
 * @id b7b05524-87ed-4509-b6fb-972f2cbf26d5
 */
export interface Image {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "image",
     *   "key": "image",
     *   "label": "Image"
     * }
     * ```
     */
    [KEY_IMAGE]?: SingleImageElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "altText",
     *   "label": "Alt text",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_ALT_TEXT]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "hyperlink",
     *   "label": "Link",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_HYPERLINK]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "align",
     *   "label": "Alignment",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Alignment options",
     *     "id": "0915841f-cf93-4e3c-8ece-f22b0c41a9e6"
     *   }
     * }
     * ```
     */
    [KEY_ALIGN]?: SingleAlignmentOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
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
    [KEY_PADDING]?: SingleBoundaryOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margin",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "width",
     *   "label": "Width",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_WIDTH]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "height",
     *   "label": "Height",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_HEIGHT]?: SingleNumberElement;

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

export interface ImageElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'b7b05524-87ed-4509-b6fb-972f2cbf26d5'
    };
}

export interface SingleImageElement extends ImageElement {
    value: Image;
}

export interface MultiImageElement extends ImageElement {
    values: Image[];
}

/**
 * Tests if the value is of type ImageElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type ImageElement else false
 */
export function isImage(aValue: any): aValue is Image {
    return !!aValue
        && (!aValue[KEY_IMAGE] || _isSingleImageElement(aValue[KEY_IMAGE], true))
        && (!aValue[KEY_ALT_TEXT] || _isSingleTextElement(aValue[KEY_ALT_TEXT], true))
        && (!aValue[KEY_HYPERLINK] || _isSingleTextElement(aValue[KEY_HYPERLINK], true))
        && (!aValue[KEY_ALIGN] || _isSingleAlignmentOptionsElement(aValue[KEY_ALIGN], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        && (!aValue[KEY_WIDTH] || _isSingleNumberElement(aValue[KEY_WIDTH], true))
        && (!aValue[KEY_HEIGHT] || _isSingleNumberElement(aValue[KEY_HEIGHT], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleImageElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleImageElement else false
 */
export function isSingleImageElement(aValue: any, bOptional?: boolean): aValue is SingleImageElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isImage(aValue.value));
}

/**
 * Tests if the value is of type MultiImageElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiImageElement else false
 */
export function isMultiImageElement(aValue: any, bOptional?: boolean): aValue is MultiImageElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isImage));
}

/*
 * @name Image
 * @id b7b05524-87ed-4509-b6fb-972f2cbf26d5
 */
export interface ImageType {

    /**
     * @example
     * ```json
     * {
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
     *   "elementType": "text",
     *   "key": "altText",
     *   "label": "Alt text",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_ALT_TEXT]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "hyperlink",
     *   "label": "Link",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_HYPERLINK]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "align",
     *   "label": "Alignment",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Alignment options",
     *     "id": "0915841f-cf93-4e3c-8ece-f22b0c41a9e6"
     *   }
     * }
     * ```
     */
    [KEY_ALIGN]?: AlignmentOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
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
    [KEY_PADDING]?: BoundaryOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margin",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "width",
     *   "label": "Width",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_WIDTH]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "height",
     *   "label": "Height",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_HEIGHT]?: number;

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
