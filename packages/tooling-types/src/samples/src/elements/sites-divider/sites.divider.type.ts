/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as DkbvU7gQe } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesDividerType}.
 */
export const TYPE_ID_SITES_DIVIDER = 'd550249a-83b2-4e46-96d1-519732fa5787';
/**
 * Name of the content type for {@link SitesDividerType}.
 */
export const TYPE_NAME_SITES_DIVIDER = 'Sites Divider';
/**
 * Key name of the `lineType` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_LINE_TYPE = 'lineType';
/**
 * Key name of the `lineColor` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_LINE_COLOR = 'lineColor';
/**
 * Key name of the `opacity` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_OPACITY = 'opacity';
/**
 * Key name of the `alignment` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_ALIGNMENT = 'alignment';
/**
 * Key name of the `margin` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_MARGIN = 'margin';
/**
 * Key name of the `lineWeight` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_LINE_WEIGHT = 'lineWeight';
/**
 * Key name of the `width` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_WIDTH = 'width';
/**
 * Key name of the `commonSettings` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesDividerType}
 */
export const KEY_SITES_DIVIDER_KEY = 'key';

/**
 * Delivery version of the Sites Divider content type.
 *
 * See {@link TYPE_ID_SITES_DIVIDER} and {@link TYPE_NAME_SITES_DIVIDER}
 * @remarks
 * This block represents a devider between two blocks
 */
export interface SitesDividerType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the line type
   * @remarks
   * See {@link KEY_SITES_DIVIDER_LINE_TYPE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the line type",
   *   "key": "lineType",
   *   "label": "Line type",
   *   "options": [
   *     {
   *       "label": "Solid",
   *       "selection": "solid"
   *     },
   *     {
   *       "label": "Dotted",
   *       "selection": "dotted"
   *     },
   *     {
   *       "label": "Dashed",
   *       "selection": "dashed"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_LINE_TYPE]?: string;

  /**
   * This element controls the line color
   * @remarks
   * See {@link KEY_SITES_DIVIDER_LINE_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the line color",
   *   "key": "lineColor",
   *   "label": "Line color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_LINE_COLOR]?: SitesColorType;

  /**
   * This element controls the line opacity
   * @remarks
   * See {@link KEY_SITES_DIVIDER_OPACITY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the line opacity",
   *   "key": "opacity",
   *   "label": "Opacity"
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_OPACITY]?: number;

  /**
   * This element controls the alignment item to be applied to this block
   * @remarks
   * See {@link KEY_SITES_DIVIDER_ALIGNMENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the alignment item to be applied to this block",
   *   "key": "alignment",
   *   "label": "Alignment",
   *   "typeRef": {
   *     "name": "Sites Alignment",
   *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_ALIGNMENT]?: SitesAlignmentType;

  /**
   * This element controls margin values for this block
   * @remarks
   * See {@link KEY_SITES_DIVIDER_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls margin values for this block",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the line weight for this devider
   * @remarks
   * See {@link KEY_SITES_DIVIDER_LINE_WEIGHT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the line weight for this devider",
   *   "key": "lineWeight",
   *   "label": "Line weight",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_LINE_WEIGHT]?: number;

  /**
   * This element controls the width of the devider
   * @remarks
   * See {@link KEY_SITES_DIVIDER_WIDTH}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the width of the devider",
   *   "key": "width",
   *   "label": "Width"
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_WIDTH]?: number;

  /**
   * This element contols the common settings for this block
   * @remarks
   * See {@link KEY_SITES_DIVIDER_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element contols the common settings for this block",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_DIVIDER_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_DIVIDER_KEY}
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
  [KEY_SITES_DIVIDER_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesDividerType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesDividerType} else false
 */
export function isSitesDividerType(aValue: any): aValue is SitesDividerType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_LINE_TYPE], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_LINE_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_OPACITY], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_ALIGNMENT], DkbvU7gQe)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_LINE_WEIGHT], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_WIDTH], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_DIVIDER_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_DIVIDER_LINE_TYPE} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerLineType: (aDefault?: string) => UnaryFunction<SitesDividerType,
  string> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_LINE_TYPE);

/**
 * Selects the {@link KEY_SITES_DIVIDER_LINE_TYPE} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerLineType: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesDividerType, string> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_LINE_TYPE);

/**
 * Selects the {@link KEY_SITES_DIVIDER_LINE_COLOR} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerLineColor: (aDefault?: SitesColorType) => UnaryFunction<SitesDividerType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_LINE_COLOR);

/**
 * Selects the {@link KEY_SITES_DIVIDER_LINE_COLOR} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerLineColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesDividerType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_LINE_COLOR);

/**
 * Selects the {@link KEY_SITES_DIVIDER_OPACITY} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerOpacity: (aDefault?: number) => UnaryFunction<SitesDividerType,
  number> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_OPACITY);

/**
 * Selects the {@link KEY_SITES_DIVIDER_OPACITY} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerOpacity: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesDividerType, number> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_OPACITY);

/**
 * Selects the {@link KEY_SITES_DIVIDER_ALIGNMENT} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesDividerType,
  SitesAlignmentType> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_DIVIDER_ALIGNMENT} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) =>
  OperatorFunction<SitesDividerType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_DIVIDER_MARGIN} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesDividerType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_MARGIN);

/**
 * Selects the {@link KEY_SITES_DIVIDER_MARGIN} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesDividerType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_MARGIN);

/**
 * Selects the {@link KEY_SITES_DIVIDER_LINE_WEIGHT} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerLineWeight: (aDefault?: number) => UnaryFunction<SitesDividerType,
  number> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_LINE_WEIGHT);

/**
 * Selects the {@link KEY_SITES_DIVIDER_LINE_WEIGHT} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerLineWeight: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesDividerType, number> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_LINE_WEIGHT);

/**
 * Selects the {@link KEY_SITES_DIVIDER_WIDTH} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerWidth: (aDefault?: number) => UnaryFunction<SitesDividerType,
  number> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_WIDTH);

/**
 * Selects the {@link KEY_SITES_DIVIDER_WIDTH} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerWidth: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesDividerType, number> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_WIDTH);

/**
 * Selects the {@link KEY_SITES_DIVIDER_COMMON_SETTINGS} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesDividerType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_DIVIDER_COMMON_SETTINGS} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesDividerType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_DIVIDER_KEY} property from {@link SitesDividerType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesDividerKey: (aDefault?: string) => UnaryFunction<SitesDividerType,
  string> = partialLeft(pluckProperty, KEY_SITES_DIVIDER_KEY);

/**
 * Selects the {@link KEY_SITES_DIVIDER_KEY} property from {@link SitesDividerType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesDividerKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesDividerType, string> = partialLeft(rxSelectProperty, KEY_SITES_DIVIDER_KEY);
