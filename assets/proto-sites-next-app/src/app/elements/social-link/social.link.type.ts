/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as F2EstD4mD, isNotNil as t3YhiD3Bk, isOptional as _krhmaXp, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '9f1d4f26-b587-4abe-a83c-38df755a6b37';
export const TYPE_NAME = 'Social Link';
export const KEY_ICON = 'icon';
export const KEY_URL = 'url';
export const KEY_ALTTEXT = 'alttext';

/*
 * @name Social Link
 * @id 9f1d4f26-b587-4abe-a83c-38df755a6b37
 */
export interface SocialLinkType {
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
 * Tests if the value is of type SocialLinkElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SocialLinkElement else false
 */
export function isSocialLinkType(aValue: any): aValue is SocialLinkType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_ICON], Dp8dLCd6c)
        && _krhmaXp(aValue[KEY_URL], F2EstD4mD)
        && _krhmaXp(aValue[KEY_ALTTEXT], Dp8dLCd6c)
    ;
}

/**
 * Selects the "icon" property from SocialLinkType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIcon: (aDefault?: string) => UnaryFunction<SocialLinkType, string> = partialLeft(pluckProperty, KEY_ICON);

/**
 * Selects the "icon" property from SocialLinkType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIcon: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SocialLinkType, string> = partialLeft(rxSelectProperty, KEY_ICON);

/**
 * Selects the "url" property from SocialLinkType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectUrl: (aDefault?: Link) => UnaryFunction<SocialLinkType, Link> = partialLeft(pluckProperty, KEY_URL);

/**
 * Selects the "url" property from SocialLinkType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectUrl: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) => OperatorFunction<SocialLinkType, Link> = partialLeft(rxSelectProperty, KEY_URL);

/**
 * Selects the "alttext" property from SocialLinkType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlttext: (aDefault?: string) => UnaryFunction<SocialLinkType, string> = partialLeft(pluckProperty, KEY_ALTTEXT);

/**
 * Selects the "alttext" property from SocialLinkType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlttext: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SocialLinkType, string> = partialLeft(rxSelectProperty, KEY_ALTTEXT);
