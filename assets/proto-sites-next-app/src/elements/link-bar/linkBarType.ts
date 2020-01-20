/**
 * Do not modify this file, it is auto-generated.
 */
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, Link, MultiLinkElement, SingleNumberElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isMultiLinkElement as _isMultiLinkElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '98bec4ac-6170-402c-9405-6e8cfd99508a';
export const TYPE_NAME = 'Link bar';
export const KEY_LINKS = 'links';
export const KEY_FONT = 'font';
export const KEY_SIZE = 'size';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_PADDING = 'padding';
export const KEY_MARGINS = 'margins';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Link bar
 * @id 98bec4ac-6170-402c-9405-6e8cfd99508a
 */
export interface LinkBar {

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
     *   "minimumValues": 0,
     *   "required": false
     * }
     * ```
     */
    [KEY_LINKS]?: MultiLinkElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "font",
     *   "label": "Font",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_FONT]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "size",
     *   "label": "Size",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_SIZE]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Spacing between links",
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
     *   "key": "margins",
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
    [KEY_MARGINS]?: SingleBoundaryOptionsElement;

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

export interface LinkBarElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '98bec4ac-6170-402c-9405-6e8cfd99508a'
    };
}

export interface SingleLinkBarElement extends LinkBarElement {
    value: LinkBar;
}

export interface MultiLinkBarElement extends LinkBarElement {
    values: LinkBar[];
}

/**
 * Tests if the value is of type LinkBarElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type LinkBarElement else false
 */
export function isLinkBar(aValue: any): aValue is LinkBar {
    return !!aValue
        && (!aValue[KEY_LINKS] || _isMultiLinkElement(aValue[KEY_LINKS], true))
        && (!aValue[KEY_FONT] || _isSingleTextElement(aValue[KEY_FONT], true))
        && (!aValue[KEY_SIZE] || _isSingleNumberElement(aValue[KEY_SIZE], true))
        && (!aValue[KEY_BACKGROUND_COLOR] || _isSingleTextElement(aValue[KEY_BACKGROUND_COLOR], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGINS] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGINS], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleLinkBarElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleLinkBarElement else false
 */
export function isSingleLinkBarElement(aValue: any, bOptional?: boolean): aValue is SingleLinkBarElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isLinkBar(aValue.value));
}

/**
 * Tests if the value is of type MultiLinkBarElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiLinkBarElement else false
 */
export function isMultiLinkBarElement(aValue: any, bOptional?: boolean): aValue is MultiLinkBarElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isLinkBar));
}

/*
 * @name Link bar
 * @id 98bec4ac-6170-402c-9405-6e8cfd99508a
 */
export interface LinkBarType {

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
     *   "minimumValues": 0,
     *   "required": false
     * }
     * ```
     */
    [KEY_LINKS]?: Link;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "font",
     *   "label": "Font",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_FONT]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "size",
     *   "label": "Size",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_SIZE]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Spacing between links",
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
     *   "key": "margins",
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
    [KEY_MARGINS]?: BoundaryOptionsType;

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
