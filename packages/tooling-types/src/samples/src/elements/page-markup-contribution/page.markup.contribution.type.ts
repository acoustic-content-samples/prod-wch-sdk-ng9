/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageMarkupContributionType}.
 */
export const TYPE_ID_PAGE_MARKUP_CONTRIBUTION = '2b0cd235-16ad-42ec-aea7-a05df105604c';
/**
 * Name of the content type for {@link PageMarkupContributionType}.
 */
export const TYPE_NAME_PAGE_MARKUP_CONTRIBUTION = '📄 Page Markup Contribution';
/**
 * Key name of the `markup` property of {@link PageMarkupContributionType}
 */
export const KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP = 'markup';
/**
 * Key name of the `key` property of {@link PageMarkupContributionType}
 */
export const KEY_PAGE_MARKUP_CONTRIBUTION_KEY = 'key';

/**
 * Delivery version of the 📄 Page Markup Contribution content type.
 *
 * See {@link TYPE_ID_PAGE_MARKUP_CONTRIBUTION} and {@link TYPE_NAME_PAGE_MARKUP_CONTRIBUTION}
 * @remarks
 * A page markup contribution directly added into the markup
 */
export interface PageMarkupContributionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The markup to be added.
   * @remarks
   * See {@link KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": false,
   *   "elementType": "text",
   *   "helpText": "The markup to be added.",
   *   "key": "markup",
   *   "label": "Markup"
   * }
   * ```
   */
  [KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_MARKUP_CONTRIBUTION_KEY}
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
  [KEY_PAGE_MARKUP_CONTRIBUTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link PageMarkupContributionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageMarkupContributionType} else false
 */
export function isPageMarkupContributionType(aValue: any): aValue is PageMarkupContributionType {
  return PZ6MJUijH(aValue)
    && Dl16LDKVr(aValue[KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP], jEcWTCNgA)
    && Dl16LDKVr(aValue[KEY_PAGE_MARKUP_CONTRIBUTION_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP} property from {@link PageMarkupContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageMarkupContributionMarkup: (aDefault?: string) => UnaryFunction<PageMarkupContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP);

/**
 * Selects the {@link KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP} property from {@link PageMarkupContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageMarkupContributionMarkup: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageMarkupContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_MARKUP_CONTRIBUTION_MARKUP);

/**
 * Selects the {@link KEY_PAGE_MARKUP_CONTRIBUTION_KEY} property from {@link PageMarkupContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageMarkupContributionKey: (aDefault?: string) => UnaryFunction<PageMarkupContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_MARKUP_CONTRIBUTION_KEY);

/**
 * Selects the {@link KEY_PAGE_MARKUP_CONTRIBUTION_KEY} property from {@link PageMarkupContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageMarkupContributionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageMarkupContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_MARKUP_CONTRIBUTION_KEY);
