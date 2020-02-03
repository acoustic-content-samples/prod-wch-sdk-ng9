/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as DkbvU7gQe } from './../sites-alignment/sites.alignment.type';
import { SitesBackgroundType, isSitesBackgroundType as BjQ4vkiHp } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { SitesLineHeightType, isSitesLineHeightType as TsvR90Xrk } from './../sites-line-height/sites.line.height.type';
import { SitesStylingType, isSitesStylingType as tzNl2l88o } from './../sites-styling/sites.styling.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesTextType}.
 */
export const TYPE_ID_SITES_TEXT = '373c81a5-d86b-4740-8f11-62fcbccfca08';
/**
 * Name of the content type for {@link SitesTextType}.
 */
export const TYPE_NAME_SITES_TEXT = 'Sites Text';
/**
 * Key name of the `text` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_TEXT = 'text';
/**
 * Key name of the `textStyle` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_TEXT_STYLE = 'textStyle';
/**
 * Key name of the `linkColor` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_LINK_COLOR = 'linkColor';
/**
 * Key name of the `background` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_BACKGROUND = 'background';
/**
 * Key name of the `alignment` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_ALIGNMENT = 'alignment';
/**
 * Key name of the `lineHeight` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_LINE_HEIGHT = 'lineHeight';
/**
 * Key name of the `padding` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_PADDING = 'padding';
/**
 * Key name of the `margin` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_MARGIN = 'margin';
/**
 * Key name of the `commonSettings` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesTextType}
 */
export const KEY_SITES_TEXT_KEY = 'key';

/**
 * Delivery version of the Sites Text content type.
 *
 * See {@link TYPE_ID_SITES_TEXT} and {@link TYPE_NAME_SITES_TEXT}
 */
export interface SitesTextType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The actual formatted text
   * @remarks
   * See {@link KEY_SITES_TEXT_TEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "formattedtext",
   *   "helpText": "The actual formatted text",
   *   "key": "text",
   *   "label": "text",
   *   "placeholder": {
   *     "show": true,
   *     "text": "Text"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_TEXT]?: string;

  /**
   * This element holds a reference to the text styling to be applied to this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_TEXT_STYLE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds a reference to the text styling to be applied to this text block",
   *   "key": "textStyle",
   *   "label": "Text Style",
   *   "typeRef": {
   *     "name": "Sites Styling",
   *     "id": "cfa7081a-921d-4f50-a543-027b983b01b5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_TEXT_STYLE]?: SitesStylingType;

  /**
   * This element holds a reference to a color defintion to by applied to links in this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_LINK_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds a reference to a color defintion to by applied to links in this text block",
   *   "key": "linkColor",
   *   "label": "Link Color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_LINK_COLOR]?: SitesColorType;

  /**
   * This element holds a reference to the baground defintion for this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_BACKGROUND}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds a reference to the baground defintion for this text block",
   *   "key": "background",
   *   "label": "Background",
   *   "typeRef": {
   *     "name": "Sites Background",
   *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_BACKGROUND]?: SitesBackgroundType;

  /**
   * This element holds a reference to the alignment defintion for this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_ALIGNMENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds a reference to the alignment defintion for this text block",
   *   "key": "alignment",
   *   "label": "Alignment",
   *   "typeRef": {
   *     "name": "Sites Alignment",
   *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_ALIGNMENT]?: SitesAlignmentType;

  /**
   * This element holds a reference to the line hight defintion for this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_LINE_HEIGHT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element holds a reference to the line hight defintion for this text block",
   *   "key": "lineHeight",
   *   "label": "Line Height",
   *   "typeRef": {
   *     "name": "Sites Line Height",
   *     "id": "e5e97340-b03b-42ea-9d03-f8bc214f42b0"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_LINE_HEIGHT]?: SitesLineHeightType;

  /**
   * A reference to a boundary item providing the padding values for this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "A reference to a boundary item providing the padding values for this text block",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_PADDING]?: SitesBoundaryType;

  /**
   * A reference to a boundary item providing the margin values for this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "A reference to a boundary item providing the margin values for this text block",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_MARGIN]?: SitesBoundaryType;

  /**
   * A reference to a common settings definition to be applied to this text block
   * @remarks
   * See {@link KEY_SITES_TEXT_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "A reference to a common settings definition to be applied to this text block",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_TEXT_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_TEXT_KEY}
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
  [KEY_SITES_TEXT_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesTextType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesTextType} else false
 */
export function isSitesTextType(aValue: any): aValue is SitesTextType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_TEXT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_TEXT_STYLE], tzNl2l88o)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_LINK_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_BACKGROUND], BjQ4vkiHp)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_ALIGNMENT], DkbvU7gQe)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_LINE_HEIGHT], TsvR90Xrk)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_TEXT_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_TEXT_TEXT} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextText: (aDefault?: string) => UnaryFunction<SitesTextType,
  string> = partialLeft(pluckProperty, KEY_SITES_TEXT_TEXT);

/**
 * Selects the {@link KEY_SITES_TEXT_TEXT} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextText: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesTextType, string> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_TEXT);

/**
 * Selects the {@link KEY_SITES_TEXT_TEXT_STYLE} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextTextStyle: (aDefault?: SitesStylingType) => UnaryFunction<SitesTextType,
  SitesStylingType> = partialLeft(pluckProperty, KEY_SITES_TEXT_TEXT_STYLE);

/**
 * Selects the {@link KEY_SITES_TEXT_TEXT_STYLE} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextTextStyle: (aDefault?: SitesStylingType, aCmp?: EqualsPredicate<SitesStylingType>) =>
  OperatorFunction<SitesTextType, SitesStylingType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_TEXT_STYLE);

/**
 * Selects the {@link KEY_SITES_TEXT_LINK_COLOR} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextLinkColor: (aDefault?: SitesColorType) => UnaryFunction<SitesTextType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_TEXT_LINK_COLOR);

/**
 * Selects the {@link KEY_SITES_TEXT_LINK_COLOR} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextLinkColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesTextType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_LINK_COLOR);

/**
 * Selects the {@link KEY_SITES_TEXT_BACKGROUND} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesTextType,
  SitesBackgroundType> = partialLeft(pluckProperty, KEY_SITES_TEXT_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_TEXT_BACKGROUND} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) =>
  OperatorFunction<SitesTextType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_TEXT_ALIGNMENT} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesTextType,
  SitesAlignmentType> = partialLeft(pluckProperty, KEY_SITES_TEXT_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_TEXT_ALIGNMENT} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) =>
  OperatorFunction<SitesTextType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_TEXT_LINE_HEIGHT} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextLineHeight: (aDefault?: SitesLineHeightType) => UnaryFunction<SitesTextType,
  SitesLineHeightType> = partialLeft(pluckProperty, KEY_SITES_TEXT_LINE_HEIGHT);

/**
 * Selects the {@link KEY_SITES_TEXT_LINE_HEIGHT} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextLineHeight: (aDefault?: SitesLineHeightType, aCmp?: EqualsPredicate<SitesLineHeightType>) =>
  OperatorFunction<SitesTextType, SitesLineHeightType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_LINE_HEIGHT);

/**
 * Selects the {@link KEY_SITES_TEXT_PADDING} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesTextType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_TEXT_PADDING);

/**
 * Selects the {@link KEY_SITES_TEXT_PADDING} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesTextType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_PADDING);

/**
 * Selects the {@link KEY_SITES_TEXT_MARGIN} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesTextType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_TEXT_MARGIN);

/**
 * Selects the {@link KEY_SITES_TEXT_MARGIN} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesTextType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_MARGIN);

/**
 * Selects the {@link KEY_SITES_TEXT_COMMON_SETTINGS} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesTextType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_TEXT_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_TEXT_COMMON_SETTINGS} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesTextType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_TEXT_KEY} property from {@link SitesTextType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesTextKey: (aDefault?: string) => UnaryFunction<SitesTextType,
  string> = partialLeft(pluckProperty, KEY_SITES_TEXT_KEY);

/**
 * Selects the {@link KEY_SITES_TEXT_KEY} property from {@link SitesTextType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesTextKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesTextType, string> = partialLeft(rxSelectProperty, KEY_SITES_TEXT_KEY);
