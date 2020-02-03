/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { PageDescriptorType, isPageDescriptorType as D5a$dCQdr } from './../page-descriptor/page.descriptor.type';
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { SitesSectionType, isSitesSectionType as jI1CpDkch } from './../sites-section/sites.section.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isOptionalArrayOf as BTnRKzOFs, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesRowsType}.
 */
export const TYPE_ID_SITES_ROWS = '9ca02297-a564-40c9-aedc-add9c30f3d7b';
/**
 * Name of the content type for {@link SitesRowsType}.
 */
export const TYPE_NAME_SITES_ROWS = 'Sites Rows';
/**
 * Key name of the `rows` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_ROWS = 'rows';
/**
 * Key name of the `editor` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_EDITOR = 'editor';
/**
 * Key name of the `width` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_WIDTH = 'width';
/**
 * Key name of the `padding` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_PADDING = 'padding';
/**
 * Key name of the `margin` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_MARGIN = 'margin';
/**
 * Key name of the `backgroundColor` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_BACKGROUND_COLOR = 'backgroundColor';
/**
 * Key name of the `descriptor` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_DESCRIPTOR = 'descriptor';
/**
 * Key name of the `key` property of {@link SitesRowsType}
 */
export const KEY_SITES_ROWS_KEY = 'key';

/**
 * Delivery version of the Sites Rows content type.
 *
 * See {@link TYPE_ID_SITES_ROWS} and {@link TYPE_NAME_SITES_ROWS}
 * @remarks
 * This type is used to represent individual pages. Page specific meta data is controlled via the "descriptor" element. Page content can be placed into the container elements of this page.
 */
export interface SitesRowsType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the list of sections to be rendered on this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_ROWS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "group",
   *   "fieldLabel": "Rows",
   *   "helpText": "This element controls the list of sections to be rendered on this page.",
   *   "key": "rows",
   *   "label": "Rows",
   *   "required": false,
   *   "typeRef": {
   *     "name": "Sites Section",
   *     "id": "a4516d24-744d-4650-8477-24aa36145e66"
   *   }
   * }
   * ```
   */
  [KEY_SITES_ROWS_ROWS]?: SitesSectionType[];

  /**
   * This element controls the editor UI that is used to edit this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_EDITOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element controls the editor UI that is used to edit this page.",
   *   "hidden": true,
   *   "key": "editor",
   *   "label": "Editor",
   *   "role": [
   *     "configuration"
   *   ],
   *   "searchKey": "string1"
   * }
   * ```
   */
  [KEY_SITES_ROWS_EDITOR]?: string;

  /**
   * This element controls width in pixels for this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_WIDTH}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls width in pixels for this page.",
   *   "key": "width",
   *   "label": "Width",
   *   "maximum": 900,
   *   "minimum": 480,
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_SITES_ROWS_WIDTH]?: number;

  /**
   * This element controls the padding values for this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this page.",
   *   "key": "padding",
   *   "label": "Padding",
   *   "role": [
   *     "configuration"
   *   ],
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_ROWS_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the margin values for this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this page.",
   *   "key": "margin",
   *   "label": "Margin",
   *   "role": [
   *     "configuration"
   *   ],
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_ROWS_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the background for this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_BACKGROUND_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background for this page.",
   *   "key": "backgroundColor",
   *   "label": "Background Color",
   *   "role": [
   *     "configuration"
   *   ],
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_ROWS_BACKGROUND_COLOR]?: SitesColorType;

  /**
   * This element provides the page meta data for this page and the link to the site hosting this page.
   * @remarks
   * See {@link KEY_SITES_ROWS_DESCRIPTOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element provides the page meta data for this page and the link to the site hosting this page.",
   *   "key": "descriptor",
   *   "label": "descriptor",
   *   "required": true,
   *   "role": [
   *     "configuration"
   *   ],
   *   "typeRef": {
   *     "name": "Page Descriptor",
   *     "id": "74f83bd2-2ef6-43f9-8264-bd538e5aad28"
   *   }
   * }
   * ```
   */
  [KEY_SITES_ROWS_DESCRIPTOR]: PageDescriptorType;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_ROWS_KEY}
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
  [KEY_SITES_ROWS_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesRowsType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesRowsType} else false
 */
export function isSitesRowsType(aValue: any): aValue is SitesRowsType {
  return xs$RwNUhH(aValue)
    && BTnRKzOFs(aValue[KEY_SITES_ROWS_ROWS], jI1CpDkch)
    && VnbVJaXFB(aValue[KEY_SITES_ROWS_EDITOR], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_ROWS_WIDTH], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_ROWS_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_ROWS_MARGIN], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_ROWS_BACKGROUND_COLOR], nuh8LMHro)
    && D5a$dCQdr(aValue[KEY_SITES_ROWS_DESCRIPTOR])
    && VnbVJaXFB(aValue[KEY_SITES_ROWS_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_ROWS_ROWS} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsRows: (aDefault?: SitesSectionType[]) => UnaryFunction<SitesRowsType,
  SitesSectionType[]> = partialLeft(pluckProperty, KEY_SITES_ROWS_ROWS);

/**
 * Selects the {@link KEY_SITES_ROWS_ROWS} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsRows: (aDefault?: SitesSectionType[], aCmp?: EqualsPredicate<SitesSectionType[]>) =>
  OperatorFunction<SitesRowsType, SitesSectionType[]> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_ROWS);

/**
 * Selects the {@link KEY_SITES_ROWS_EDITOR} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsEditor: (aDefault?: string) => UnaryFunction<SitesRowsType,
  string> = partialLeft(pluckProperty, KEY_SITES_ROWS_EDITOR);

/**
 * Selects the {@link KEY_SITES_ROWS_EDITOR} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsEditor: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesRowsType, string> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_EDITOR);

/**
 * Selects the {@link KEY_SITES_ROWS_WIDTH} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsWidth: (aDefault?: number) => UnaryFunction<SitesRowsType,
  number> = partialLeft(pluckProperty, KEY_SITES_ROWS_WIDTH);

/**
 * Selects the {@link KEY_SITES_ROWS_WIDTH} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsWidth: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesRowsType, number> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_WIDTH);

/**
 * Selects the {@link KEY_SITES_ROWS_PADDING} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesRowsType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_ROWS_PADDING);

/**
 * Selects the {@link KEY_SITES_ROWS_PADDING} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesRowsType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_PADDING);

/**
 * Selects the {@link KEY_SITES_ROWS_MARGIN} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesRowsType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_ROWS_MARGIN);

/**
 * Selects the {@link KEY_SITES_ROWS_MARGIN} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesRowsType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_MARGIN);

/**
 * Selects the {@link KEY_SITES_ROWS_BACKGROUND_COLOR} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesRowsType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_ROWS_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_ROWS_BACKGROUND_COLOR} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesRowsType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_ROWS_DESCRIPTOR} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsDescriptor: (aDefault?: PageDescriptorType) => UnaryFunction<SitesRowsType,
  PageDescriptorType> = partialLeft(pluckProperty, KEY_SITES_ROWS_DESCRIPTOR);

/**
 * Selects the {@link KEY_SITES_ROWS_DESCRIPTOR} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsDescriptor: (aDefault?: PageDescriptorType, aCmp?: EqualsPredicate<PageDescriptorType>) =>
  OperatorFunction<SitesRowsType, PageDescriptorType> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_DESCRIPTOR);

/**
 * Selects the {@link KEY_SITES_ROWS_KEY} property from {@link SitesRowsType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesRowsKey: (aDefault?: string) => UnaryFunction<SitesRowsType,
  string> = partialLeft(pluckProperty, KEY_SITES_ROWS_KEY);

/**
 * Selects the {@link KEY_SITES_ROWS_KEY} property from {@link SitesRowsType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesRowsKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesRowsType, string> = partialLeft(rxSelectProperty, KEY_SITES_ROWS_KEY);
