/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as BjQ4vkiHp } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesImageType, isSitesImageType as PP1F5FBYi } from './../sites-image/sites.image.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as jn2SJFBIr, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesPageCardType}.
 */
export const TYPE_ID_SITES_PAGE_CARD = '8eb34ed3-fbdf-439e-aaeb-00060cdeb63a';
/**
 * Name of the content type for {@link SitesPageCardType}.
 */
export const TYPE_NAME_SITES_PAGE_CARD = 'Sites Page Card';
/**
 * Key name of the `heading` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_HEADING = 'heading';
/**
 * Key name of the `summary` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_SUMMARY = 'summary';
/**
 * Key name of the `link` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_LINK = 'link';
/**
 * Key name of the `image` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_IMAGE = 'image';
/**
 * Key name of the `background` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_BACKGROUND = 'background';
/**
 * Key name of the `margin` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_MARGIN = 'margin';
/**
 * Key name of the `layout` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_LAYOUT = 'layout';
/**
 * Key name of the `key` property of {@link SitesPageCardType}
 */
export const KEY_SITES_PAGE_CARD_KEY = 'key';

/**
 * Delivery version of the Sites Page Card content type.
 *
 * See {@link TYPE_ID_SITES_PAGE_CARD} and {@link TYPE_NAME_SITES_PAGE_CARD}
 * @remarks
 * This page represents a page card comprised of a heading, a summary text, an image and a clickable link.
 */
export interface SitesPageCardType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the heading of this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_HEADING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element controls the heading of this page card.",
   *   "key": "heading",
   *   "label": "Heading"
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_HEADING]?: string;

  /**
   * This element controls the summary text of this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_SUMMARY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "displayHeight": 2,
   *   "displayType": "multiLine",
   *   "elementType": "text",
   *   "helpText": "This element controls the summary text of this page card.",
   *   "key": "summary",
   *   "label": "summary"
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_SUMMARY]?: string;

  /**
   * This element holds the link that controls click target for this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_LINK}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "link",
   *   "helpText": "This element holds the link that controls click target for this page card.",
   *   "key": "link",
   *   "label": "link"
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_LINK]?: Link;

  /**
   * This element holds the image for this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds the image for this page card.",
   *   "key": "image",
   *   "label": "Image",
   *   "typeRef": {
   *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_IMAGE]?: SitesImageType;

  /**
   * This element controls the background for this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_BACKGROUND}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background for this page card.",
   *   "key": "background",
   *   "label": "Background",
   *   "typeRef": {
   *     "name": "Sites Background",
   *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_BACKGROUND]?: SitesBackgroundType;

  /**
   * This element controls the margin values for this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this page card.",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the layout to be applied to this page card.
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_LAYOUT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the layout to be applied to this page card.",
   *   "key": "layout",
   *   "label": "Layout",
   *   "options": [
   *     {
   *       "label": "Image Left",
   *       "selection": "image-left"
   *     },
   *     {
   *       "label": "Image Right",
   *       "selection": "image-right"
   *     },
   *     {
   *       "label": "Image Bottom",
   *       "selection": "image-bottom"
   *     },
   *     {
   *       "label": "Image Top",
   *       "selection": "image-top"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_PAGE_CARD_LAYOUT]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_PAGE_CARD_KEY}
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
  [KEY_SITES_PAGE_CARD_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesPageCardType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesPageCardType} else false
 */
export function isSitesPageCardType(aValue: any): aValue is SitesPageCardType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_HEADING], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_SUMMARY], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_LINK], jn2SJFBIr)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_IMAGE], PP1F5FBYi)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_BACKGROUND], BjQ4vkiHp)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_LAYOUT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_PAGE_CARD_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_HEADING} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardHeading: (aDefault?: string) => UnaryFunction<SitesPageCardType,
  string> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_HEADING);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_HEADING} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardHeading: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_HEADING);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_SUMMARY} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardSummary: (aDefault?: string) => UnaryFunction<SitesPageCardType,
  string> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_SUMMARY);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_SUMMARY} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardSummary: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_SUMMARY);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_LINK} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardLink: (aDefault?: Link) => UnaryFunction<SitesPageCardType,
  Link> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_LINK);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_LINK} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardLink: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) =>
  OperatorFunction<SitesPageCardType, Link> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_LINK);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_IMAGE} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardImage: (aDefault?: SitesImageType) => UnaryFunction<SitesPageCardType,
  SitesImageType> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_IMAGE);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_IMAGE} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) =>
  OperatorFunction<SitesPageCardType, SitesImageType> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_IMAGE);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_BACKGROUND} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesPageCardType,
  SitesBackgroundType> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_BACKGROUND} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) =>
  OperatorFunction<SitesPageCardType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_MARGIN} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesPageCardType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_MARGIN);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_MARGIN} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesPageCardType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_MARGIN);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_LAYOUT} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardLayout: (aDefault?: string) => UnaryFunction<SitesPageCardType,
  string> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_LAYOUT);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_LAYOUT} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_LAYOUT);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_KEY} property from {@link SitesPageCardType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPageCardKey: (aDefault?: string) => UnaryFunction<SitesPageCardType,
  string> = partialLeft(pluckProperty, KEY_SITES_PAGE_CARD_KEY);

/**
 * Selects the {@link KEY_SITES_PAGE_CARD_KEY} property from {@link SitesPageCardType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPageCardKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_SITES_PAGE_CARD_KEY);
