/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as _4RmgQx9_, isImage as RDWhilV8x, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

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
export interface BackgroundExtensionType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background Color",
     *   "typeRef": {
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
 * Tests if the value is of type BackgroundExtensionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type BackgroundExtensionElement else false
 */
export function isBackgroundExtensionType(aValue: any): aValue is BackgroundExtensionType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_BACKGROUND_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_INCLUDE_BACKGROUND_IMAGE], _4RmgQx9_)
        && _krhmaXp(aValue[KEY_IMAGE], RDWhilV8x)
        && _krhmaXp(aValue[KEY_FILL_OPTIONS], Dp8dLCd6c)
    ;
}

/**
 * Selects the "backgroundColor" property from BackgroundExtensionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: ColorsType) => UnaryFunction<BackgroundExtensionType, ColorsType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from BackgroundExtensionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<BackgroundExtensionType, ColorsType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "includeBackgroundImage" property from BackgroundExtensionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIncludeBackgroundImage: (aDefault?: boolean) => UnaryFunction<BackgroundExtensionType, boolean> = partialLeft(pluckProperty, KEY_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the "includeBackgroundImage" property from BackgroundExtensionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIncludeBackgroundImage: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<BackgroundExtensionType, boolean> = partialLeft(rxSelectProperty, KEY_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the "image" property from BackgroundExtensionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: Image) => UnaryFunction<BackgroundExtensionType, Image> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from BackgroundExtensionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<BackgroundExtensionType, Image> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "fillOptions" property from BackgroundExtensionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFillOptions: (aDefault?: string) => UnaryFunction<BackgroundExtensionType, string> = partialLeft(pluckProperty, KEY_FILL_OPTIONS);

/**
 * Selects the "fillOptions" property from BackgroundExtensionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFillOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<BackgroundExtensionType, string> = partialLeft(rxSelectProperty, KEY_FILL_OPTIONS);
