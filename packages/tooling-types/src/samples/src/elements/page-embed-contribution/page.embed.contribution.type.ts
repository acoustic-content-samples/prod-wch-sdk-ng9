/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageEmbedContributionType}.
 */
export const TYPE_ID_PAGE_EMBED_CONTRIBUTION = 'eedce4a0-9647-4301-9247-6793e08652ea';
/**
 * Name of the content type for {@link PageEmbedContributionType}.
 */
export const TYPE_NAME_PAGE_EMBED_CONTRIBUTION = '📄 Page Embed Contribution';
/**
 * Key name of the `embed` property of {@link PageEmbedContributionType}
 */
export const KEY_PAGE_EMBED_CONTRIBUTION_EMBED = 'embed';
/**
 * Key name of the `key` property of {@link PageEmbedContributionType}
 */
export const KEY_PAGE_EMBED_CONTRIBUTION_KEY = 'key';

/**
 * Delivery version of the 📄 Page Embed Contribution content type.
 *
 * See {@link TYPE_ID_PAGE_EMBED_CONTRIBUTION} and {@link TYPE_NAME_PAGE_EMBED_CONTRIBUTION}
 * @remarks
 * A page markup contribution directly added into the markup
 */
export interface PageEmbedContributionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The markup to be added.
   * @remarks
   * See {@link KEY_PAGE_EMBED_CONTRIBUTION_EMBED}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The markup to be added.",
   *   "key": "embed",
   *   "label": "embed",
   *   "required": true,
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_PAGE_EMBED_CONTRIBUTION_EMBED]: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_EMBED_CONTRIBUTION_KEY}
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
  [KEY_PAGE_EMBED_CONTRIBUTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link PageEmbedContributionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageEmbedContributionType} else false
 */
export function isPageEmbedContributionType(aValue: any): aValue is PageEmbedContributionType {
  return PZ6MJUijH(aValue)
    && jEcWTCNgA(aValue[KEY_PAGE_EMBED_CONTRIBUTION_EMBED])
    && Dl16LDKVr(aValue[KEY_PAGE_EMBED_CONTRIBUTION_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_PAGE_EMBED_CONTRIBUTION_EMBED} property from {@link PageEmbedContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageEmbedContributionEmbed: (aDefault?: string) => UnaryFunction<PageEmbedContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_EMBED_CONTRIBUTION_EMBED);

/**
 * Selects the {@link KEY_PAGE_EMBED_CONTRIBUTION_EMBED} property from {@link PageEmbedContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageEmbedContributionEmbed: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageEmbedContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_EMBED_CONTRIBUTION_EMBED);

/**
 * Selects the {@link KEY_PAGE_EMBED_CONTRIBUTION_KEY} property from {@link PageEmbedContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageEmbedContributionKey: (aDefault?: string) => UnaryFunction<PageEmbedContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_EMBED_CONTRIBUTION_KEY);

/**
 * Selects the {@link KEY_PAGE_EMBED_CONTRIBUTION_KEY} property from {@link PageEmbedContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageEmbedContributionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageEmbedContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_EMBED_CONTRIBUTION_KEY);
