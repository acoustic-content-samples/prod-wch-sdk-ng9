/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as b9QXnvMbg, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isOptionalArrayOf as BTnRKzOFs, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesNavigationPageType}.
 */
export const TYPE_ID_SITES_NAVIGATION_PAGE = '6943b561-1a32-421b-b6e2-8ca5cb1463a1';
/**
 * Name of the content type for {@link SitesNavigationPageType}.
 */
export const TYPE_NAME_SITES_NAVIGATION_PAGE = 'Sites Navigation Page';
/**
 * Key name of the `page` property of {@link SitesNavigationPageType}
 */
export const KEY_SITES_NAVIGATION_PAGE_PAGE = 'page';
/**
 * Key name of the `children` property of {@link SitesNavigationPageType}
 */
export const KEY_SITES_NAVIGATION_PAGE_CHILDREN = 'children';
/**
 * Key name of the `key` property of {@link SitesNavigationPageType}
 */
export const KEY_SITES_NAVIGATION_PAGE_KEY = 'key';

/**
 * Delivery version of the Sites Navigation Page content type.
 *
 * See {@link TYPE_ID_SITES_NAVIGATION_PAGE} and {@link TYPE_NAME_SITES_NAVIGATION_PAGE}
 */
export interface SitesNavigationPageType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * @remarks
   * See {@link KEY_SITES_NAVIGATION_PAGE_PAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "reference",
   *   "key": "page",
   *   "label": "Page",
   *   "required": true
   * }
   * ```
   */
  [KEY_SITES_NAVIGATION_PAGE_PAGE]: DeliveryReferenceElement;

  /**
   * @remarks
   * See {@link KEY_SITES_NAVIGATION_PAGE_CHILDREN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "reference",
   *   "fieldLabel": "Content item",
   *   "key": "children",
   *   "label": "Children",
   *   "minimumValues": 0,
   *   "restrictTypes": [
   *     {
   *       "id": "6943b561-1a32-421b-b6e2-8ca5cb1463a1"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_NAVIGATION_PAGE_CHILDREN]?: DeliveryReferenceElement[];

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_NAVIGATION_PAGE_KEY}
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
  [KEY_SITES_NAVIGATION_PAGE_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesNavigationPageType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesNavigationPageType} else false
 */
export function isSitesNavigationPageType(aValue: any): aValue is SitesNavigationPageType {
  return xs$RwNUhH(aValue)
    && b9QXnvMbg(aValue[KEY_SITES_NAVIGATION_PAGE_PAGE])
    && BTnRKzOFs(aValue[KEY_SITES_NAVIGATION_PAGE_CHILDREN], b9QXnvMbg)
    && VnbVJaXFB(aValue[KEY_SITES_NAVIGATION_PAGE_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_NAVIGATION_PAGE_PAGE} property from {@link SitesNavigationPageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesNavigationPagePage: (aDefault?: DeliveryReferenceElement) => UnaryFunction<SitesNavigationPageType,
  DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_SITES_NAVIGATION_PAGE_PAGE);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_PAGE_PAGE} property from {@link SitesNavigationPageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesNavigationPagePage: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) =>
  OperatorFunction<SitesNavigationPageType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_SITES_NAVIGATION_PAGE_PAGE);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_PAGE_CHILDREN} property from {@link SitesNavigationPageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesNavigationPageChildren: (aDefault?: DeliveryReferenceElement[]) => UnaryFunction<SitesNavigationPageType,
  DeliveryReferenceElement[]> = partialLeft(pluckProperty, KEY_SITES_NAVIGATION_PAGE_CHILDREN);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_PAGE_CHILDREN} property from {@link SitesNavigationPageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesNavigationPageChildren: (aDefault?: DeliveryReferenceElement[], aCmp?: EqualsPredicate<DeliveryReferenceElement[]>) =>
  OperatorFunction<SitesNavigationPageType, DeliveryReferenceElement[]> = partialLeft(rxSelectProperty, KEY_SITES_NAVIGATION_PAGE_CHILDREN);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_PAGE_KEY} property from {@link SitesNavigationPageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesNavigationPageKey: (aDefault?: string) => UnaryFunction<SitesNavigationPageType,
  string> = partialLeft(pluckProperty, KEY_SITES_NAVIGATION_PAGE_KEY);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_PAGE_KEY} property from {@link SitesNavigationPageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesNavigationPageKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesNavigationPageType, string> = partialLeft(rxSelectProperty, KEY_SITES_NAVIGATION_PAGE_KEY);
