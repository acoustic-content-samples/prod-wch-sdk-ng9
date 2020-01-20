/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, OptionSelection, SingleOptionSelectionElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleOptionSelectionElement as _isSingleOptionSelectionElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'f8253f3b-1a03-4d08-99e0-9723bb4ca3a8';
export const TYPE_NAME = 'Font options';
export const KEY_FONTS = 'fonts';

/*
 * @name Font options
 * @id f8253f3b-1a03-4d08-99e0-9723bb4ca3a8
 */
export interface FontOptions {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "fonts",
     *   "label": "Fonts",
     *   "options": [
     *     {
     *       "label": "Arial",
     *       "selection": "Arial"
     *     },
     *     {
     *       "label": "Comic Sans MS",
     *       "selection": "Comic Sans MS"
     *     },
     *     {
     *       "label": "Courier New",
     *       "selection": "Courier New"
     *     },
     *     {
     *       "label": "Georgia",
     *       "selection": "Georgia"
     *     },
     *     {
     *       "label": "Lucida Sans Unicode",
     *       "selection": "Lucida Sans Unicode"
     *     },
     *     {
     *       "label": "Tahoma",
     *       "selection": "Tahoma"
     *     },
     *     {
     *       "label": "Times New Roman",
     *       "selection": "Times New Roman"
     *     },
     *     {
     *       "label": "Trebuchet MS",
     *       "selection": "Trebuchet MS"
     *     },
     *     {
     *       "label": "Verdana",
     *       "selection": "Verdana"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_FONTS]?: SingleOptionSelectionElement;
}

export interface FontOptionsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'f8253f3b-1a03-4d08-99e0-9723bb4ca3a8'
    };
}

export interface SingleFontOptionsElement extends FontOptionsElement {
    value: FontOptions;
}

export interface MultiFontOptionsElement extends FontOptionsElement {
    values: FontOptions[];
}

/**
 * Tests if the value is of type FontOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type FontOptionsElement else false
 */
export function isFontOptions(aValue: any): aValue is FontOptions {
    return !!aValue
        && (!aValue[KEY_FONTS] || _isSingleOptionSelectionElement(aValue[KEY_FONTS], true))
        ;
}

/**
 * Tests if the value is of type SingleFontOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleFontOptionsElement else false
 */
export function isSingleFontOptionsElement(aValue: any, bOptional?: boolean): aValue is SingleFontOptionsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isFontOptions(aValue.value));
}

/**
 * Tests if the value is of type MultiFontOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiFontOptionsElement else false
 */
export function isMultiFontOptionsElement(aValue: any, bOptional?: boolean): aValue is MultiFontOptionsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isFontOptions));
}

/*
 * @name Font options
 * @id f8253f3b-1a03-4d08-99e0-9723bb4ca3a8
 */
export interface FontOptionsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "fonts",
     *   "label": "Fonts",
     *   "options": [
     *     {
     *       "label": "Arial",
     *       "selection": "Arial"
     *     },
     *     {
     *       "label": "Comic Sans MS",
     *       "selection": "Comic Sans MS"
     *     },
     *     {
     *       "label": "Courier New",
     *       "selection": "Courier New"
     *     },
     *     {
     *       "label": "Georgia",
     *       "selection": "Georgia"
     *     },
     *     {
     *       "label": "Lucida Sans Unicode",
     *       "selection": "Lucida Sans Unicode"
     *     },
     *     {
     *       "label": "Tahoma",
     *       "selection": "Tahoma"
     *     },
     *     {
     *       "label": "Times New Roman",
     *       "selection": "Times New Roman"
     *     },
     *     {
     *       "label": "Trebuchet MS",
     *       "selection": "Trebuchet MS"
     *     },
     *     {
     *       "label": "Verdana",
     *       "selection": "Verdana"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_FONTS]?: OptionSelection;
}
