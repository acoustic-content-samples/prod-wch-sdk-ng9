/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as BEPjY_iKk, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isOptionalArrayOf as TlMUHGxnv, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageDescriptorType}.
 */
export const TYPE_ID_PAGE_DESCRIPTOR = '74f83bd2-2ef6-43f9-8264-bd538e5aad28';
/**
 * Name of the content type for {@link PageDescriptorType}.
 */
export const TYPE_NAME_PAGE_DESCRIPTOR = '📄 Page Descriptor';
/**
 * Key name of the `site` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_SITE = 'site';
/**
 * Key name of the `canonicalpath` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_CANONICALPATH = 'canonicalpath';
/**
 * Key name of the `alternativepath` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH = 'alternativepath';
/**
 * Key name of the `keywords` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_KEYWORDS = 'keywords';
/**
 * Key name of the `title` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_TITLE = 'title';
/**
 * Key name of the `description` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_DESCRIPTION = 'description';
/**
 * Key name of the `key` property of {@link PageDescriptorType}
 */
export const KEY_PAGE_DESCRIPTOR_KEY = 'key';

/**
 * Delivery version of the 📄 Page Descriptor content type.
 *
 * See {@link TYPE_ID_PAGE_DESCRIPTOR} and {@link TYPE_NAME_PAGE_DESCRIPTOR}
 * @remarks
 * This type aggregates all information required by the sites framework to treat content items exposing an element of this type as a page. This includes support for page URL handling and showing the item in the Sites Composer UI. To turn an arbitrary content type into a page content type, add a custom element of this type and element name "descriptor" to this type and add "kind:page" flag to the type and content items.
 */
export interface PageDescriptorType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The reference to the site item meant to host this page
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_SITE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "reference",
   *   "helpText": "The reference to the site item meant to host this page",
   *   "key": "site",
   *   "label": "site",
   *   "required": true
   * }
   * ```
   */
  [KEY_PAGE_DESCRIPTOR_SITE]: DeliveryReferenceElement;

  /**
   * The URL path suffix value for this page, defining the SEO URL for this page. The complete URL is constructed by concatenating the site root context URL with the given canonical path.
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_CANONICALPATH}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": false,
   *   "elementType": "text",
   *   "helpText": "The URL path suffix value for this page, defining the SEO URL for this page. The complete URL is constructed by concatenating the site root context URL with the given canonical path.",
   *   "key": "canonicalpath",
   *   "label": "canonicalPath",
   *   "maxLength": 4000,
   *   "minLength": 1,
   *   "required": true,
   *   "searchKey": "string1"
   * }
   * ```
   */
  [KEY_PAGE_DESCRIPTOR_CANONICALPATH]: string;

  /**
   * The URL path suffix value for an alternative URL pointing to this page. The complete URL is constructed by concatenating the site root context URL with the given alternative path.
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "text",
   *   "fieldLabel": "Text",
   *   "helpText": "The URL path suffix value for an alternative URL pointing to this page. The complete URL is constructed by concatenating the site root context URL with the given alternative path.",
   *   "key": "alternativepath",
   *   "label": "alternativePath",
   *   "minimumValues": 0
   * }
   * ```
   */
  [KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH]?: string[];

  /**
   * Keywords to be added as page meta data to the head section of the given page.
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_KEYWORDS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "text",
   *   "fieldLabel": "Text",
   *   "helpText": "Keywords to be added as page meta data to the head section of the given page.",
   *   "key": "keywords",
   *   "label": "keywords",
   *   "minimumValues": 0
   * }
   * ```
   */
  [KEY_PAGE_DESCRIPTOR_KEYWORDS]?: string[];

  /**
   * The title for the HTML document generated for this page.
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_TITLE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The title for the HTML document generated for this page.",
   *   "key": "title",
   *   "label": "title",
   *   "minLength": 1,
   *   "required": true
   * }
   * ```
   */
  [KEY_PAGE_DESCRIPTOR_TITLE]: string;

  /**
   * Description information to be added as page meta data to the head section of the given page.
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_DESCRIPTION}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "Description information to be added as page meta data to the head section of the given page.",
   *   "key": "description",
   *   "label": "description"
   * }
   * ```
   */
  [KEY_PAGE_DESCRIPTOR_DESCRIPTION]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_DESCRIPTOR_KEY}
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
  [KEY_PAGE_DESCRIPTOR_KEY]?: string;
}

/**
 * Tests if the value is of type {@link PageDescriptorType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageDescriptorType} else false
 */
export function isPageDescriptorType(aValue: any): aValue is PageDescriptorType {
  return PZ6MJUijH(aValue)
    && BEPjY_iKk(aValue[KEY_PAGE_DESCRIPTOR_SITE])
    && jEcWTCNgA(aValue[KEY_PAGE_DESCRIPTOR_CANONICALPATH])
    && TlMUHGxnv(aValue[KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH], jEcWTCNgA)
    && TlMUHGxnv(aValue[KEY_PAGE_DESCRIPTOR_KEYWORDS], jEcWTCNgA)
    && jEcWTCNgA(aValue[KEY_PAGE_DESCRIPTOR_TITLE])
    && Dl16LDKVr(aValue[KEY_PAGE_DESCRIPTOR_DESCRIPTION], jEcWTCNgA)
    && Dl16LDKVr(aValue[KEY_PAGE_DESCRIPTOR_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_SITE} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorSite: (aDefault?: DeliveryReferenceElement) => UnaryFunction<PageDescriptorType,
  DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_SITE);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_SITE} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorSite: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) =>
  OperatorFunction<PageDescriptorType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_SITE);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_CANONICALPATH} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorCanonicalpath: (aDefault?: string) => UnaryFunction<PageDescriptorType,
  string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_CANONICALPATH);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_CANONICALPATH} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorCanonicalpath: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_CANONICALPATH);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorAlternativepath: (aDefault?: string[]) => UnaryFunction<PageDescriptorType,
  string[]> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorAlternativepath: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) =>
  OperatorFunction<PageDescriptorType, string[]> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ALTERNATIVEPATH);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_KEYWORDS} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorKeywords: (aDefault?: string[]) => UnaryFunction<PageDescriptorType,
  string[]> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_KEYWORDS);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_KEYWORDS} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorKeywords: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) =>
  OperatorFunction<PageDescriptorType, string[]> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_KEYWORDS);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_TITLE} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorTitle: (aDefault?: string) => UnaryFunction<PageDescriptorType,
  string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_TITLE);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_TITLE} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorTitle: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_TITLE);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_DESCRIPTION} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorDescription: (aDefault?: string) => UnaryFunction<PageDescriptorType,
  string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_DESCRIPTION);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_DESCRIPTION} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorDescription: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_DESCRIPTION);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_KEY} property from {@link PageDescriptorType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageDescriptorKey: (aDefault?: string) => UnaryFunction<PageDescriptorType,
  string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_KEY);

/**
 * Selects the {@link KEY_PAGE_DESCRIPTOR_KEY} property from {@link PageDescriptorType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageDescriptorKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_KEY);
