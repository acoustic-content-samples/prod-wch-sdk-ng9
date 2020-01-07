import { isAbsoluteURL, isNotNil } from '@acoustic-content-sdk/utils';

/**
 * Tests if a value is a valid URL
 *
 * @param aValue  - the value to test
 * @returns true if the value is a valid URL
 */
export function isValidUrl(aValue: any): aValue is URL {
  return (
    isNotNil(aValue) && isNotNil(aValue.href) && isAbsoluteURL(aValue.href)
  );
}
