/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '16e486dd-3c33-485c-a9e5-7617fbc67424';
export const TYPE_NAME = 'Mailing settings';
export const KEY_DATABASE_ID = 'databaseId';
export const KEY_SUBJECT_LINE = 'subjectLine';
export const KEY_FROM_NAME = 'fromName';
export const KEY_FROM_ADDRESS = 'fromAddress';
export const KEY_REPLY_TO_ADDRESS = 'replyToAddress';
export const KEY_PRE_HEADER = 'preHeader';

/*
 * @name Mailing settings
 * @id 16e486dd-3c33-485c-a9e5-7617fbc67424
 */
export interface MailingSettings {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "databaseId",
     *   "label": "Database ID"
     * }
     * ```
     */
    [KEY_DATABASE_ID]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "subjectLine",
     *   "label": "Subject line"
     * }
     * ```
     */
    [KEY_SUBJECT_LINE]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "fromName",
     *   "label": "From name"
     * }
     * ```
     */
    [KEY_FROM_NAME]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "fromAddress",
     *   "label": "From address"
     * }
     * ```
     */
    [KEY_FROM_ADDRESS]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "replyToAddress",
     *   "label": "Reply-to address"
     * }
     * ```
     */
    [KEY_REPLY_TO_ADDRESS]?: SingleTextElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "preHeader",
     *   "label": "Preheader"
     * }
     * ```
     */
    [KEY_PRE_HEADER]?: SingleTextElement;
}

export interface MailingSettingsElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '16e486dd-3c33-485c-a9e5-7617fbc67424'
    };
}

export interface SingleMailingSettingsElement extends MailingSettingsElement {
    value: MailingSettings;
}

export interface MultiMailingSettingsElement extends MailingSettingsElement {
    values: MailingSettings[];
}

/**
 * Tests if the value is of type MailingSettingsElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type MailingSettingsElement else false
 */
export function isMailingSettings(aValue: any): aValue is MailingSettings {
    return !!aValue
        && (!aValue[KEY_DATABASE_ID] || _isSingleTextElement(aValue[KEY_DATABASE_ID], true))
        && (!aValue[KEY_SUBJECT_LINE] || _isSingleTextElement(aValue[KEY_SUBJECT_LINE], true))
        && (!aValue[KEY_FROM_NAME] || _isSingleTextElement(aValue[KEY_FROM_NAME], true))
        && (!aValue[KEY_FROM_ADDRESS] || _isSingleTextElement(aValue[KEY_FROM_ADDRESS], true))
        && (!aValue[KEY_REPLY_TO_ADDRESS] || _isSingleTextElement(aValue[KEY_REPLY_TO_ADDRESS], true))
        && (!aValue[KEY_PRE_HEADER] || _isSingleTextElement(aValue[KEY_PRE_HEADER], true))
        ;
}

/**
 * Tests if the value is of type SingleMailingSettingsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleMailingSettingsElement else false
 */
export function isSingleMailingSettingsElement(aValue: any, bOptional?: boolean): aValue is SingleMailingSettingsElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isMailingSettings(aValue.value));
}

/**
 * Tests if the value is of type MultiMailingSettingsElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiMailingSettingsElement else false
 */
export function isMultiMailingSettingsElement(aValue: any, bOptional?: boolean): aValue is MultiMailingSettingsElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isMailingSettings));
}

/*
 * @name Mailing settings
 * @id 16e486dd-3c33-485c-a9e5-7617fbc67424
 */
export interface MailingSettingsType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "databaseId",
     *   "label": "Database ID"
     * }
     * ```
     */
    [KEY_DATABASE_ID]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "subjectLine",
     *   "label": "Subject line"
     * }
     * ```
     */
    [KEY_SUBJECT_LINE]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "fromName",
     *   "label": "From name"
     * }
     * ```
     */
    [KEY_FROM_NAME]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "fromAddress",
     *   "label": "From address"
     * }
     * ```
     */
    [KEY_FROM_ADDRESS]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "replyToAddress",
     *   "label": "Reply-to address"
     * }
     * ```
     */
    [KEY_REPLY_TO_ADDRESS]?: string;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "preHeader",
     *   "label": "Preheader"
     * }
     * ```
     */
    [KEY_PRE_HEADER]?: string;
}
