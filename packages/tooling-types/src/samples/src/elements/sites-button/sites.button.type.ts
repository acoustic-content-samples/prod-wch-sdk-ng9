/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentType, isSitesAlignmentType as DkbvU7gQe } from './../sites-alignment/sites.alignment.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { SitesCommonSettingsType, isSitesCommonSettingsType as t2BKhlHso } from './../sites-common-settings/sites.common.settings.type';
import { SitesLineHeightType, isSitesLineHeightType as TsvR90Xrk } from './../sites-line-height/sites.line.height.type';
import { SitesStylingType, isSitesStylingType as tzNl2l88o } from './../sites-styling/sites.styling.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as jn2SJFBIr, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesButtonType}.
 */
export const TYPE_ID_SITES_BUTTON = 'dee92057-69e3-489b-b13b-15f9b28770a1';
/**
 * Name of the content type for {@link SitesButtonType}.
 */
export const TYPE_NAME_SITES_BUTTON = 'Sites Button';
/**
 * Key name of the `label` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_LABEL = 'label';
/**
 * Key name of the `backgroundColor` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_BACKGROUND_COLOR = 'backgroundColor';
/**
 * Key name of the `style` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_STYLE = 'style';
/**
 * Key name of the `link` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_LINK = 'link';
/**
 * Key name of the `alignment` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_ALIGNMENT = 'alignment';
/**
 * Key name of the `lineHeight` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_LINE_HEIGHT = 'lineHeight';
/**
 * Key name of the `cornerRadius` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_CORNER_RADIUS = 'cornerRadius';
/**
 * Key name of the `padding` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_PADDING = 'padding';
/**
 * Key name of the `commonSettings` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_COMMON_SETTINGS = 'commonSettings';
/**
 * Key name of the `key` property of {@link SitesButtonType}
 */
export const KEY_SITES_BUTTON_KEY = 'key';

/**
 * Delivery version of the Sites Button content type.
 *
 * See {@link TYPE_ID_SITES_BUTTON} and {@link TYPE_NAME_SITES_BUTTON}
 * @remarks
 * This block represents a clickable button.
 */
export interface SitesButtonType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The button label
   * @remarks
   * See {@link KEY_SITES_BUTTON_LABEL}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The button label",
   *   "key": "label",
   *   "label": "Button label",
   *   "placeholder": {
   *     "show": true,
   *     "text": "Button text"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_LABEL]?: string;

  /**
   * This element controls the background color for the button
   * @remarks
   * See {@link KEY_SITES_BUTTON_BACKGROUND_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background color for the button",
   *   "key": "backgroundColor",
   *   "label": "Background color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_BACKGROUND_COLOR]?: SitesColorType;

  /**
   * A element controls the styling for this button
   * @remarks
   * See {@link KEY_SITES_BUTTON_STYLE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "A element controls the styling for this button",
   *   "key": "style",
   *   "label": "Style",
   *   "typeRef": {
   *     "name": "Sites Styling",
   *     "id": "cfa7081a-921d-4f50-a543-027b983b01b5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_STYLE]?: SitesStylingType;

  /**
   * The link providing the "href" value for this button.
   * @remarks
   * See {@link KEY_SITES_BUTTON_LINK}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "link",
   *   "helpText": "The link providing the \"href\" value for this button.",
   *   "key": "link",
   *   "label": "Link"
   * }
   * ```
   */
  [KEY_SITES_BUTTON_LINK]?: Link;

  /**
   * This element controls the alignment to be applied to this button
   * @remarks
   * See {@link KEY_SITES_BUTTON_ALIGNMENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the alignment to be applied to this button",
   *   "key": "alignment",
   *   "label": "Alignment",
   *   "typeRef": {
   *     "name": "Sites Alignment",
   *     "id": "d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_ALIGNMENT]?: SitesAlignmentType;

  /**
   * This element controls the line hight for this button
   * @remarks
   * See {@link KEY_SITES_BUTTON_LINE_HEIGHT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the line hight for this button",
   *   "key": "lineHeight",
   *   "label": "Line height",
   *   "typeRef": {
   *     "name": "Sites Line Height",
   *     "id": "e5e97340-b03b-42ea-9d03-f8bc214f42b0"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_LINE_HEIGHT]?: SitesLineHeightType;

  /**
   * This element controls the corner radius for this button
   * @remarks
   * See {@link KEY_SITES_BUTTON_CORNER_RADIUS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the corner radius for this button",
   *   "key": "cornerRadius",
   *   "label": "Corner radius",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_BUTTON_CORNER_RADIUS]?: number;

  /**
   * This element controls the padding values for this button
   * @remarks
   * See {@link KEY_SITES_BUTTON_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this button",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the common settings for this button
   * @remarks
   * See {@link KEY_SITES_BUTTON_COMMON_SETTINGS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the common settings for this button",
   *   "key": "commonSettings",
   *   "label": "Common Settings",
   *   "typeRef": {
   *     "name": "Sites Common Settings",
   *     "id": "dba345e3-10a0-44ed-b0aa-6cffe74e1343"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BUTTON_COMMON_SETTINGS]?: SitesCommonSettingsType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_BUTTON_KEY}
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
  [KEY_SITES_BUTTON_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesButtonType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesButtonType} else false
 */
export function isSitesButtonType(aValue: any): aValue is SitesButtonType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_LABEL], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_BACKGROUND_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_STYLE], tzNl2l88o)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_LINK], jn2SJFBIr)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_ALIGNMENT], DkbvU7gQe)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_LINE_HEIGHT], TsvR90Xrk)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_CORNER_RADIUS], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_COMMON_SETTINGS], t2BKhlHso)
    && VnbVJaXFB(aValue[KEY_SITES_BUTTON_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_BUTTON_LABEL} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonLabel: (aDefault?: string) => UnaryFunction<SitesButtonType,
  string> = partialLeft(pluckProperty, KEY_SITES_BUTTON_LABEL);

/**
 * Selects the {@link KEY_SITES_BUTTON_LABEL} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonLabel: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesButtonType, string> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_LABEL);

/**
 * Selects the {@link KEY_SITES_BUTTON_BACKGROUND_COLOR} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesButtonType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_BUTTON_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_BUTTON_BACKGROUND_COLOR} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesButtonType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_BUTTON_STYLE} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonStyle: (aDefault?: SitesStylingType) => UnaryFunction<SitesButtonType,
  SitesStylingType> = partialLeft(pluckProperty, KEY_SITES_BUTTON_STYLE);

/**
 * Selects the {@link KEY_SITES_BUTTON_STYLE} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonStyle: (aDefault?: SitesStylingType, aCmp?: EqualsPredicate<SitesStylingType>) =>
  OperatorFunction<SitesButtonType, SitesStylingType> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_STYLE);

/**
 * Selects the {@link KEY_SITES_BUTTON_LINK} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonLink: (aDefault?: Link) => UnaryFunction<SitesButtonType,
  Link> = partialLeft(pluckProperty, KEY_SITES_BUTTON_LINK);

/**
 * Selects the {@link KEY_SITES_BUTTON_LINK} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonLink: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) =>
  OperatorFunction<SitesButtonType, Link> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_LINK);

/**
 * Selects the {@link KEY_SITES_BUTTON_ALIGNMENT} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonAlignment: (aDefault?: SitesAlignmentType) => UnaryFunction<SitesButtonType,
  SitesAlignmentType> = partialLeft(pluckProperty, KEY_SITES_BUTTON_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_BUTTON_ALIGNMENT} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonAlignment: (aDefault?: SitesAlignmentType, aCmp?: EqualsPredicate<SitesAlignmentType>) =>
  OperatorFunction<SitesButtonType, SitesAlignmentType> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_ALIGNMENT);

/**
 * Selects the {@link KEY_SITES_BUTTON_LINE_HEIGHT} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonLineHeight: (aDefault?: SitesLineHeightType) => UnaryFunction<SitesButtonType,
  SitesLineHeightType> = partialLeft(pluckProperty, KEY_SITES_BUTTON_LINE_HEIGHT);

/**
 * Selects the {@link KEY_SITES_BUTTON_LINE_HEIGHT} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonLineHeight: (aDefault?: SitesLineHeightType, aCmp?: EqualsPredicate<SitesLineHeightType>) =>
  OperatorFunction<SitesButtonType, SitesLineHeightType> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_LINE_HEIGHT);

/**
 * Selects the {@link KEY_SITES_BUTTON_CORNER_RADIUS} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonCornerRadius: (aDefault?: number) => UnaryFunction<SitesButtonType,
  number> = partialLeft(pluckProperty, KEY_SITES_BUTTON_CORNER_RADIUS);

/**
 * Selects the {@link KEY_SITES_BUTTON_CORNER_RADIUS} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonCornerRadius: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesButtonType, number> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_CORNER_RADIUS);

/**
 * Selects the {@link KEY_SITES_BUTTON_PADDING} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesButtonType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_BUTTON_PADDING);

/**
 * Selects the {@link KEY_SITES_BUTTON_PADDING} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesButtonType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_PADDING);

/**
 * Selects the {@link KEY_SITES_BUTTON_COMMON_SETTINGS} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonCommonSettings: (aDefault?: SitesCommonSettingsType) => UnaryFunction<SitesButtonType,
  SitesCommonSettingsType> = partialLeft(pluckProperty, KEY_SITES_BUTTON_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_BUTTON_COMMON_SETTINGS} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonCommonSettings: (aDefault?: SitesCommonSettingsType, aCmp?: EqualsPredicate<SitesCommonSettingsType>) =>
  OperatorFunction<SitesButtonType, SitesCommonSettingsType> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_COMMON_SETTINGS);

/**
 * Selects the {@link KEY_SITES_BUTTON_KEY} property from {@link SitesButtonType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesButtonKey: (aDefault?: string) => UnaryFunction<SitesButtonType,
  string> = partialLeft(pluckProperty, KEY_SITES_BUTTON_KEY);

/**
 * Selects the {@link KEY_SITES_BUTTON_KEY} property from {@link SitesButtonType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesButtonKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesButtonType, string> = partialLeft(rxSelectProperty, KEY_SITES_BUTTON_KEY);
