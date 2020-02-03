/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as BjQ4vkiHp } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesCellType, isSitesCellType as jbE66FVPu } from './../sites-cell/sites.cell.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isArrayOf as nm7rj$dWy, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesSectionType}.
 */
export const TYPE_ID_SITES_SECTION = 'a4516d24-744d-4650-8477-24aa36145e66';
/**
 * Name of the content type for {@link SitesSectionType}.
 */
export const TYPE_NAME_SITES_SECTION = 'Sites Section';
/**
 * Key name of the `cells` property of {@link SitesSectionType}
 */
export const KEY_SITES_SECTION_CELLS = 'cells';
/**
 * Key name of the `padding` property of {@link SitesSectionType}
 */
export const KEY_SITES_SECTION_PADDING = 'padding';
/**
 * Key name of the `margin` property of {@link SitesSectionType}
 */
export const KEY_SITES_SECTION_MARGIN = 'margin';
/**
 * Key name of the `background` property of {@link SitesSectionType}
 */
export const KEY_SITES_SECTION_BACKGROUND = 'background';
/**
 * Key name of the `layout` property of {@link SitesSectionType}
 */
export const KEY_SITES_SECTION_LAYOUT = 'layout';
/**
 * Key name of the `key` property of {@link SitesSectionType}
 */
export const KEY_SITES_SECTION_KEY = 'key';

/**
 * Delivery version of the Sites Section content type.
 *
 * See {@link TYPE_ID_SITES_SECTION} and {@link TYPE_NAME_SITES_SECTION}
 * @remarks
 * This item represents a top level container on a page. It contains a list of second level containers of type "Sites Cell" which in turn contain the actual page blocks
 */
export interface SitesSectionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element holds the list of cells to be rendered in this section
   * @remarks
   * See {@link KEY_SITES_SECTION_CELLS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "group",
   *   "fieldLabel": "Column",
   *   "helpText": "This element holds the list of cells to be rendered in this section",
   *   "key": "cells",
   *   "label": "Cells",
   *   "maximumValues": 3,
   *   "minimumValues": 1,
   *   "required": true,
   *   "typeRef": {
   *     "name": "Sites Cell",
   *     "id": "d1e4dd37-8ac5-43a9-9145-1f194053b27c"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SECTION_CELLS]: SitesCellType[];

  /**
   * This element controls the padding values for this section
   * @remarks
   * See {@link KEY_SITES_SECTION_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this section",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SECTION_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the margin values for this section
   * @remarks
   * See {@link KEY_SITES_SECTION_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this section",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SECTION_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the background color for this section
   * @remarks
   * See {@link KEY_SITES_SECTION_BACKGROUND}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background color for this section",
   *   "key": "background",
   *   "label": "Background",
   *   "typeRef": {
   *     "name": "Sites Background",
   *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
   *   }
   * }
   * ```
   */
  [KEY_SITES_SECTION_BACKGROUND]?: SitesBackgroundType;

  /**
   * This element controls the column layout for this section
   * @remarks
   * See {@link KEY_SITES_SECTION_LAYOUT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the column layout for this section",
   *   "key": "layout",
   *   "label": "Layout",
   *   "options": [
   *     {
   *       "label": "1 Column",
   *       "selection": "1-col"
   *     },
   *     {
   *       "label": "2 equally sized columns",
   *       "selection": "2-col-12-12"
   *     },
   *     {
   *       "label": "2 Columns, left column 1/3, right column 2/3",
   *       "selection": "2-col-13-23"
   *     },
   *     {
   *       "label": "2 Columns, left column 2/3, right column 1/3",
   *       "selection": "2-col-23-13"
   *     },
   *     {
   *       "label": "3 Columns",
   *       "selection": "3-col"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_SECTION_LAYOUT]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_SECTION_KEY}
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
  [KEY_SITES_SECTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesSectionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesSectionType} else false
 */
export function isSitesSectionType(aValue: any): aValue is SitesSectionType {
  return xs$RwNUhH(aValue)
    && nm7rj$dWy(aValue[KEY_SITES_SECTION_CELLS], jbE66FVPu)
    && VnbVJaXFB(aValue[KEY_SITES_SECTION_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_SECTION_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_SECTION_BACKGROUND], BjQ4vkiHp)
    && VnbVJaXFB(aValue[KEY_SITES_SECTION_LAYOUT], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_SECTION_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_SECTION_CELLS} property from {@link SitesSectionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSectionCells: (aDefault?: SitesCellType[]) => UnaryFunction<SitesSectionType,
  SitesCellType[]> = partialLeft(pluckProperty, KEY_SITES_SECTION_CELLS);

/**
 * Selects the {@link KEY_SITES_SECTION_CELLS} property from {@link SitesSectionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSectionCells: (aDefault?: SitesCellType[], aCmp?: EqualsPredicate<SitesCellType[]>) =>
  OperatorFunction<SitesSectionType, SitesCellType[]> = partialLeft(rxSelectProperty, KEY_SITES_SECTION_CELLS);

/**
 * Selects the {@link KEY_SITES_SECTION_PADDING} property from {@link SitesSectionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSectionPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesSectionType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_SECTION_PADDING);

/**
 * Selects the {@link KEY_SITES_SECTION_PADDING} property from {@link SitesSectionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSectionPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesSectionType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_SECTION_PADDING);

/**
 * Selects the {@link KEY_SITES_SECTION_MARGIN} property from {@link SitesSectionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSectionMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesSectionType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_SECTION_MARGIN);

/**
 * Selects the {@link KEY_SITES_SECTION_MARGIN} property from {@link SitesSectionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSectionMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesSectionType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_SECTION_MARGIN);

/**
 * Selects the {@link KEY_SITES_SECTION_BACKGROUND} property from {@link SitesSectionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSectionBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesSectionType,
  SitesBackgroundType> = partialLeft(pluckProperty, KEY_SITES_SECTION_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_SECTION_BACKGROUND} property from {@link SitesSectionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSectionBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) =>
  OperatorFunction<SitesSectionType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_SITES_SECTION_BACKGROUND);

/**
 * Selects the {@link KEY_SITES_SECTION_LAYOUT} property from {@link SitesSectionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSectionLayout: (aDefault?: string) => UnaryFunction<SitesSectionType,
  string> = partialLeft(pluckProperty, KEY_SITES_SECTION_LAYOUT);

/**
 * Selects the {@link KEY_SITES_SECTION_LAYOUT} property from {@link SitesSectionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSectionLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSectionType, string> = partialLeft(rxSelectProperty, KEY_SITES_SECTION_LAYOUT);

/**
 * Selects the {@link KEY_SITES_SECTION_KEY} property from {@link SitesSectionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesSectionKey: (aDefault?: string) => UnaryFunction<SitesSectionType,
  string> = partialLeft(pluckProperty, KEY_SITES_SECTION_KEY);

/**
 * Selects the {@link KEY_SITES_SECTION_KEY} property from {@link SitesSectionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesSectionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesSectionType, string> = partialLeft(rxSelectProperty, KEY_SITES_SECTION_KEY);
