/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '3a3726b8-e0b2-4f10-98ed-b1c82e851b99';
export const TYPE_NAME = '📄 Page Style Contribution';
export const KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_HREF = 'href';
export const KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_KEY = 'key';

/*
 * @name 📄 Page Style Contribution
 * @id 3a3726b8-e0b2-4f10-98ed-b1c82e851b99
 * @description A style contribution added as a <link rel="stylesheet" href="..."> element to the page markup
 */
export interface PageStyleContributionType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "The URL pointing to the style resource realtive to the resource base URL of this tenant.",
     *   "key": "href",
     *   "label": "href",
     *   "required": true,
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_HREF]: string;

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
    [KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type PageStyleContributionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageStyleContributionElement else false
 */
export function isPageStyleContributionType(aValue: any): aValue is PageStyleContributionType {
    return Lrzcbu8aG(aValue)
        && LqeJjI1YD(aValue[KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_HREF])
        && PEdHKHuzA(aValue[KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "href" property from PageStyleContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHref: (aDefault?: string) => UnaryFunction<PageStyleContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_HREF);

/**
 * Selects the "href" property from PageStyleContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHref: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageStyleContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_HREF);

/**
 * Selects the "key" property from PageStyleContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<PageStyleContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_KEY);

/**
 * Selects the "key" property from PageStyleContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageStyleContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_STYLE_CONTRIBUTION_ELEMENT_KEY);
