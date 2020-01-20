/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { AlignmentOptionsType, isAlignmentOptionsType as DPBDaeeWs } from './../alignment-options/alignment.options.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isImage as RDWhilV8x, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '39bd65fc-2733-4c8a-a700-3075f127fb2d';
export const TYPE_NAME = 'Custom ImageGroup';
export const KEY_IMAGE = 'image';
export const KEY_ALIGN = 'align';
export const KEY_PADDING = 'padding';

/*
 * @name Custom ImageGroup
 * @id 39bd65fc-2733-4c8a-a700-3075f127fb2d
 */
export interface CustomImageGroupType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

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
     *   "elementType": "group",
     *   "key": "align",
     *   "label": "Alignment",
     *   "typeRef": {
     *     "id": "0915841f-cf93-4e3c-8ece-f22b0c41a9e6"
     *   }
     * }
     * ```
     */
    [KEY_ALIGN]?: AlignmentOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "typeRef": {
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_PADDING]?: BoundaryOptionsType;
}

/**
 * Tests if the value is of type CustomImageGroupElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type CustomImageGroupElement else false
 */
export function isCustomImageGroupType(aValue: any): aValue is CustomImageGroupType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_IMAGE], RDWhilV8x)
        && _krhmaXp(aValue[KEY_ALIGN], DPBDaeeWs)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
    ;
}

/**
 * Selects the "image" property from CustomImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: Image) => UnaryFunction<CustomImageGroupType, Image> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from CustomImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<CustomImageGroupType, Image> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "align" property from CustomImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlign: (aDefault?: AlignmentOptionsType) => UnaryFunction<CustomImageGroupType, AlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGN);

/**
 * Selects the "align" property from CustomImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlign: (aDefault?: AlignmentOptionsType, aCmp?: EqualsPredicate<AlignmentOptionsType>) => OperatorFunction<CustomImageGroupType, AlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGN);

/**
 * Selects the "padding" property from CustomImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<CustomImageGroupType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from CustomImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<CustomImageGroupType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);
