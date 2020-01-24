/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { PageContributionType, isPageContributionType as _rylEA7Kk } from './../page-contribution/page.contribution.type';
import { DeliveryGroupElementMetadata, Image } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isImage as TsPJetPfc, isNotNil as PZ6MJUijH, isOptional as Dl16LDKVr, isOptionalArrayOf as TlMUHGxnv, isString as jEcWTCNgA, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link PageModuleType}.
 */
export const TYPE_ID_PAGE_MODULE = 'aab86460-0018-44c2-9f52-3a326e58f7f7';
/**
 * Name of the content type for {@link PageModuleType}.
 */
export const TYPE_NAME_PAGE_MODULE = '📄 Page Module';
/**
 * Key name of the `head` property of {@link PageModuleType}
 */
export const KEY_PAGE_MODULE_HEAD = 'head';
/**
 * Key name of the `body` property of {@link PageModuleType}
 */
export const KEY_PAGE_MODULE_BODY = 'body';
/**
 * Key name of the `key` property of {@link PageModuleType}
 */
export const KEY_PAGE_MODULE_KEY = 'key';
/**
 * Key name of the `preview` property of {@link PageModuleType}
 */
export const KEY_PAGE_MODULE_PREVIEW = 'preview';

/**
 * Delivery version of the 📄 Page Module content type.
 *
 * See {@link TYPE_ID_PAGE_MODULE} and {@link TYPE_NAME_PAGE_MODULE}
 * @remarks
 * The list of related page contribution content items for the head and body elements of the pages of a given site. Content items of this type may be generated by a build step generating unique IDs for the given item. Markup contributions are added to the markup of every individual page. Page modules can contribute to both, the "head" and the "body" element of the page. Future version may support overriding page modules for specific pages.
 */
export interface PageModuleType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * Reference a shared page contribution to be included in the "head" section of the page.
   * @remarks
   * See {@link KEY_PAGE_MODULE_HEAD}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "group",
   *   "fieldLabel": "Custom Element",
   *   "helpText": "Reference a shared page contribution to be included in the \"head\" section of the page.",
   *   "key": "head",
   *   "label": "head",
   *   "minimumValues": 0,
   *   "role": [
   *     "configuration"
   *   ],
   *   "typeRef": {
   *     "id": "354743b2-f89a-482b-b447-2b5a2367c8bd"
   *   }
   * }
   * ```
   */
  [KEY_PAGE_MODULE_HEAD]?: PageContributionType[];

  /**
   * Reference a shared page contribution to be included in the "body" section of the page.
   * @remarks
   * See {@link KEY_PAGE_MODULE_BODY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "allowMultipleValues": true,
   *   "elementType": "group",
   *   "fieldLabel": "Custom Element",
   *   "helpText": "Reference a shared page contribution to be included in the \"body\" section of the page.",
   *   "key": "body",
   *   "label": "body",
   *   "minimumValues": 0,
   *   "role": [
   *     "configuration"
   *   ],
   *   "typeRef": {
   *     "id": "354743b2-f89a-482b-b447-2b5a2367c8bd"
   *   }
   * }
   * ```
   */
  [KEY_PAGE_MODULE_BODY]?: PageContributionType[];

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_PAGE_MODULE_KEY}
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
  [KEY_PAGE_MODULE_KEY]?: string;

  /**
   * Preview image for this item to be displayed in the authoring UI
   * @remarks
   * See {@link KEY_PAGE_MODULE_PREVIEW}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "image",
   *   "helpText": "Preview image for this item to be displayed in the authoring UI",
   *   "key": "preview",
   *   "label": "preview",
   *   "role": [
   *     "configuration"
   *   ]
   * }
   * ```
   */
  [KEY_PAGE_MODULE_PREVIEW]?: Image;
}

/**
 * Tests if the value is of type {@link PageModuleType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link PageModuleType} else false
 */
export function isPageModuleType(aValue: any): aValue is PageModuleType {
  return PZ6MJUijH(aValue)
    && TlMUHGxnv(aValue[KEY_PAGE_MODULE_HEAD], _rylEA7Kk)
    && TlMUHGxnv(aValue[KEY_PAGE_MODULE_BODY], _rylEA7Kk)
    && Dl16LDKVr(aValue[KEY_PAGE_MODULE_KEY], jEcWTCNgA)
    && Dl16LDKVr(aValue[KEY_PAGE_MODULE_PREVIEW], TsPJetPfc)
    ;
}

/**
 * Selects the {@link KEY_PAGE_MODULE_HEAD} property from {@link PageModuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageModuleHead: (aDefault?: PageContributionType[]) => UnaryFunction<PageModuleType,
  PageContributionType[]> = partialLeft(pluckProperty, KEY_PAGE_MODULE_HEAD);

/**
 * Selects the {@link KEY_PAGE_MODULE_HEAD} property from {@link PageModuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageModuleHead: (aDefault?: PageContributionType[], aCmp?: EqualsPredicate<PageContributionType[]>) =>
  OperatorFunction<PageModuleType, PageContributionType[]> = partialLeft(rxSelectProperty, KEY_PAGE_MODULE_HEAD);

/**
 * Selects the {@link KEY_PAGE_MODULE_BODY} property from {@link PageModuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageModuleBody: (aDefault?: PageContributionType[]) => UnaryFunction<PageModuleType,
  PageContributionType[]> = partialLeft(pluckProperty, KEY_PAGE_MODULE_BODY);

/**
 * Selects the {@link KEY_PAGE_MODULE_BODY} property from {@link PageModuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageModuleBody: (aDefault?: PageContributionType[], aCmp?: EqualsPredicate<PageContributionType[]>) =>
  OperatorFunction<PageModuleType, PageContributionType[]> = partialLeft(rxSelectProperty, KEY_PAGE_MODULE_BODY);

/**
 * Selects the {@link KEY_PAGE_MODULE_KEY} property from {@link PageModuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageModuleKey: (aDefault?: string) => UnaryFunction<PageModuleType,
  string> = partialLeft(pluckProperty, KEY_PAGE_MODULE_KEY);

/**
 * Selects the {@link KEY_PAGE_MODULE_KEY} property from {@link PageModuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageModuleKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<PageModuleType, string> = partialLeft(rxSelectProperty, KEY_PAGE_MODULE_KEY);

/**
 * Selects the {@link KEY_PAGE_MODULE_PREVIEW} property from {@link PageModuleType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPageModulePreview: (aDefault?: Image) => UnaryFunction<PageModuleType,
  Image> = partialLeft(pluckProperty, KEY_PAGE_MODULE_PREVIEW);

/**
 * Selects the {@link KEY_PAGE_MODULE_PREVIEW} property from {@link PageModuleType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPageModulePreview: (aDefault?: Image, aCmp?: EqualsPredicate<Image>) =>
  OperatorFunction<PageModuleType, Image> = partialLeft(rxSelectProperty, KEY_PAGE_MODULE_PREVIEW);