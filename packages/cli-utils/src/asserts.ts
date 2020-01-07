import {
  Credentials,
  isValidPassword,
  isValidUrl,
  isValidUserName,
  WchToolsOptions
} from '@acoustic-content-sdk/cli-credentials';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { ok } from 'assert';

import { isValidProjectName } from './project';

/**
 * Tests if the given value is a valid user name, throws if not.
 *
 * @param aValue - the value to check
 * @param aName - optional name of the field we check
 *
 * @returns the value
 */
export function assertIsValidUserName(aValue: any, aName?: string): string {
  ok(
    isValidUserName(aValue),
    aName
      ? `Value [${aName}] must be a valid e-mail address or the term 'apikey'.`
      : "Value must be a valid e-mail address or the term 'apikey'."
  );
  return aValue;
}

/**
 * Tests if the given value is a valid password, throws if not.
 *
 * @param aValue - the value to check
 * @param aName - optional name of the field we check
 *
 * @returns the value
 */
export function assertIsValidPassword(aValue: any, aName?: string): string {
  ok(
    isValidPassword(aValue),
    aName
      ? `Value [${aName}] must not be empty.`
      : 'Password must not be empty.'
  );
  return aValue;
}

/**
 * Tests if the given value is a valid url, throws if not.
 *
 * @param aValue - the value to check
 * @param aName - optional name of the field we check
 *
 * @returns the value
 */
export function assertIsValidUrl(aValue: any, aName?: string): string {
  ok(
    isValidUrl(aValue),
    aName
      ? `Value [${aName}] must be a valid URL.`
      : 'Value must be a valid URL.'
  );
  return aValue;
}

/**
 * Tests if the given value is a valid Credentials object
 *
 * @param aValue - the value to check
 * @param aName - optional name of the field we check
 *
 * @returns the value
 */
export function assertIsValidCredentials(
  aValue: any,
  aName?: string
): Credentials {
  // validate the fields
  ok(
    isNotNil(aValue),
    aName ? `Value [${aName}] must not be null.` : 'Value must not be null.'
  );
  // validate the fields
  assertIsValidUserName(aValue.username, 'username');
  assertIsValidPassword(aValue.password, 'password');
  // returns the credentials
  return aValue;
}

/**
 * Tests if the given value is a valid WchToolsOptions object
 *
 * @param aValue - the value to check
 * @param aName - optional name of the field we check
 *
 * @returns the value
 */
export function assertIsValidWchToolsOptions(
  aValue: any,
  aName?: string
): WchToolsOptions {
  // validate the fields
  assertIsValidCredentials(aValue, aName);
  // validate the url field
  assertIsValidUrl(aValue.baseUrl, 'baseUrl');
  // ok
  return aValue;
}

/**
 * Construct the project name message
 *
 * @param aProjectName - project name
 * @returns the message
 */
function projectNameMessage(aProjectName: string): string {
  return `Project name "${aProjectName}" is not valid. New project names must
start with a letter, and must contain only alphanumeric characters or dashes.
When adding a dash the segment after the dash must also start with a letter`;
}

/**
 * Tests if the given value is a valid project name
 *
 * @param aValue - the value to check
 * @param aName  - optional name of the field we check
 *
 * @returns the value
 */
export function assertIsValidProjectName(aValue: any, aName?: string): string {
  // validate the fields
  ok(
    isNotNil(aValue) && isValidProjectName(aValue),
    aName
      ? `Value [${aName}] must be a valid project name. ${projectNameMessage(
          aValue
        )}`
      : projectNameMessage(aValue)
  );
  // returns the value
  return aValue;
}
