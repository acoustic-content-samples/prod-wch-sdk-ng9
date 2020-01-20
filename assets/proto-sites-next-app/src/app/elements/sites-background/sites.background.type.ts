/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesColorType, isSitesColorType as T5gDVxMmI } from './../sites-color/sites.color.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as t1jjvzm0n, isImage as vM_aht0Iv, isNotNil as p_CWR7uKB, isOptional as _nKTVr$OH, isString as jq7sQRd7u, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '0a92059b-de6b-476d-b291-1638a435d0af';
export const TYPE_NAME = 'Sites Background';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_INCLUDE_BACKGROUND_IMAGE = 'includeBackgroundImage';
export const KEY_IMAGE = 'image';
export const KEY_FILL_OPTIONS = 'fillOptions';

/*
 * @name Sites Background
 * @id 0a92059b-de6b-476d-b291-1638a435d0af
 * @description Use for all backgrounds.
 */
export interface SitesBackgroundType {
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
     *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: SitesColorType;

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
 * Tests if the value is of type SitesBackgroundElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesBackgroundElement else false
 */
export function isSitesBackgroundType(aValue: any): aValue is SitesBackgroundType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_BACKGROUND_COLOR], T5gDVxMmI)
        && _nKTVr$OH(aValue[KEY_INCLUDE_BACKGROUND_IMAGE], t1jjvzm0n)
        && _nKTVr$OH(aValue[KEY_IMAGE], vM_aht0Iv)
        && _nKTVr$OH(aValue[KEY_FILL_OPTIONS], jq7sQRd7u)
    ;
}

/**
 * Selects the "backgroundColor" property from SitesBackgroundType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesBackgroundType, SitesColorType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from SitesBackgroundType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesBackgroundType, SitesColorType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "includeBackgroundImage" property from SitesBackgroundType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIncludeBackgroundImage: (aDefault?: boolean) => UnaryFunction<SitesBackgroundType, boolean> = partialLeft(pluckProperty, KEY_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the "includeBackgroundImage" property from SitesBackgroundType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIncludeBackgroundImage: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<SitesBackgroundType, boolean> = partialLeft(rxSelectProperty, KEY_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the "image" property from SitesBackgroundType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: Image) => UnaryFunction<SitesBackgroundType, Image> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from SitesBackgroundType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<SitesBackgroundType, Image> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "fillOptions" property from SitesBackgroundType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFillOptions: (aDefault?: string) => UnaryFunction<SitesBackgroundType, string> = partialLeft(pluckProperty, KEY_FILL_OPTIONS);

/**
 * Selects the "fillOptions" property from SitesBackgroundType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFillOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesBackgroundType, string> = partialLeft(rxSelectProperty, KEY_FILL_OPTIONS);
