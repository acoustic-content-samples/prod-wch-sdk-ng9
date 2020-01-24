/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as BEPjY_iKk, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isOptionalArrayOf as TlMUHGxnv, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageContributionType}.
 */
export const TYPE_ID_PAGE_CONTRIBUTION = '354743b2-f89a-482b-b447-2b5a2367c8bd';
/**
 * Name of the content type for {@link PageContributionType}.
 */
export const TYPE_NAME_PAGE_CONTRIBUTION = '📄 Page Contribution';
/**
 * Key name of the `embed` property of {@link PageContributionType}
 */
export const KEY_PAGE_CONTRIBUTION_EMBED = 'embed';
/**
 * Key name of the `reference` property of {@link PageContributionType}
 */
export const KEY_PAGE_CONTRIBUTION_REFERENCE = 'reference';
/**
 * Key name of the `mode` property of {@link PageContributionType}
 */
export const KEY_PAGE_CONTRIBUTION_MODE = 'mode';
/**
 * Key name of the `key` property of {@link PageContributionType}
 */
export const KEY_PAGE_CONTRIBUTION_KEY = 'key';

/**
 * Delivery version of the 📄 Page Contribution content type.
 *
 * See {@link TYPE_ID_PAGE_CONTRIBUTION} and {@link TYPE_NAME_PAGE_CONTRIBUTION}
 * @remarks
 * An set of related markup contributions to be added to markup of individual pages. Page contributions can contribute to both, the "head" and the "body" element of the page.
 */
export interface PageContributionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * Embed this contribution directly into the markup of this page. This field contains the markup of the contributions.
   * @remarks
   * See {@link KEY_PAGE_CONTRIBUTION_EMBED}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "text",
   *   "fieldLabel": "Private",
   *   "helpText": "Embed this contribution directly into the markup of this page. This field contains the markup of the contributions.",
   *   "key": "embed",
   *   "label": "embed",
   *   "minimumValues": 0
   * }
   * ```
   */
  [KEY_PAGE_CONTRIBUTION_EMBED]?: string[];

  /**
   * Reference a shared page contribution.
   * @remarks
   * See {@link KEY_PAGE_CONTRIBUTION_REFERENCE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "reference",
   *   "fieldLabel": "Shared",
   *   "helpText": "Reference a shared page contribution.",
   *   "key": "reference",
   *   "label": "reference",
   *   "minimumValues": 0
   * }
   * ```
   */
  [KEY_PAGE_CONTRIBUTION_REFERENCE]?: DeliveryReferenceElement[];

  /**
   * This element controls if the contribution is meant to be added to pages rendered for "previeww" or "live" mode. This allows for example to add additional Page Module (like inline-editing modules) only when the page is rendered in preview mode in the authoring UI. This allows to avoid uneccessary bandwith consumption when serving your live. You can use the option "always" to include this contributions in both modes (i.e. in "live" and "preview" mode)
   * @remarks
   * See {@link KEY_PAGE_CONTRIBUTION_MODE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls if the contribution is meant to be added to pages rendered for \"previeww\" or \"live\" mode. This allows for example to add additional Page Module (like inline-editing modules) only when the page is rendered in preview mode in the authoring UI. This allows to avoid uneccessary bandwith consumption when serving your live. You can use the option \"always\" to include this contributions in both modes (i.e. in \"live\" and \"preview\" mode)",
   *   "key": "mode",
   *   "label": "Mode",
   *   "options": [
   *     {
   *       "label": "Always",
   *       "selection": "always"
   *     },
   *     {
   *       "label": "Live",
   *       "selection": "live"
   *     },
   *     {
   *       "label": "Preview",
   *       "selection": "preview"
   *     }
   *   ],
   *   "required": true
   * }
   * ```
   */
  [KEY_PAGE_CONTRIBUTION_MODE]: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_CONTRIBUTION_KEY}
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
  [KEY_PAGE_CONTRIBUTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link PageContributionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageContributionType} else false
 */
export function isPageContributionType(aValue: any): aValue is PageContributionType {
  return PZ6MJUijH(aValue)
    && TlMUHGxnv(aValue[KEY_PAGE_CONTRIBUTION_EMBED], jEcWTCNgA)
    && TlMUHGxnv(aValue[KEY_PAGE_CONTRIBUTION_REFERENCE], BEPjY_iKk)
    && jEcWTCNgA(aValue[KEY_PAGE_CONTRIBUTION_MODE])
    && Dl16LDKVr(aValue[KEY_PAGE_CONTRIBUTION_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_EMBED} property from {@link PageContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageContributionEmbed: (aDefault?: string[]) => UnaryFunction<PageContributionType,
  string[]> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_EMBED);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_EMBED} property from {@link PageContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageContributionEmbed: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) =>
  OperatorFunction<PageContributionType, string[]> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_EMBED);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_REFERENCE} property from {@link PageContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageContributionReference: (aDefault?: DeliveryReferenceElement[]) => UnaryFunction<PageContributionType,
  DeliveryReferenceElement[]> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_REFERENCE);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_REFERENCE} property from {@link PageContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageContributionReference: (aDefault?: DeliveryReferenceElement[], aCmp?: EqualsPredicate<DeliveryReferenceElement[]>) =>
  OperatorFunction<PageContributionType, DeliveryReferenceElement[]> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_REFERENCE);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_MODE} property from {@link PageContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageContributionMode: (aDefault?: string) => UnaryFunction<PageContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_MODE);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_MODE} property from {@link PageContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageContributionMode: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_MODE);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_KEY} property from {@link PageContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageContributionKey: (aDefault?: string) => UnaryFunction<PageContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_KEY);

/**
 * Selects the {@link KEY_PAGE_CONTRIBUTION_KEY} property from {@link PageContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageContributionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_KEY);
