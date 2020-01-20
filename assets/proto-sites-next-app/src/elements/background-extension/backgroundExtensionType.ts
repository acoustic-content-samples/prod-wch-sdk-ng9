/**
 * Do not modify this file, it is auto-generated.
 */
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { GroupElement, Image, OptionSelection, SingleImageElement, SingleOptionSelectionElement, SingleToggleElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleImageElement as _isSingleImageElement, isSingleOptionSelectionElement as _isSingleOptionSelectionElement, isSingleToggleElement as _isSingleToggleElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '8c4a8b02-67a1-4849-8e2d-f90be58485c5';
export const TYPE_NAME = 'Background Extension';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_INCLUDE_BACKGROUND_IMAGE = 'includeBackgroundImage';
export const KEY_IMAGE = 'image';
export const KEY_FILL_OPTIONS = 'fillOptions';

/*
 * @name Background Extension
 * @id 8c4a8b02-67a1-4849-8e2d-f90be58485c5
 * @description Use for all backgrounds.
 */
export interface BackgroundExtension {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background Color",
     *   "typeRef": {
     *     "name": "Colors",
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
     *   "label": "Fill",
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

export interface BackgroundExtensionElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '8c4a8b02-67a1-4849-8e2d-f90be58485c5'
    };
}

export interface SingleBackgroundExtensionElement extends BackgroundExtensionElement {
    value: BackgroundExtension;
}

export interface MultiBackgroundExtensionElement extends BackgroundExtensionElement {
    values: BackgroundExtension[];
}

/**
 * Tests if the value is of type BackgroundExtensionElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type BackgroundExtensionElement else false
 */
export function isBackgroundExtension(aValue: any): aValue is BackgroundExtension {
    return !!aValue
        && (!aValue[KEY_BACKGROUND_COLOR] || _isSingleColorsElement(aValue[KEY_BACKGROUND_COLOR], true))
        && (!aValue[KEY_INCLUDE_BACKGROUND_IMAGE] || _isSingleToggleElement(aValue[KEY_INCLUDE_BACKGROUND_IMAGE], true))
        && (!aValue[KEY_IMAGE] || _isSingleImageElement(aValue[KEY_IMAGE], true))
        && (!aValue[KEY_FILL_OPTIONS] || _isSingleOptionSelectionElement(aValue[KEY_FILL_OPTIONS], true))
        ;
}

/**
 * Tests if the value is of type SingleBackgroundExtensionElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleBackgroundExtensionElement else false
 */
export function isSingleBackgroundExtensionElement(aValue: any, bOptional?: boolean): aValue is SingleBackgroundExtensionElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isBackgroundExtension(aValue.value));
}

/**
 * Tests if the value is of type MultiBackgroundExtensionElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiBackgroundExtensionElement else false
 */
export function isMultiBackgroundExtensionElement(aValue: any, bOptional?: boolean): aValue is MultiBackgroundExtensionElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isBackgroundExtension));
}

/*
 * @name Background Extension
 * @id 8c4a8b02-67a1-4849-8e2d-f90be58485c5
 * @description Use for all backgrounds.
 */
export interface BackgroundExtensionType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background Color",
     *   "typeRef": {
     *     "name": "Colors",
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
     *   "label": "Fill",
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
