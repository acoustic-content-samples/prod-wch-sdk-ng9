/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as DkbvU7gQe } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { SitesStylingType, isSitesStylingType as tzNl2l88o } from './../sites-styling/sites.styling.type';
import { SitesVerticalRuleType, isSitesVerticalRuleType as R_b6ttS1I } from './../sites-vertical-rule/sites.vertical.rule.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isArrayOf as nm7rj$dWy, isLink as jn2SJFBIr, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesLinkBarType}.
 */
export const TYPE_ID_SITES_LINK_BAR = 'd0f831c3-1b0a-41ba-8a6b-10f2eca3789a';
/**
 * Name of the content type for {@link SitesLinkBarType}.
 */
export const TYPE_NAME_SITES_LINK_BAR = 'Sites Link Bar';
/**
 * Key name of the `links` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_LINKS = 'links';
/**
 * Key name of the `textStyle` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_TEXT_STYLE = 'textStyle';
/**
 * Key name of the `backgroundColor` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_BACKGROUND_COLOR = 'backgroundColor';
/**
 * Key name of the `alignment` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_ALIGNMENT = 'alignment';
/**
 * Key name of the `spacingBetweenLinks` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS = 'spacingBetweenLinks';
/**
 * Key name of the `padding` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_PADDING = 'padding';
/**
 * Key name of the `verticalRule` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_VERTICAL_RULE = 'verticalRule';
/**
 * Key name of the `commonSettings` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesLinkBarType}
 */
export const KEY_SITES_LINK_BAR_KEY = 'key';

/**
 * Delivery version of the Sites Link Bar content type.
 *
 * See {@link TYPE_ID_SITES_LINK_BAR} and {@link TYPE_NAME_SITES_LINK_BAR}
 * @remarks
 * This block represents a list of links to be rendered on a page
 */
export interface SitesLinkBarType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the actual list of links for this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_LINKS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "link",
   *   "fieldLabel": "Links",
   *   "helpText": "This element controls the actual list of links for this link bar.",
   *   "key": "links",
   *   "label": "Links",
   *   "maximumValues": 7,
   *   "minimumValues": 2,
   *   "required": true
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_LINKS]: Link[];

  /**
   * This element controls the text styling for this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_TEXT_STYLE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the text styling for this link bar.",
   *   "key": "textStyle",
   *   "label": "Text Style",
   *   "typeRef": {
   *     "name": "Sites Styling",
   *     "id": "cfa7081a-921d-4f50-a543-027b983b01b5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_TEXT_STYLE]?: SitesStylingType;

  /**
   * This element controls the background color for this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_BACKGROUND_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background color for this link bar.",
   *   "key": "backgroundColor",
   *   "label": "Background Color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_BACKGROUND_COLOR]?: SitesColorType;

  /**
   * This element controls the alignment defintion for this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_ALIGNMENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the alignment defintion for this link bar.",
   *   "key": "alignment",
   *   "label": "Alignment",
   *   "typeRef": {
   *     "name": "Sites Alignment",
   *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_ALIGNMENT]?: SitesAlignmentType;

  /**
   * This element controls the spacing between links.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the spacing between links.",
   *   "key": "spacingBetweenLinks",
   *   "label": "Spacing between links"
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS]?: number;

  /**
   * This element controls the padding values for this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this link bar.",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the vertical rules to be used by this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_VERTICAL_RULE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the vertical rules to be used by this link bar.",
   *   "key": "verticalRule",
   *   "label": "Vertical Rule",
   *   "typeRef": {
   *     "name": "Sites Vertical Rule",
   *     "id": "8e460c39-9cf6-4a78-9726-ee43ad961a8a"
   *   }
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_VERTICAL_RULE]?: SitesVerticalRuleType;

  /**
   * This element controls the common settings for this link bar.
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the common settings for this link bar.",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_LINK_BAR_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_LINK_BAR_KEY}
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
  [KEY_SITES_LINK_BAR_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesLinkBarType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesLinkBarType} else false
 */
export function isSitesLinkBarType(aValue: any): aValue is SitesLinkBarType {
  return xs$RwNUhH(aValue)
    && nm7rj$dWy(aValue[KEY_SITES_LINK_BAR_LINKS], jn2SJFBIr)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_TEXT_STYLE], tzNl2l88o)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_BACKGROUND_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_ALIGNMENT], DkbvU7gQe)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_VERTICAL_RULE], R_b6ttS1I)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_LINK_BAR_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_LINK_BAR_LINKS} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarLinks: (aDefault?: Link[]) => UnaryFunction<SitesLinkBarType,
  Link[]> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_LINKS);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_LINKS} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarLinks: (aDefault?: Link[], aCmp?: EqualsPredicate<Link[]>) =>
  OperatorFunction<SitesLinkBarType, Link[]> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_LINKS);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_TEXT_STYLE} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarTextStyle: (aDefault?: SitesStylingType) => UnaryFunction<SitesLinkBarType,
  SitesStylingType> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_TEXT_STYLE);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_TEXT_STYLE} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarTextStyle: (aDefault?: SitesStylingType, aCmp?: EqualsPredicate<SitesStylingType>) =>
  OperatorFunction<SitesLinkBarType, SitesStylingType> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_TEXT_STYLE);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_BACKGROUND_COLOR} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesLinkBarType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_BACKGROUND_COLOR} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesLinkBarType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_ALIGNMENT} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesLinkBarType,
  SitesAlignmentType> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_ALIGNMENT} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) =>
  OperatorFunction<SitesLinkBarType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarSpacingBetweenLinks: (aDefault?: number) => UnaryFunction<SitesLinkBarType,
  number> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarSpacingBetweenLinks: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesLinkBarType, number> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_SPACING_BETWEEN_LINKS);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_PADDING} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesLinkBarType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_PADDING);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_PADDING} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesLinkBarType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_PADDING);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_VERTICAL_RULE} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarVerticalRule: (aDefault?: SitesVerticalRuleType) => UnaryFunction<SitesLinkBarType,
  SitesVerticalRuleType> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_VERTICAL_RULE);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_VERTICAL_RULE} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarVerticalRule: (aDefault?: SitesVerticalRuleType, aCmp?: EqualsPredicate<SitesVerticalRuleType>) =>
  OperatorFunction<SitesLinkBarType, SitesVerticalRuleType> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_VERTICAL_RULE);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_COMMON_SETTINGS} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesLinkBarType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_COMMON_SETTINGS} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesLinkBarType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_KEY} property from {@link SitesLinkBarType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesLinkBarKey: (aDefault?: string) => UnaryFunction<SitesLinkBarType,
  string> = partialLeft(pluckProperty, KEY_SITES_LINK_BAR_KEY);

/**
 * Selects the {@link KEY_SITES_LINK_BAR_KEY} property from {@link SitesLinkBarType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesLinkBarKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesLinkBarType, string> = partialLeft(rxSelectProperty, KEY_SITES_LINK_BAR_KEY);
