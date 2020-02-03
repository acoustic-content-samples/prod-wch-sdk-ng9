/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as xs$RwNUhH, isNumber as tMwpMOz5i, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesNavigationComponentType}.
 */
export const TYPE_ID_SITES_NAVIGATION_COMPONENT = '6854f419-3b8b-4410-8d33-134a485d05a3';
/**
 * Name of the content type for {@link SitesNavigationComponentType}.
 */
export const TYPE_NAME_SITES_NAVIGATION_COMPONENT = 'Sites Navigation Component';
/**
 * Key name of the `startingWithNavigationLevel` property of {@link SitesNavigationComponentType}
 */
export const KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL = 'startingWithNavigationLevel';
/**
 * Key name of the `numberOfNavigationLevels` property of {@link SitesNavigationComponentType}
 */
export const KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS = 'numberOfNavigationLevels';

/**
 * Delivery version of the Sites Navigation Component content type.
 *
 * See {@link TYPE_ID_SITES_NAVIGATION_COMPONENT} and {@link TYPE_NAME_SITES_NAVIGATION_COMPONENT}
 * @remarks
 * This block renders the navigation for the current site
 */
export interface SitesNavigationComponentType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * This element controls the navigation nesting level to start from.
   * @remarks
   * See {@link KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the navigation nesting level to start from.",
   *   "key": "startingWithNavigationLevel",
   *   "label": "Starting with Navigation Level",
   *   "required": true
   * }
   * ```
   */
  [KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL]: number;

  /**
   * This element controls the number of navigation nesting levels to show.
   * @remarks
   * See {@link KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "number",
   *   "fieldType": "integer",
   *   "helpText": "This element controls the number of navigation nesting levels to show.",
   *   "key": "numberOfNavigationLevels",
   *   "label": "Number of Navigation Levels",
   *   "required": true
   * }
   * ```
   */
  [KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS]: number;
}

/**
 * Tests if the value is of type {@link SitesNavigationComponentType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesNavigationComponentType} else false
 */
export function isSitesNavigationComponentType(aValue: any): aValue is SitesNavigationComponentType {
  return xs$RwNUhH(aValue)
    && tMwpMOz5i(aValue[KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL])
    && tMwpMOz5i(aValue[KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS])
    ;
}

/**
 * Selects the {@link KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL} property from {@link SitesNavigationComponentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesNavigationComponentStartingWithNavigationLevel: (aDefault?: number) => UnaryFunction<SitesNavigationComponentType,
  number> = partialLeft(pluckProperty, KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL} property from {@link SitesNavigationComponentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesNavigationComponentStartingWithNavigationLevel: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesNavigationComponentType, number> = partialLeft(rxSelectProperty, KEY_SITES_NAVIGATION_COMPONENT_STARTING_WITH_NAVIGATION_LEVEL);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS} property from {@link SitesNavigationComponentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesNavigationComponentNumberOfNavigationLevels: (aDefault?: number) => UnaryFunction<SitesNavigationComponentType,
  number> = partialLeft(pluckProperty, KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS);

/**
 * Selects the {@link KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS} property from {@link SitesNavigationComponentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesNavigationComponentNumberOfNavigationLevels: (aDefault?: number, aCmp?: EqualsPredicate<number>) =>
  OperatorFunction<SitesNavigationComponentType, number> = partialLeft(rxSelectProperty, KEY_SITES_NAVIGATION_COMPONENT_NUMBER_OF_NAVIGATION_LEVELS);
