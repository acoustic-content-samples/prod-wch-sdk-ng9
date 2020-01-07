import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { isNotEmpty, Predicate } from '@acoustic-content-sdk/utils';

import { fromRegExpString, NEVER } from './black.white.list';
import { selectId } from './selectors';

export const CONTENT_FOLDER = 'content';

export function createContentPredicate(aOptions: {
  include?: string[];
  exclude?: string[];
}): Predicate<AuthoringContentItem> {
  const white: Predicate<string> = fromRegExpString(aOptions.include);
  const black: Predicate<string> = isNotEmpty(aOptions.exclude)
    ? fromRegExpString(aOptions.exclude)
    : NEVER;

  /** Tests if the type is valid */
  function isValidContentItem(aType: AuthoringContentItem): boolean {
    const id = selectId(aType);
    const name = aType.name;
    // check
    return (white(id) || white(name)) && !(black(id) || black(name));
  }

  return isValidContentItem;
}
