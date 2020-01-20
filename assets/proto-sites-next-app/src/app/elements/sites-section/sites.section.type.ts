/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as VGmGEEYLh } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as P6vEo4GDs } from './../sites-boundary/sites.boundary.type';
import { SitesCellType, isSitesCellType as NHshLgyXk } from './../sites-cell/sites.cell.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isArrayOf as LEWkq_2xn, isNotNil as TdFcxLjhv, isOptional as R8L_djGws, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = 'a4516d24-744d-4650-8477-24aa36145e66';
export const TYPE_NAME = 'Sites Section';
export const KEY_CELLS = 'cells';
export const KEY_PADDING = 'padding';
export const KEY_MARGIN = 'margin';
export const KEY_KEY = 'key';
export const KEY_BACKGROUND = 'background';
export const KEY_LAYOUT = 'layout';

/*
 * @name Sites Section
 * @id a4516d24-744d-4650-8477-24aa36145e66
 */
export interface SitesSectionType {
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
     *   "fieldLabel": "Column",
     *   "key": "cells",
     *   "label": "Cells",
     *   "maximumValues": 3,
     *   "minimumValues": 1,
     *   "required": true,
     *   "typeRef": {
     *     "id": "d1e4dd37-8ac5-43a9-9145-1f194053b27c"
     *   }
     * }
     * ```
     */
    [KEY_CELLS]: SitesCellType[];

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
     *   "elementType": "text",
     *   "key": "key",
     *   "label": "Key"
     * }
     * ```
     */
    [KEY_KEY]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "typeRef": {
     *     "id": "0a92059b-de6b-476d-b291-1638a435d0af"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: SitesBackgroundType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
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
    [KEY_LAYOUT]?: string;
}

/**
 * Tests if the value is of type SitesSectionElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesSectionElement else false
 */
export function isSitesSectionType(aValue: any): aValue is SitesSectionType {
    return TdFcxLjhv(aValue)
        && LEWkq_2xn(aValue[KEY_CELLS], NHshLgyXk)
        && R8L_djGws(aValue[KEY_PADDING], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_MARGIN], P6vEo4GDs)
        && R8L_djGws(aValue[KEY_KEY], rCUctNoUC)
        && R8L_djGws(aValue[KEY_BACKGROUND], VGmGEEYLh)
        && R8L_djGws(aValue[KEY_LAYOUT], rCUctNoUC)
    ;
}

/**
 * Selects the "cells" property from SitesSectionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCells: (aDefault?: SitesCellType[]) => UnaryFunction<SitesSectionType, SitesCellType[]> = partialLeft(pluckProperty, KEY_CELLS);

/**
 * Selects the "cells" property from SitesSectionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCells: (aDefault?: SitesCellType[], aCmp?: EqualsPredicate<SitesCellType[]>) => OperatorFunction<SitesSectionType, SitesCellType[]> = partialLeft(rxSelectProperty, KEY_CELLS);

/**
 * Selects the "padding" property from SitesSectionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesSectionType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SitesSectionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesSectionType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "margin" property from SitesSectionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesSectionType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesSectionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesSectionType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "key" property from SitesSectionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<SitesSectionType, string> = partialLeft(pluckProperty, KEY_KEY);

/**
 * Selects the "key" property from SitesSectionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesSectionType, string> = partialLeft(rxSelectProperty, KEY_KEY);

/**
 * Selects the "background" property from SitesSectionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesSectionType, SitesBackgroundType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from SitesSectionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) => OperatorFunction<SitesSectionType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "layout" property from SitesSectionType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLayout: (aDefault?: string) => UnaryFunction<SitesSectionType, string> = partialLeft(pluckProperty, KEY_LAYOUT);

/**
 * Selects the "layout" property from SitesSectionType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesSectionType, string> = partialLeft(rxSelectProperty, KEY_LAYOUT);
