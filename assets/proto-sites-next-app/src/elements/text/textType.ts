/**
 * Do not modify this file, it is auto-generated.
 */
import { AlignmentOptionsType, SingleAlignmentOptionsElement, isSingleAlignmentOptionsElement as _isSingleAlignmentOptionsElement } from './../alignment-options/alignmentOptionsType';
import { BackgroundExtensionType, SingleBackgroundExtensionElement, isSingleBackgroundExtensionElement as _isSingleBackgroundExtensionElement } from './../background-extension/backgroundExtensionType';
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { LineHeightOptionsType, SingleLineHeightOptionsElement, isSingleLineHeightOptionsElement as _isSingleLineHeightOptionsElement } from './../line-height-options/lineHeightOptionsType';
import { SingleStylingElement, StylingType, isSingleStylingElement as _isSingleStylingElement } from './../styling/stylingType';
import { GroupElement, SingleFormattedTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleFormattedTextElement as _isSingleFormattedTextElement, isSingleGroupElement as _isSingleGroupElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '09ed64f3-23d9-48bb-871d-e00430751ea6';
export const TYPE_NAME = 'Text';
export const KEY_TEXT = 'text';
export const KEY_TEXT_STYLE = 'textStyle';
export const KEY_LINK_COLOR = 'linkColor';
export const KEY_BACKGROUND = 'background';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_LINE_HEIGHT = 'lineHeight';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Text
 * @id 09ed64f3-23d9-48bb-871d-e00430751ea6
 */
export interface Text {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "formattedtext",
     *   "key": "text",
     *   "label": "text",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Text"
     *   },
     *   "role": [
     *     "content"
     *   ]
     * }
     * ```
     */
    [KEY_TEXT]?: SingleFormattedTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "textStyle",
     *   "label": "Text Style",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Styling",
     *     "id": "a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb"
     *   }
     * }
     * ```
     */
    [KEY_TEXT_STYLE]?: SingleStylingElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "linkColor",
     *   "label": "Link color",
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
    [KEY_LINK_COLOR]?: SingleColorsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Background Extension",
     *     "id": "8c4a8b02-67a1-4849-8e2d-f90be58485c5"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: SingleBackgroundExtensionElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "alignment",
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
    [KEY_ALIGNMENT]?: SingleAlignmentOptionsElement;

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
     *     "name": "Line height options",
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

export interface TextElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '09ed64f3-23d9-48bb-871d-e00430751ea6'
    };
}

export interface SingleTextElement extends TextElement {
    value: Text;
}

export interface MultiTextElement extends TextElement {
    values: Text[];
}

/**
 * Tests if the value is of type TextElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type TextElement else false
 */
export function isText(aValue: any): aValue is Text {
    return !!aValue
        && (!aValue[KEY_TEXT] || _isSingleFormattedTextElement(aValue[KEY_TEXT], true))
        && (!aValue[KEY_TEXT_STYLE] || _isSingleStylingElement(aValue[KEY_TEXT_STYLE], true))
        && (!aValue[KEY_LINK_COLOR] || _isSingleColorsElement(aValue[KEY_LINK_COLOR], true))
        && (!aValue[KEY_BACKGROUND] || _isSingleBackgroundExtensionElement(aValue[KEY_BACKGROUND], true))
        && (!aValue[KEY_ALIGNMENT] || _isSingleAlignmentOptionsElement(aValue[KEY_ALIGNMENT], true))
        && (!aValue[KEY_LINE_HEIGHT] || _isSingleLineHeightOptionsElement(aValue[KEY_LINE_HEIGHT], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleTextElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleTextElement else false
 */
export function isSingleTextElement(aValue: any, bOptional?: boolean): aValue is SingleTextElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isText(aValue.value));
}

/**
 * Tests if the value is of type MultiTextElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiTextElement else false
 */
export function isMultiTextElement(aValue: any, bOptional?: boolean): aValue is MultiTextElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isText));
}

/*
 * @name Text
 * @id 09ed64f3-23d9-48bb-871d-e00430751ea6
 */
export interface TextType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "formattedtext",
     *   "key": "text",
     *   "label": "text",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Text"
     *   },
     *   "role": [
     *     "content"
     *   ]
     * }
     * ```
     */
    [KEY_TEXT]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "textStyle",
     *   "label": "Text Style",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Styling",
     *     "id": "a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb"
     *   }
     * }
     * ```
     */
    [KEY_TEXT_STYLE]?: StylingType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "linkColor",
     *   "label": "Link color",
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
    [KEY_LINK_COLOR]?: ColorsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Background Extension",
     *     "id": "8c4a8b02-67a1-4849-8e2d-f90be58485c5"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: BackgroundExtensionType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "alignment",
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
    [KEY_ALIGNMENT]?: AlignmentOptionsType;

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
     *     "name": "Line height options",
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
