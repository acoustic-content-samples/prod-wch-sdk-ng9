/**
 * Do not modify this file, it is auto-generated.
 */
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { GroupElement, MultiReferenceElement, RenderingContext, SingleNumberElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isMultiReferenceElement as _isMultiReferenceElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'b80af051-6cae-4c82-8a99-b1f1c4c06bd7';
export const TYPE_NAME = 'Email Cell';
export const KEY_CONTENT = 'content';
export const KEY_SPAN = 'span';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';

/*
 * @name Email Cell
 * @id b80af051-6cae-4c82-8a99-b1f1c4c06bd7
 */
export interface EmailCell {

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "reference",
     *   "key": "content",
     *   "label": "Content",
     *   "required": false
     * }
     * ```
     */
    [KEY_CONTENT]?: MultiReferenceElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "span",
     *   "label": "Span",
     *   "maximum": 6,
     *   "minimum": 2,
     *   "required": true
     * }
     * ```
     */
    [KEY_SPAN]: SingleNumberElement;

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
}

export interface EmailCellElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'b80af051-6cae-4c82-8a99-b1f1c4c06bd7'
    };
}

export interface SingleEmailCellElement extends EmailCellElement {
    value: EmailCell;
}

export interface MultiEmailCellElement extends EmailCellElement {
    values: EmailCell[];
}

/**
 * Tests if the value is of type EmailCellElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type EmailCellElement else false
 */
export function isEmailCell(aValue: any): aValue is EmailCell {
    return !!aValue
        && (!aValue[KEY_CONTENT] || _isMultiReferenceElement(aValue[KEY_CONTENT], true))
        && _isSingleNumberElement(aValue[KEY_SPAN], false)
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_MARGIN] || _isSingleBoundaryOptionsElement(aValue[KEY_MARGIN], true))
        ;
}

/**
 * Tests if the value is of type SingleEmailCellElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleEmailCellElement else false
 */
export function isSingleEmailCellElement(aValue: any, bOptional?: boolean): aValue is SingleEmailCellElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isEmailCell(aValue.value));
}

/**
 * Tests if the value is of type MultiEmailCellElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiEmailCellElement else false
 */
export function isMultiEmailCellElement(aValue: any, bOptional?: boolean): aValue is MultiEmailCellElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isEmailCell));
}

/*
 * @name Email Cell
 * @id b80af051-6cae-4c82-8a99-b1f1c4c06bd7
 */
export interface EmailCellType {

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "reference",
     *   "key": "content",
     *   "label": "Content",
     *   "required": false
     * }
     * ```
     */
    [KEY_CONTENT]?: RenderingContext;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "span",
     *   "label": "Span",
     *   "maximum": 6,
     *   "minimum": 2,
     *   "required": true
     * }
     * ```
     */
    [KEY_SPAN]: number;

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
}
