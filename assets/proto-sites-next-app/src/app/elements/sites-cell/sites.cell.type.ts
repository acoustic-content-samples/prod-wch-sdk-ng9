/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesContentType, isSitesContentType as tMHmK$x_v } from './../sites-content/sites.content.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, isOptionalArrayOf as LKB_By6fc, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'd1e4dd37-8ac5-43a9-9145-1f194053b27c';
export const TYPE_NAME = 'Sites Cell';
export const KEY_SPAN = 'span';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_CONTENT = 'content';

/*
 * @name Sites Cell
 * @id d1e4dd37-8ac5-43a9-9145-1f194053b27c
 */
export interface SitesCellType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "span",
     *   "label": "Span",
     *   "maximum": 6,
     *   "minimum": 2,
     *   "required": true
     * }
     * ```
     */
    [KEY_SPAN]: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "typeRef": {
     *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
     *   }
     * }
     * ```
     */
    [KEY_PADDING]?: SitesBoundaryType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "margin",
     *   "label": "Margin",
     *   "typeRef": {
     *     "id": "d403f72d-5383-423c-ba33-5cedd61c9224"
     *   }
     * }
     * ```
     */
    [KEY_MARGIN]?: SitesBoundaryType;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "key": "content",
     *   "label": "Content",
     *   "required": false,
     *   "typeRef": {
     *     "id": "21a8b4fd-0236-4187-bfea-7a94283e7b80"
     *   }
     * }
     * ```
     */
    [KEY_CONTENT]?: SitesContentType[];
}

/**
 * Tests if the value is of type SitesCellElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesCellElement else false
 */
export function isSitesCellType(aValue: any): aValue is SitesCellType {
    return TdFcxLjhv(aValue)
        && ZV9hASzOp(aValue[KEY_SPAN])
        && R8L_djGws(aValue[KEY_PADDING], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_MARGIN], P6vEo4GDs)
        && LKB_By6fc(aValue[KEY_CONTENT], tMHmK$x_v)
    ;
}

/**
 * Selects the "span" property from SitesCellType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpan: (aDefault?: number) => UnaryFunction<SitesCellType, number> = partialLeft(pluckProperty, KEY_SPAN);

/**
 * Selects the "span" property from SitesCellType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpan: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesCellType, number> = partialLeft(rxSelectProperty, KEY_SPAN);

/**
 * Selects the "padding" property from SitesCellType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesCellType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesCellType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesCellType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from SitesCellType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesCellType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesCellType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesCellType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "content" property from SitesCellType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectContent: (aDefault?: SitesContentType[]) => UnaryFunction<SitesCellType, SitesContentType[]> = partialLeft(pluckProperty, KEY_CONTENT);

/**
 * Selects the "content" property from SitesCellType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectContent: (aDefault?: SitesContentType[], aCmp?: EqualsPredicate<SitesContentType[]>) => OperatorFunction<SitesCellType, SitesContentType[]> = partialLeft(rxSelectProperty, KEY_CONTENT);
