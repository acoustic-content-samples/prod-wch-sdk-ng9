/**
 * Do not modify this file, it is auto-generated.
 */
import { BackgroundExtensionType, SingleBackgroundExtensionElement, isSingleBackgroundExtensionElement as _isSingleBackgroundExtensionElement } from './../background-extension/backgroundExtensionType';
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { EmailCellType, MultiEmailCellElement, isMultiEmailCellElement as _isMultiEmailCellElement } from './../email-cell/emailCellType';
import { GroupElement, SingleNumberElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'b908096b-9cd2-4085-bf0c-a510576e633b';
export const TYPE_NAME = 'Email Section';
export const KEY_CELLS = 'cells';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_KEY = 'key';
export const KEY_BACKGROUND = 'background';
export const KEY_SPACING_BETWEEN_BLOCKS = 'spacingBetweenBlocks';

/*
 * @name Email Section
 * @id b908096b-9cd2-4085-bf0c-a510576e633b
 */
export interface EmailSection {

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Column",
     *   "key": "cells",
     *   "label": "Cells",
     *   "maximumValues": 3,
     *   "minimumValues": 1,
     *   "required": true,
     *   "typeRef": {
     *     "name": "Email Cell",
     *     "id": "b80af051-6cae-4c82-8a99-b1f1c4c06bd7"
     *   }
     * }
     * ```
     */
    [KEY_CELLS]: MultiEmailCellElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
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
     *   "elementType": "text",
     *   "key": "key",
     *   "label": "Key"
     * }
     * ```
     */
    [KEY_KEY]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacingBetweenBlocks",
     *   "label": "Spacing between blocks"
     * }
     * ```
     */
    [KEY_SPACING_BETWEEN_BLOCKS]?: SingleNumberElement;
}

export interface EmailSectionElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'b908096b-9cd2-4085-bf0c-a510576e633b'
    };
}

export interface SingleEmailSectionElement extends EmailSectionElement {
    value: EmailSection;
}

export interface MultiEmailSectionElement extends EmailSectionElement {
    values: EmailSection[];
}

/**
 * Tests if the value is of type EmailSectionElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type EmailSectionElement else false
 */
export function isEmailSection(aValue: any): aValue is EmailSection {
    return !!aValue
        && _isMultiEmailCellElement(aValue[KEY_CELLS], false)
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        && (!aValue[KEY_KEY] || _isSingleTextElement(aValue[KEY_KEY], true))
        && (!aValue[KEY_BACKGROUND] || _isSingleBackgroundExtensionElement(aValue[KEY_BACKGROUND], true))
        && (!aValue[KEY_SPACING_BETWEEN_BLOCKS] || _isSingleNumberElement(aValue[KEY_SPACING_BETWEEN_BLOCKS], true))
        ;
}

/**
 * Tests if the value is of type SingleEmailSectionElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleEmailSectionElement else false
 */
export function isSingleEmailSectionElement(aValue: any, bOptional?: boolean): aValue is SingleEmailSectionElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isEmailSection(aValue.value));
}

/**
 * Tests if the value is of type MultiEmailSectionElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiEmailSectionElement else false
 */
export function isMultiEmailSectionElement(aValue: any, bOptional?: boolean): aValue is MultiEmailSectionElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isEmailSection));
}

/*
 * @name Email Section
 * @id b908096b-9cd2-4085-bf0c-a510576e633b
 */
export interface EmailSectionType {

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Column",
     *   "key": "cells",
     *   "label": "Cells",
     *   "maximumValues": 3,
     *   "minimumValues": 1,
     *   "required": true,
     *   "typeRef": {
     *     "name": "Email Cell",
     *     "id": "b80af051-6cae-4c82-8a99-b1f1c4c06bd7"
     *   }
     * }
     * ```
     */
    [KEY_CELLS]: EmailCellType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
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
     *   "elementType": "text",
     *   "key": "key",
     *   "label": "Key"
     * }
     * ```
     */
    [KEY_KEY]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacingBetweenBlocks",
     *   "label": "Spacing between blocks"
     * }
     * ```
     */
    [KEY_SPACING_BETWEEN_BLOCKS]?: number;
}
