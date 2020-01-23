/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'eedce4a0-9647-4301-9247-6793e08652ea';
export const TYPE_NAME = '📄 Page Embed Contribution';
export const KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_EMBED = 'embed';
export const KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_KEY = 'key';

/*
 * @name 📄 Page Embed Contribution
 * @id eedce4a0-9647-4301-9247-6793e08652ea
 * @description A page markup contribution directly added into the markup
 */
export interface PageEmbedContributionType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "The markup to be added.",
     *   "key": "embed",
     *   "label": "embed",
     *   "required": true,
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_EMBED]: string;

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
    [KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type PageEmbedContributionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageEmbedContributionElement else false
 */
export function isPageEmbedContributionType(aValue: any): aValue is PageEmbedContributionType {
    return Lrzcbu8aG(aValue)
        && LqeJjI1YD(aValue[KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_EMBED])
        && PEdHKHuzA(aValue[KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "embed" property from PageEmbedContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectEmbed: (aDefault?: string) => UnaryFunction<PageEmbedContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_EMBED);

/**
 * Selects the "embed" property from PageEmbedContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectEmbed: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageEmbedContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_EMBED);

/**
 * Selects the "key" property from PageEmbedContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<PageEmbedContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_KEY);

/**
 * Selects the "key" property from PageEmbedContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageEmbedContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_EMBED_CONTRIBUTION_ELEMENT_KEY);
