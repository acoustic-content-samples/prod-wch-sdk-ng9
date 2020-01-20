/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, SingleNumberElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb';
export const TYPE_NAME = 'Styling';
export const KEY_FONT = 'font';
export const KEY_SIZE = 'size';
export const KEY_COLOR = 'color';

/*
 * @name Styling
 * @id a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb
 */
export interface Styling {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "font",
     *   "label": "Font"
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
     *   "label": "Size"
     * }
     * ```
     */
    [KEY_SIZE]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "color",
     *   "label": "Color"
     * }
     * ```
     */
    [KEY_COLOR]?: SingleTextElement;
}

export interface StylingElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb'
    };
}

export interface SingleStylingElement extends StylingElement {
    value: Styling;
}

export interface MultiStylingElement extends StylingElement {
    values: Styling[];
}

/**
 * Tests if the value is of type StylingElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type StylingElement else false
 */
export function isStyling(aValue: any): aValue is Styling {
    return !!aValue
        && (!aValue[KEY_FONT] || _isSingleTextElement(aValue[KEY_FONT], true))
        && (!aValue[KEY_SIZE] || _isSingleNumberElement(aValue[KEY_SIZE], true))
        && (!aValue[KEY_COLOR] || _isSingleTextElement(aValue[KEY_COLOR], true))
        ;
}

/**
 * Tests if the value is of type SingleStylingElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleStylingElement else false
 */
export function isSingleStylingElement(aValue: any, bOptional?: boolean): aValue is SingleStylingElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isStyling(aValue.value));
}

/**
 * Tests if the value is of type MultiStylingElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiStylingElement else false
 */
export function isMultiStylingElement(aValue: any, bOptional?: boolean): aValue is MultiStylingElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isStyling));
}

/*
 * @name Styling
 * @id a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb
 */
export interface StylingType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "font",
     *   "label": "Font"
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
     *   "label": "Size"
     * }
     * ```
     */
    [KEY_SIZE]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "color",
     *   "label": "Color"
     * }
     * ```
     */
    [KEY_COLOR]?: string;
}
