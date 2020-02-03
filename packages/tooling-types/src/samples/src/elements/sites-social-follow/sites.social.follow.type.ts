/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as DkbvU7gQe } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { SitesSocialLinkType, isSitesSocialLinkType as J_uFFmC5B } from './../sites-social-link/sites.social.link.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isOptionalArrayOf as BTnRKzOFs, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesSocialFollowType}.
 */
export const TYPE_ID_SITES_SOCIAL_FOLLOW = '669768ce-44c7-4de3-83c1-a72d871e8df2';
/**
 * Name of the content type for {@link SitesSocialFollowType}.
 */
export const TYPE_NAME_SITES_SOCIAL_FOLLOW = 'Sites Social Follow';
/**
 * Key name of the `iconSet` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_ICON_SET = 'iconSet';
/**
 * Key name of the `socialLinks` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS = 'socialLinks';
/**
 * Key name of the `size` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_SIZE = 'size';
/**
 * Key name of the `backgroundColor` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR = 'backgroundColor';
/**
 * Key name of the `alignment` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT = 'alignment';
/**
 * Key name of the `spacing` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_SPACING = 'spacing';
/**
 * Key name of the `padding` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_PADDING = 'padding';
/**
 * Key name of the `commonSettings` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesSocialFollowType}
 */
export const KEY_SITES_SOCIAL_FOLLOW_KEY = 'key';

/**
 * Delivery version of the Sites Social Follow content type.
 *
 * See {@link TYPE_ID_SITES_SOCIAL_FOLLOW} and {@link TYPE_NAME_SITES_SOCIAL_FOLLOW}
 * @remarks
 * This block represents a clickable "follow" link to be rendered on the page
 */
export interface SitesSocialFollowType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_ICON_SET}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "key": "iconSet",
   *   "label": "Icon Set"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_ICON_SET]?: string;

  /**
   * This element controls the link icon and click target for this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "group",
   *   "helpText": "This element controls the link icon and click target for this block.",
   *   "key": "socialLinks",
   *   "label": "Social Links",
   *   "required": false,
   *   "typeRef": {
   *     "name": "Sites Social Link",
   *     "id": "98f24456-bf11-4248-bca9-07e273b8dbc4"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS]?: SitesSocialLinkType[];

  /**
   * This element controls the size of this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_SIZE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the size of this block.",
   *   "key": "size",
   *   "label": "Size"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_SIZE]?: number;

  /**
   * This element controls the background for this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background for this block.",
   *   "key": "backgroundColor",
   *   "label": "Background Color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR]?: SitesColorType;

  /**
   * This element controls the alignment definition for this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the alignment definition for this block.",
   *   "key": "alignment",
   *   "label": "Alignment",
   *   "typeRef": {
   *     "name": "Sites Alignment",
   *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT]?: SitesAlignmentType;

  /**
   * This element controls the spacing to be added between clickable icons.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_SPACING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the spacing to be added between clickable icons.",
   *   "key": "spacing",
   *   "label": "Spacing between icons​"
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_SPACING]?: number;

  /**
   * This element controls the padding values for this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this block.",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SOCIAL_FOLLOW_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the common settings for this block.
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS}
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
  [KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_SOCIAL_FOLLOW_KEY}
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
  [KEY_SITES_SOCIAL_FOLLOW_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesSocialFollowType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesSocialFollowType} else false
 */
export function isSitesSocialFollowType(aValue: any): aValue is SitesSocialFollowType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_ICON_SET], xsUSy24Ob)
    && BTnRKzOFs(aValue[KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS], J_uFFmC5B)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_SIZE], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT], DkbvU7gQe)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_SPACING], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_SOCIAL_FOLLOW_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_ICON_SET} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowIconSet: (aDefault?: string) => UnaryFunction<SitesSocialFollowType,
  string> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_ICON_SET);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_ICON_SET} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowIconSet: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSocialFollowType, string> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_ICON_SET);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowSocialLinks: (aDefault?: SitesSocialLinkType[]) => UnaryFunction<SitesSocialFollowType,
  SitesSocialLinkType[]> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowSocialLinks: (aDefault?: SitesSocialLinkType[], aCmp?: EqualsPredicate<SitesSocialLinkType[]>) =>
  OperatorFunction<SitesSocialFollowType, SitesSocialLinkType[]> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_SOCIAL_LINKS);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_SIZE} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowSize: (aDefault?: number) => UnaryFunction<SitesSocialFollowType,
  number> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_SIZE);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_SIZE} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesSocialFollowType, number> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_SIZE);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesSocialFollowType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesSocialFollowType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesSocialFollowType,
  SitesAlignmentType> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) =>
  OperatorFunction<SitesSocialFollowType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_SPACING} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowSpacing: (aDefault?: number) => UnaryFunction<SitesSocialFollowType,
  number> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_SPACING);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_SPACING} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowSpacing: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesSocialFollowType, number> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_SPACING);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_PADDING} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesSocialFollowType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_PADDING);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_PADDING} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesSocialFollowType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_PADDING);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesSocialFollowType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesSocialFollowType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_KEY} property from {@link SitesSocialFollowType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSocialFollowKey: (aDefault?: string) => UnaryFunction<SitesSocialFollowType,
  string> = partialLeft(pluckProperty, KEY_SITES_SOCIAL_FOLLOW_KEY);

/**
 * Selects the {@link KEY_SITES_SOCIAL_FOLLOW_KEY} property from {@link SitesSocialFollowType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSocialFollowKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSocialFollowType, string> = partialLeft(rxSelectProperty, KEY_SITES_SOCIAL_FOLLOW_KEY);
