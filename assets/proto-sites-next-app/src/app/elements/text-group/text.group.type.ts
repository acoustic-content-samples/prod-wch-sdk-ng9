/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { BackgroundExtensionType, isBackgroundExtensionType as V67Bg9fqa } from './../background-extension/background.extension.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { LineHeightOptionsType, isLineHeightOptionsType as fA2$Sue9x } from './../line-height-options/line.height.options.type';
import { StylingType, isStylingType as TdKJj8UOw } from './../styling/styling.type';
import { TextAlignmentOptionsType, isTextAlignmentOptionsType as hgBhbzu5q } from './../text-alignment-options/text.alignment.options.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'f71e2d31-6536-4016-9f89-c6848d0f4b55';
export const TYPE_NAME = 'Text Group';
export const KEY_TEXT = 'text';
export const KEY_TEXT_STYLE = 'textStyle';
export const KEY_LINK_COLOR = 'linkColor';
export const KEY_BACKGROUND = 'background';
export const KEY_ALIGNMENT = 'alignment';
export const KEY_LINE_HEIGHT = 'lineHeight';
export const KEY_PADDING = 'padding';

/*
 * @name Text Group
 * @id f71e2d31-6536-4016-9f89-c6848d0f4b55
 */
export interface TextGroupType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "formattedtext",
     *   "hidden": true,
     *   "key": "text",
     *   "label": "Text"
     * }
     * ```
     */
    [KEY_TEXT]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "textStyle",
     *   "label": "Text Style",
     *   "typeRef": {
     *     "id": "a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb"
     *   }
     * }
     * ```
     */
    [KEY_TEXT_STYLE]?: StylingType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "linkColor",
     *   "label": "Link color",
     *   "typeRef": {
     *     "id": "1321a547-287a-477b-a7ec-d191e2cdb70a"
     *   }
     * }
     * ```
     */
    [KEY_LINK_COLOR]?: ColorsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "typeRef": {
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
     *   "elementType": "group",
     *   "key": "alignment",
     *   "label": "Alignment",
     *   "typeRef": {
     *     "id": "63f1d1c5-fa92-48da-a7a2-a2b700f4b097"
     *   }
     * }
     * ```
     */
    [KEY_ALIGNMENT]?: TextAlignmentOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "lineHeight",
     *   "label": "Line height",
     *   "typeRef": {
     *     "id": "5b94254c-71a0-42aa-b979-e21ffbae12b2"
     *   }
     * }
     * ```
     */
    [KEY_LINE_HEIGHT]?: LineHeightOptionsType;

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
 * Tests if the value is of type TextGroupElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type TextGroupElement else false
 */
export function isTextGroupType(aValue: any): aValue is TextGroupType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_TEXT], Dp8dLCd6c)
        && _krhmaXp(aValue[KEY_TEXT_STYLE], TdKJj8UOw)
        && _krhmaXp(aValue[KEY_LINK_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_BACKGROUND], V67Bg9fqa)
        && _krhmaXp(aValue[KEY_ALIGNMENT], hgBhbzu5q)
        && _krhmaXp(aValue[KEY_LINE_HEIGHT], fA2$Sue9x)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
    ;
}

/**
 * Selects the "text" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectText: (aDefault?: string) => UnaryFunction<TextGroupType, string> = partialLeft(pluckProperty, KEY_TEXT);

/**
 * Selects the "text" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectText: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<TextGroupType, string> = partialLeft(rxSelectProperty, KEY_TEXT);

/**
 * Selects the "textStyle" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTextStyle: (aDefault?: StylingType) => UnaryFunction<TextGroupType, StylingType> = partialLeft(pluckProperty, KEY_TEXT_STYLE);

/**
 * Selects the "textStyle" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTextStyle: (aDefault?: StylingType, aCmp?: EqualsPredicate<StylingType>) => OperatorFunction<TextGroupType, StylingType> = partialLeft(rxSelectProperty, KEY_TEXT_STYLE);

/**
 * Selects the "linkColor" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLinkColor: (aDefault?: ColorsType) => UnaryFunction<TextGroupType, ColorsType> = partialLeft(pluckProperty, KEY_LINK_COLOR);

/**
 * Selects the "linkColor" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLinkColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<TextGroupType, ColorsType> = partialLeft(rxSelectProperty, KEY_LINK_COLOR);

/**
 * Selects the "background" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: BackgroundExtensionType) => UnaryFunction<TextGroupType, BackgroundExtensionType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: BackgroundExtensionType, aCmp?: EqualsPredicate<BackgroundExtensionType>) => OperatorFunction<TextGroupType, BackgroundExtensionType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "alignment" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlignment: (aDefault?: TextAlignmentOptionsType) => UnaryFunction<TextGroupType, TextAlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGNMENT);

/**
 * Selects the "alignment" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlignment: (aDefault?: TextAlignmentOptionsType, aCmp?: EqualsPredicate<TextAlignmentOptionsType>) => OperatorFunction<TextGroupType, TextAlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGNMENT);

/**
 * Selects the "lineHeight" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineHeight: (aDefault?: LineHeightOptionsType) => UnaryFunction<TextGroupType, LineHeightOptionsType> = partialLeft(pluckProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "lineHeight" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineHeight: (aDefault?: LineHeightOptionsType, aCmp?: EqualsPredicate<LineHeightOptionsType>) => OperatorFunction<TextGroupType, LineHeightOptionsType> = partialLeft(rxSelectProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "padding" property from TextGroupType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<TextGroupType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from TextGroupType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<TextGroupType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);
