/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, SingleNumberElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '9c5e08f5-e54d-42c4-b855-c73eb0908022';
export const TYPE_NAME = 'Boundary options';
export const KEY_TOP = 'top';
export const KEY_BOTTOM = 'bottom';
export const KEY_LEFT = 'left';
export const KEY_RIGHT = 'right';

/*
 * @name Boundary options
 * @id 9c5e08f5-e54d-42c4-b855-c73eb0908022
 */
export interface BoundaryOptions {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "top",
     *   "label": "Top"
     * }
     * ```
     */
    [KEY_TOP]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "bottom",
     *   "label": "Bottom"
     * }
     * ```
     */
    [KEY_BOTTOM]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "left",
     *   "label": "Left"
     * }
     * ```
     */
    [KEY_LEFT]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "right",
     *   "label": "Right"
     * }
     * ```
     */
    [KEY_RIGHT]?: SingleNumberElement;
}

export interface BoundaryOptionsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '9c5e08f5-e54d-42c4-b855-c73eb0908022'
    };
}

export interface SingleBoundaryOptionsElement extends BoundaryOptionsElement {
    value: BoundaryOptions;
}

export interface MultiBoundaryOptionsElement extends BoundaryOptionsElement {
    values: BoundaryOptions[];
}

/**
 * Tests if the value is of type BoundaryOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type BoundaryOptionsElement else false
 */
export function isBoundaryOptions(aValue: any): aValue is BoundaryOptions {
    return !!aValue
        && (!aValue[KEY_TOP] || _isSingleNumberElement(aValue[KEY_TOP], true))
        && (!aValue[KEY_BOTTOM] || _isSingleNumberElement(aValue[KEY_BOTTOM], true))
        && (!aValue[KEY_LEFT] || _isSingleNumberElement(aValue[KEY_LEFT], true))
        && (!aValue[KEY_RIGHT] || _isSingleNumberElement(aValue[KEY_RIGHT], true))
        ;
}

/**
 * Tests if the value is of type SingleBoundaryOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleBoundaryOptionsElement else false
 */
export function isSingleBoundaryOptionsElement(aValue: any, bOptional?: boolean): aValue is SingleBoundaryOptionsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isBoundaryOptions(aValue.value));
}

/**
 * Tests if the value is of type MultiBoundaryOptionsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiBoundaryOptionsElement else false
 */
export function isMultiBoundaryOptionsElement(aValue: any, bOptional?: boolean): aValue is MultiBoundaryOptionsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isBoundaryOptions));
}

/*
 * @name Boundary options
 * @id 9c5e08f5-e54d-42c4-b855-c73eb0908022
 */
export interface BoundaryOptionsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "top",
     *   "label": "Top"
     * }
     * ```
     */
    [KEY_TOP]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "bottom",
     *   "label": "Bottom"
     * }
     * ```
     */
    [KEY_BOTTOM]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "left",
     *   "label": "Left"
     * }
     * ```
     */
    [KEY_LEFT]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "right",
     *   "label": "Right"
     * }
     * ```
     */
    [KEY_RIGHT]?: number;
}
