/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as BjQ4vkiHp } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { SitesImageType, isSitesImageType as PP1F5FBYi } from './../sites-image/sites.image.type';
import { SitesTextType, isSitesTextType as tElHRQANH } from './../sites-text/sites.text.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesImageAndTextType}.
 */
export const TYPE_ID_SITES_IMAGE_AND_TEXT = 'bee26b87-bbcf-454b-9dc6-7a909ab13fd1';
/**
 * Name of the content type for {@link SitesImageAndTextType}.
 */
export const TYPE_NAME_SITES_IMAGE_AND_TEXT = 'Sites Image And Text';
/**
 * Key name of the `background` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_BACKGROUND = 'background';
/**
 * Key name of the `margin` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_MARGIN = 'margin';
/**
 * Key name of the `commonSettings` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `text` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_TEXT = 'text';
/**
 * Key name of the `image` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_IMAGE = 'image';
/**
 * Key name of the `layout` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_LAYOUT = 'layout';
/**
 * Key name of the `key` property of {@link SitesImageAndTextType}
 */
export const KEY_SITES_IMAGE_AND_TEXT_KEY = 'key';

/**
 * Delivery version of the Sites Image And Text content type.
 *
 * See {@link TYPE_ID_SITES_IMAGE_AND_TEXT} and {@link TYPE_NAME_SITES_IMAGE_AND_TEXT}
 * @remarks
 * This block represents a combination of image and accompanying text
 */
export interface SitesImageAndTextType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the background defintion for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_BACKGROUND}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background defintion for this block",
   *   "key": "background",
   *   "label": "Background",
   *   "typeRef": {
   *     "name": "Sites Background",
   *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_AND_TEXT_BACKGROUND]?: SitesBackgroundType;

  /**
   * This element controls the margin values for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this block",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_AND_TEXT_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the common settings for this text block
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the common settings for this text block",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * The text data for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_TEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The text data for this block",
   *   "key": "text",
   *   "label": "Text",
   *   "typeRef": {
   *     "name": "Sites Text",
   *     "id": "373c81a5-d86b-4740-8f11-62fcbccfca08"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_AND_TEXT_TEXT]?: SitesTextType;

  /**
   * The image for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The image for this block",
   *   "key": "image",
   *   "label": "Image",
   *   "typeRef": {
   *     "name": "Sites Image",
   *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_AND_TEXT_IMAGE]?: SitesImageType;

  /**
   * This element controls the image and text layout to be applied to this block.
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_LAYOUT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the image and text layout to be applied to this block.",
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
  [KEY_SITES_IMAGE_AND_TEXT_LAYOUT]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_IMAGE_AND_TEXT_KEY}
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
  [KEY_SITES_IMAGE_AND_TEXT_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesImageAndTextType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesImageAndTextType} else false
 */
export function isSitesImageAndTextType(aValue: any): aValue is SitesImageAndTextType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_BACKGROUND], BjQ4vkiHp)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_TEXT], tElHRQANH)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_IMAGE], PP1F5FBYi)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_LAYOUT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_AND_TEXT_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_BACKGROUND} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesImageAndTextType,
  SitesBackgroundType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_BACKGROUND} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) =>
  OperatorFunction<SitesImageAndTextType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_MARGIN} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesImageAndTextType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_MARGIN);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_MARGIN} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesImageAndTextType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_MARGIN);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesImageAndTextType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesImageAndTextType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_TEXT} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextText: (aDefault?: SitesTextType) => UnaryFunction<SitesImageAndTextType,
  SitesTextType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_TEXT);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_TEXT} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextText: (aDefault?: SitesTextType, aCmp?: EqualsPredicate<SitesTextType>) =>
  OperatorFunction<SitesImageAndTextType, SitesTextType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_TEXT);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_IMAGE} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextImage: (aDefault?: SitesImageType) => UnaryFunction<SitesImageAndTextType,
  SitesImageType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_IMAGE);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_IMAGE} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) =>
  OperatorFunction<SitesImageAndTextType, SitesImageType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_IMAGE);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_LAYOUT} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextLayout: (aDefault?: string) => UnaryFunction<SitesImageAndTextType,
  string> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_LAYOUT);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_LAYOUT} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesImageAndTextType, string> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_LAYOUT);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_KEY} property from {@link SitesImageAndTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAndTextKey: (aDefault?: string) => UnaryFunction<SitesImageAndTextType,
  string> = partialLeft(pluckProperty, KEY_SITES_IMAGE_AND_TEXT_KEY);

/**
 * Selects the {@link KEY_SITES_IMAGE_AND_TEXT_KEY} property from {@link SitesImageAndTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAndTextKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesImageAndTextType, string> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_AND_TEXT_KEY);
