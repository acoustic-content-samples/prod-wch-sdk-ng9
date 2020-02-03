/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as BjQ4vkiHp } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesButtonType, isSitesButtonType as VbPJde0zw } from './../sites-button/sites.button.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { SitesImageType, isSitesImageType as PP1F5FBYi } from './../sites-image/sites.image.type';
import { SitesTextType, isSitesTextType as tElHRQANH } from './../sites-text/sites.text.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesPromotionType}.
 */
export const TYPE_ID_SITES_PROMOTION = '0b1c47a9-eb31-49ec-8fd7-89ca21a36b36';
/**
 * Name of the content type for {@link SitesPromotionType}.
 */
export const TYPE_NAME_SITES_PROMOTION = 'Sites Promotion';
/**
 * Key name of the `background` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_BACKGROUND = 'background';
/**
 * Key name of the `margin` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_MARGIN = 'margin';
/**
 * Key name of the `text` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_TEXT = 'text';
/**
 * Key name of the `image` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_IMAGE = 'image';
/**
 * Key name of the `button` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_BUTTON = 'button';
/**
 * Key name of the `commonSettings` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `layout` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_LAYOUT = 'layout';
/**
 * Key name of the `key` property of {@link SitesPromotionType}
 */
export const KEY_SITES_PROMOTION_KEY = 'key';

/**
 * Delivery version of the Sites Promotion content type.
 *
 * See {@link TYPE_ID_SITES_PROMOTION} and {@link TYPE_NAME_SITES_PROMOTION}
 * @remarks
 * This block represents a promotion item to be rendered on a page. A promotion is comprised by an image, a text, and a clickable button.
 */
export interface SitesPromotionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the background for this promotion block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_BACKGROUND}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background for this promotion block.",
   *   "key": "background",
   *   "label": "Background",
   *   "typeRef": {
   *     "name": "Sites Background",
   *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_BACKGROUND]?: SitesBackgroundType;

  /**
   * This element controls the margin values for this promotion block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this promotion block.",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_MARGIN]?: SitesBoundaryType;

  /**
   * This element holds the actual text data for this promotion block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_TEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds the actual text data for this promotion block.",
   *   "key": "text",
   *   "label": "Text",
   *   "typeRef": {
   *     "name": "Sites Text",
   *     "id": "373c81a5-d86b-4740-8f11-62fcbccfca08"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_TEXT]?: SitesTextType;

  /**
   * This element holds the image for this promotion block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds the image for this promotion block.",
   *   "key": "image",
   *   "label": "Image",
   *   "typeRef": {
   *     "name": "Sites Image",
   *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_IMAGE]?: SitesImageType;

  /**
   * This element controls the button for this promotion block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_BUTTON}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the button for this promotion block.",
   *   "key": "button",
   *   "label": "Button",
   *   "typeRef": {
   *     "name": "Sites Button",
   *     "id": "dee92057-69e3-489b-b13b-15f9b28770a1"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_BUTTON]?: SitesButtonType;

  /**
   * This element controls the common settings for this block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the common settings for this block.",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element controls the layout to be applied to this promotion block.
   * @remarks
   * See {@link KEY_SITES_PROMOTION_LAYOUT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the layout to be applied to this promotion block.",
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
   *       "label": "Image Top",
   *       "selection": "image-top"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_PROMOTION_LAYOUT]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_PROMOTION_KEY}
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
  [KEY_SITES_PROMOTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesPromotionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesPromotionType} else false
 */
export function isSitesPromotionType(aValue: any): aValue is SitesPromotionType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_BACKGROUND], BjQ4vkiHp)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_TEXT], tElHRQANH)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_IMAGE], PP1F5FBYi)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_BUTTON], VbPJde0zw)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_LAYOUT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_PROMOTION_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_PROMOTION_BACKGROUND} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesPromotionType,
  SitesBackgroundType> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_PROMOTION_BACKGROUND} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) =>
  OperatorFunction<SitesPromotionType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_PROMOTION_MARGIN} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesPromotionType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_MARGIN);

/**
 * Selects the {@link KEY_SITES_PROMOTION_MARGIN} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesPromotionType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_MARGIN);

/**
 * Selects the {@link KEY_SITES_PROMOTION_TEXT} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionText: (aDefault?: SitesTextType) => UnaryFunction<SitesPromotionType,
  SitesTextType> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_TEXT);

/**
 * Selects the {@link KEY_SITES_PROMOTION_TEXT} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionText: (aDefault?: SitesTextType, aCmp?: EqualsPredicate<SitesTextType>) =>
  OperatorFunction<SitesPromotionType, SitesTextType> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_TEXT);

/**
 * Selects the {@link KEY_SITES_PROMOTION_IMAGE} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionImage: (aDefault?: SitesImageType) => UnaryFunction<SitesPromotionType,
  SitesImageType> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_IMAGE);

/**
 * Selects the {@link KEY_SITES_PROMOTION_IMAGE} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) =>
  OperatorFunction<SitesPromotionType, SitesImageType> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_IMAGE);

/**
 * Selects the {@link KEY_SITES_PROMOTION_BUTTON} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionButton: (aDefault?: SitesButtonType) => UnaryFunction<SitesPromotionType,
  SitesButtonType> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_BUTTON);

/**
 * Selects the {@link KEY_SITES_PROMOTION_BUTTON} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionButton: (aDefault?: SitesButtonType, aCmp?: EqualsPredicate<SitesButtonType>) =>
  OperatorFunction<SitesPromotionType, SitesButtonType> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_BUTTON);

/**
 * Selects the {@link KEY_SITES_PROMOTION_COMMON_SETTINGS} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesPromotionType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_PROMOTION_COMMON_SETTINGS} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesPromotionType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_PROMOTION_LAYOUT} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionLayout: (aDefault?: string) => UnaryFunction<SitesPromotionType,
  string> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_LAYOUT);

/**
 * Selects the {@link KEY_SITES_PROMOTION_LAYOUT} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesPromotionType, string> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_LAYOUT);

/**
 * Selects the {@link KEY_SITES_PROMOTION_KEY} property from {@link SitesPromotionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesPromotionKey: (aDefault?: string) => UnaryFunction<SitesPromotionType,
  string> = partialLeft(pluckProperty, KEY_SITES_PROMOTION_KEY);

/**
 * Selects the {@link KEY_SITES_PROMOTION_KEY} property from {@link SitesPromotionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesPromotionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesPromotionType, string> = partialLeft(rxSelectProperty, KEY_SITES_PROMOTION_KEY);
