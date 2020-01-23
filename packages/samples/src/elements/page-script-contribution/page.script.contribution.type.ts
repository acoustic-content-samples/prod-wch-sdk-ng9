/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as Lrzcbu8aG, isOptional as PEdHKHuzA, isString as LqeJjI1YD, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '5c473463-db07-4132-b8a1-bd40cbdf4b18';
export const TYPE_NAME = '📄 Page Script Contribution';
export const KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_TYPE = 'type';
export const KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_SRC = 'src';
export const KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_KEY = 'key';

/*
 * @name 📄 Page Script Contribution
 * @id 5c473463-db07-4132-b8a1-bd40cbdf4b18
 * @description A style contribution added as a <script> element to the page markup
 */
export interface PageScriptContributionType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "helpText": "Identify the type information for the <script> tag to be included",
     *   "key": "type",
     *   "label": "type",
     *   "options": [
     *     {
     *       "label": "application/javascript",
     *       "selection": "application/javascript"
     *     },
     *     {
     *       "label": "module",
     *       "selection": "module"
     *     },
     *     {
     *       "label": "nomodule",
     *       "selection": "nomodule"
     *     }
     *   ],
     *   "required": true,
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_TYPE]: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "helpText": "The URL pointing to the script realtive to the resource base URL of this tenant.",
     *   "key": "src",
     *   "label": "src",
     *   "required": true,
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_SRC]: string;

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
    [KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_KEY]?: string;
}

/**
 * Tests if the value is of type PageScriptContributionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type PageScriptContributionElement else false
 */
export function isPageScriptContributionType(aValue: any): aValue is PageScriptContributionType {
    return Lrzcbu8aG(aValue)
        && LqeJjI1YD(aValue[KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_TYPE])
        && LqeJjI1YD(aValue[KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_SRC])
        && PEdHKHuzA(aValue[KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_KEY], LqeJjI1YD)
    ;
}

/**
 * Selects the "type" property from PageScriptContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectType: (aDefault?: string) => UnaryFunction<PageScriptContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_TYPE);

/**
 * Selects the "type" property from PageScriptContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectType: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageScriptContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_TYPE);

/**
 * Selects the "src" property from PageScriptContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSrc: (aDefault?: string) => UnaryFunction<PageScriptContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_SRC);

/**
 * Selects the "src" property from PageScriptContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSrc: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageScriptContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_SRC);

/**
 * Selects the "key" property from PageScriptContributionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<PageScriptContributionType, string> = partialLeft(pluckProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_KEY);

/**
 * Selects the "key" property from PageScriptContributionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<PageScriptContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_ELEMENT_KEY);
