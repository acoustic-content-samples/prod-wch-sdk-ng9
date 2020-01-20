/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isImage as RDWhilV8x, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, isOptionalArrayOf as h$bi1SMZa, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '7952a5b2-57d0-4a1b-a008-d37c7d7f5261';
export const TYPE_NAME = 'Image group';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_SPACING = 'spacing';
export const KEY_MARGIN = 'margin';
export const KEY_COMMON_SETTINGS = 'commonSettings';
export const KEY_IMAGES = 'images';
export const KEY_LAYOUT = 'layout';

/*
 * @name Image group
 * @id 7952a5b2-57d0-4a1b-a008-d37c7d7f5261
 */
export interface ImageGroupType {
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
     *   "label": "Background color",
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacing",
     *   "label": "Spacing between images",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_SPACING]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margins",
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
     *   "allowMultipleValues": true,
     *   "elementType": "image",
     *   "fieldLabel": "Image",
     *   "key": "images",
     *   "label": "Images",
     *   "maximumValues": 5,
     *   "minimumValues": 0,
     *   "required": false
     * }
     * ```
     */
    [KEY_IMAGES]?: Image[];

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "layout",
     *   "label": "Layout",
     *   "options": [
     *     {
     *       "label": "1 Row w/ 2 Equal Columns",
     *       "selection": "2-col"
     *     },
     *     {
     *       "label": "2 Rows w/ 1 Column Top, 1 Column Bottom",
     *       "selection": "1-col-t-1-col-b"
     *     },
     *     {
     *       "label": "1 Row w/ 3 Equal Columns",
     *       "selection": "3-col"
     *     },
     *     {
     *       "label": "2 Rows w/ 2 Columns Top, 1 Column Bottom",
     *       "selection": "2-col-t-1-col-b"
     *     },
     *     {
     *       "label": "2 Rows w/ 1 Column Top, 2 Columns Bottom",
     *       "selection": "1-col-t-2-col-b"
     *     },
     *     {
     *       "label": "1 Row w/ 4 Equal Columns",
     *       "selection": "4-col"
     *     },
     *     {
     *       "label": "2 Rows w/ 2 Columns",
     *       "selection": "2-col-t-2-col-b"
     *     },
     *     {
     *       "label": "2 Rows w/ 3 Columns Top, 1 Column Bottom",
     *       "selection": "3-col-t-1-col-b"
     *     },
     *     {
     *       "label": "2 Rows w/ 1 Column Top, 3 Columns Bottom",
     *       "selection": "1-col-t-3-col-b"
     *     },
     *     {
     *       "label": "2 Rows w/ 3 Columns Top, 2 Columns Bottom",
     *       "selection": "3-col-t-2-col-b"
     *     },
     *     {
     *       "label": "2 Rows w/ 2 Columns Top, 3 Columns Bottom",
     *       "selection": "2-col-t-3-col-b"
     *     },
     *     {
     *       "label": "3 Rows w/ 2 Columns Top, 1 Column Middle, 2 Columns Bottom",
     *       "selection": "2-col-t-1-col-m-2-col-b"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LAYOUT]?: string;
}

/**
 * Tests if the value is of type ImageGroupElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type ImageGroupElement else false
 */
export function isImageGroupType(aValue: any): aValue is ImageGroupType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_BACKGROUND_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_SPACING], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_MARGIN], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
        && h$bi1SMZa(aValue[KEY_IMAGES], RDWhilV8x)
        && _krhmaXp(aValue[KEY_LAYOUT], Dp8dLCd6c)
    ;
}

/**
 * Selects the "backgroundColor" property from ImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: ColorsType) => UnaryFunction<ImageGroupType, ColorsType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from ImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<ImageGroupType, ColorsType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "spacing" property from ImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpacing: (aDefault?: number) => UnaryFunction<ImageGroupType, number> = partialLeft(pluckProperty, KEY_SPACING);

/**
 * Selects the "spacing" property from ImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpacing: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<ImageGroupType, number> = partialLeft(rxSelectProperty, KEY_SPACING);

/**
 * Selects the "margin" property from ImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: BoundaryOptionsType) => UnaryFunction<ImageGroupType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from ImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<ImageGroupType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "commonSettings" property from ImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<ImageGroupType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from ImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<ImageGroupType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "images" property from ImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImages: (aDefault?: Image[]) => UnaryFunction<ImageGroupType, Image[]> = partialLeft(pluckProperty, KEY_IMAGES);

/**
 * Selects the "images" property from ImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImages: (aDefault?: Image[], aCmp?: EqualsPredicate<Image[]>) => OperatorFunction<ImageGroupType, Image[]> = partialLeft(rxSelectProperty, KEY_IMAGES);

/**
 * Selects the "layout" property from ImageGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLayout: (aDefault?: string) => UnaryFunction<ImageGroupType, string> = partialLeft(pluckProperty, KEY_LAYOUT);

/**
 * Selects the "layout" property from ImageGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<ImageGroupType, string> = partialLeft(rxSelectProperty, KEY_LAYOUT);
