/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '843fb991-7413-4517-bfcb-b59fc4b1f449';
export const TYPE_NAME = '📄 Site Navigation Descriptor';
export const KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_NAVIGATION = 'navigation';
export const KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_DEFAULT_PAGE = 'defaultPage';
export const KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_KEY = 'key';

/*
 * @name 📄 Site Navigation Descriptor
 * @id 843fb991-7413-4517-bfcb-b59fc4b1f449
 * @description This content item defines the navigation structure for a site.
 */
export interface SiteNavigationDescriptorType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
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
    [KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_NAVIGATION]: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "This element identifies the default page for the site.",
     *   "key": "defaultPage",
     *   "label": "Default Page"
     * }
     * ```
     */
    [KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_DEFAULT_PAGE]?: string;

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
    [KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type SiteNavigationDescriptorElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SiteNavigationDescriptorElement else false
 */
export function isSiteNavigationDescriptorType(aValue: any): aValue is SiteNavigationDescriptorType {
    return Lrzcbu8aG(aValue)
        && LqeJjI1YD(aValue[KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_NAVIGATION])
        && PEdHKHuzA(aValue[KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_DEFAULT_PAGE], LqeJjI1YD)
        && PEdHKHuzA(aValue[KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "navigation" property from SiteNavigationDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectNavigation: (aDefault?: string) => UnaryFunction<SiteNavigationDescriptorType, string> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_NAVIGATION);

/**
 * Selects the "navigation" property from SiteNavigationDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectNavigation: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SiteNavigationDescriptorType, string> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_NAVIGATION);

/**
 * Selects the "defaultPage" property from SiteNavigationDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectDefaultPage: (aDefault?: string) => UnaryFunction<SiteNavigationDescriptorType, string> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_DEFAULT_PAGE);

/**
 * Selects the "defaultPage" property from SiteNavigationDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectDefaultPage: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SiteNavigationDescriptorType, string> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_DEFAULT_PAGE);

/**
 * Selects the "key" property from SiteNavigationDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<SiteNavigationDescriptorType, string> = partialLeft(pluckProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_KEY);

/**
 * Selects the "key" property from SiteNavigationDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SiteNavigationDescriptorType, string> = partialLeft(rxSelectProperty, KEY_SITE_NAVIGATION_DESCRIPTOR_ELEMENT_KEY);
