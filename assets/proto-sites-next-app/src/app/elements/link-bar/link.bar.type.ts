/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { AlignmentOptionsType, isAlignmentOptionsType as DPBDaeeWs } from './../alignment-options/alignment.options.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { StylingType, isStylingType as TdKJj8UOw } from './../styling/styling.type';
import { VerticalRuleType, isVerticalRuleType as bYhAgbDSC } from './../vertical-rule/vertical.rule.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isArrayOf as jxToZ9EKI, isLink as F2EstD4mD, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '98bec4ac-6170-402c-9405-6e8cfd99508a';
export const TYPE_NAME = 'Link bar';
export const KEY_LINKS = 'links';
export const KEY_TEXT_STYLE = 'textStyle';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_ALIGN = 'align';
export const KEY_SPACING_BETWEEN_LINKS = 'spacingBetweenLinks';
export const KEY_PADDING = 'padding';
export const KEY_INCLUDE_VERTICAL_RULE = 'includeVerticalRule';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Link bar
 * @id 98bec4ac-6170-402c-9405-6e8cfd99508a
 */
export interface LinkBarType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "link",
     *   "fieldLabel": "Links",
     *   "key": "links",
     *   "label": "Links",
     *   "maximumValues": 7,
     *   "minimumValues": 2,
     *   "required": true
     * }
     * ```
     */
    [KEY_LINKS]: Link[];

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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacingBetweenLinks",
     *   "label": "Spacing between links"
     * }
     * ```
     */
    [KEY_SPACING_BETWEEN_LINKS]?: number;

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
     *   "key": "includeVerticalRule",
     *   "label": "Include vertical rule between links",
     *   "typeRef": {
     *     "id": "ef5a6efe-c403-4acc-a4ad-bc9f8718b509"
     *   }
     * }
     * ```
     */
    [KEY_INCLUDE_VERTICAL_RULE]?: VerticalRuleType;

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
 * Tests if the value is of type LinkBarElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type LinkBarElement else false
 */
export function isLinkBarType(aValue: any): aValue is LinkBarType {
    return t3YhiD3Bk(aValue)
        && jxToZ9EKI(aValue[KEY_LINKS], F2EstD4mD)
        && _krhmaXp(aValue[KEY_TEXT_STYLE], TdKJj8UOw)
        && _krhmaXp(aValue[KEY_BACKGROUND_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_ALIGN], DPBDaeeWs)
        && _krhmaXp(aValue[KEY_SPACING_BETWEEN_LINKS], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_INCLUDE_VERTICAL_RULE], bYhAgbDSC)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "links" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLinks: (aDefault?: Link[]) => UnaryFunction<LinkBarType, Link[]> = partialLeft(pluckProperty, KEY_LINKS);

/**
 * Selects the "links" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLinks: (aDefault?: Link[], aCmp?: EqualsPredicate<Link[]>) => OperatorFunction<LinkBarType, Link[]> = partialLeft(rxSelectProperty, KEY_LINKS);

/**
 * Selects the "textStyle" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTextStyle: (aDefault?: StylingType) => UnaryFunction<LinkBarType, StylingType> = partialLeft(pluckProperty, KEY_TEXT_STYLE);

/**
 * Selects the "textStyle" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTextStyle: (aDefault?: StylingType, aCmp?: EqualsPredicate<StylingType>) => OperatorFunction<LinkBarType, StylingType> = partialLeft(rxSelectProperty, KEY_TEXT_STYLE);

/**
 * Selects the "backgroundColor" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: ColorsType) => UnaryFunction<LinkBarType, ColorsType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<LinkBarType, ColorsType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "align" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlign: (aDefault?: AlignmentOptionsType) => UnaryFunction<LinkBarType, AlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGN);

/**
 * Selects the "align" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlign: (aDefault?: AlignmentOptionsType, aCmp?: EqualsPredicate<AlignmentOptionsType>) => OperatorFunction<LinkBarType, AlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGN);

/**
 * Selects the "spacingBetweenLinks" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpacingBetweenLinks: (aDefault?: number) => UnaryFunction<LinkBarType, number> = partialLeft(pluckProperty, KEY_SPACING_BETWEEN_LINKS);

/**
 * Selects the "spacingBetweenLinks" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpacingBetweenLinks: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<LinkBarType, number> = partialLeft(rxSelectProperty, KEY_SPACING_BETWEEN_LINKS);

/**
 * Selects the "padding" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<LinkBarType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<LinkBarType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "includeVerticalRule" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIncludeVerticalRule: (aDefault?: VerticalRuleType) => UnaryFunction<LinkBarType, VerticalRuleType> = partialLeft(pluckProperty, KEY_INCLUDE_VERTICAL_RULE);

/**
 * Selects the "includeVerticalRule" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIncludeVerticalRule: (aDefault?: VerticalRuleType, aCmp?: EqualsPredicate<VerticalRuleType>) => OperatorFunction<LinkBarType, VerticalRuleType> = partialLeft(rxSelectProperty, KEY_INCLUDE_VERTICAL_RULE);

/**
 * Selects the "commonSettings" property from LinkBarType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<LinkBarType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from LinkBarType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<LinkBarType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
