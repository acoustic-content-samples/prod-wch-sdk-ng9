/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SiteNavigationDescriptorType}.
 */
export const TYPE_ID_SITE_NAVIGATION_DESCRIPTOR = '843fb991-7413-4517-bfcb-b59fc4b1f449';
/**
 * Name of the content type for {@link SiteNavigationDescriptorType}.
 */
export const TYPE_NAME_SITE_NAVIGATION_DESCRIPTOR = '📄 Site Navigation Descriptor';
/**
 * Key name of the `navigation` property of {@link SiteNavigationDescriptorType}
 */
export const KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION = 'navigation';
/**
 * Key name of the `defaultPage` property of {@link SiteNavigationDescriptorType}
 */
export const KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE = 'defaultPage';
/**
 * Key name of the `key` property of {@link SiteNavigationDescriptorType}
 */
export const KEY_SITE_NAVIGATION_DESCRIPTOR_KEY = 'key';

/**
 * Delivery version of the 📄 Site Navigation Descriptor content type.
 *
 * See {@link TYPE_ID_SITE_NAVIGATION_DESCRIPTOR} and {@link TYPE_NAME_SITE_NAVIGATION_DESCRIPTOR}
 * @remarks
 * This content item defines the navigation structure for a site.
 */
export interface SiteNavigationDescriptorType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element contains the serialized JSON object that defines the nested navigation for the site. The individual nodes are referencing individual page content items by ID.
   * @remarks
   * See {@link KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element contains the serialized JSON object that defines the nested navigation for the site. The individual nodes are referencing individual page content items by ID.",
   *   "key": "navigation",
   *   "label": "Navigation",
   *   "required": true
   * }
   * ```
   */
  [KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION]: string;

  /**
   * This element identifies the default page for the site.
   * @remarks
   * See {@link KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element identifies the default page for the site.",
   *   "key": "defaultPage",
   *   "label": "Default Page"
   * }
   * ```
   */
  [KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITE_NAVIGATION_DESCRIPTOR_KEY}
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
  [KEY_SITE_NAVIGATION_DESCRIPTOR_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SiteNavigationDescriptorType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SiteNavigationDescriptorType} else false
 */
export function isSiteNavigationDescriptorType(aValue: any): aValue is SiteNavigationDescriptorType {
  return PZ6MJUijH(aValue)
    && jEcWTCNgA(aValue[KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION])
    && Dl16LDKVr(aValue[KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE], jEcWTCNgA)
    && Dl16LDKVr(aValue[KEY_SITE_NAVIGATION_DESCRIPTOR_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION} property from {@link SiteNavigationDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteNavigationDescriptorNavigation: (aDefault?: string) => UnaryFunction<SiteNavigationDescriptorType,
  string> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION);

/**
 * Selects the {@link KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION} property from {@link SiteNavigationDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteNavigationDescriptorNavigation: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SiteNavigationDescriptorType, string> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_NAVIGATION);

/**
 * Selects the {@link KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE} property from {@link SiteNavigationDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteNavigationDescriptorDefaultPage: (aDefault?: string) => UnaryFunction<SiteNavigationDescriptorType,
  string> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE);

/**
 * Selects the {@link KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE} property from {@link SiteNavigationDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteNavigationDescriptorDefaultPage: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SiteNavigationDescriptorType, string> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_DEFAULT_PAGE);

/**
 * Selects the {@link KEY_SITE_NAVIGATION_DESCRIPTOR_KEY} property from {@link SiteNavigationDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteNavigationDescriptorKey: (aDefault?: string) => UnaryFunction<SiteNavigationDescriptorType,
  string> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_KEY);

/**
 * Selects the {@link KEY_SITE_NAVIGATION_DESCRIPTOR_KEY} property from {@link SiteNavigationDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteNavigationDescriptorKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SiteNavigationDescriptorType, string> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_KEY);
