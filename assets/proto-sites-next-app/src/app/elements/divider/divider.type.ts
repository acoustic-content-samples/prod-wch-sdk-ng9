/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { AlignmentOptionsType, isAlignmentOptionsType as DPBDaeeWs } from './../alignment-options/alignment.options.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '251f4c19-ea42-4e4d-8831-1ffca17d6a6d';
export const TYPE_NAME = 'Divider';
export const KEY_LINE_TYPE = 'lineType';
export const KEY_LINE_COLOR = 'lineColor';
export const KEY_OPACITY = 'opacity';
export const KEY_ALIGN = 'align';
export const KEY_MARGIN = 'margin';
export const KEY_LINE_WEIGHT = 'lineWeight';
export const KEY_WIDTH = 'width';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Divider
 * @id 251f4c19-ea42-4e4d-8831-1ffca17d6a6d
 */
export interface DividerType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "lineType",
     *   "label": "Line type",
     *   "options": [
     *     {
     *       "label": "Solid",
     *       "selection": "solid"
     *     },
     *     {
     *       "label": "Dotted",
     *       "selection": "dotted"
     *     },
     *     {
     *       "label": "Dashed",
     *       "selection": "dashed"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LINE_TYPE]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "lineColor",
     *   "label": "Line color",
     *   "typeRef": {
     *     "id": "1321a547-287a-477b-a7ec-d191e2cdb70a"
     *   }
     * }
     * ```
     */
    [KEY_LINE_COLOR]?: ColorsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "opacity",
     *   "label": "Opacity"
     * }
     * ```
     */
    [KEY_OPACITY]?: number;

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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "lineWeight",
     *   "label": "Line weight",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_LINE_WEIGHT]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "width",
     *   "label": "Width"
     * }
     * ```
     */
    [KEY_WIDTH]?: number;

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
 * Tests if the value is of type DividerElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type DividerElement else false
 */
export function isDividerType(aValue: any): aValue is DividerType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_LINE_TYPE], Dp8dLCd6c)
        && _krhmaXp(aValue[KEY_LINE_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_OPACITY], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_ALIGN], DPBDaeeWs)
        && _krhmaXp(aValue[KEY_MARGIN], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_LINE_WEIGHT], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_WIDTH], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "lineType" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineType: (aDefault?: string) => UnaryFunction<DividerType, string> = partialLeft(pluckProperty, KEY_LINE_TYPE);

/**
 * Selects the "lineType" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineType: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<DividerType, string> = partialLeft(rxSelectProperty, KEY_LINE_TYPE);

/**
 * Selects the "lineColor" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineColor: (aDefault?: ColorsType) => UnaryFunction<DividerType, ColorsType> = partialLeft(pluckProperty, KEY_LINE_COLOR);

/**
 * Selects the "lineColor" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<DividerType, ColorsType> = partialLeft(rxSelectProperty, KEY_LINE_COLOR);

/**
 * Selects the "opacity" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectOpacity: (aDefault?: number) => UnaryFunction<DividerType, number> = partialLeft(pluckProperty, KEY_OPACITY);

/**
 * Selects the "opacity" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectOpacity: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<DividerType, number> = partialLeft(rxSelectProperty, KEY_OPACITY);

/**
 * Selects the "align" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlign: (aDefault?: AlignmentOptionsType) => UnaryFunction<DividerType, AlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGN);

/**
 * Selects the "align" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlign: (aDefault?: AlignmentOptionsType, aCmp?: EqualsPredicate<AlignmentOptionsType>) => OperatorFunction<DividerType, AlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGN);

/**
 * Selects the "margin" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: BoundaryOptionsType) => UnaryFunction<DividerType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<DividerType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "lineWeight" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineWeight: (aDefault?: number) => UnaryFunction<DividerType, number> = partialLeft(pluckProperty, KEY_LINE_WEIGHT);

/**
 * Selects the "lineWeight" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineWeight: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<DividerType, number> = partialLeft(rxSelectProperty, KEY_LINE_WEIGHT);

/**
 * Selects the "width" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectWidth: (aDefault?: number) => UnaryFunction<DividerType, number> = partialLeft(pluckProperty, KEY_WIDTH);

/**
 * Selects the "width" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectWidth: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<DividerType, number> = partialLeft(rxSelectProperty, KEY_WIDTH);

/**
 * Selects the "commonSettings" property from DividerType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<DividerType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from DividerType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<DividerType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
