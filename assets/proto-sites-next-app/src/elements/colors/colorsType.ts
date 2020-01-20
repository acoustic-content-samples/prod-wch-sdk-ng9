/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '1321a547-287a-477b-a7ec-d191e2cdb70a';
export const TYPE_NAME = 'Colors';
export const KEY_COLOR_CODE = 'colorCode';

/*
 * @name Colors
 * @id 1321a547-287a-477b-a7ec-d191e2cdb70a
 */
export interface Colors {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "colorCode",
     *   "label": "Color code"
     * }
     * ```
     */
    [KEY_COLOR_CODE]?: SingleTextElement;
}

export interface ColorsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '1321a547-287a-477b-a7ec-d191e2cdb70a'
    };
}

export interface SingleColorsElement extends ColorsElement {
    value: Colors;
}

export interface MultiColorsElement extends ColorsElement {
    values: Colors[];
}

/**
 * Tests if the value is of type ColorsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type ColorsElement else false
 */
export function isColors(aValue: any): aValue is Colors {
    return !!aValue
        && (!aValue[KEY_COLOR_CODE] || _isSingleTextElement(aValue[KEY_COLOR_CODE], true))
        ;
}

/**
 * Tests if the value is of type SingleColorsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleColorsElement else false
 */
export function isSingleColorsElement(aValue: any, bOptional?: boolean): aValue is SingleColorsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isColors(aValue.value));
}

/**
 * Tests if the value is of type MultiColorsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiColorsElement else false
 */
export function isMultiColorsElement(aValue: any, bOptional?: boolean): aValue is MultiColorsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isColors));
}

/*
 * @name Colors
 * @id 1321a547-287a-477b-a7ec-d191e2cdb70a
 */
export interface ColorsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "colorCode",
     *   "label": "Color code"
     * }
     * ```
     */
    [KEY_COLOR_CODE]?: string;
}
