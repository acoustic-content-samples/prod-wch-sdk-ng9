/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '2b0cd235-16ad-42ec-aea7-a05df105604c';
export const TYPE_NAME = '📄 Page Markup Contribution';
export const KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_MARKUP = 'markup';
export const KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_KEY = 'key';

/*
 * @name 📄 Page Markup Contribution
 * @id 2b0cd235-16ad-42ec-aea7-a05df105604c
 * @description A page markup contribution directly added into the markup
 */
export interface PageMarkupContributionType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": false,
     *   "elementType": "text",
     *   "helpText": "The markup to be added.",
     *   "key": "markup",
     *   "label": "Markup"
     * }
     * ```
     */
    [KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_MARKUP]?: string;

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
    [KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type PageMarkupContributionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageMarkupContributionElement else false
 */
export function isPageMarkupContributionType(aValue: any): aValue is PageMarkupContributionType {
    return Lrzcbu8aG(aValue)
        && PEdHKHuzA(aValue[KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_MARKUP], LqeJjI1YD)
        && PEdHKHuzA(aValue[KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "markup" property from PageMarkupContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMarkup: (aDefault?: string) => UnaryFunction<PageMarkupContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_MARKUP);

/**
 * Selects the "markup" property from PageMarkupContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMarkup: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageMarkupContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_MARKUP);

/**
 * Selects the "key" property from PageMarkupContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<PageMarkupContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_KEY);

/**
 * Selects the "key" property from PageMarkupContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageMarkupContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_MARKUP_CONTRIBUTION_ELEMENT_KEY);
