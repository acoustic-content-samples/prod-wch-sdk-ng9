/**
 * Do not modify this file, it is auto-generated.
 */
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { EmailSectionType, MultiEmailSectionElement, isMultiEmailSectionElement as _isMultiEmailSectionElement } from './../email-section/emailSectionType';
import { MailingSettingsType, SingleMailingSettingsElement, isSingleMailingSettingsElement as _isSingleMailingSettingsElement } from './../mailing-settings/mailingSettingsType';
import { GroupElement, SingleNumberElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '51071056-1f70-499e-9ee3-b2066f56b119';
export const TYPE_NAME = 'Email';
export const KEY_ROWS = 'rows';
export const KEY_SETTINGS = 'settings';
export const KEY_EDITOR = 'editor';
export const KEY_WIDTH = 'width';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_CONTENT_AREA_BACKGROUND_COLOR = 'contentAreaBackgroundColor';

/*
 * @name Email
 * @id 51071056-1f70-499e-9ee3-b2066f56b119
 */
export interface Email {

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Row",
     *   "key": "rows",
     *   "label": "Rows",
     *   "minimumValues": 0,
     *   "typeRef": {
     *     "name": "Email Section",
     *     "id": "b908096b-9cd2-4085-bf0c-a510576e633b"
     *   }
     * }
     * ```
     */
    [KEY_ROWS]?: MultiEmailSectionElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "settings",
     *   "label": "Settings",
     *   "typeRef": {
     *     "name": "Mailing settings",
     *     "id": "16e486dd-3c33-485c-a9e5-7617fbc67424"
     *   }
     * }
     * ```
     */
    [KEY_SETTINGS]?: SingleMailingSettingsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "hidden": true,
     *   "key": "editor",
     *   "label": "Editor",
     *   "role": [
     *     "configuration"
     *   ],
     *   "searchKey": "string1"
     * }
     * ```
     */
    [KEY_EDITOR]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "width",
     *   "label": "Width",
     *   "maximum": 900,
     *   "minimum": 480,
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
     *   "elementType": "group",
     *   "key": "contentAreaBackgroundColor",
     *   "label": "Content area background color",
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
    [KEY_CONTENT_AREA_BACKGROUND_COLOR]?: SingleColorsElement;
}

export interface EmailElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '51071056-1f70-499e-9ee3-b2066f56b119'
    };
}

export interface SingleEmailElement extends EmailElement {
    value: Email;
}

export interface MultiEmailElement extends EmailElement {
    values: Email[];
}

/**
 * Tests if the value is of type EmailElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type EmailElement else false
 */
export function isEmail(aValue: any): aValue is Email {
    return !!aValue
        && (!aValue[KEY_ROWS] || _isMultiEmailSectionElement(aValue[KEY_ROWS], true))
        && (!aValue[KEY_SETTINGS] || _isSingleMailingSettingsElement(aValue[KEY_SETTINGS], true))
        && (!aValue[KEY_EDITOR] || _isSingleTextElement(aValue[KEY_EDITOR], true))
        && (!aValue[KEY_WIDTH] || _isSingleNumberElement(aValue[KEY_WIDTH], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        && (!aValue[KEY_BACKGROUND_COLOR] || _isSingleColorsElement(aValue[KEY_BACKGROUND_COLOR], true))
        && (!aValue[KEY_CONTENT_AREA_BACKGROUND_COLOR] || _isSingleColorsElement(aValue[KEY_CONTENT_AREA_BACKGROUND_COLOR], true))
        ;
}

/**
 * Tests if the value is of type SingleEmailElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleEmailElement else false
 */
export function isSingleEmailElement(aValue: any, bOptional?: boolean): aValue is SingleEmailElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isEmail(aValue.value));
}

/**
 * Tests if the value is of type MultiEmailElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiEmailElement else false
 */
export function isMultiEmailElement(aValue: any, bOptional?: boolean): aValue is MultiEmailElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isEmail));
}

/*
 * @name Email
 * @id 51071056-1f70-499e-9ee3-b2066f56b119
 */
export interface EmailType {

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Row",
     *   "key": "rows",
     *   "label": "Rows",
     *   "minimumValues": 0,
     *   "typeRef": {
     *     "name": "Email Section",
     *     "id": "b908096b-9cd2-4085-bf0c-a510576e633b"
     *   }
     * }
     * ```
     */
    [KEY_ROWS]?: EmailSectionType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "settings",
     *   "label": "Settings",
     *   "typeRef": {
     *     "name": "Mailing settings",
     *     "id": "16e486dd-3c33-485c-a9e5-7617fbc67424"
     *   }
     * }
     * ```
     */
    [KEY_SETTINGS]?: MailingSettingsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "hidden": true,
     *   "key": "editor",
     *   "label": "Editor",
     *   "role": [
     *     "configuration"
     *   ],
     *   "searchKey": "string1"
     * }
     * ```
     */
    [KEY_EDITOR]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "width",
     *   "label": "Width",
     *   "maximum": 900,
     *   "minimum": 480,
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
     *   "elementType": "group",
     *   "key": "contentAreaBackgroundColor",
     *   "label": "Content area background color",
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
    [KEY_CONTENT_AREA_BACKGROUND_COLOR]?: ColorsType;
}
