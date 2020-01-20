/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesColorType, isSitesColorType as bhcW3LBlH } from './../sites-color/sites.color.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as jG6olS9M, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '8e460c39-9cf6-4a78-9726-ee43ad961a8a';
export const TYPE_NAME = 'Sites Vertical Rule';
export const KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS = 'includeVerticalRuleBetweenLinks';
export const KEY_LINE_COLOR = 'lineColor';
export const KEY_OPACITY = 'opacity';

/*
 * @name Sites Vertical Rule
 * @id 8e460c39-9cf6-4a78-9726-ee43ad961a8a
 */
export interface SitesVerticalRuleType {
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
     *   "label": "Line Color",
     *   "typeRef": {
     *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
     *   }
     * }
     * ```
     */
    [KEY_LINE_COLOR]?: SitesColorType;

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
 * Tests if the value is of type SitesVerticalRuleElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesVerticalRuleElement else false
 */
export function isSitesVerticalRuleType(aValue: any): aValue is SitesVerticalRuleType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS], jG6olS9M)
        && R8L_djGws(aValue[KEY_LINE_COLOR], bhcW3LBlH)
        && R8L_djGws(aValue[KEY_OPACITY], ZV9hASzOp)
    ;
}

/**
 * Selects the "includeVerticalRuleBetweenLinks" property from SitesVerticalRuleType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIncludeVerticalRuleBetweenLinks: (aDefault?: boolean) => UnaryFunction<SitesVerticalRuleType, boolean> = partialLeft(pluckProperty, KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS);

/**
 * Selects the "includeVerticalRuleBetweenLinks" property from SitesVerticalRuleType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIncludeVerticalRuleBetweenLinks: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) => OperatorFunction<SitesVerticalRuleType, boolean> = partialLeft(rxSelectProperty, KEY_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS);

/**
 * Selects the "lineColor" property from SitesVerticalRuleType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLineColor: (aDefault?: SitesColorType) => UnaryFunction<SitesVerticalRuleType, SitesColorType> = partialLeft(pluckProperty, KEY_LINE_COLOR);

/**
 * Selects the "lineColor" property from SitesVerticalRuleType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLineColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesVerticalRuleType, SitesColorType> = partialLeft(rxSelectProperty, KEY_LINE_COLOR);

/**
 * Selects the "opacity" property from SitesVerticalRuleType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectOpacity: (aDefault?: number) => UnaryFunction<SitesVerticalRuleType, number> = partialLeft(pluckProperty, KEY_OPACITY);

/**
 * Selects the "opacity" property from SitesVerticalRuleType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectOpacity: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesVerticalRuleType, number> = partialLeft(rxSelectProperty, KEY_OPACITY);
