/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as tf8PJ$Vmt, isImage as rRk_SZ4NH, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isOptionalArrayOf as logwFItzm, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '40404250-aa99-427d-a5ac-cb9ce1ebb714';
export const TYPE_NAME = '📄 Site';
export const KEY_SITE_ELEMENT_CONTRIBUTIONS = 'contributions';
export const KEY_SITE_ELEMENT_NAVIGATION = 'navigation';
export const KEY_SITE_ELEMENT_TITLE = 'title';
export const KEY_SITE_ELEMENT_LOGO = 'logo';
export const KEY_SITE_ELEMENT_KEY = 'key';

/*
 * @name 📄 Site
 * @id 40404250-aa99-427d-a5ac-cb9ce1ebb714
 * @description This item describes an individual site in the site model. The "id" value of this content item is considered the ID for the site. It provides the anchor point that all Page-Descriptor elements of all pages in the site are pointing to. It further defines the site navigation strucutre and the page modules to be added to all pages of this site. Page modules are used to manage style files and JavaScript libraries that shall be loaded into all pages of the site.
 */
export interface SiteType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "reference",
     *   "fieldLabel": "Content item",
     *   "helpText": "The list of page modules to be added to the pages of this site.",
     *   "key": "contributions",
     *   "label": "Contributions",
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
    [KEY_SITE_ELEMENT_CONTRIBUTIONS]?: DeliveryReferenceElement[];

    /**
     * @example
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
    [KEY_SITE_ELEMENT_NAVIGATION]: DeliveryReferenceElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "The title for this site.",
     *   "key": "title",
     *   "label": "Title"
     * }
     * ```
     */
    [KEY_SITE_ELEMENT_TITLE]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "image",
     *   "helpText": "The logo for this site.",
     *   "key": "logo",
     *   "label": "Logo"
     * }
     * ```
     */
    [KEY_SITE_ELEMENT_LOGO]?: Image;

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
    [KEY_SITE_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type SiteElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SiteElement else false
 */
export function isSiteType(aValue: any): aValue is SiteType {
    return Lrzcbu8aG(aValue)
        && logwFItzm(aValue[KEY_SITE_ELEMENT_CONTRIBUTIONS], tf8PJ$Vmt)
        && tf8PJ$Vmt(aValue[KEY_SITE_ELEMENT_NAVIGATION])
        && PEdHKHuzA(aValue[KEY_SITE_ELEMENT_TITLE], LqeJjI1YD)
        && PEdHKHuzA(aValue[KEY_SITE_ELEMENT_LOGO], rRk_SZ4NH)
        && PEdHKHuzA(aValue[KEY_SITE_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "contributions" property from SiteType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectContributions: (aDefault?: DeliveryReferenceElement[]) => UnaryFunction<SiteType, DeliveryReferenceElement[]> = partialLeft(pluckProperty, KEY_SITE_ELEMENT_CONTRIBUTIONS);

/**
 * Selects the "contributions" property from SiteType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectContributions: (aDefault?: DeliveryReferenceElement[], aCmp?: EqualsPredicate<DeliveryReferenceElement[]>) => OperatorFunction<SiteType, DeliveryReferenceElement[]> = partialLeft(rxSelectProperty, KEY_SITE_ELEMENT_CONTRIBUTIONS);

/**
 * Selects the "navigation" property from SiteType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectNavigation: (aDefault?: DeliveryReferenceElement) => UnaryFunction<SiteType, DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_SITE_ELEMENT_NAVIGATION);

/**
 * Selects the "navigation" property from SiteType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectNavigation: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) => OperatorFunction<SiteType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_SITE_ELEMENT_NAVIGATION);

/**
 * Selects the "title" property from SiteType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTitle: (aDefault?: string) => UnaryFunction<SiteType, string> = partialLeft(pluckProperty, KEY_SITE_ELEMENT_TITLE);

/**
 * Selects the "title" property from SiteType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTitle: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SiteType, string> = partialLeft(rxSelectProperty, KEY_SITE_ELEMENT_TITLE);

/**
 * Selects the "logo" property from SiteType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLogo: (aDefault?: Image) => UnaryFunction<SiteType, Image> = partialLeft(pluckProperty, KEY_SITE_ELEMENT_LOGO);

/**
 * Selects the "logo" property from SiteType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLogo: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) => OperatorFunction<SiteType, Image> = partialLeft(rxSelectProperty, KEY_SITE_ELEMENT_LOGO);

/**
 * Selects the "key" property from SiteType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<SiteType, string> = partialLeft(pluckProperty, KEY_SITE_ELEMENT_KEY);

/**
 * Selects the "key" property from SiteType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SiteType, string> = partialLeft(rxSelectProperty, KEY_SITE_ELEMENT_KEY);
