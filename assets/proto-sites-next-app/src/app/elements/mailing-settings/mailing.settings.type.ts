/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as TbpCYumVf, isOptional as f4539YvZD, isString as Vo8P_D7_F, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

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
export interface MailingSettingsType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

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

/**
 * Tests if the value is of type MailingSettingsElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type MailingSettingsElement else false
 */
export function isMailingSettingsType(aValue: any): aValue is MailingSettingsType {
    return TbpCYumVf(aValue)
        && f4539YvZD(aValue[KEY_DATABASE_ID], Vo8P_D7_F)
        && f4539YvZD(aValue[KEY_SUBJECT_LINE], Vo8P_D7_F)
        && f4539YvZD(aValue[KEY_FROM_NAME], Vo8P_D7_F)
        && f4539YvZD(aValue[KEY_FROM_ADDRESS], Vo8P_D7_F)
        && f4539YvZD(aValue[KEY_REPLY_TO_ADDRESS], Vo8P_D7_F)
        && f4539YvZD(aValue[KEY_PRE_HEADER], Vo8P_D7_F)
    ;
}

/**
 * Selects the "databaseId" property from MailingSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectDatabaseId: (aDefault?: string) => UnaryFunction<MailingSettingsType, string> = partialLeft(pluckProperty, KEY_DATABASE_ID);

/**
 * Selects the "databaseId" property from MailingSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectDatabaseId: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<MailingSettingsType, string> = partialLeft(rxSelectProperty, KEY_DATABASE_ID);

/**
 * Selects the "subjectLine" property from MailingSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSubjectLine: (aDefault?: string) => UnaryFunction<MailingSettingsType, string> = partialLeft(pluckProperty, KEY_SUBJECT_LINE);

/**
 * Selects the "subjectLine" property from MailingSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSubjectLine: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<MailingSettingsType, string> = partialLeft(rxSelectProperty, KEY_SUBJECT_LINE);

/**
 * Selects the "fromName" property from MailingSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFromName: (aDefault?: string) => UnaryFunction<MailingSettingsType, string> = partialLeft(pluckProperty, KEY_FROM_NAME);

/**
 * Selects the "fromName" property from MailingSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFromName: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<MailingSettingsType, string> = partialLeft(rxSelectProperty, KEY_FROM_NAME);

/**
 * Selects the "fromAddress" property from MailingSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectFromAddress: (aDefault?: string) => UnaryFunction<MailingSettingsType, string> = partialLeft(pluckProperty, KEY_FROM_ADDRESS);

/**
 * Selects the "fromAddress" property from MailingSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectFromAddress: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<MailingSettingsType, string> = partialLeft(rxSelectProperty, KEY_FROM_ADDRESS);

/**
 * Selects the "replyToAddress" property from MailingSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectReplyToAddress: (aDefault?: string) => UnaryFunction<MailingSettingsType, string> = partialLeft(pluckProperty, KEY_REPLY_TO_ADDRESS);

/**
 * Selects the "replyToAddress" property from MailingSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectReplyToAddress: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<MailingSettingsType, string> = partialLeft(rxSelectProperty, KEY_REPLY_TO_ADDRESS);

/**
 * Selects the "preHeader" property from MailingSettingsType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPreHeader: (aDefault?: string) => UnaryFunction<MailingSettingsType, string> = partialLeft(pluckProperty, KEY_PRE_HEADER);

/**
 * Selects the "preHeader" property from MailingSettingsType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPreHeader: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<MailingSettingsType, string> = partialLeft(rxSelectProperty, KEY_PRE_HEADER);
