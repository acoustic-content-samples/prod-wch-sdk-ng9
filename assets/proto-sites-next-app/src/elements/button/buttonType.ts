/**
 * Do not modify this file, it is auto-generated.
 */
import { AlignmentOptionsType, SingleAlignmentOptionsElement, isSingleAlignmentOptionsElement as _isSingleAlignmentOptionsElement } from './../alignment-options/alignmentOptionsType';
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { LineHeightOptionsType, SingleLineHeightOptionsElement, isSingleLineHeightOptionsElement as _isSingleLineHeightOptionsElement } from './../line-height-options/lineHeightOptionsType';
import { SingleStylingElement, StylingType, isSingleStylingElement as _isSingleStylingElement } from './../styling/stylingType';
import { GroupElement, Link, SingleLinkElement, SingleNumberElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleLinkElement as _isSingleLinkElement, isSingleNumberElement as _isSingleNumberElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'b201f69e-29ff-4f3e-9a72-6c6be6c7d754';
export const TYPE_NAME = 'Button';
export const KEY_LABEL = 'label';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_STYLE = 'style';
export const KEY_LINK = 'link';
export const KEY_ALIGN = 'align';
export const KEY_LINE_HEIGHT = 'lineHeight';
export const KEY_CORNER_RADIUS = 'cornerRadius';
export const KEY_PADDING = 'padding';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Button
 * @id b201f69e-29ff-4f3e-9a72-6c6be6c7d754
 */
export interface Button {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "label",
     *   "label": "Label",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Type here"
     *   },
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LABEL]?: SingleTextElement;

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
     *   "key": "style",
     *   "label": "Style",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb"
     *   }
     * }
     * ```
     */
    [KEY_STYLE]?: SingleStylingElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "link",
     *   "label": "Link",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LINK]?: SingleLinkElement;

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
     *   "key": "lineHeight",
     *   "label": "Line height",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "5b94254c-71a0-42aa-b979-e21ffbae12b2"
     *   }
     * }
     * ```
     */
    [KEY_LINE_HEIGHT]?: SingleLineHeightOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "cornerRadius",
     *   "label": "Corner radius",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_CORNER_RADIUS]?: SingleNumberElement;

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
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: SingleCommonSettingsElement;
}

export interface ButtonElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'b201f69e-29ff-4f3e-9a72-6c6be6c7d754'
    };
}

export interface SingleButtonElement extends ButtonElement {
    value: Button;
}

export interface MultiButtonElement extends ButtonElement {
    values: Button[];
}

/**
 * Tests if the value is of type ButtonElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type ButtonElement else false
 */
export function isButton(aValue: any): aValue is Button {
    return !!aValue
        && (!aValue[KEY_LABEL] || _isSingleTextElement(aValue[KEY_LABEL], true))
        && (!aValue[KEY_BACKGROUND_COLOR] || _isSingleColorsElement(aValue[KEY_BACKGROUND_COLOR], true))
        && (!aValue[KEY_STYLE] || _isSingleStylingElement(aValue[KEY_STYLE], true))
        && (!aValue[KEY_LINK] || _isSingleLinkElement(aValue[KEY_LINK], true))
        && (!aValue[KEY_ALIGN] || _isSingleAlignmentOptionsElement(aValue[KEY_ALIGN], true))
        && (!aValue[KEY_LINE_HEIGHT] || _isSingleLineHeightOptionsElement(aValue[KEY_LINE_HEIGHT], true))
        && (!aValue[KEY_CORNER_RADIUS] || _isSingleNumberElement(aValue[KEY_CORNER_RADIUS], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleButtonElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleButtonElement else false
 */
export function isSingleButtonElement(aValue: any, bOptional?: boolean): aValue is SingleButtonElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isButton(aValue.value));
}

/**
 * Tests if the value is of type MultiButtonElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiButtonElement else false
 */
export function isMultiButtonElement(aValue: any, bOptional?: boolean): aValue is MultiButtonElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isButton));
}

/*
 * @name Button
 * @id b201f69e-29ff-4f3e-9a72-6c6be6c7d754
 */
export interface ButtonType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "label",
     *   "label": "Label",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Type here"
     *   },
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LABEL]?: string;

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
     *   "key": "style",
     *   "label": "Style",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb"
     *   }
     * }
     * ```
     */
    [KEY_STYLE]?: StylingType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "link",
     *   "label": "Link",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LINK]?: Link;

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
     *   "key": "lineHeight",
     *   "label": "Line height",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "5b94254c-71a0-42aa-b979-e21ffbae12b2"
     *   }
     * }
     * ```
     */
    [KEY_LINE_HEIGHT]?: LineHeightOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "cornerRadius",
     *   "label": "Corner radius",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_CORNER_RADIUS]?: number;

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
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}
