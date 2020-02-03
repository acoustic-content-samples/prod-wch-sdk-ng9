/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as BuYcuEBrz, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesCommonSettingsType}.
 */
export const TYPE_ID_SITES_COMMON_SETTINGS = 'dba345e3-10a0-44ed-b0aa-6cffe74e1343';
/**
 * Name of the content type for {@link SitesCommonSettingsType}.
 */
export const TYPE_NAME_SITES_COMMON_SETTINGS = 'Sites Common Settings';
/**
 * Key name of the `applyToAll` property of {@link SitesCommonSettingsType}
 */
export const KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL = 'applyToAll';
/**
 * Key name of the `hideOnMobile` property of {@link SitesCommonSettingsType}
 */
export const KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE = 'hideOnMobile';
/**
 * Key name of the `key` property of {@link SitesCommonSettingsType}
 */
export const KEY_SITES_COMMON_SETTINGS_KEY = 'key';

/**
 * Delivery version of the Sites Common Settings content type.
 *
 * See {@link TYPE_ID_SITES_COMMON_SETTINGS} and {@link TYPE_NAME_SITES_COMMON_SETTINGS}
 * @remarks
 * This element defines a set of common settings that can be appied to all blocks
 */
export interface SitesCommonSettingsType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * ?
   * @remarks
   * See {@link KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "toggle",
   *   "helpText": "?",
   *   "key": "applyToAll",
   *   "label": "Apply to all"
   * }
   * ```
   */
  [KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL]?: boolean;

  /**
   * This element controls if the should not be rendred on mobile devices
   * @remarks
   * See {@link KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "toggle",
   *   "helpText": "This element controls if the should not be rendred on mobile devices",
   *   "key": "hideOnMobile",
   *   "label": "Hide on mobile",
   *   "locked": false
   * }
   * ```
   */
  [KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE]?: boolean;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_COMMON_SETTINGS_KEY}
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
  [KEY_SITES_COMMON_SETTINGS_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesCommonSettingsType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesCommonSettingsType} else false
 */
export function isSitesCommonSettingsType(aValue: any): aValue is SitesCommonSettingsType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL], BuYcuEBrz)
    && VnbVJaXFB(aValue[KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE], BuYcuEBrz)
    && VnbVJaXFB(aValue[KEY_SITES_COMMON_SETTINGS_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL} property from {@link SitesCommonSettingsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCommonSettingsApplyToAll: (aDefault?: boolean) => UnaryFunction<SitesCommonSettingsType,
  boolean> = partialLeft(pluckProperty, KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL);

/**
 * Selects the {@link KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL} property from {@link SitesCommonSettingsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCommonSettingsApplyToAll: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) =>
  OperatorFunction<SitesCommonSettingsType, boolean> = partialLeft(rxSelectProperty, KEY_SITES_COMMON_SETTINGS_APPLY_TO_ALL);

/**
 * Selects the {@link KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE} property from {@link SitesCommonSettingsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCommonSettingsHideOnMobile: (aDefault?: boolean) => UnaryFunction<SitesCommonSettingsType,
  boolean> = partialLeft(pluckProperty, KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE);

/**
 * Selects the {@link KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE} property from {@link SitesCommonSettingsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCommonSettingsHideOnMobile: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) =>
  OperatorFunction<SitesCommonSettingsType, boolean> = partialLeft(rxSelectProperty, KEY_SITES_COMMON_SETTINGS_HIDE_ON_MOBILE);

/**
 * Selects the {@link KEY_SITES_COMMON_SETTINGS_KEY} property from {@link SitesCommonSettingsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCommonSettingsKey: (aDefault?: string) => UnaryFunction<SitesCommonSettingsType,
  string> = partialLeft(pluckProperty, KEY_SITES_COMMON_SETTINGS_KEY);

/**
 * Selects the {@link KEY_SITES_COMMON_SETTINGS_KEY} property from {@link SitesCommonSettingsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCommonSettingsKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesCommonSettingsType, string> = partialLeft(rxSelectProperty, KEY_SITES_COMMON_SETTINGS_KEY);
