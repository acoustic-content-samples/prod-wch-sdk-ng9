/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as tf8PJ$Vmt, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isOptionalArrayOf as logwFItzm, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '74f83bd2-2ef6-43f9-8264-bd538e5aad28';
export const TYPE_NAME = '📄 Page Descriptor';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_SITE = 'site';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_CANONICALPATH = 'canonicalpath';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_ALTERNATIVEPATH = 'alternativepath';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_KEYWORDS = 'keywords';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_TITLE = 'title';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_DESCRIPTION = 'description';
export const KEY_PAGE_DESCRIPTOR_ELEMENT_KEY = 'key';

/*
 * @name 📄 Page Descriptor
 * @id 74f83bd2-2ef6-43f9-8264-bd538e5aad28
 * @description This type aggregates all information required by the sites framework to treat content items exposing an element of this type as a page. This includes support for page URL handling and showing the item in the Sites Composer UI. To turn an arbitrary content type into a page content type, add a custom element of this type and element name "descriptor" to this type and add "kind:page" flag to the type and content items.
 */
export interface PageDescriptorType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
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
    [KEY_PAGE_DESCRIPTOR_ELEMENT_SITE]: DeliveryReferenceElement;

    /**
     * @example
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
    [KEY_PAGE_DESCRIPTOR_ELEMENT_CANONICALPATH]: string;

    /**
     * @example
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
    [KEY_PAGE_DESCRIPTOR_ELEMENT_ALTERNATIVEPATH]?: string[];

    /**
     * @example
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
    [KEY_PAGE_DESCRIPTOR_ELEMENT_KEYWORDS]?: string[];

    /**
     * @example
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
    [KEY_PAGE_DESCRIPTOR_ELEMENT_TITLE]: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "Description information to be added as page meta data to the head section of the given page.",
     *   "key": "description",
     *   "label": "description"
     * }
     * ```
     */
    [KEY_PAGE_DESCRIPTOR_ELEMENT_DESCRIPTION]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "This element is used to uniquely identify this element in the current content item",
     *   "key": "key",
     *   "label": "Key"
     * }
     * ```
     */
    [KEY_PAGE_DESCRIPTOR_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type PageDescriptorElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageDescriptorElement else false
 */
export function isPageDescriptorType(aValue: any): aValue is PageDescriptorType {
    return Lrzcbu8aG(aValue)
        && tf8PJ$Vmt(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_SITE])
        && LqeJjI1YD(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_CANONICALPATH])
        && logwFItzm(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_ALTERNATIVEPATH], LqeJjI1YD)
        && logwFItzm(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_KEYWORDS], LqeJjI1YD)
        && LqeJjI1YD(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_TITLE])
        && PEdHKHuzA(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_DESCRIPTION], LqeJjI1YD)
        && PEdHKHuzA(aValue[KEY_PAGE_DESCRIPTOR_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "site" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSite: (aDefault?: DeliveryReferenceElement) => UnaryFunction<PageDescriptorType, DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_SITE);

/**
 * Selects the "site" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSite: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) => OperatorFunction<PageDescriptorType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_SITE);

/**
 * Selects the "canonicalpath" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCanonicalpath: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_CANONICALPATH);

/**
 * Selects the "canonicalpath" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCanonicalpath: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_CANONICALPATH);

/**
 * Selects the "alternativepath" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlternativepath: (aDefault?: string[]) => UnaryFunction<PageDescriptorType, string[]> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_ALTERNATIVEPATH);

/**
 * Selects the "alternativepath" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlternativepath: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) => OperatorFunction<PageDescriptorType, string[]> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_ALTERNATIVEPATH);

/**
 * Selects the "keywords" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKeywords: (aDefault?: string[]) => UnaryFunction<PageDescriptorType, string[]> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_KEYWORDS);

/**
 * Selects the "keywords" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKeywords: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) => OperatorFunction<PageDescriptorType, string[]> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_KEYWORDS);

/**
 * Selects the "title" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTitle: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_TITLE);

/**
 * Selects the "title" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTitle: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_TITLE);

/**
 * Selects the "description" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectDescription: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_DESCRIPTION);

/**
 * Selects the "description" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectDescription: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_DESCRIPTION);

/**
 * Selects the "key" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_KEY);

/**
 * Selects the "key" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_PAGE_DESCRIPTOR_ELEMENT_KEY);
