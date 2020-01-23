/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageStyleContributionType}.
 */
export const TYPE_ID_PAGE_STYLE_CONTRIBUTION = '3a3726b8-e0b2-4f10-98ed-b1c82e851b99';
/**
 * Name of the content type for {@link PageStyleContributionType}.
 */
export const TYPE_NAME_PAGE_STYLE_CONTRIBUTION = '📄 Page Style Contribution';
/**
 * Key name of the `href` property of {@link PageStyleContributionType}
 */
export const KEY_PAGE_STYLE_CONTRIBUTION_HREF = 'href';
/**
 * Key name of the `key` property of {@link PageStyleContributionType}
 */
export const KEY_PAGE_STYLE_CONTRIBUTION_KEY = 'key';

/**
 * Delivery version of the 📄 Page Style Contribution content type.
 *
 * See {@link TYPE_ID_PAGE_STYLE_CONTRIBUTION} and {@link TYPE_NAME_PAGE_STYLE_CONTRIBUTION}
 * @remarks
 * A style contribution added as a <link rel="stylesheet" href="..."> element to the page markup
 */
export interface PageStyleContributionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The URL pointing to the style resource realtive to the resource base URL of this tenant.
   * @remarks
   * See {@link KEY_PAGE_STYLE_CONTRIBUTION_HREF}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The URL pointing to the style resource realtive to the resource base URL of this tenant.",
   *   "key": "href",
   *   "label": "href",
   *   "required": true,
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_PAGE_STYLE_CONTRIBUTION_HREF]: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_STYLE_CONTRIBUTION_KEY}
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
  [KEY_PAGE_STYLE_CONTRIBUTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link PageStyleContributionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageStyleContributionType} else false
 */
export function isPageStyleContributionType(aValue: any): aValue is PageStyleContributionType {
  return PZ6MJUijH(aValue)
    && jEcWTCNgA(aValue[KEY_PAGE_STYLE_CONTRIBUTION_HREF])
    && Dl16LDKVr(aValue[KEY_PAGE_STYLE_CONTRIBUTION_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_PAGE_STYLE_CONTRIBUTION_HREF} property from {@link PageStyleContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageStyleContributionHref: (aDefault?: string) => UnaryFunction<PageStyleContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_STYLE_CONTRIBUTION_HREF);

/**
 * Selects the {@link KEY_PAGE_STYLE_CONTRIBUTION_HREF} property from {@link PageStyleContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageStyleContributionHref: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageStyleContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_STYLE_CONTRIBUTION_HREF);

/**
 * Selects the {@link KEY_PAGE_STYLE_CONTRIBUTION_KEY} property from {@link PageStyleContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageStyleContributionKey: (aDefault?: string) => UnaryFunction<PageStyleContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_STYLE_CONTRIBUTION_KEY);

/**
 * Selects the {@link KEY_PAGE_STYLE_CONTRIBUTION_KEY} property from {@link PageStyleContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageStyleContributionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageStyleContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_STYLE_CONTRIBUTION_KEY);
