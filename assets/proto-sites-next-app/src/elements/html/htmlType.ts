/**
 * Do not modify this file, it is auto-generated.
 */
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'aa358e28-2e60-416a-97d7-d1a6dd5e165b';
export const TYPE_NAME = 'HTML';
export const KEY_CODE = 'code';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name HTML
 * @id aa358e28-2e60-416a-97d7-d1a6dd5e165b
 */
export interface Html {

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
     *   },
     *   "required": true,
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_CODE]: SingleTextElement;

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

export interface HtmlElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'aa358e28-2e60-416a-97d7-d1a6dd5e165b'
    };
}

export interface SingleHtmlElement extends HtmlElement {
    value: Html;
}

export interface MultiHtmlElement extends HtmlElement {
    values: Html[];
}

/**
 * Tests if the value is of type HtmlElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type HtmlElement else false
 */
export function isHtml(aValue: any): aValue is Html {
    return !!aValue
        && _isSingleTextElement(aValue[KEY_CODE], false)
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleHtmlElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleHtmlElement else false
 */
export function isSingleHtmlElement(aValue: any, bOptional?: boolean): aValue is SingleHtmlElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isHtml(aValue.value));
}

/**
 * Tests if the value is of type MultiHtmlElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiHtmlElement else false
 */
export function isMultiHtmlElement(aValue: any, bOptional?: boolean): aValue is MultiHtmlElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isHtml));
}

/*
 * @name HTML
 * @id aa358e28-2e60-416a-97d7-d1a6dd5e165b
 */
export interface HtmlType {

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
     *   },
     *   "required": true,
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_CODE]: string;

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
