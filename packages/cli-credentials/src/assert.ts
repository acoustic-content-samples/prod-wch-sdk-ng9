import { ok } from 'assert';

import { hasTrailingSlash } from './url.utils';
import { isValidEmail, isValidUrl, isValidUserName } from './validation';

export function assertNotNull(aValue: any, aName?: string) {
  ok(
    aValue != null,
    aName
      ? `Value [${aName}] must not be null or undefined.`
      : 'Value must not be null or undefined.'
  );
}

export function assertParameter(aValue: any, aParameterName: string) {
  ok(!!aValue, `Please specify the '--${aParameterName}' parameter.`);
}

export function assertIsUrl(aValue: any, aName?: string): string {
  ok(
    isValidUrl(aValue),
    aName
      ? `Value [${aName}] must be a valid URL.`
      : 'Value must be a valid URL.'
  );
  return aValue;
}

export function assertIsEmail(aValue: any, aName?: string): string {
  ok(
    isValidEmail(aValue),
    aName
      ? `Value [${aName}] must be a valid e-mail address.`
      : 'Value must be a valid e-mail address.'
  );
  return aValue;
}

export function assertIsValidUserName(aValue: any, aName?: string): string {
  ok(
    isValidUserName(aValue),
    aName
      ? `Value [${aName}] must be a valid e-mail address or the term 'apikey'.`
      : "Value must be a valid e-mail address or the term 'apikey'."
  );
  return aValue;
}

export function assertHasTrailingSlash(aValue: any): string {
  ok(
    isValidUrl(aValue) && hasTrailingSlash(aValue),
    'URL [${aValue}] must end with a slash.'
  );
  return aValue;
}
