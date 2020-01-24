/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageScriptContributionType}.
 */
export const TYPE_ID_PAGE_SCRIPT_CONTRIBUTION = '5c473463-db07-4132-b8a1-bd40cbdf4b18';
/**
 * Name of the content type for {@link PageScriptContributionType}.
 */
export const TYPE_NAME_PAGE_SCRIPT_CONTRIBUTION = '📄 Page Script Contribution';
/**
 * Key name of the `type` property of {@link PageScriptContributionType}
 */
export const KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE = 'type';
/**
 * Key name of the `src` property of {@link PageScriptContributionType}
 */
export const KEY_PAGE_SCRIPT_CONTRIBUTION_SRC = 'src';
/**
 * Key name of the `key` property of {@link PageScriptContributionType}
 */
export const KEY_PAGE_SCRIPT_CONTRIBUTION_KEY = 'key';

/**
 * Delivery version of the 📄 Page Script Contribution content type.
 *
 * See {@link TYPE_ID_PAGE_SCRIPT_CONTRIBUTION} and {@link TYPE_NAME_PAGE_SCRIPT_CONTRIBUTION}
 * @remarks
 * A style contribution added as a <script> element to the page markup
 */
export interface PageScriptContributionType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * Identify the type information for the <script> tag to be included
   * @remarks
   * See {@link KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "Identify the type information for the <script> tag to be included",
   *   "key": "type",
   *   "label": "type",
   *   "options": [
   *     {
   *       "label": "application/javascript",
   *       "selection": "application/javascript"
   *     },
   *     {
   *       "label": "module",
   *       "selection": "module"
   *     },
   *     {
   *       "label": "nomodule",
   *       "selection": "nomodule"
   *     }
   *   ],
   *   "required": true,
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE]: string;

  /**
   * The URL pointing to the script realtive to the resource base URL of this tenant.
   * @remarks
   * See {@link KEY_PAGE_SCRIPT_CONTRIBUTION_SRC}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "The URL pointing to the script realtive to the resource base URL of this tenant.",
   *   "key": "src",
   *   "label": "src",
   *   "required": true,
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_PAGE_SCRIPT_CONTRIBUTION_SRC]: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_SCRIPT_CONTRIBUTION_KEY}
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
  [KEY_PAGE_SCRIPT_CONTRIBUTION_KEY]?: string;
}

/**
 * Tests if the value is of type {@link PageScriptContributionType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageScriptContributionType} else false
 */
export function isPageScriptContributionType(aValue: any): aValue is PageScriptContributionType {
  return PZ6MJUijH(aValue)
    && jEcWTCNgA(aValue[KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE])
    && jEcWTCNgA(aValue[KEY_PAGE_SCRIPT_CONTRIBUTION_SRC])
    && Dl16LDKVr(aValue[KEY_PAGE_SCRIPT_CONTRIBUTION_KEY], jEcWTCNgA)
    ;
}

/**
 * Selects the {@link KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE} property from {@link PageScriptContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageScriptContributionType: (aDefault?: string) => UnaryFunction<PageScriptContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE);

/**
 * Selects the {@link KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE} property from {@link PageScriptContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageScriptContributionType: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageScriptContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_TYPE);

/**
 * Selects the {@link KEY_PAGE_SCRIPT_CONTRIBUTION_SRC} property from {@link PageScriptContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageScriptContributionSrc: (aDefault?: string) => UnaryFunction<PageScriptContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_SRC);

/**
 * Selects the {@link KEY_PAGE_SCRIPT_CONTRIBUTION_SRC} property from {@link PageScriptContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageScriptContributionSrc: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageScriptContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_SRC);

/**
 * Selects the {@link KEY_PAGE_SCRIPT_CONTRIBUTION_KEY} property from {@link PageScriptContributionType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageScriptContributionKey: (aDefault?: string) => UnaryFunction<PageScriptContributionType,
  string> = partialLeft(pluckProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_KEY);

/**
 * Selects the {@link KEY_PAGE_SCRIPT_CONTRIBUTION_KEY} property from {@link PageScriptContributionType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageScriptContributionKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageScriptContributionType, string> = partialLeft(rxSelectProperty, KEY_PAGE_SCRIPT_CONTRIBUTION_KEY);
