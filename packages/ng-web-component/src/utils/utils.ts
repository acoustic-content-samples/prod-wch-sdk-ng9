import { isAbsoluteURL, isNotNil, Maybe } from '@acoustic-content-sdk/utils';

const BUNDLE_PREFIX = 'bundle:';

/**
 * Extracts the bundle URL from the tag
 *
 * @param aTag - the tag
 * @returns the decoded URL, including the selector or `undefined`
 */
export function selectBundleUrl(aTag: string): Maybe<string> {
  // locate the index
  const leftIdx = aTag.indexOf(BUNDLE_PREFIX);
  // check the URL
  return leftIdx >= 0
    ? aTag.substring(leftIdx + BUNDLE_PREFIX.length).trim()
    : undefined;
}

/**
 * Tests if we have a bundle tag
 *
 * @param aTag - the tag to check
 * @returns true if this is a bundle index, else false
 */
export function isBundleTag(aTag: string): boolean {
  // get the selector
  const selector = selectBundleUrl(aTag);
  if (isNotNil(selector)) {
    // right index
    const rightIdx = selector.indexOf('#');
    // check the URL
    return rightIdx >= 0 && isAbsoluteURL(aTag.substring(0, rightIdx));
  }
  // this is not a url
  return false;
}
