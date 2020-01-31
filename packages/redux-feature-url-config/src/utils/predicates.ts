import { StaticHubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { isFunction, isString, isURL } from '@acoustic-content-sdk/utils';

/**
 * Tests if a value is a provider
 *
 * @param aValue - the value
 * @returns true if the value is a provider, else false
 */
export function isStaticHubInfoUrlProvider(
  aValue: any
): aValue is StaticHubInfoUrlProvider {
  return isURL(aValue) || isString(aValue) || isFunction(aValue);
}
