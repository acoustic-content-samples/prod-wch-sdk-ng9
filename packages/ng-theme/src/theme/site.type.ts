/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as D360HX_td, isImage as tRiLgSsvE, isNotNil as PJS5tdL1p, isOptional as f2JZzAnaH, isOptionalArrayOf as VSvuZD86i, isString as jbQQr5OVf, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SiteType}.
 */
export const TYPE_ID_SITE = '40404250-aa99-427d-a5ac-cb9ce1ebb714';
/**
 * Name of the content type for {@link SiteType}.
 */
export const TYPE_NAME_SITE = '📄 Site';
/**
 * Key name of the `modules` property of {@link SiteType}
 */
export const KEY_SITE_MODULES = 'modules';
/**
 * Key name of the `navigation` property of {@link SiteType}
 */
export const KEY_SITE_NAVIGATION = 'navigation';
/**
 * Key name of the `title` property of {@link SiteType}
 */
export const KEY_SITE_TITLE = 'title';
/**
 * Key name of the `domain` property of {@link SiteType}
 */
export const KEY_SITE_DOMAIN = 'domain';
/**
 * Key name of the `favicon` property of {@link SiteType}
 */
export const KEY_SITE_FAVICON = 'favicon';
/**
 * Key name of the `logo` property of {@link SiteType}
 */
export const KEY_SITE_LOGO = 'logo';
/**
 * Key name of the `key` property of {@link SiteType}
 */
export const KEY_SITE_KEY = 'key';
/**
 * Key name of the `styles` property of {@link SiteType}
 */
export const KEY_SITE_STYLES = 'styles';

/**
 * Delivery version of the 📄 Site content type.
 *
 * See {@link TYPE_ID_SITE} and {@link TYPE_NAME_SITE}
 * @remarks
 * This item describes an individual site in the site model. The "id" value of this content item is considered the ID for the site. It provides the anchor point that all Page-Descriptor elements of all pages in the site are pointing to. It further defines the site navigation strucutre and the page modules to be added to all pages of this site. Page modules are used to manage style files and JavaScript libraries that shall be loaded into all pages of the site.
 */
export interface SiteType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The list of page modules to be added to the pages of this site.
   * @remarks
   * See {@link KEY_SITE_MODULES}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "reference",
   *   "fieldLabel": "Content item",
   *   "helpText": "The list of page modules to be added to the pages of this site.",
   *   "key": "modules",
   *   "label": "Page Modules",
   *   "minimumValues": 0,
   *   "restrictTypes": [
   *     {
   *       "id": "aab86460-0018-44c2-9f52-3a326e58f7f7"
   *     }
   *   ],
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_SITE_MODULES]?: DeliveryReferenceElement[];

  /**
   * The page navigation content item for this site.
   * @remarks
   * See {@link KEY_SITE_NAVIGATION}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "reference",
   *   "helpText": "The page navigation content item for this site.",
   *   "key": "navigation",
   *   "label": "Navigation",
   *   "required": true,
   *   "restrictTypes": [
   *     {
   *       "id": "843fb991-7413-4517-bfcb-b59fc4b1f449"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITE_NAVIGATION]: DeliveryReferenceElement;

  /**
   * The title for this site.
   * @remarks
   * See {@link KEY_SITE_TITLE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The title for this site.",
   *   "key": "title",
   *   "label": "Title"
   * }
   * ```
   */
  [KEY_SITE_TITLE]?: string;

  /**
   * The domain name for this site.
   * @remarks
   * See {@link KEY_SITE_DOMAIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The domain name for this site.",
   *   "key": "domain",
   *   "label": "Domain"
   * }
   * ```
   */
  [KEY_SITE_DOMAIN]?: string;

  /**
   * The favicon for this site.
   * @remarks
   * See {@link KEY_SITE_FAVICON}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "acceptType": [
   *     "png",
   *     "gif"
   *   ],
   *   "elementType": "image",
   *   "helpText": "The favicon for this site.",
   *   "key": "favicon",
   *   "label": "FAV icon"
   * }
   * ```
   */
  [KEY_SITE_FAVICON]?: Image;

  /**
   * The logo for this site.
   * @remarks
   * See {@link KEY_SITE_LOGO}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "image",
   *   "helpText": "The logo for this site.",
   *   "key": "logo",
   *   "label": "Logo"
   * }
   * ```
   */
  [KEY_SITE_LOGO]?: Image;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITE_KEY}
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
  [KEY_SITE_KEY]?: string;

  /**
   * The reference to the site global styles ie. Button, Typography, Navigation, and Page
   * @remarks
   * See {@link KEY_SITE_STYLES}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "reference",
   *   "helpText": "The reference to the site global styles ie. Button, Typography, Navigation, and Page",
   *   "key": "styles",
   *   "label": "styles"
   * }
   * ```
   */
  [KEY_SITE_STYLES]?: DeliveryReferenceElement;
}

/**
 * Tests if the value is of type {@link SiteType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SiteType} else false
 */
export function isSiteType(aValue: any): aValue is SiteType {
  return PJS5tdL1p(aValue)
    && VSvuZD86i(aValue[KEY_SITE_MODULES], D360HX_td)
    && D360HX_td(aValue[KEY_SITE_NAVIGATION])
    && f2JZzAnaH(aValue[KEY_SITE_TITLE], jbQQr5OVf)
    && f2JZzAnaH(aValue[KEY_SITE_DOMAIN], jbQQr5OVf)
    && f2JZzAnaH(aValue[KEY_SITE_FAVICON], tRiLgSsvE)
    && f2JZzAnaH(aValue[KEY_SITE_LOGO], tRiLgSsvE)
    && f2JZzAnaH(aValue[KEY_SITE_KEY], jbQQr5OVf)
    && f2JZzAnaH(aValue[KEY_SITE_STYLES], D360HX_td)
    ;
}

/**
 * Selects the {@link KEY_SITE_MODULES} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteModules: (aDefault?: DeliveryReferenceElement[]) => UnaryFunction<SiteType,
  DeliveryReferenceElement[]> = partialLeft(pluckProperty, KEY_SITE_MODULES);

/**
 * Selects the {@link KEY_SITE_MODULES} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteModules: (aDefault?: DeliveryReferenceElement[], aCmp?: EqualsPredicate<DeliveryReferenceElement[]>) =>
  OperatorFunction<SiteType, DeliveryReferenceElement[]> = partialLeft(rxSelectProperty, KEY_SITE_MODULES);

/**
 * Selects the {@link KEY_SITE_NAVIGATION} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteNavigation: (aDefault?: DeliveryReferenceElement) => UnaryFunction<SiteType,
  DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION);

/**
 * Selects the {@link KEY_SITE_NAVIGATION} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteNavigation: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) =>
  OperatorFunction<SiteType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION);

/**
 * Selects the {@link KEY_SITE_TITLE} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteTitle: (aDefault?: string) => UnaryFunction<SiteType,
  string> = partialLeft(pluckProperty, KEY_SITE_TITLE);

/**
 * Selects the {@link KEY_SITE_TITLE} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteTitle: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SiteType, string> = partialLeft(rxSelectProperty, KEY_SITE_TITLE);

/**
 * Selects the {@link KEY_SITE_DOMAIN} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteDomain: (aDefault?: string) => UnaryFunction<SiteType,
  string> = partialLeft(pluckProperty, KEY_SITE_DOMAIN);

/**
 * Selects the {@link KEY_SITE_DOMAIN} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteDomain: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SiteType, string> = partialLeft(rxSelectProperty, KEY_SITE_DOMAIN);

/**
 * Selects the {@link KEY_SITE_FAVICON} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteFavicon: (aDefault?: Image) => UnaryFunction<SiteType,
  Image> = partialLeft(pluckProperty, KEY_SITE_FAVICON);

/**
 * Selects the {@link KEY_SITE_FAVICON} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteFavicon: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) =>
  OperatorFunction<SiteType, Image> = partialLeft(rxSelectProperty, KEY_SITE_FAVICON);

/**
 * Selects the {@link KEY_SITE_LOGO} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteLogo: (aDefault?: Image) => UnaryFunction<SiteType,
  Image> = partialLeft(pluckProperty, KEY_SITE_LOGO);

/**
 * Selects the {@link KEY_SITE_LOGO} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteLogo: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) =>
  OperatorFunction<SiteType, Image> = partialLeft(rxSelectProperty, KEY_SITE_LOGO);

/**
 * Selects the {@link KEY_SITE_KEY} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteKey: (aDefault?: string) => UnaryFunction<SiteType,
  string> = partialLeft(pluckProperty, KEY_SITE_KEY);

/**
 * Selects the {@link KEY_SITE_KEY} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SiteType, string> = partialLeft(rxSelectProperty, KEY_SITE_KEY);

/**
 * Selects the {@link KEY_SITE_STYLES} property from {@link SiteType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSiteStyles: (aDefault?: DeliveryReferenceElement) => UnaryFunction<SiteType,
  DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_SITE_STYLES);

/**
 * Selects the {@link KEY_SITE_STYLES} property from {@link SiteType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSiteStyles: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) =>
  OperatorFunction<SiteType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_SITE_STYLES);
