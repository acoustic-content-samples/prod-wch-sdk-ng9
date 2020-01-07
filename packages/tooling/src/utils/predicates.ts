import { BaseAuthoringItem } from '@acoustic-content-sdk/api';
import { isNotEmpty, Predicate } from '@acoustic-content-sdk/utils';

import { fromRegExpString, NEVER } from './black.white.list';
import { selectId } from './selectors';

export function createAuthPredicate(aOptions: {
  include?: string[];
  exclude?: string[];
}): Predicate<BaseAuthoringItem> {
  const white: Predicate<string> = fromRegExpString(aOptions.include);
  const black: Predicate<string> = isNotEmpty(aOptions.exclude)
    ? fromRegExpString(aOptions.exclude)
    : NEVER;

  /** Tests if the type is valid */
  function isValidItem(aType: BaseAuthoringItem): boolean {
    const id = selectId(aType);
    const name = aType.name;
    // check
    return (white(id) || white(name)) && !(black(id) || black(name));
  }

  return isValidItem;
}
