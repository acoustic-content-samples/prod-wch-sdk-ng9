/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, SingleToggleElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleToggleElement as _isSingleToggleElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'eeff476e-0559-444f-97d1-486a10a86b80';
export const TYPE_NAME = 'Common settings';
export const KEY_APPLY_TO_ALL = 'applyToAll';
export const KEY_HIDE_ON_MOBILE = 'hideOnMobile';

/*
 * @name Common settings
 * @id eeff476e-0559-444f-97d1-486a10a86b80
 */
export interface CommonSettings {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "applyToAll",
     *   "label": "Apply to all"
     * }
     * ```
     */
    [KEY_APPLY_TO_ALL]?: SingleToggleElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "hideOnMobile",
     *   "label": "Hide on mobile",
     *   "locked": false
     * }
     * ```
     */
    [KEY_HIDE_ON_MOBILE]?: SingleToggleElement;
}

export interface CommonSettingsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'eeff476e-0559-444f-97d1-486a10a86b80'
    };
}

export interface SingleCommonSettingsElement extends CommonSettingsElement {
    value: CommonSettings;
}

export interface MultiCommonSettingsElement extends CommonSettingsElement {
    values: CommonSettings[];
}

/**
 * Tests if the value is of type CommonSettingsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type CommonSettingsElement else false
 */
export function isCommonSettings(aValue: any): aValue is CommonSettings {
    return !!aValue
        && (!aValue[KEY_APPLY_TO_ALL] || _isSingleToggleElement(aValue[KEY_APPLY_TO_ALL], true))
        && (!aValue[KEY_HIDE_ON_MOBILE] || _isSingleToggleElement(aValue[KEY_HIDE_ON_MOBILE], true))
        ;
}

/**
 * Tests if the value is of type SingleCommonSettingsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleCommonSettingsElement else false
 */
export function isSingleCommonSettingsElement(aValue: any, bOptional?: boolean): aValue is SingleCommonSettingsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isCommonSettings(aValue.value));
}

/**
 * Tests if the value is of type MultiCommonSettingsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiCommonSettingsElement else false
 */
export function isMultiCommonSettingsElement(aValue: any, bOptional?: boolean): aValue is MultiCommonSettingsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isCommonSettings));
}

/*
 * @name Common settings
 * @id eeff476e-0559-444f-97d1-486a10a86b80
 */
export interface CommonSettingsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "applyToAll",
     *   "label": "Apply to all"
     * }
     * ```
     */
    [KEY_APPLY_TO_ALL]?: boolean;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "toggle",
     *   "key": "hideOnMobile",
     *   "label": "Hide on mobile",
     *   "locked": false
     * }
     * ```
     */
    [KEY_HIDE_ON_MOBILE]?: boolean;
}
