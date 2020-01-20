/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundType, isSitesBackgroundType as Be6vu5YvJ } from './../sites-background/sites.background.type';
import { SitesBoundaryType, isSitesBoundaryType as BjAyc24Gl } from './../sites-boundary/sites.boundary.type';
import { SitesImageType, isSitesImageType as bIcDCH8Tz } from './../sites-image/sites.image.type';
import { DeliveryGroupElementMetadata, Link } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isLink as _xLs5WVyx, isNotNil as p_CWR7uKB, isOptional as _nKTVr$OH, isString as jq7sQRd7u, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '8eb34ed3-fbdf-439e-aaeb-00060cdeb63a';
export const TYPE_NAME = 'Sites Page Card';
export const KEY_HEADING = 'heading';
export const KEY_SUMMARY = 'summary';
export const KEY_LINK = 'link';
export const KEY_IMAGE = 'image';
export const KEY_BACKGROUND = 'background';
export const KEY_MARGIN = 'margin';
export const KEY_LAYOUT = 'layout';
export const KEY_KEY = 'key';

/*
 * @name Sites Page Card
 * @id 8eb34ed3-fbdf-439e-aaeb-00060cdeb63a
 */
export interface SitesPageCardType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "heading",
     *   "label": "Heading"
     * }
     * ```
     */
    [KEY_HEADING]?: string;

    /**
     * @example
     * ```json
     * {
     *   "displayHeight": 2,
     *   "displayType": "multiLine",
     *   "elementType": "text",
     *   "key": "summary",
     *   "label": "summary"
     * }
     * ```
     */
    [KEY_SUMMARY]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "link",
     *   "label": "link"
     * }
     * ```
     */
    [KEY_LINK]?: Link;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "image",
     *   "label": "Image",
     *   "typeRef": {
     *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
     *   }
     * }
     * ```
     */
    [KEY_IMAGE]?: SitesImageType;

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
     *   "elementType": "optionselection",
     *   "key": "layout",
     *   "label": "Layout",
     *   "options": [
     *     {
     *       "label": "Image Left",
     *       "selection": "image-left"
     *     },
     *     {
     *       "label": "Image Right",
     *       "selection": "image-right"
     *     },
     *     {
     *       "label": "Image Bottom",
     *       "selection": "image-bottom"
     *     },
     *     {
     *       "label": "Image Top",
     *       "selection": "image-top"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_LAYOUT]?: string;

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
}

/**
 * Tests if the value is of type SitesPageCardElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesPageCardElement else false
 */
export function isSitesPageCardType(aValue: any): aValue is SitesPageCardType {
    return p_CWR7uKB(aValue)
        && _nKTVr$OH(aValue[KEY_HEADING], jq7sQRd7u)
        && _nKTVr$OH(aValue[KEY_SUMMARY], jq7sQRd7u)
        && _nKTVr$OH(aValue[KEY_LINK], _xLs5WVyx)
        && _nKTVr$OH(aValue[KEY_IMAGE], bIcDCH8Tz)
        && _nKTVr$OH(aValue[KEY_BACKGROUND], Be6vu5YvJ)
        && _nKTVr$OH(aValue[KEY_MARGIN], BjAyc24Gl)
        && _nKTVr$OH(aValue[KEY_LAYOUT], jq7sQRd7u)
        && _nKTVr$OH(aValue[KEY_KEY], jq7sQRd7u)
    ;
}

/**
 * Selects the "heading" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHeading: (aDefault?: string) => UnaryFunction<SitesPageCardType, string> = partialLeft(pluckProperty, KEY_HEADING);

/**
 * Selects the "heading" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHeading: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_HEADING);

/**
 * Selects the "summary" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSummary: (aDefault?: string) => UnaryFunction<SitesPageCardType, string> = partialLeft(pluckProperty, KEY_SUMMARY);

/**
 * Selects the "summary" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSummary: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_SUMMARY);

/**
 * Selects the "link" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLink: (aDefault?: Link) => UnaryFunction<SitesPageCardType, Link> = partialLeft(pluckProperty, KEY_LINK);

/**
 * Selects the "link" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLink: (aDefault?: Link, aCmp?: EqualsPredicate<Link>) => OperatorFunction<SitesPageCardType, Link> = partialLeft(rxSelectProperty, KEY_LINK);

/**
 * Selects the "image" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: SitesImageType) => UnaryFunction<SitesPageCardType, SitesImageType> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) => OperatorFunction<SitesPageCardType, SitesImageType> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "background" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackground: (aDefault?: SitesBackgroundType) => UnaryFunction<SitesPageCardType, SitesBackgroundType> = partialLeft(pluckProperty, KEY_BACKGROUND);

/**
 * Selects the "background" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackground: (aDefault?: SitesBackgroundType, aCmp?: EqualsPredicate<SitesBackgroundType>) => OperatorFunction<SitesPageCardType, SitesBackgroundType> = partialLeft(rxSelectProperty, KEY_BACKGROUND);

/**
 * Selects the "margin" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectMargin: (aDefault?: SitesBoundaryType) => UnaryFunction<SitesPageCardType, SitesBoundaryType> = partialLeft(pluckProperty, KEY_MARGIN);

/**
 * Selects the "margin" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectMargin: (aDefault?: SitesBoundaryType, aCmp?: EqualsPredicate<SitesBoundaryType>) => OperatorFunction<SitesPageCardType, SitesBoundaryType> = partialLeft(rxSelectProperty, KEY_MARGIN);

/**
 * Selects the "layout" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLayout: (aDefault?: string) => UnaryFunction<SitesPageCardType, string> = partialLeft(pluckProperty, KEY_LAYOUT);

/**
 * Selects the "layout" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLayout: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_LAYOUT);

/**
 * Selects the "key" property from SitesPageCardType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectKey: (aDefault?: string) => UnaryFunction<SitesPageCardType, string> = partialLeft(pluckProperty, KEY_KEY);

/**
 * Selects the "key" property from SitesPageCardType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesPageCardType, string> = partialLeft(rxSelectProperty, KEY_KEY);
