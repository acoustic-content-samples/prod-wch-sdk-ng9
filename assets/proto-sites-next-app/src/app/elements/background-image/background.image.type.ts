/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as lb58rOx2p, isImage as TFhq2KPDg, isNotNil as zmBF1xmJe, isOptional as j4VQ1j3tj, isString as TFwJbeK1c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '0c6b2078-02dd-4c5d-858f-99d6d88114b5';
export const TYPE_NAME = 'Background Image';
export const KEY_INCLUDE_BACKGROUND_IMAGE = 'includeBackgroundImage';
export const KEY_IMAGE = 'image';
export const KEY_FILL_OPTIONS = 'fillOptions';

/*
 * @name Background Image
 * @id 0c6b2078-02dd-4c5d-858f-99d6d88114b5
 */
export interface BackgroundImageType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

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
     *       "selection": "full-width"
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
    [KEY_FILL_OPTIONS]?: string;
}

/**
 * Tests if the value is of type BackgroundImageElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type BackgroundImageElement else false
 */
export function isBackgroundImageType(aValue: any): aValue is BackgroundImageType {
    return zmBF1xmJe(aValue)
        && j4VQ1j3tj(aValue[KEY_INCLUDE_BACKGROUND_IMAGE], lb58rOx2p)
        && j4VQ1j3tj(aValue[KEY_IMAGE], TFhq2KPDg)
        && j4VQ1j3tj(aValue[KEY_FILL_OPTIONS], TFwJbeK1c)
    ;
}

/**
 * Selects the "includeBackgroundImage" property from BackgroundImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIncludeBackgroundImage: (aDefault?: boolean) => UnaryFunction<BackgroundImageType, boolean> = partialLeft(pluckProperty, KEY_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the "includeBackgroundImage" property from BackgroundImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIncludeBackgroundImage: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<BackgroundImageType, boolean> = partialLeft(rxSelectProperty, KEY_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the "image" property from BackgroundImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: Image) => UnaryFunction<BackgroundImageType, Image> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from BackgroundImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<BackgroundImageType, Image> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "fillOptions" property from BackgroundImageType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFillOptions: (aDefault?: string) => UnaryFunction<BackgroundImageType, string> = partialLeft(pluckProperty, KEY_FILL_OPTIONS);

/**
 * Selects the "fillOptions" property from BackgroundImageType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFillOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<BackgroundImageType, string> = partialLeft(rxSelectProperty, KEY_FILL_OPTIONS);
