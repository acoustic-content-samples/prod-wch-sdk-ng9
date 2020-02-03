/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesHtmlType}.
 */
export const TYPE_ID_SITES_HTML = '85bdc88c-5b4c-4002-a665-37ba5bf95cb6';
/**
 * Name of the content type for {@link SitesHtmlType}.
 */
export const TYPE_NAME_SITES_HTML = 'Sites HTML';
/**
 * Key name of the `code` property of {@link SitesHtmlType}
 */
export const KEY_SITES_HTML_CODE = 'code';
/**
 * Key name of the `padding` property of {@link SitesHtmlType}
 */
export const KEY_SITES_HTML_PADDING = 'padding';
/**
 * Key name of the `margin` property of {@link SitesHtmlType}
 */
export const KEY_SITES_HTML_MARGIN = 'margin';
/**
 * Key name of the `commonSettings` property of {@link SitesHtmlType}
 */
export const KEY_SITES_HTML_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesHtmlType}
 */
export const KEY_SITES_HTML_KEY = 'key';

/**
 * Delivery version of the Sites HTML content type.
 *
 * See {@link TYPE_ID_SITES_HTML} and {@link TYPE_NAME_SITES_HTML}
 */
export interface SitesHtmlType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * Provide your custom HTML code here. You can also include handlebar references to the current rendering context.
   * @remarks
   * See {@link KEY_SITES_HTML_CODE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "displayHeight": 30,
   *   "displayType": "multiLine",
   *   "elementType": "text",
   *   "helpText": "Provide your custom HTML code here. You can also include handlebar references to the current rendering context.",
   *   "key": "code",
   *   "label": "Code",
   *   "minLength": 1,
   *   "placeholder": {
   *     "show": true,
   *     "text": "Compose your HTML and Handlebar code here."
   *   }
   * }
   * ```
   */
  [KEY_SITES_HTML_CODE]?: string;

  /**
   * This element controls the padding values for this HTML Block
   * @remarks
   * See {@link KEY_SITES_HTML_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this HTML Block",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_HTML_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the margin values for this HTML Block
   * @remarks
   * See {@link KEY_SITES_HTML_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this HTML Block",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_HTML_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the common settings for this HTML block
   * @remarks
   * See {@link KEY_SITES_HTML_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the common settings for this HTML block",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_HTML_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_HTML_KEY}
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
  [KEY_SITES_HTML_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesHtmlType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesHtmlType} else false
 */
export function isSitesHtmlType(aValue: any): aValue is SitesHtmlType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_HTML_CODE], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_HTML_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_HTML_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_HTML_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_HTML_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_HTML_CODE} property from {@link SitesHtmlType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesHtmlCode: (aDefault?: string) => UnaryFunction<SitesHtmlType,
  string> = partialLeft(pluckProperty, KEY_SITES_HTML_CODE);

/**
 * Selects the {@link KEY_SITES_HTML_CODE} property from {@link SitesHtmlType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesHtmlCode: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesHtmlType, string> = partialLeft(rxSelectProperty, KEY_SITES_HTML_CODE);

/**
 * Selects the {@link KEY_SITES_HTML_PADDING} property from {@link SitesHtmlType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesHtmlPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesHtmlType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_HTML_PADDING);

/**
 * Selects the {@link KEY_SITES_HTML_PADDING} property from {@link SitesHtmlType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesHtmlPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesHtmlType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_HTML_PADDING);

/**
 * Selects the {@link KEY_SITES_HTML_MARGIN} property from {@link SitesHtmlType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesHtmlMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesHtmlType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_HTML_MARGIN);

/**
 * Selects the {@link KEY_SITES_HTML_MARGIN} property from {@link SitesHtmlType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesHtmlMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesHtmlType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_HTML_MARGIN);

/**
 * Selects the {@link KEY_SITES_HTML_COMMON_SETTINGS} property from {@link SitesHtmlType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesHtmlCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesHtmlType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_HTML_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_HTML_COMMON_SETTINGS} property from {@link SitesHtmlType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesHtmlCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesHtmlType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_HTML_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_HTML_KEY} property from {@link SitesHtmlType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesHtmlKey: (aDefault?: string) => UnaryFunction<SitesHtmlType,
  string> = partialLeft(pluckProperty, KEY_SITES_HTML_KEY);

/**
 * Selects the {@link KEY_SITES_HTML_KEY} property from {@link SitesHtmlType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesHtmlKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesHtmlType, string> = partialLeft(rxSelectProperty, KEY_SITES_HTML_KEY);
