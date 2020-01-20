/**
 * Do not modify this file, it is auto-generated.
 */
import { AlignmentOptionsType, SingleAlignmentOptionsElement, isSingleAlignmentOptionsElement as _isSingleAlignmentOptionsElement } from './../alignment-options/alignmentOptionsType';
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, OptionSelection, SingleNumberElement, SingleOptionSelectionElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement, isSingleOptionSelectionElement as _isSingleOptionSelectionElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '251f4c19-ea42-4e4d-8831-1ffca17d6a6d';
export const TYPE_NAME = 'Divider';
export const KEY_LINE_TYPE = 'lineType';
export const KEY_LINE_COLOR = 'lineColor';
export const KEY_OPACITY = 'opacity';
export const KEY_ALIGN = 'align';
export const KEY_PADDING = 'padding';
export const KEY_LINE_WEIGHT = 'lineWeight';
export const KEY_WIDTH = 'width';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Divider
 * @id 251f4c19-ea42-4e4d-8831-1ffca17d6a6d
 */
export interface Divider {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "lineType",
     *   "label": "Line type",
     *   "options": [
     *     {
     *       "label": "Solid",
     *       "selection": "solid"
     *     },
     *     {
     *       "label": "Dotted",
     *       "selection": "dotted"
     *     },
     *     {
     *       "label": "Dashed",
     *       "selection": "dashed"
     *     }
     *   ],
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LINE_TYPE]?: SingleOptionSelectionElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "lineColor",
     *   "label": "Line color",
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
    [KEY_LINE_COLOR]?: SingleColorsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "opacity",
     *   "label": "Opacity",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_OPACITY]?: SingleNumberElement;

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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "lineWeight",
     *   "label": "Line weight",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LINE_WEIGHT]?: SingleNumberElement;

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

export interface DividerElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '251f4c19-ea42-4e4d-8831-1ffca17d6a6d'
    };
}

export interface SingleDividerElement extends DividerElement {
    value: Divider;
}

export interface MultiDividerElement extends DividerElement {
    values: Divider[];
}

/**
 * Tests if the value is of type DividerElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type DividerElement else false
 */
export function isDivider(aValue: any): aValue is Divider {
    return !!aValue
        && (!aValue[KEY_LINE_TYPE] || _isSingleOptionSelectionElement(aValue[KEY_LINE_TYPE], true))
        && (!aValue[KEY_LINE_COLOR] || _isSingleColorsElement(aValue[KEY_LINE_COLOR], true))
        && (!aValue[KEY_OPACITY] || _isSingleNumberElement(aValue[KEY_OPACITY], true))
        && (!aValue[KEY_ALIGN] || _isSingleAlignmentOptionsElement(aValue[KEY_ALIGN], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_LINE_WEIGHT] || _isSingleNumberElement(aValue[KEY_LINE_WEIGHT], true))
        && (!aValue[KEY_WIDTH] || _isSingleNumberElement(aValue[KEY_WIDTH], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleDividerElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleDividerElement else false
 */
export function isSingleDividerElement(aValue: any, bOptional?: boolean): aValue is SingleDividerElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isDivider(aValue.value));
}

/**
 * Tests if the value is of type MultiDividerElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiDividerElement else false
 */
export function isMultiDividerElement(aValue: any, bOptional?: boolean): aValue is MultiDividerElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isDivider));
}

/*
 * @name Divider
 * @id 251f4c19-ea42-4e4d-8831-1ffca17d6a6d
 */
export interface DividerType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "lineType",
     *   "label": "Line type",
     *   "options": [
     *     {
     *       "label": "Solid",
     *       "selection": "solid"
     *     },
     *     {
     *       "label": "Dotted",
     *       "selection": "dotted"
     *     },
     *     {
     *       "label": "Dashed",
     *       "selection": "dashed"
     *     }
     *   ],
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LINE_TYPE]?: OptionSelection;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "lineColor",
     *   "label": "Line color",
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
    [KEY_LINE_COLOR]?: ColorsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "opacity",
     *   "label": "Opacity",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_OPACITY]?: number;

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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "lineWeight",
     *   "label": "Line weight",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_LINE_WEIGHT]?: number;

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
