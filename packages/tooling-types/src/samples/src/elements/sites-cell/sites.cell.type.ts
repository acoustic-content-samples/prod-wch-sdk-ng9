/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBoundaryType, isSitesBoundaryType as BwoIGdc1E } from './../sites-boundary/sites.boundary.type';
import { SitesContentType, isSitesContentType as _$b$2AiEJ } from './../sites-content/sites.content.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isOptionalArrayOf as BTnRKzOFs, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesCellType}.
 */
export const TYPE_ID_SITES_CELL = 'd1e4dd37-8ac5-43a9-9145-1f194053b27c';
/**
 * Name of the content type for {@link SitesCellType}.
 */
export const TYPE_NAME_SITES_CELL = 'Sites Cell';
/**
 * Key name of the `span` property of {@link SitesCellType}
 */
export const KEY_SITES_CELL_SPAN = 'span';
/**
 * Key name of the `mdsize` property of {@link SitesCellType}
 */
export const KEY_SITES_CELL_MDSIZE = 'mdsize';
/**
 * Key name of the `padding` property of {@link SitesCellType}
 */
export const KEY_SITES_CELL_PADDING = 'padding';
/**
 * Key name of the `margin` property of {@link SitesCellType}
 */
export const KEY_SITES_CELL_MARGIN = 'margin';
/**
 * Key name of the `content` property of {@link SitesCellType}
 */
export const KEY_SITES_CELL_CONTENT = 'content';
/**
 * Key name of the `key` property of {@link SitesCellType}
 */
export const KEY_SITES_CELL_KEY = 'key';

/**
 * Delivery version of the Sites Cell content type.
 *
 * See {@link TYPE_ID_SITES_CELL} and {@link TYPE_NAME_SITES_CELL}
 * @remarks
 * This element represents a cell container contained in a page row.
 */
export interface SitesCellType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the number of grid columns to span
   * @remarks
   * See {@link KEY_SITES_CELL_SPAN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the number of grid columns to span",
   *   "key": "span",
   *   "label": "Span",
   *   "maximum": 6,
   *   "minimum": 2,
   *   "required": true
   * }
   * ```
   */
  [KEY_SITES_CELL_SPAN]: number;

  /**
   * This element controls the number of grid columns to span
   * @remarks
   * See {@link KEY_SITES_CELL_MDSIZE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the number of grid columns to span",
   *   "key": "mdsize",
   *   "label": "Grid size",
   *   "maximum": 12,
   *   "minimum": 1,
   *   "required": false
   * }
   * ```
   */
  [KEY_SITES_CELL_MDSIZE]?: number;

  /**
   * This element controls the padding values for this cell
   * @remarks
   * See {@link KEY_SITES_CELL_PADDING}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the padding values for this cell",
   *   "key": "padding",
   *   "label": "Padding",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CELL_PADDING]?: SitesBoundaryType;

  /**
   * This element controls the margin values for this cell
   * @remarks
   * See {@link KEY_SITES_CELL_MARGIN}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the margin values for this cell",
   *   "key": "margin",
   *   "label": "Margin",
   *   "typeRef": {
   *     "name": "Sites Boundary",
   *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CELL_MARGIN]?: SitesBoundaryType;

  /**
   * This element controls the list of block content to be rendered in this cell
   * @remarks
   * See {@link KEY_SITES_CELL_CONTENT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "group",
   *   "helpText": "This element controls the list of block content to be rendered in this cell",
   *   "key": "content",
   *   "label": "Content",
   *   "required": false,
   *   "typeRef": {
   *     "name": "Sites Content",
   *     "id": "21a8b4fd-0236-4187-bfea-7a94283e7b80"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CELL_CONTENT]?: SitesContentType[];

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_CELL_KEY}
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
  [KEY_SITES_CELL_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesCellType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesCellType} else false
 */
export function isSitesCellType(aValue: any): aValue is SitesCellType {
  return xs$RwNUhH(aValue)
    && tMwpMOz5i(aValue[KEY_SITES_CELL_SPAN])
    && VnbVJaXFB(aValue[KEY_SITES_CELL_MDSIZE], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_CELL_PADDING], BwoIGdc1E)
    && VnbVJaXFB(aValue[KEY_SITES_CELL_MARGIN], BwoIGdc1E)
    && BTnRKzOFs(aValue[KEY_SITES_CELL_CONTENT], _$b$2AiEJ)
    && VnbVJaXFB(aValue[KEY_SITES_CELL_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_CELL_SPAN} property from {@link SitesCellType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCellSpan: (aDefault?: number) => UnaryFunction<SitesCellType,
  number> = partialLeft(pluckProperty, KEY_SITES_CELL_SPAN);

/**
 * Selects the {@link KEY_SITES_CELL_SPAN} property from {@link SitesCellType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCellSpan: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesCellType, number> = partialLeft(rxSelectProperty, KEY_SITES_CELL_SPAN);

/**
 * Selects the {@link KEY_SITES_CELL_MDSIZE} property from {@link SitesCellType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCellMdsize: (aDefault?: number) => UnaryFunction<SitesCellType,
  number> = partialLeft(pluckProperty, KEY_SITES_CELL_MDSIZE);

/**
 * Selects the {@link KEY_SITES_CELL_MDSIZE} property from {@link SitesCellType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCellMdsize: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesCellType, number> = partialLeft(rxSelectProperty, KEY_SITES_CELL_MDSIZE);

/**
 * Selects the {@link KEY_SITES_CELL_PADDING} property from {@link SitesCellType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCellPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesCellType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_CELL_PADDING);

/**
 * Selects the {@link KEY_SITES_CELL_PADDING} property from {@link SitesCellType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCellPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesCellType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_CELL_PADDING);

/**
 * Selects the {@link KEY_SITES_CELL_MARGIN} property from {@link SitesCellType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCellMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesCellType,
  SitesBoundaryType> = partialLeft(pluckProperty, KEY_SITES_CELL_MARGIN);

/**
 * Selects the {@link KEY_SITES_CELL_MARGIN} property from {@link SitesCellType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCellMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) =>
  OperatorFunction<SitesCellType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_SITES_CELL_MARGIN);

/**
 * Selects the {@link KEY_SITES_CELL_CONTENT} property from {@link SitesCellType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCellContent: (aDefault?: SitesContentType[]) => UnaryFunction<SitesCellType,
  SitesContentType[]> = partialLeft(pluckProperty, KEY_SITES_CELL_CONTENT);

/**
 * Selects the {@link KEY_SITES_CELL_CONTENT} property from {@link SitesCellType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCellContent: (aDefault?: SitesContentType[], aCmp?: EqualsPredicate<SitesContentType[]>) =>
  OperatorFunction<SitesCellType, SitesContentType[]> = partialLeft(rxSelectProperty, KEY_SITES_CELL_CONTENT);

/**
 * Selects the {@link KEY_SITES_CELL_KEY} property from {@link SitesCellType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesCellKey: (aDefault?: string) => UnaryFunction<SitesCellType,
  string> = partialLeft(pluckProperty, KEY_SITES_CELL_KEY);

/**
 * Selects the {@link KEY_SITES_CELL_KEY} property from {@link SitesCellType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesCellKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesCellType, string> = partialLeft(rxSelectProperty, KEY_SITES_CELL_KEY);
