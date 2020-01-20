/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, OptionSelection, SingleOptionSelectionElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleOptionSelectionElement as _isSingleOptionSelectionElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '5b94254c-71a0-42aa-b979-e21ffbae12b2';
export const TYPE_NAME = 'Line height options';
export const KEY_LINE_HEIGHT_OPTIONS = 'lineHeightOptions';

/*
 * @name Line height options
 * @id 5b94254c-71a0-42aa-b979-e21ffbae12b2
 */
export interface LineHeightOptions {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "lineHeightOptions",
     *   "label": "Line height options",
     *   "options": [
     *     {
     *       "label": ".8",
     *       "selection": "0.8"
     *     },
     *     {
     *       "label": "1",
     *       "selection": "1"
     *     },
     *     {
     *       "label": "1.5",
     *       "selection": "1.5"
     *     },
     *     {
     *       "label": "2",
     *       "selection": "2"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LINE_HEIGHT_OPTIONS]?: SingleOptionSelectionElement;
}

export interface LineHeightOptionsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '5b94254c-71a0-42aa-b979-e21ffbae12b2'
    };
}

export interface SingleLineHeightOptionsElement extends LineHeightOptionsElement {
    value: LineHeightOptions;
}

export interface MultiLineHeightOptionsElement extends LineHeightOptionsElement {
    values: LineHeightOptions[];
}

/**
 * Tests if the value is of type LineHeightOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type LineHeightOptionsElement else false
 */
export function isLineHeightOptions(aValue: any): aValue is LineHeightOptions {
    return !!aValue
        && (!aValue[KEY_LINE_HEIGHT_OPTIONS] || _isSingleOptionSelectionElement(aValue[KEY_LINE_HEIGHT_OPTIONS], true))
        ;
}

/**
 * Tests if the value is of type SingleLineHeightOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleLineHeightOptionsElement else false
 */
export function isSingleLineHeightOptionsElement(aValue: any, bOptional?: boolean): aValue is SingleLineHeightOptionsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isLineHeightOptions(aValue.value));
}

/**
 * Tests if the value is of type MultiLineHeightOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiLineHeightOptionsElement else false
 */
export function isMultiLineHeightOptionsElement(aValue: any, bOptional?: boolean): aValue is MultiLineHeightOptionsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isLineHeightOptions));
}

/*
 * @name Line height options
 * @id 5b94254c-71a0-42aa-b979-e21ffbae12b2
 */
export interface LineHeightOptionsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "lineHeightOptions",
     *   "label": "Line height options",
     *   "options": [
     *     {
     *       "label": ".8",
     *       "selection": "0.8"
     *     },
     *     {
     *       "label": "1",
     *       "selection": "1"
     *     },
     *     {
     *       "label": "1.5",
     *       "selection": "1.5"
     *     },
     *     {
     *       "label": "2",
     *       "selection": "2"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LINE_HEIGHT_OPTIONS]?: OptionSelection;
}
