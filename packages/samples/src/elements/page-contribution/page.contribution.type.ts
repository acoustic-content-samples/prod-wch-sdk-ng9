/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as tf8PJ$Vmt, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isOptionalArrayOf as logwFItzm, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '354743b2-f89a-482b-b447-2b5a2367c8bd';
export const TYPE_NAME = '📄 Page Contribution';
export const KEY_PAGE_CONTRIBUTION_ELEMENT_EMBED = 'embed';
export const KEY_PAGE_CONTRIBUTION_ELEMENT_REFERENCE = 'reference';
export const KEY_PAGE_CONTRIBUTION_ELEMENT_MODE = 'mode';
export const KEY_PAGE_CONTRIBUTION_ELEMENT_KEY = 'key';

/*
 * @name 📄 Page Contribution
 * @id 354743b2-f89a-482b-b447-2b5a2367c8bd
 * @description An set of related markup contributions to be added to markup of individual pages. Page contributions can contribute to both, the "head" and the "body" element of the page.
 */
export interface PageContributionType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "text",
     *   "fieldLabel": "Private",
     *   "helpText": "Embed this contribution directly into the markup of this page. This field contains the markup of the contributions.",
     *   "key": "embed",
     *   "label": "embed",
     *   "minimumValues": 0
     * }
     * ```
     */
    [KEY_PAGE_CONTRIBUTION_ELEMENT_EMBED]?: string[];

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "reference",
     *   "fieldLabel": "Shared",
     *   "helpText": "Reference a shared page contribution.",
     *   "key": "reference",
     *   "label": "reference",
     *   "minimumValues": 0
     * }
     * ```
     */
    [KEY_PAGE_CONTRIBUTION_ELEMENT_REFERENCE]?: DeliveryReferenceElement[];

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "helpText": "This element controls if the contribution is meant to be added to pages rendered for \"previeww\" or \"live\" mode. This allows for example to add additional Page Module (like inline-editing modules) only when the page is rendered in preview mode in the authoring UI. This allows to avoid uneccessary bandwith consumption when serving your live. You can use the option \"always\" to include this contributions in both modes (i.e. in \"live\" and \"preview\" mode)",
     *   "key": "mode",
     *   "label": "Mode",
     *   "options": [
     *     {
     *       "label": "Always",
     *       "selection": "always"
     *     },
     *     {
     *       "label": "Live",
     *       "selection": "live"
     *     },
     *     {
     *       "label": "Preview",
     *       "selection": "preview"
     *     }
     *   ],
     *   "required": true
     * }
     * ```
     */
    [KEY_PAGE_CONTRIBUTION_ELEMENT_MODE]: string;

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
    [KEY_PAGE_CONTRIBUTION_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type PageContributionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageContributionElement else false
 */
export function isPageContributionType(aValue: any): aValue is PageContributionType {
    return Lrzcbu8aG(aValue)
        && logwFItzm(aValue[KEY_PAGE_CONTRIBUTION_ELEMENT_EMBED], LqeJjI1YD)
        && logwFItzm(aValue[KEY_PAGE_CONTRIBUTION_ELEMENT_REFERENCE], tf8PJ$Vmt)
        && LqeJjI1YD(aValue[KEY_PAGE_CONTRIBUTION_ELEMENT_MODE])
        && PEdHKHuzA(aValue[KEY_PAGE_CONTRIBUTION_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "embed" property from PageContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectEmbed: (aDefault?: string[]) => UnaryFunction<PageContributionType, string[]> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_EMBED);

/**
 * Selects the "embed" property from PageContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectEmbed: (aDefault?: string[], aCmp?: EqualsPredicate<string[]>) => OperatorFunction<PageContributionType, string[]> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_EMBED);

/**
 * Selects the "reference" property from PageContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectReference: (aDefault?: DeliveryReferenceElement[]) => UnaryFunction<PageContributionType, DeliveryReferenceElement[]> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_REFERENCE);

/**
 * Selects the "reference" property from PageContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectReference: (aDefault?: DeliveryReferenceElement[], aCmp?: EqualsPredicate<DeliveryReferenceElement[]>) => OperatorFunction<PageContributionType, DeliveryReferenceElement[]> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_REFERENCE);

/**
 * Selects the "mode" property from PageContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMode: (aDefault?: string) => UnaryFunction<PageContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_MODE);

/**
 * Selects the "mode" property from PageContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMode: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_MODE);

/**
 * Selects the "key" property from PageContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<PageContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_KEY);

/**
 * Selects the "key" property from PageContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_CONTRIBUTION_ELEMENT_KEY);
