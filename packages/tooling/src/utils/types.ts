import { AUTHORING_TYPE_KIND, AuthoringType } from '@acoustic-content-sdk/api';
import {
  isNotEmpty,
  isNotNil,
  Predicate,
  reduceArray
} from '@acoustic-content-sdk/utils';

import { fromRegExpString, NEVER } from './black.white.list';
import { selectId } from './selectors';
import { WCHTOOLS_FOLDER_CONTENT_TYPE } from './wchtools';

/**
 * @deprecated
 */
export const TYPES_FOLDER = WCHTOOLS_FOLDER_CONTENT_TYPE;

export const TYPE_SUFFIX = 'Type';

/**
 * List of kinds that support layouts
 */
const LAYOUT_KINDS = [
  'standalone',
  'embedded',
  'page',
  'landing-page',
  'catalog-page',
  'email'
];

function isLayoutKind(aKind: AUTHORING_TYPE_KIND[]): boolean {
  const data = new Set<string>(aKind);
  return reduceArray(
    LAYOUT_KINDS,
    (bRes: boolean, aLayoutKind: AUTHORING_TYPE_KIND) =>
      bRes || data.has(aLayoutKind),
    false
  );
}

function isStandalone(aKind?: AUTHORING_TYPE_KIND[]): boolean {
  return isNotEmpty(aKind) ? isLayoutKind(aKind) : true;
}

export function canHaveLayout(aType: AuthoringType): boolean {
  return isNotNil(aType) && isStandalone(aType.kind);
}

export function createTypePredicate(aOptions: {
  include?: string[];
  exclude?: string[];
}): Predicate<AuthoringType> {
  const white: Predicate<string> = fromRegExpString(aOptions.include);
  const black: Predicate<string> = isNotEmpty(aOptions.exclude)
    ? fromRegExpString(aOptions.exclude)
    : NEVER;

  /** Tests if the type is valid */
  function isValidType(aType: AuthoringType): boolean {
    const id = selectId(aType);
    const name = aType.name;
    // check
    return (white(id) || white(name)) && !(black(id) || black(name));
  }

  return isValidType;
}
