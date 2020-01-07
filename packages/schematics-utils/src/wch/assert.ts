import { isString } from '@acoustic-content-sdk/utils';
import * as Assert from 'assert';
import { validate as validateEmail } from 'email-validator';
import { isWebUri } from 'valid-url';

import { hasTrailingSlash } from './url.utils';

export function assertNotNull(aValue: any, aName?: string) {
  Assert.ok(
    aValue != null,
    aName
      ? `Value [${aName}] must not be null or undefined.`
      : 'Value must not be null or undefined.'
  );
}

export function assertParameter(aValue: any, aParameterName: string) {
  Assert.ok(!!aValue, `Please specify the '--${aParameterName}' parameter.`);
}

export function isValidUrl(aValue: any): aValue is string {
  return isString(aValue) && !!isWebUri(aValue);
}

export function assertIsUrl(aValue: any, aName?: string): string {
  Assert.ok(
    isValidUrl(aValue),
    aName
      ? `Value [${aName}] must be a valid URL.`
      : 'Value must be a valid URL.'
  );
  return aValue;
}

export function isValidEmail(aValue: any): aValue is string {
  return isString(aValue) && !!validateEmail(aValue);
}

export function isValidUserName(aValue: any): aValue is string {
  return isString(aValue) && (!!validateEmail(aValue) || aValue === 'apikey');
}

export function assertIsEmail(aValue: any, aName?: string): string {
  Assert.ok(
    isValidEmail(aValue),
    aName
      ? `Value [${aName}] must be a valid e-mail address.`
      : 'Value must be a valid e-mail address.'
  );
  return aValue;
}

export function assertIsValidUserName(aValue: any, aName?: string): string {
  Assert.ok(
    isValidUserName(aValue),
    aName
      ? `Value [${aName}] must be a valid e-mail address or the term 'apikey'.`
      : "Value must be a valid e-mail address or the term 'apikey'."
  );
  return aValue;
}

export function assertHasTrailingSlash(aValue: any): string {
  Assert.ok(
    isValidUrl(aValue) && hasTrailingSlash(aValue),
    'URL [${aValue}] must end with a slash.'
  );
  return aValue;
}
