import { isNotEmpty } from '@acoustic-content-sdk/utils';

const SPLIT_PACKAGE = /^@([^\/]+)\/(.+)$/;

/**
 * Extracts the organization from  a package name
 *
 * @param aPackageName - the package name
 * @returns the organization
 */
export function getOrganization(aPackageName: string): string {
  const tokens = SPLIT_PACKAGE.exec(aPackageName);
  return isNotEmpty(tokens) && tokens.length === 3 ? tokens[1] : undefined;
}
