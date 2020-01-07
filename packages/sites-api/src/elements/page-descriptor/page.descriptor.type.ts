/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as F5Sl9HaEI, isNotNil as RRw8DnbY_, isOptional as lLbeYfaOI, isOptionalArrayOf as pyhiXE3Mw, isString as VRab9TTrr, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '74f83bd2-2ef6-43f9-8264-bd538e5aad28';
export const TYPE_NAME = 'Page Descriptor';
export const KEY_SITE = 'site';
export const KEY_CANONICALPATH = 'canonicalpath';
export const KEY_ALTERNATIVEPATH = 'alternativepath';
export const KEY_KEYWORDS = 'keywords';
export const KEY_TITLE = 'title';
export const KEY_DESCRIPTION = 'description';

/*
 * @name Page Descriptor
 * @id 74f83bd2-2ef6-43f9-8264-bd538e5aad28
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
     *   "key": "site",
     *   "label": "site",
     *   "required": true
     * }
     * ```
     */
    [KEY_SITE]: DeliveryReferenceElement;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": false,
     *   "elementType": "text",
     *   "key": "canonicalpath",
     *   "label": "canonicalPath",
     *   "maxLength": 4000,
     *   "minLength": 1,
     *   "required": true,
     *   "searchKey": "string1"
     * }
     * ```
     */
    [KEY_CANONICALPATH]: string;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "text",
     *   "fieldLabel": "Text",
     *   "key": "alternativepath",
     *   "label": "alternativePath",
     *   "minimumValues": 0
     * }
     * ```
     */
    [KEY_ALTERNATIVEPATH]?: string[];

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "text",
     *   "fieldLabel": "Text",
     *   "key": "keywords",
     *   "label": "keywords",
     *   "minimumValues": 0
     * }
     * ```
     */
    [KEY_KEYWORDS]?: string[];

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "title",
     *   "label": "title",
     *   "minLength": 1,
     *   "required": true
     * }
     * ```
     */
    [KEY_TITLE]: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "description",
     *   "label": "description"
     * }
     * ```
     */
    [KEY_DESCRIPTION]?: string;
}

/**
 * Tests if the value is of type PageDescriptorElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageDescriptorElement else false
 */
export function isPageDescriptorType(aValue: any): aValue is PageDescriptorType {
    return RRw8DnbY_(aValue)
        && F5Sl9HaEI(aValue[KEY_SITE])
        && VRab9TTrr(aValue[KEY_CANONICALPATH])
        && pyhiXE3Mw(aValue[KEY_ALTERNATIVEPATH], VRab9TTrr)
        && pyhiXE3Mw(aValue[KEY_KEYWORDS], VRab9TTrr)
        && VRab9TTrr(aValue[KEY_TITLE])
        && lLbeYfaOI(aValue[KEY_DESCRIPTION], VRab9TTrr)
    ;
}

/**
 * Selects the "site" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSite: (aDefault?: DeliveryReferenceElement) => UnaryFunction<PageDescriptorType, DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_SITE);

/**
 * Selects the "site" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSite: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) => OperatorFunction<PageDescriptorType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_SITE);

/**
 * Selects the "canonicalpath" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCanonicalpath: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_CANONICALPATH);

/**
 * Selects the "canonicalpath" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCanonicalpath: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_CANONICALPATH);

/**
 * Selects the "alternativepath" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlternativepath: (aDefault?: string[]) => UnaryFunction<PageDescriptorType, string[]> = partialLeft(pluckProperty, KEY_ALTERNATIVEPATH);

/**
 * Selects the "alternativepath" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlternativepath: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) => OperatorFunction<PageDescriptorType, string[]> = partialLeft(rxSelectProperty, KEY_ALTERNATIVEPATH);

/**
 * Selects the "keywords" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKeywords: (aDefault?: string[]) => UnaryFunction<PageDescriptorType, string[]> = partialLeft(pluckProperty, KEY_KEYWORDS);

/**
 * Selects the "keywords" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKeywords: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) => OperatorFunction<PageDescriptorType, string[]> = partialLeft(rxSelectProperty, KEY_KEYWORDS);

/**
 * Selects the "title" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectTitle: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_TITLE);

/**
 * Selects the "title" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectTitle: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_TITLE);

/**
 * Selects the "description" property from PageDescriptorType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectDescription: (aDefault?: string) => UnaryFunction<PageDescriptorType, string> = partialLeft(pluckProperty, KEY_DESCRIPTION);

/**
 * Selects the "description" property from PageDescriptorType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectDescription: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageDescriptorType, string> = partialLeft(rxSelectProperty, KEY_DESCRIPTION);
