/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, OptionSelection, SingleOptionSelectionElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleOptionSelectionElement as _isSingleOptionSelectionElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '0915841f-cf93-4e3c-8ece-f22b0c41a9e6';
export const TYPE_NAME = 'Alignment options';
export const KEY_ALIGNMENT_OPTIONS = 'alignmentOptions';

/*
 * @name Alignment options
 * @id 0915841f-cf93-4e3c-8ece-f22b0c41a9e6
 */
export interface AlignmentOptions {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "alignmentOptions",
     *   "label": "Alignment options",
     *   "options": [
     *     {
     *       "label": "Left",
     *       "selection": "left"
     *     },
     *     {
     *       "label": "Center",
     *       "selection": "center"
     *     },
     *     {
     *       "label": "Right",
     *       "selection": "right"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_ALIGNMENT_OPTIONS]?: SingleOptionSelectionElement;
}

export interface AlignmentOptionsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '0915841f-cf93-4e3c-8ece-f22b0c41a9e6'
    };
}

export interface SingleAlignmentOptionsElement extends AlignmentOptionsElement {
    value: AlignmentOptions;
}

export interface MultiAlignmentOptionsElement extends AlignmentOptionsElement {
    values: AlignmentOptions[];
}

/**
 * Tests if the value is of type AlignmentOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type AlignmentOptionsElement else false
 */
export function isAlignmentOptions(aValue: any): aValue is AlignmentOptions {
    return !!aValue
        && (!aValue[KEY_ALIGNMENT_OPTIONS] || _isSingleOptionSelectionElement(aValue[KEY_ALIGNMENT_OPTIONS], true))
        ;
}

/**
 * Tests if the value is of type SingleAlignmentOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleAlignmentOptionsElement else false
 */
export function isSingleAlignmentOptionsElement(aValue: any, bOptional?: boolean): aValue is SingleAlignmentOptionsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isAlignmentOptions(aValue.value));
}

/**
 * Tests if the value is of type MultiAlignmentOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiAlignmentOptionsElement else false
 */
export function isMultiAlignmentOptionsElement(aValue: any, bOptional?: boolean): aValue is MultiAlignmentOptionsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isAlignmentOptions));
}

/*
 * @name Alignment options
 * @id 0915841f-cf93-4e3c-8ece-f22b0c41a9e6
 */
export interface AlignmentOptionsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "alignmentOptions",
     *   "label": "Alignment options",
     *   "options": [
     *     {
     *       "label": "Left",
     *       "selection": "left"
     *     },
     *     {
     *       "label": "Center",
     *       "selection": "center"
     *     },
     *     {
     *       "label": "Right",
     *       "selection": "right"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_ALIGNMENT_OPTIONS]?: OptionSelection;
}
