/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { AlignmentOptionsType, isAlignmentOptionsType as DPBDaeeWs } from './../alignment-options/alignment.options.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { LineHeightOptionsType, isLineHeightOptionsType as fA2$Sue9x } from './../line-height-options/line.height.options.type';
import { StylingType, isStylingType as TdKJj8UOw } from './../styling/styling.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as F2EstD4mD, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'b201f69e-29ff-4f3e-9a72-6c6be6c7d754';
export const TYPE_NAME = 'Button';
export const KEY_LABEL = 'label';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_STYLE = 'style';
export const KEY_LINK = 'link';
export const KEY_ALIGN = 'align';
export const KEY_LINE_HEIGHT = 'lineHeight';
export const KEY_CORNER_RADIUS = 'cornerRadius';
export const KEY_PADDING = 'padding';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Button
 * @id b201f69e-29ff-4f3e-9a72-6c6be6c7d754
 */
export interface ButtonType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "label",
     *   "label": "Button label",
     *   "placeholder": {
     *     "show": true,
     *     "text": "Button text"
     *   }
     * }
     * ```
     */
    [KEY_LABEL]?: string;

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
     *   "elementType": "group",
     *   "key": "style",
     *   "label": "Style",
     *   "typeRef": {
     *     "id": "a93f6a4a-d086-4bb1-9bb4-69fe9cc75cdb"
     *   }
     * }
     * ```
     */
    [KEY_STYLE]?: StylingType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "link",
     *   "label": "Link"
     * }
     * ```
     */
    [KEY_LINK]?: Link;

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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "cornerRadius",
     *   "label": "Corner radius",
     *   "minimum": 0
     * }
     * ```
     */
    [KEY_CORNER_RADIUS]?: number;

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
 * Tests if the value is of type ButtonElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type ButtonElement else false
 */
export function isButtonType(aValue: any): aValue is ButtonType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_LABEL], Dp8dLCd6c)
        && _krhmaXp(aValue[KEY_BACKGROUND_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_STYLE], TdKJj8UOw)
        && _krhmaXp(aValue[KEY_LINK], F2EstD4mD)
        && _krhmaXp(aValue[KEY_ALIGN], DPBDaeeWs)
        && _krhmaXp(aValue[KEY_LINE_HEIGHT], fA2$Sue9x)
        && _krhmaXp(aValue[KEY_CORNER_RADIUS], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "label" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLabel: (aDefault?: string) => UnaryFunction<ButtonType, string> = partialLeft(pluckProperty, KEY_LABEL);

/**
 * Selects the "label" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLabel: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<ButtonType, string> = partialLeft(rxSelectProperty, KEY_LABEL);

/**
 * Selects the "backgroundColor" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: ColorsType) => UnaryFunction<ButtonType, ColorsType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<ButtonType, ColorsType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "style" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectStyle: (aDefault?: StylingType) => UnaryFunction<ButtonType, StylingType> = partialLeft(pluckProperty, KEY_STYLE);

/**
 * Selects the "style" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectStyle: (aDefault?: StylingType, aCmp?: EqualsPredicate<StylingType>) => OperatorFunction<ButtonType, StylingType> = partialLeft(rxSelectProperty, KEY_STYLE);

/**
 * Selects the "link" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLink: (aDefault?: Link) => UnaryFunction<ButtonType, Link> = partialLeft(pluckProperty, KEY_LINK);

/**
 * Selects the "link" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLink: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) => OperatorFunction<ButtonType, Link> = partialLeft(rxSelectProperty, KEY_LINK);

/**
 * Selects the "align" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlign: (aDefault?: AlignmentOptionsType) => UnaryFunction<ButtonType, AlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGN);

/**
 * Selects the "align" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlign: (aDefault?: AlignmentOptionsType, aCmp?: EqualsPredicate<AlignmentOptionsType>) => OperatorFunction<ButtonType, AlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGN);

/**
 * Selects the "lineHeight" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineHeight: (aDefault?: LineHeightOptionsType) => UnaryFunction<ButtonType, LineHeightOptionsType> = partialLeft(pluckProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "lineHeight" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineHeight: (aDefault?: LineHeightOptionsType, aCmp?: EqualsPredicate<LineHeightOptionsType>) => OperatorFunction<ButtonType, LineHeightOptionsType> = partialLeft(rxSelectProperty, KEY_LINE_HEIGHT);

/**
 * Selects the "cornerRadius" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCornerRadius: (aDefault?: number) => UnaryFunction<ButtonType, number> = partialLeft(pluckProperty, KEY_CORNER_RADIUS);

/**
 * Selects the "cornerRadius" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCornerRadius: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<ButtonType, number> = partialLeft(rxSelectProperty, KEY_CORNER_RADIUS);

/**
 * Selects the "padding" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<ButtonType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<ButtonType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "commonSettings" property from ButtonType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<ButtonType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from ButtonType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<ButtonType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
