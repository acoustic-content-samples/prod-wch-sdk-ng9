/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as ZJlLz5Oku, isOptional as Fx1f1ZVBm, isString as DrkSm2KsA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '843fb991-7413-4517-bfcb-b59fc4b1f449';
export const TYPE_NAME = 'Sites Navigation';
export const KEY_NAVIGATION = 'navigation';
export const KEY_DEFAULT_PAGE = 'defaultPage';
export const KEY_KEY = 'key';

/*
 * @name Sites Navigation
 * @id 843fb991-7413-4517-bfcb-b59fc4b1f449
 */
export interface SitesNavigationType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "displayType": "multiLine",
     *   "elementType": "text",
     *   "key": "navigation",
     *   "label": "Navigation",
     *   "required": true
     * }
     * ```
     */
    [KEY_NAVIGATION]: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "defaultPage",
     *   "label": "Default Page"
     * }
     * ```
     */
    [KEY_DEFAULT_PAGE]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "key",
     *   "label": "Key"
     * }
     * ```
     */
    [KEY_KEY]?: string;
}

/**
 * Tests if the value is of type SitesNavigationElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesNavigationElement else false
 */
export function isSitesNavigationType(aValue: any): aValue is SitesNavigationType {
    return ZJlLz5Oku(aValue)
        && DrkSm2KsA(aValue[KEY_NAVIGATION])
        && Fx1f1ZVBm(aValue[KEY_DEFAULT_PAGE], DrkSm2KsA)
        && Fx1f1ZVBm(aValue[KEY_KEY], DrkSm2KsA)
    ;
}

/**
 * Selects the "navigation" property from SitesNavigationType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectNavigation: (aDefault?: string) => UnaryFunction<SitesNavigationType, string> = partialLeft(pluckProperty, KEY_NAVIGATION);

/**
 * Selects the "navigation" property from SitesNavigationType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectNavigation: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesNavigationType, string> = partialLeft(rxSelectProperty, KEY_NAVIGATION);

/**
 * Selects the "defaultPage" property from SitesNavigationType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectDefaultPage: (aDefault?: string) => UnaryFunction<SitesNavigationType, string> = partialLeft(pluckProperty, KEY_DEFAULT_PAGE);

/**
 * Selects the "defaultPage" property from SitesNavigationType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectDefaultPage: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesNavigationType, string> = partialLeft(rxSelectProperty, KEY_DEFAULT_PAGE);

/**
 * Selects the "key" property from SitesNavigationType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<SitesNavigationType, string> = partialLeft(pluckProperty, KEY_KEY);

/**
 * Selects the "key" property from SitesNavigationType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesNavigationType, string> = partialLeft(rxSelectProperty, KEY_KEY);
