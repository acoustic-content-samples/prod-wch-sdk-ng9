/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as BuYcuEBrz, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesVerticalRuleType}.
 */
export const TYPE_ID_SITES_VERTICAL_RULE = '8e460c39-9cf6-4a78-9726-ee43ad961a8a';
/**
 * Name of the content type for {@link SitesVerticalRuleType}.
 */
export const TYPE_NAME_SITES_VERTICAL_RULE = 'Sites Vertical Rule';
/**
 * Key name of the `includeVerticalRuleBetweenLinks` property of {@link SitesVerticalRuleType}
 */
export const KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS = 'includeVerticalRuleBetweenLinks';
/**
 * Key name of the `lineColor` property of {@link SitesVerticalRuleType}
 */
export const KEY_SITES_VERTICAL_RULE_LINE_COLOR = 'lineColor';
/**
 * Key name of the `opacity` property of {@link SitesVerticalRuleType}
 */
export const KEY_SITES_VERTICAL_RULE_OPACITY = 'opacity';
/**
 * Key name of the `key` property of {@link SitesVerticalRuleType}
 */
export const KEY_SITES_VERTICAL_RULE_KEY = 'key';

/**
 * Delivery version of the Sites Vertical Rule content type.
 *
 * See {@link TYPE_ID_SITES_VERTICAL_RULE} and {@link TYPE_NAME_SITES_VERTICAL_RULE}
 * @remarks
 * This block represnets a vertical rule to be shown on pages.
 */
export interface SitesVerticalRuleType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls if vertical rules are added between links
   * @remarks
   * See {@link KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "toggle",
   *   "helpText": "This element controls if vertical rules are added between links",
   *   "key": "includeVerticalRuleBetweenLinks",
   *   "label": "Include vertical rule between links"
   * }
   * ```
   */
  [KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS]?: boolean;

  /**
   * This element controls line color of this vertical rule
   * @remarks
   * See {@link KEY_SITES_VERTICAL_RULE_LINE_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls line color of this vertical rule",
   *   "key": "lineColor",
   *   "label": "Line Color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_VERTICAL_RULE_LINE_COLOR]?: SitesColorType;

  /**
   * This element controls opacity of this vertical rule
   * @remarks
   * See {@link KEY_SITES_VERTICAL_RULE_OPACITY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls opacity of this vertical rule",
   *   "key": "opacity",
   *   "label": "Opacity"
   * }
   * ```
   */
  [KEY_SITES_VERTICAL_RULE_OPACITY]?: number;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_VERTICAL_RULE_KEY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element is used to uniquely identify this element in the current content item",
   *   "key": "key",
   *   "label": "Key"
   * }
   * ```
   */
  [KEY_SITES_VERTICAL_RULE_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesVerticalRuleType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesVerticalRuleType} else false
 */
export function isSitesVerticalRuleType(aValue: any): aValue is SitesVerticalRuleType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS], BuYcuEBrz)
    && VnbVJaXFB(aValue[KEY_SITES_VERTICAL_RULE_LINE_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_VERTICAL_RULE_OPACITY], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_VERTICAL_RULE_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS} property from {@link SitesVerticalRuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVerticalRuleIncludeVerticalRuleBetweenLinks: (aDefault?: boolean) => UnaryFunction<SitesVerticalRuleType,
  boolean> = partialLeft(pluckProperty, KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS} property from {@link SitesVerticalRuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVerticalRuleIncludeVerticalRuleBetweenLinks: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) =>
  OperatorFunction<SitesVerticalRuleType, boolean> = partialLeft(rxSelectProperty, KEY_SITES_VERTICAL_RULE_INCLUDE_VERTICAL_RULE_BETWEEN_LINKS);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_LINE_COLOR} property from {@link SitesVerticalRuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVerticalRuleLineColor: (aDefault?: SitesColorType) => UnaryFunction<SitesVerticalRuleType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_VERTICAL_RULE_LINE_COLOR);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_LINE_COLOR} property from {@link SitesVerticalRuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVerticalRuleLineColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesVerticalRuleType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_VERTICAL_RULE_LINE_COLOR);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_OPACITY} property from {@link SitesVerticalRuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVerticalRuleOpacity: (aDefault?: number) => UnaryFunction<SitesVerticalRuleType,
  number> = partialLeft(pluckProperty, KEY_SITES_VERTICAL_RULE_OPACITY);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_OPACITY} property from {@link SitesVerticalRuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVerticalRuleOpacity: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesVerticalRuleType, number> = partialLeft(rxSelectProperty, KEY_SITES_VERTICAL_RULE_OPACITY);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_KEY} property from {@link SitesVerticalRuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVerticalRuleKey: (aDefault?: string) => UnaryFunction<SitesVerticalRuleType,
  string> = partialLeft(pluckProperty, KEY_SITES_VERTICAL_RULE_KEY);

/**
 * Selects the {@link KEY_SITES_VERTICAL_RULE_KEY} property from {@link SitesVerticalRuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVerticalRuleKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesVerticalRuleType, string> = partialLeft(rxSelectProperty, KEY_SITES_VERTICAL_RULE_KEY);
