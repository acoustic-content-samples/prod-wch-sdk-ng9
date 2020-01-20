/**
 * Do not modify this file, it is auto-generated.
 */
import { BackgroundExtensionType, SingleBackgroundExtensionElement, isSingleBackgroundExtensionElement as _isSingleBackgroundExtensionElement } from './../background-extension/backgroundExtensionType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { GroupElement, SingleNumberElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleNumberElement as _isSingleNumberElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '209c5579-4e6d-4e88-9c47-76de4c25c6f8';
export const TYPE_NAME = 'Spacer';
export const KEY_BACKGROUND = 'background';
export const KEY_HEIGHT = 'height';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Spacer
 * @id 209c5579-4e6d-4e88-9c47-76de4c25c6f8
 */
export interface Spacer {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Background Extension",
     *     "id": "8c4a8b02-67a1-4849-8e2d-f90be58485c5"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: SingleBackgroundExtensionElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "height",
     *   "label": "Spacer height",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_HEIGHT]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Common settings",
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: SingleCommonSettingsElement;
}

export interface SpacerElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '209c5579-4e6d-4e88-9c47-76de4c25c6f8'
    };
}

export interface SingleSpacerElement extends SpacerElement {
    value: Spacer;
}

export interface MultiSpacerElement extends SpacerElement {
    values: Spacer[];
}

/**
 * Tests if the value is of type SpacerElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type SpacerElement else false
 */
export function isSpacer(aValue: any): aValue is Spacer {
    return !!aValue
        && (!aValue[KEY_BACKGROUND] || _isSingleBackgroundExtensionElement(aValue[KEY_BACKGROUND], true))
        && (!aValue[KEY_HEIGHT] || _isSingleNumberElement(aValue[KEY_HEIGHT], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleSpacerElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleSpacerElement else false
 */
export function isSingleSpacerElement(aValue: any, bOptional?: boolean): aValue is SingleSpacerElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isSpacer(aValue.value));
}

/**
 * Tests if the value is of type MultiSpacerElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiSpacerElement else false
 */
export function isMultiSpacerElement(aValue: any, bOptional?: boolean): aValue is MultiSpacerElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isSpacer));
}

/*
 * @name Spacer
 * @id 209c5579-4e6d-4e88-9c47-76de4c25c6f8
 */
export interface SpacerType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "background",
     *   "label": "Background",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Background Extension",
     *     "id": "8c4a8b02-67a1-4849-8e2d-f90be58485c5"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND]?: BackgroundExtensionType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "height",
     *   "label": "Spacer height",
     *   "role": [
     *     "configuration"
     *   ]
     * }
     * ```
     */
    [KEY_HEIGHT]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Common settings",
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}
