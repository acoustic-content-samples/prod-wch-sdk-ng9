/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, Image, OptionSelection, SingleImageElement, SingleOptionSelectionElement, SingleToggleElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleImageElement as _isSingleImageElement, isSingleOptionSelectionElement as _isSingleOptionSelectionElement, isSingleToggleElement as _isSingleToggleElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '0c6b2078-02dd-4c5d-858f-99d6d88114b5';
export const TYPE_NAME = 'Background Image';
export const KEY_INCLUDE_BACKGROUND_IMAGE = 'includeBackgroundImage';
export const KEY_IMAGE = 'image';
export const KEY_FILL_OPTIONS = 'fillOptions';

/*
 * @name Background Image
 * @id 0c6b2078-02dd-4c5d-858f-99d6d88114b5
 */
export interface BackgroundImage {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "includeBackgroundImage",
     *   "label": "Include background image"
     * }
     * ```
     */
    [KEY_INCLUDE_BACKGROUND_IMAGE]?: SingleToggleElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "image",
     *   "key": "image",
     *   "label": "Image"
     * }
     * ```
     */
    [KEY_IMAGE]?: SingleImageElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "fillOptions",
     *   "label": "Fill options",
     *   "options": [
     *     {
     *       "label": "Full Width",
     *       "selection": "fullWidth"
     *     },
     *     {
     *       "label": "Center",
     *       "selection": "center"
     *     },
     *     {
     *       "label": "Tile",
     *       "selection": "tile"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_FILL_OPTIONS]?: SingleOptionSelectionElement;
}

export interface BackgroundImageElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '0c6b2078-02dd-4c5d-858f-99d6d88114b5'
    };
}

export interface SingleBackgroundImageElement extends BackgroundImageElement {
    value: BackgroundImage;
}

export interface MultiBackgroundImageElement extends BackgroundImageElement {
    values: BackgroundImage[];
}

/**
 * Tests if the value is of type BackgroundImageElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type BackgroundImageElement else false
 */
export function isBackgroundImage(aValue: any): aValue is BackgroundImage {
    return !!aValue
        && (!aValue[KEY_INCLUDE_BACKGROUND_IMAGE] || _isSingleToggleElement(aValue[KEY_INCLUDE_BACKGROUND_IMAGE], true))
        && (!aValue[KEY_IMAGE] || _isSingleImageElement(aValue[KEY_IMAGE], true))
        && (!aValue[KEY_FILL_OPTIONS] || _isSingleOptionSelectionElement(aValue[KEY_FILL_OPTIONS], true))
        ;
}

/**
 * Tests if the value is of type SingleBackgroundImageElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleBackgroundImageElement else false
 */
export function isSingleBackgroundImageElement(aValue: any, bOptional?: boolean): aValue is SingleBackgroundImageElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isBackgroundImage(aValue.value));
}

/**
 * Tests if the value is of type MultiBackgroundImageElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiBackgroundImageElement else false
 */
export function isMultiBackgroundImageElement(aValue: any, bOptional?: boolean): aValue is MultiBackgroundImageElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isBackgroundImage));
}

/*
 * @name Background Image
 * @id 0c6b2078-02dd-4c5d-858f-99d6d88114b5
 */
export interface BackgroundImageType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "includeBackgroundImage",
     *   "label": "Include background image"
     * }
     * ```
     */
    [KEY_INCLUDE_BACKGROUND_IMAGE]?: boolean;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "image",
     *   "key": "image",
     *   "label": "Image"
     * }
     * ```
     */
    [KEY_IMAGE]?: Image;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "fillOptions",
     *   "label": "Fill options",
     *   "options": [
     *     {
     *       "label": "Full Width",
     *       "selection": "fullWidth"
     *     },
     *     {
     *       "label": "Center",
     *       "selection": "center"
     *     },
     *     {
     *       "label": "Tile",
     *       "selection": "tile"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_FILL_OPTIONS]?: OptionSelection;
}
