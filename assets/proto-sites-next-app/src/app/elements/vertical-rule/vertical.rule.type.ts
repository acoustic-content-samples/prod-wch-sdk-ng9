/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as _4RmgQx9_, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'ef5a6efe-c403-4acc-a4ad-bc9f8718b509';
export const TYPE_NAME = 'Vertical rule';
export const KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS = 'includeVerticalRuleBetweenLinks';
export const KEY_LINE_COLOR = 'lineColor';
export const KEY_OPACITY = 'opacity';

/*
 * @name Vertical rule
 * @id ef5a6efe-c403-4acc-a4ad-bc9f8718b509
 */
export interface VerticalRuleType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "includeVerticalRuleBetweenLinks",
     *   "label": "Include vertical rule between links"
     * }
     * ```
     */
    [KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS]?: boolean;

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
}

/**
 * Tests if the value is of type VerticalRuleElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type VerticalRuleElement else false
 */
export function isVerticalRuleType(aValue: any): aValue is VerticalRuleType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS], _4RmgQx9_)
        && _krhmaXp(aValue[KEY_LINE_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_OPACITY], hSMeY2NBd)
    ;
}

/**
 * Selects the "includeVerticalRuleBetweenLinks" property from VerticalRuleType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIncludeVerticalRuleBetweenLinks: (aDefault?: boolean) => UnaryFunction<VerticalRuleType, boolean> = partialLeft(pluckProperty, KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS);

/**
 * Selects the "includeVerticalRuleBetweenLinks" property from VerticalRuleType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIncludeVerticalRuleBetweenLinks: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<VerticalRuleType, boolean> = partialLeft(rxSelectProperty, KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS);

/**
 * Selects the "lineColor" property from VerticalRuleType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineColor: (aDefault?: ColorsType) => UnaryFunction<VerticalRuleType, ColorsType> = partialLeft(pluckProperty, KEY_LINE_COLOR);

/**
 * Selects the "lineColor" property from VerticalRuleType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<VerticalRuleType, ColorsType> = partialLeft(rxSelectProperty, KEY_LINE_COLOR);

/**
 * Selects the "opacity" property from VerticalRuleType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectOpacity: (aDefault?: number) => UnaryFunction<VerticalRuleType, number> = partialLeft(pluckProperty, KEY_OPACITY);

/**
 * Selects the "opacity" property from VerticalRuleType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectOpacity: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<VerticalRuleType, number> = partialLeft(rxSelectProperty, KEY_OPACITY);
