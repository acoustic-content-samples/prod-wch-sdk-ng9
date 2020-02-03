/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata, Video } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, isVideo as tLPbVEeJe, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesVideoType}.
 */
export const TYPE_ID_SITES_VIDEO = 'a84f2c97-33bb-45fa-8156-25141df73055';
/**
 * Name of the content type for {@link SitesVideoType}.
 */
export const TYPE_NAME_SITES_VIDEO = 'Sites Video';
/**
 * Key name of the `video` property of {@link SitesVideoType}
 */
export const KEY_SITES_VIDEO_VIDEO = 'video';
/**
 * Key name of the `commonSettings` property of {@link SitesVideoType}
 */
export const KEY_SITES_VIDEO_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesVideoType}
 */
export const KEY_SITES_VIDEO_KEY = 'key';

/**
 * Delivery version of the Sites Video content type.
 *
 * See {@link TYPE_ID_SITES_VIDEO} and {@link TYPE_NAME_SITES_VIDEO}
 * @remarks
 * This block represents a video to be rendered on pages.
 */
export interface SitesVideoType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element holds the reference to the video asset
   * @remarks
   * See {@link KEY_SITES_VIDEO_VIDEO}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "video",
   *   "helpText": "This element holds the reference to the video asset",
   *   "key": "video",
   *   "label": "Video"
   * }
   * ```
   */
  [KEY_SITES_VIDEO_VIDEO]?: Video;

  /**
   * This element controls the common settings for this block
   * @remarks
   * See {@link KEY_SITES_VIDEO_COMMON_SETTINGS}
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
  [KEY_SITES_VIDEO_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_VIDEO_KEY}
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
  [KEY_SITES_VIDEO_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesVideoType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesVideoType} else false
 */
export function isSitesVideoType(aValue: any): aValue is SitesVideoType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_VIDEO_VIDEO], tLPbVEeJe)
    && VnbVJaXFB(aValue[KEY_SITES_VIDEO_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_VIDEO_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_VIDEO_VIDEO} property from {@link SitesVideoType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVideoVideo: (aDefault?: Video) => UnaryFunction<SitesVideoType,
  Video> = partialLeft(pluckProperty, KEY_SITES_VIDEO_VIDEO);

/**
 * Selects the {@link KEY_SITES_VIDEO_VIDEO} property from {@link SitesVideoType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVideoVideo: (aDefault?: Video, aCmp?: EqualsPredicate<Video>) =>
  OperatorFunction<SitesVideoType, Video> = partialLeft(rxSelectProperty, KEY_SITES_VIDEO_VIDEO);

/**
 * Selects the {@link KEY_SITES_VIDEO_COMMON_SETTINGS} property from {@link SitesVideoType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVideoCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesVideoType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_VIDEO_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_VIDEO_COMMON_SETTINGS} property from {@link SitesVideoType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVideoCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesVideoType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_VIDEO_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_VIDEO_KEY} property from {@link SitesVideoType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesVideoKey: (aDefault?: string) => UnaryFunction<SitesVideoType,
  string> = partialLeft(pluckProperty, KEY_SITES_VIDEO_KEY);

/**
 * Selects the {@link KEY_SITES_VIDEO_KEY} property from {@link SitesVideoType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesVideoKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesVideoType, string> = partialLeft(rxSelectProperty, KEY_SITES_VIDEO_KEY);
