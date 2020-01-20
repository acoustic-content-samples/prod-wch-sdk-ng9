/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as x7dnxdS4z, isNotNil as X3dIbagIH, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '7686ae07-df09-4c11-9305-1894b4f93a9f';
export const TYPE_NAME = 'HTML Email';
export const KEY_CONTENT = 'content';

/*
 * @name HTML Email
 * @id 7686ae07-df09-4c11-9305-1894b4f93a9f
 */
export interface HtmlEmailType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "reference",
     *   "key": "content",
     *   "label": "Content",
     *   "required": true,
     *   "restrictTypes": [
     *     {
     *       "id": "aa358e28-2e60-416a-97d7-d1a6dd5e165b"
     *     }
     *   ]
     * }
     * ```
     */
    [KEY_CONTENT]: DeliveryReferenceElement;
}

/**
 * Tests if the value is of type HtmlEmailElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type HtmlEmailElement else false
 */
export function isHtmlEmailType(aValue: any): aValue is HtmlEmailType {
    return X3dIbagIH(aValue)
        && x7dnxdS4z(aValue[KEY_CONTENT])
    ;
}

/**
 * Selects the "content" property from HtmlEmailType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectContent: (aDefault?: DeliveryReferenceElement) => UnaryFunction<HtmlEmailType, DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_CONTENT);

/**
 * Selects the "content" property from HtmlEmailType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectContent: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) => OperatorFunction<HtmlEmailType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_CONTENT);
