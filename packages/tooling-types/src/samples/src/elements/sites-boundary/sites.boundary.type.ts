/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesBoundaryType}.
 */
export const TYPE_ID_SITES_BOUNDARY = 'd403f72d-5383-423c-ba33-5cedd61c9224';
/**
 * Name of the content type for {@link SitesBoundaryType}.
 */
export const TYPE_NAME_SITES_BOUNDARY = 'Sites Boundary';
/**
 * Key name of the `top` property of {@link SitesBoundaryType}
 */
export const KEY_SITES_BOUNDARY_TOP = 'top';
/**
 * Key name of the `bottom` property of {@link SitesBoundaryType}
 */
export const KEY_SITES_BOUNDARY_BOTTOM = 'bottom';
/**
 * Key name of the `left` property of {@link SitesBoundaryType}
 */
export const KEY_SITES_BOUNDARY_LEFT = 'left';
/**
 * Key name of the `right` property of {@link SitesBoundaryType}
 */
export const KEY_SITES_BOUNDARY_RIGHT = 'right';
/**
 * Key name of the `key` property of {@link SitesBoundaryType}
 */
export const KEY_SITES_BOUNDARY_KEY = 'key';

/**
 * Delivery version of the Sites Boundary content type.
 *
 * See {@link TYPE_ID_SITES_BOUNDARY} and {@link TYPE_NAME_SITES_BOUNDARY}
 * @remarks
 * This element controls the boundary dimensions to be used for padding/margin styling for a given block
 */
export interface SitesBoundaryType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The value for the top boundary
   * @remarks
   * See {@link KEY_SITES_BOUNDARY_TOP}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "The value for the top boundary",
   *   "key": "top",
   *   "label": "Top",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_BOUNDARY_TOP]?: number;

  /**
   * The value for the bottom boundary
   * @remarks
   * See {@link KEY_SITES_BOUNDARY_BOTTOM}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "The value for the bottom boundary",
   *   "key": "bottom",
   *   "label": "Bottom",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_BOUNDARY_BOTTOM]?: number;

  /**
   * The value for the left boundary
   * @remarks
   * See {@link KEY_SITES_BOUNDARY_LEFT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "The value for the left boundary",
   *   "key": "left",
   *   "label": "Left",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_BOUNDARY_LEFT]?: number;

  /**
   * The value for the right boundary
   * @remarks
   * See {@link KEY_SITES_BOUNDARY_RIGHT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "The value for the right boundary",
   *   "key": "right",
   *   "label": "Right",
   *   "minimum": 0
   * }
   * ```
   */
  [KEY_SITES_BOUNDARY_RIGHT]?: number;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_BOUNDARY_KEY}
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
  [KEY_SITES_BOUNDARY_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesBoundaryType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesBoundaryType} else false
 */
export function isSitesBoundaryType(aValue: any): aValue is SitesBoundaryType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_BOUNDARY_TOP], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_BOUNDARY_BOTTOM], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_BOUNDARY_LEFT], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_BOUNDARY_RIGHT], tMwpMOz5i)
    && VnbVJaXFB(aValue[KEY_SITES_BOUNDARY_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_BOUNDARY_TOP} property from {@link SitesBoundaryType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBoundaryTop: (aDefault?: number) => UnaryFunction<SitesBoundaryType,
  number> = partialLeft(pluckProperty, KEY_SITES_BOUNDARY_TOP);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_TOP} property from {@link SitesBoundaryType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBoundaryTop: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_SITES_BOUNDARY_TOP);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_BOTTOM} property from {@link SitesBoundaryType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBoundaryBottom: (aDefault?: number) => UnaryFunction<SitesBoundaryType,
  number> = partialLeft(pluckProperty, KEY_SITES_BOUNDARY_BOTTOM);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_BOTTOM} property from {@link SitesBoundaryType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBoundaryBottom: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_SITES_BOUNDARY_BOTTOM);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_LEFT} property from {@link SitesBoundaryType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBoundaryLeft: (aDefault?: number) => UnaryFunction<SitesBoundaryType,
  number> = partialLeft(pluckProperty, KEY_SITES_BOUNDARY_LEFT);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_LEFT} property from {@link SitesBoundaryType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBoundaryLeft: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_SITES_BOUNDARY_LEFT);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_RIGHT} property from {@link SitesBoundaryType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBoundaryRight: (aDefault?: number) => UnaryFunction<SitesBoundaryType,
  number> = partialLeft(pluckProperty, KEY_SITES_BOUNDARY_RIGHT);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_RIGHT} property from {@link SitesBoundaryType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBoundaryRight: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesBoundaryType, number> = partialLeft(rxSelectProperty, KEY_SITES_BOUNDARY_RIGHT);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_KEY} property from {@link SitesBoundaryType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBoundaryKey: (aDefault?: string) => UnaryFunction<SitesBoundaryType,
  string> = partialLeft(pluckProperty, KEY_SITES_BOUNDARY_KEY);

/**
 * Selects the {@link KEY_SITES_BOUNDARY_KEY} property from {@link SitesBoundaryType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBoundaryKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesBoundaryType, string> = partialLeft(rxSelectProperty, KEY_SITES_BOUNDARY_KEY);
