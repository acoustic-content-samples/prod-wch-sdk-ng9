/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as HFqsGMCHx, isNotNil as TdFcxLjhv, isOptional as R8L_djGws, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '98f24456-bf11-4248-bca9-07e273b8dbc4';
export const TYPE_NAME = 'Sites Social Link';
export const KEY_ICON = 'icon';
export const KEY_URL = 'url';
export const KEY_ALTTEXT = 'alttext';

/*
 * @name Sites Social Link
 * @id 98f24456-bf11-4248-bca9-07e273b8dbc4
 */
export interface SitesSocialLinkType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "icon",
     *   "label": "Icon"
     * }
     * ```
     */
    [KEY_ICON]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "url",
     *   "label": "URL"
     * }
     * ```
     */
    [KEY_URL]?: Link;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "alttext",
     *   "label": "Alt text"
     * }
     * ```
     */
    [KEY_ALTTEXT]?: string;
}

/**
 * Tests if the value is of type SitesSocialLinkElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesSocialLinkElement else false
 */
export function isSitesSocialLinkType(aValue: any): aValue is SitesSocialLinkType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_ICON], rCUctNoUC)
        && R8L_djGws(aValue[KEY_URL], HFqsGMCHx)
        && R8L_djGws(aValue[KEY_ALTTEXT], rCUctNoUC)
    ;
}

/**
 * Selects the "icon" property from SitesSocialLinkType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIcon: (aDefault?: string) => UnaryFunction<SitesSocialLinkType, string> = partialLeft(pluckProperty, KEY_ICON);

/**
 * Selects the "icon" property from SitesSocialLinkType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIcon: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesSocialLinkType, string> = partialLeft(rxSelectProperty, KEY_ICON);

/**
 * Selects the "url" property from SitesSocialLinkType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectUrl: (aDefault?: Link) => UnaryFunction<SitesSocialLinkType, Link> = partialLeft(pluckProperty, KEY_URL);

/**
 * Selects the "url" property from SitesSocialLinkType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectUrl: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) => OperatorFunction<SitesSocialLinkType, Link> = partialLeft(rxSelectProperty, KEY_URL);

/**
 * Selects the "alttext" property from SitesSocialLinkType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlttext: (aDefault?: string) => UnaryFunction<SitesSocialLinkType, string> = partialLeft(pluckProperty, KEY_ALTTEXT);

/**
 * Selects the "alttext" property from SitesSocialLinkType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlttext: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesSocialLinkType, string> = partialLeft(rxSelectProperty, KEY_ALTTEXT);
