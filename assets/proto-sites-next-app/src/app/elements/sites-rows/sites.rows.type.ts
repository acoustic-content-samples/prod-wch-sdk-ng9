/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesColorType, isSitesColorType as bhcW3LBlH } from './../sites-color/sites.color.type';
import { SitesSectionType, isSitesSectionType as L7perfcsj } from './../sites-section/sites.section.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TdFcxLjhv, isNumber as ZV9hASzOp, isOptional as R8L_djGws, isOptionalArrayOf as LKB_By6fc, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '9ca02297-a564-40c9-aedc-add9c30f3d7b';
export const TYPE_NAME = 'Sites Rows';
export const KEY_ROWS = 'rows';
export const KEY_EDITOR = 'editor';
export const KEY_WIDTH = 'width';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';

/*
 * @name Sites Rows
 * @id 9ca02297-a564-40c9-aedc-add9c30f3d7b
 */
export interface SitesRowsType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Rows",
     *   "key": "rows",
     *   "label": "Rows",
     *   "required": false,
     *   "typeRef": {
     *     "id": "a4516d24-744d-4650-8477-24aa36145e66"
     *   }
     * }
     * ```
     */
    [KEY_ROWS]?: SitesSectionType[];

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
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
    [KEY_EDITOR]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
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
    [KEY_WIDTH]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "role": [
     *     "configuration"
     *   ],
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
     *   "role": [
     *     "configuration"
     *   ],
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
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background Color",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: SitesColorType;
}

/**
 * Tests if the value is of type SitesRowsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesRowsElement else false
 */
export function isSitesRowsType(aValue: any): aValue is SitesRowsType {
    return TdFcxLjhv(aValue)
        && LKB_By6fc(aValue[KEY_ROWS], L7perfcsj)
        && R8L_djGws(aValue[KEY_EDITOR], rCUctNoUC)
        && R8L_djGws(aValue[KEY_WIDTH], ZV9hASzOp)
        && R8L_djGws(aValue[KEY_PADDING], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_MARGIN], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_BACKGROUND_COLOR], bhcW3LBlH)
    ;
}

/**
 * Selects the "rows" property from SitesRowsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectRows: (aDefault?: SitesSectionType[]) => UnaryFunction<SitesRowsType, SitesSectionType[]> = partialLeft(pluckProperty, KEY_ROWS);

/**
 * Selects the "rows" property from SitesRowsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectRows: (aDefault?: SitesSectionType[], aCmp?: EqualsPredicate<SitesSectionType[]>) => OperatorFunction<SitesRowsType, SitesSectionType[]> = partialLeft(rxSelectProperty, KEY_ROWS);

/**
 * Selects the "editor" property from SitesRowsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectEditor: (aDefault?: string) => UnaryFunction<SitesRowsType, string> = partialLeft(pluckProperty, KEY_EDITOR);

/**
 * Selects the "editor" property from SitesRowsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectEditor: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesRowsType, string> = partialLeft(rxSelectProperty, KEY_EDITOR);

/**
 * Selects the "width" property from SitesRowsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectWidth: (aDefault?: number) => UnaryFunction<SitesRowsType, number> = partialLeft(pluckProperty, KEY_WIDTH);

/**
 * Selects the "width" property from SitesRowsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectWidth: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SitesRowsType, number> = partialLeft(rxSelectProperty, KEY_WIDTH);

/**
 * Selects the "padding" property from SitesRowsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesRowsType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesRowsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesRowsType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from SitesRowsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesRowsType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesRowsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesRowsType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "backgroundColor" property from SitesRowsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesRowsType, SitesColorType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from SitesRowsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) => OperatorFunction<SitesRowsType, SitesColorType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);
