/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as jn2SJFBIr, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesSocialLinkType}.
 */
export const TYPE_ID_SITES_SOCIAL_LINK = '98f24456-bf11-4248-bca9-07e273b8dbc4';
/**
 * Name of the content type for {@link SitesSocialLinkType}.
 */
export const TYPE_NAME_SITES_SOCIAL_LINK = 'Sites Social Link';
/**
 * Key name of the `icon` property of {@link SitesSocialLinkType}
 */
export const KEY_SITES_SOCIAL_LINK_ICON = 'icon';
/**
 * Key name of the `url` property of {@link SitesSocialLinkType}
 */
export const KEY_SITES_SOCIAL_LINK_URL = 'url';
/**
 * Key name of the `alttext` property of {@link SitesSocialLinkType}
 */
export const KEY_SITES_SOCIAL_LINK_ALTTEXT = 'alttext';
/**
 * Key name of the `key` property of {@link SitesSocialLinkType}
 */
export const KEY_SITES_SOCIAL_LINK_KEY = 'key';

/**
 * Delivery version of the Sites Social Link content type.
 *
 * See {@link TYPE_ID_SITES_SOCIAL_LINK} and {@link TYPE_NAME_SITES_SOCIAL_LINK}
 * @remarks
 * This item represents a link to social follow link.
 */
export interface SitesSocialLinkType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the common settings for this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_LINK_ICON}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element controls the common settings for this block.",
   *   "key": "icon",
   *   "label": "Icon"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_LINK_ICON]?: string;

  /**
   * This element controls the click target for this link.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_LINK_URL}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "link",
   *   "helpText": "This element controls the click target for this link.",
   *   "key": "url",
   *   "label": "URL"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_LINK_URL]?: Link;

  /**
   * This element controls the alternative text for this link.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_LINK_ALTTEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element controls the alternative text for this link.",
   *   "key": "alttext",
   *   "label": "Alt text"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_LINK_ALTTEXT]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_SOCIAL_LINK_KEY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element is used to uniquely identify this element in the current content item",
   *   "key": "key",
   *   "label": "Key"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_LINK_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesSocialLinkType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesSocialLinkType} else false
 */
export function isSitesSocialLinkType(aValue: any): aValue is SitesSocialLinkType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_LINK_ICON], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_LINK_URL], jn2SJFBIr)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_LINK_ALTTEXT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_LINK_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_ICON} property from {@link SitesSocialLinkType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialLinkIcon: (aDefault?: string) => UnaryFunction<SitesSocialLinkType,
  string> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_LINK_ICON);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_ICON} property from {@link SitesSocialLinkType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialLinkIcon: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSocialLinkType, string> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_LINK_ICON);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_URL} property from {@link SitesSocialLinkType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialLinkUrl: (aDefault?: Link) => UnaryFunction<SitesSocialLinkType,
  Link> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_LINK_URL);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_URL} property from {@link SitesSocialLinkType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialLinkUrl: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) =>
  OperatorFunction<SitesSocialLinkType, Link> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_LINK_URL);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_ALTTEXT} property from {@link SitesSocialLinkType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialLinkAlttext: (aDefault?: string) => UnaryFunction<SitesSocialLinkType,
  string> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_LINK_ALTTEXT);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_ALTTEXT} property from {@link SitesSocialLinkType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialLinkAlttext: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSocialLinkType, string> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_LINK_ALTTEXT);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_KEY} property from {@link SitesSocialLinkType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialLinkKey: (aDefault?: string) => UnaryFunction<SitesSocialLinkType,
  string> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_LINK_KEY);

/**
 * Selects the {@link KEY_SITES_SOCIAL_LINK_KEY} property from {@link SitesSocialLinkType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialLinkKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSocialLinkType, string> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_LINK_KEY);
