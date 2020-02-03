/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesColorType, isSitesColorType as nuh8LMHro } from './../sites-color/sites.color.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isBoolean as BuYcuEBrz, isImage as nzssKyJlo, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesBackgroundType}.
 */
export const TYPE_ID_SITES_BACKGROUND = '0a92059b-de6b-476d-b291-1638a435d0af';
/**
 * Name of the content type for {@link SitesBackgroundType}.
 */
export const TYPE_NAME_SITES_BACKGROUND = 'Sites Background';
/**
 * Key name of the `backgroundColor` property of {@link SitesBackgroundType}
 */
export const KEY_SITES_BACKGROUND_BACKGROUND_COLOR = 'backgroundColor';
/**
 * Key name of the `includeBackgroundImage` property of {@link SitesBackgroundType}
 */
export const KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE = 'includeBackgroundImage';
/**
 * Key name of the `image` property of {@link SitesBackgroundType}
 */
export const KEY_SITES_BACKGROUND_IMAGE = 'image';
/**
 * Key name of the `fillOptions` property of {@link SitesBackgroundType}
 */
export const KEY_SITES_BACKGROUND_FILL_OPTIONS = 'fillOptions';
/**
 * Key name of the `key` property of {@link SitesBackgroundType}
 */
export const KEY_SITES_BACKGROUND_KEY = 'key';

/**
 * Delivery version of the Sites Background content type.
 *
 * See {@link TYPE_ID_SITES_BACKGROUND} and {@link TYPE_NAME_SITES_BACKGROUND}
 * @remarks
 * This element controls the background styling for a given block
 */
export interface SitesBackgroundType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the background color for this item
   * @remarks
   * See {@link KEY_SITES_BACKGROUND_BACKGROUND_COLOR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "This element controls the background color for this item",
   *   "key": "backgroundColor",
   *   "label": "Background Color",
   *   "typeRef": {
   *     "name": "Sites Color",
   *     "id": "93ed78a8-cea7-4188-8584-a8bedca6ebac"
   *   }
   * }
   * ```
   */
  [KEY_SITES_BACKGROUND_BACKGROUND_COLOR]?: SitesColorType;

  /**
   * This element controls if the background image is shown or not
   * @remarks
   * See {@link KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "toggle",
   *   "helpText": "This element controls if the background image is shown or not",
   *   "key": "includeBackgroundImage",
   *   "label": "Include background image"
   * }
   * ```
   */
  [KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE]?: boolean;

  /**
   * The background image
   * @remarks
   * See {@link KEY_SITES_BACKGROUND_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "image",
   *   "helpText": "The background image",
   *   "key": "image",
   *   "label": "Image"
   * }
   * ```
   */
  [KEY_SITES_BACKGROUND_IMAGE]?: Image;

  /**
   * This element controls the fill behavior applied to the bakground image
   * @remarks
   * See {@link KEY_SITES_BACKGROUND_FILL_OPTIONS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element controls the fill behavior applied to the bakground image",
   *   "key": "fillOptions",
   *   "label": "Fill",
   *   "options": [
   *     {
   *       "label": "Full Width",
   *       "selection": "full-width"
   *     },
   *     {
   *       "label": "Center",
   *       "selection": "center"
   *     },
   *     {
   *       "label": "Tile",
   *       "selection": "tile"
   *     }
   *   ]
   * }
   * ```
   */
  [KEY_SITES_BACKGROUND_FILL_OPTIONS]?: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_BACKGROUND_KEY}
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
  [KEY_SITES_BACKGROUND_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesBackgroundType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesBackgroundType} else false
 */
export function isSitesBackgroundType(aValue: any): aValue is SitesBackgroundType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_BACKGROUND_BACKGROUND_COLOR], nuh8LMHro)
    && VnbVJaXFB(aValue[KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE], BuYcuEBrz)
    && VnbVJaXFB(aValue[KEY_SITES_BACKGROUND_IMAGE], nzssKyJlo)
    && VnbVJaXFB(aValue[KEY_SITES_BACKGROUND_FILL_OPTIONS], xsUSy24Ob)
    && VnbVJaXFB(aValue[KEY_SITES_BACKGROUND_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_BACKGROUND_BACKGROUND_COLOR} property from {@link SitesBackgroundType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBackgroundBackgroundColor: (aDefault?: SitesColorType) => UnaryFunction<SitesBackgroundType,
  SitesColorType> = partialLeft(pluckProperty, KEY_SITES_BACKGROUND_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_BACKGROUND_COLOR} property from {@link SitesBackgroundType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBackgroundBackgroundColor: (aDefault?: SitesColorType, aCmp?: EqualsPredicate<SitesColorType>) =>
  OperatorFunction<SitesBackgroundType, SitesColorType> = partialLeft(rxSelectProperty, KEY_SITES_BACKGROUND_BACKGROUND_COLOR);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE} property from {@link SitesBackgroundType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBackgroundIncludeBackgroundImage: (aDefault?: boolean) => UnaryFunction<SitesBackgroundType,
  boolean> = partialLeft(pluckProperty, KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE} property from {@link SitesBackgroundType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBackgroundIncludeBackgroundImage: (aDefault?: boolean, aCmp?: EqualsPredicate<boolean>) =>
  OperatorFunction<SitesBackgroundType, boolean> = partialLeft(rxSelectProperty, KEY_SITES_BACKGROUND_INCLUDE_BACKGROUND_IMAGE);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_IMAGE} property from {@link SitesBackgroundType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBackgroundImage: (aDefault?: Image) => UnaryFunction<SitesBackgroundType,
  Image> = partialLeft(pluckProperty, KEY_SITES_BACKGROUND_IMAGE);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_IMAGE} property from {@link SitesBackgroundType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBackgroundImage: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) =>
  OperatorFunction<SitesBackgroundType, Image> = partialLeft(rxSelectProperty, KEY_SITES_BACKGROUND_IMAGE);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_FILL_OPTIONS} property from {@link SitesBackgroundType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBackgroundFillOptions: (aDefault?: string) => UnaryFunction<SitesBackgroundType,
  string> = partialLeft(pluckProperty, KEY_SITES_BACKGROUND_FILL_OPTIONS);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_FILL_OPTIONS} property from {@link SitesBackgroundType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBackgroundFillOptions: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesBackgroundType, string> = partialLeft(rxSelectProperty, KEY_SITES_BACKGROUND_FILL_OPTIONS);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_KEY} property from {@link SitesBackgroundType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesBackgroundKey: (aDefault?: string) => UnaryFunction<SitesBackgroundType,
  string> = partialLeft(pluckProperty, KEY_SITES_BACKGROUND_KEY);

/**
 * Selects the {@link KEY_SITES_BACKGROUND_KEY} property from {@link SitesBackgroundType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesBackgroundKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesBackgroundType, string> = partialLeft(rxSelectProperty, KEY_SITES_BACKGROUND_KEY);
