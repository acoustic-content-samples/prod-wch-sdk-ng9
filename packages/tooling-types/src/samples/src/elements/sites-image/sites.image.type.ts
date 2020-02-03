/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as DkbvU7gQe } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isImage as nzssKyJlo, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesImageType}.
 */
export const TYPE_ID_SITES_IMAGE = 'c8295d37-7235-495e-8d40-f3b8bafe4099';
/**
 * Name of the content type for {@link SitesImageType}.
 */
export const TYPE_NAME_SITES_IMAGE = 'Sites Image';
/**
 * Key name of the `image` property of {@link SitesImageType}
 */
export const KEY_SITES_IMAGE_IMAGE = 'image';
/**
 * Key name of the `alignment` property of {@link SitesImageType}
 */
export const KEY_SITES_IMAGE_ALIGNMENT = 'alignment';
/**
 * Key name of the `padding` property of {@link SitesImageType}
 */
export const KEY_SITES_IMAGE_PADDING = 'padding';
/**
 * Key name of the `margin` property of {@link SitesImageType}
 */
export const KEY_SITES_IMAGE_MARGIN = 'margin';
/**
 * Key name of the `commonSettings` property of {@link SitesImageType}
 */
export const KEY_SITES_IMAGE_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesImageType}
 */
export const KEY_SITES_IMAGE_KEY = 'key';

/**
 * Delivery version of the Sites Image content type.
 *
 * See {@link TYPE_ID_SITES_IMAGE} and {@link TYPE_NAME_SITES_IMAGE}
 * @remarks
 * This block represents an image to be shown on the page
 */
export interface SitesImageType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The image for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "acceptType": [
   *     "jpg",
   *     "jpeg",
   *     "png",
   *     "gif"
   *   ],
   *   "elementType": "image",
   *   "helpText": "The image for this block",
   *   "key": "image",
   *   "label": "Image"
   * }
   * ```
   */
  [KEY_SITES_IMAGE_IMAGE]?: Image;

  /**
   * This element controls the alignment defintion for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_ALIGNMENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the alignment defintion for this block",
   *   "key": "alignment",
   *   "label": "Alignment",
   *   "typeRef": {
   *     "name": "Sites Alignment",
   *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_ALIGNMENT]?: SitesAlignmentType;

  /**
   * This element controls the padding values for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this block",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the margin values for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_MARGIN}
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
  [KEY_SITES_IMAGE_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the common settings for this block
   * @remarks
   * See {@link KEY_SITES_IMAGE_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the common settings for this block",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_IMAGE_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_IMAGE_KEY}
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
  [KEY_SITES_IMAGE_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesImageType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesImageType} else false
 */
export function isSitesImageType(aValue: any): aValue is SitesImageType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_IMAGE], nzssKyJlo)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_ALIGNMENT], DkbvU7gQe)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_IMAGE_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_IMAGE_IMAGE} property from {@link SitesImageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageImage: (aDefault?: Image) => UnaryFunction<SitesImageType,
  Image> = partialLeft(pluckProperty, KEY_SITES_IMAGE_IMAGE);

/**
 * Selects the {@link KEY_SITES_IMAGE_IMAGE} property from {@link SitesImageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) =>
  OperatorFunction<SitesImageType, Image> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_IMAGE);

/**
 * Selects the {@link KEY_SITES_IMAGE_ALIGNMENT} property from {@link SitesImageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesImageType,
  SitesAlignmentType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_IMAGE_ALIGNMENT} property from {@link SitesImageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) =>
  OperatorFunction<SitesImageType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_IMAGE_PADDING} property from {@link SitesImageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImagePadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesImageType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_PADDING);

/**
 * Selects the {@link KEY_SITES_IMAGE_PADDING} property from {@link SitesImageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImagePadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesImageType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_PADDING);

/**
 * Selects the {@link KEY_SITES_IMAGE_MARGIN} property from {@link SitesImageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesImageType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_MARGIN);

/**
 * Selects the {@link KEY_SITES_IMAGE_MARGIN} property from {@link SitesImageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesImageType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_MARGIN);

/**
 * Selects the {@link KEY_SITES_IMAGE_COMMON_SETTINGS} property from {@link SitesImageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesImageType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_IMAGE_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_IMAGE_COMMON_SETTINGS} property from {@link SitesImageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesImageType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_IMAGE_KEY} property from {@link SitesImageType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesImageKey: (aDefault?: string) => UnaryFunction<SitesImageType,
  string> = partialLeft(pluckProperty, KEY_SITES_IMAGE_KEY);

/**
 * Selects the {@link KEY_SITES_IMAGE_KEY} property from {@link SitesImageType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesImageKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesImageType, string> = partialLeft(rxSelectProperty, KEY_SITES_IMAGE_KEY);
