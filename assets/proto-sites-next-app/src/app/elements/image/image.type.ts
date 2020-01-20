/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { AlignmentOptionsType, isAlignmentOptionsType as DPBDaeeWs } from './../alignment-options/alignment.options.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isImage as RDWhilV8x, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'b7b05524-87ed-4509-b6fb-972f2cbf26d5';
export const TYPE_NAME = 'Image';
export const KEY_IMAGE = 'image';
export const KEY_ALIGN = 'align';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Image
 * @id b7b05524-87ed-4509-b6fb-972f2cbf26d5
 */
export interface ImageType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "acceptType": [
     *     "jpg",
     *     "jpeg",
     *     "png",
     *     "gif"
     *   ],
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

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margin",
     *   "typeRef": {
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
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "typeRef": {
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}

/**
 * Tests if the value is of type ImageElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type ImageElement else false
 */
export function isImageType(aValue: any): aValue is ImageType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_IMAGE], RDWhilV8x)
        && _krhmaXp(aValue[KEY_ALIGN], DPBDaeeWs)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_MARGIN], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "image" property from ImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: Image) => UnaryFunction<ImageType, Image> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from ImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<ImageType, Image> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "align" property from ImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlign: (aDefault?: AlignmentOptionsType) => UnaryFunction<ImageType, AlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGN);

/**
 * Selects the "align" property from ImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlign: (aDefault?: AlignmentOptionsType, aCmp?: EqualsPredicate<AlignmentOptionsType>) => OperatorFunction<ImageType, AlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGN);

/**
 * Selects the "padding" property from ImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<ImageType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from ImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<ImageType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from ImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: BoundaryOptionsType) => UnaryFunction<ImageType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from ImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<ImageType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "commonSettings" property from ImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<ImageType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from ImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<ImageType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
