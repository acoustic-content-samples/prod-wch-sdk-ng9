/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as BjQ4vkiHp } from './../sites-background/sites.background.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesSpacerType}.
 */
export const TYPE_ID_SITES_SPACER = 'b2a9542d-b432-48b3-8322-2464765f323b';
/**
 * Name of the content type for {@link SitesSpacerType}.
 */
export const TYPE_NAME_SITES_SPACER = 'Sites Spacer';
/**
 * Key name of the `background` property of {@link SitesSpacerType}
 */
export const KEY_SITES_SPACER_BACKGROUND = 'background';
/**
 * Key name of the `height` property of {@link SitesSpacerType}
 */
export const KEY_SITES_SPACER_HEIGHT = 'height';
/**
 * Key name of the `commonSettings` property of {@link SitesSpacerType}
 */
export const KEY_SITES_SPACER_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesSpacerType}
 */
export const KEY_SITES_SPACER_KEY = 'key';

/**
 * Delivery version of the Sites Spacer content type.
 *
 * See {@link TYPE_ID_SITES_SPACER} and {@link TYPE_NAME_SITES_SPACER}
 * @remarks
 * This block represents a spacer allowing to add extra empty space between blocks.
 */
export interface SitesSpacerType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the background for this spacer.
   * @remarks
   * See {@link KEY_SITES_SPACER_BACKGROUND}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background for this spacer.",
   *   "key": "background",
   *   "label": "Background",
   *   "typeRef": {
   *     "name": "Sites Background",
   *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SPACER_BACKGROUND]?: SitesBackgroundType;

  /**
   * This element controls the height of this spacer in pixels.
   * @remarks
   * See {@link KEY_SITES_SPACER_HEIGHT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the height of this spacer in pixels.",
   *   "key": "height",
   *   "label": "Spacer height",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_SPACER_HEIGHT]?: number;

  /**
   * This element controls the common settings for this block.
   * @remarks
   * See {@link KEY_SITES_SPACER_COMMON_SETTINGS}
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
  [KEY_SITES_SPACER_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_SPACER_KEY}
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
  [KEY_SITES_SPACER_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesSpacerType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesSpacerType} else false
 */
export function isSitesSpacerType(aValue: any): aValue is SitesSpacerType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_SPACER_BACKGROUND], BjQ4vkiHp)
    && VnbVJaXFB(aValue[KEY_SITES_SPACER_HEIGHT], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_SPACER_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_SPACER_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_SPACER_BACKGROUND} property from {@link SitesSpacerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSpacerBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesSpacerType,
  SitesBackgroundType> = partialLeft(pluckProperty, KEY_SITES_SPACER_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_SPACER_BACKGROUND} property from {@link SitesSpacerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSpacerBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) =>
  OperatorFunction<SitesSpacerType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_SITES_SPACER_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_SPACER_HEIGHT} property from {@link SitesSpacerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSpacerHeight: (aDefault?: number) => UnaryFunction<SitesSpacerType,
  number> = partialLeft(pluckProperty, KEY_SITES_SPACER_HEIGHT);

/**
 * Selects the {@link KEY_SITES_SPACER_HEIGHT} property from {@link SitesSpacerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSpacerHeight: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesSpacerType, number> = partialLeft(rxSelectProperty, KEY_SITES_SPACER_HEIGHT);

/**
 * Selects the {@link KEY_SITES_SPACER_COMMON_SETTINGS} property from {@link SitesSpacerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSpacerCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesSpacerType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_SPACER_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_SPACER_COMMON_SETTINGS} property from {@link SitesSpacerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSpacerCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesSpacerType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_SPACER_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_SPACER_KEY} property from {@link SitesSpacerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSpacerKey: (aDefault?: string) => UnaryFunction<SitesSpacerType,
  string> = partialLeft(pluckProperty, KEY_SITES_SPACER_KEY);

/**
 * Selects the {@link KEY_SITES_SPACER_KEY} property from {@link SitesSpacerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSpacerKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSpacerType, string> = partialLeft(rxSelectProperty, KEY_SITES_SPACER_KEY);
