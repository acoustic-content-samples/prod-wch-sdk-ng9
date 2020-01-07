import { AUTHORING_TYPE_KIND, AuthoringType } from '@acoustic-content-sdk/api';
import {
  isNotEmpty,
  isNotNil,
  Predicate,
  reduceArray
} from '@acoustic-content-sdk/utils';

import { fromRegExpString, NEVER } from './black.white.list';
import { selectId } from './selectors';

const LAYOUT_KINDS = [
  'standalone',
  'page',
  'landing-page',
  'catalog-page',
  'email'
];

function isLayoutKind(aKind: AUTHORING_TYPE_KIND[]): boolean {
  const data = new Set<string>(aKind);
  return reduceArray(
    LAYOUT_KINDS,
    (bRes: boolean, aLayoutKind: string) => bRes || data.has(aLayoutKind),
    false
  );
}

function isStandalone(aKind?: AUTHORING_TYPE_KIND[]): boolean {
  return isNotEmpty(aKind) ? isLayoutKind(aKind) : true;
}

/**
 * Tests if an authoring type can have a layout
 *
 * @param aType  - the type
 * @returns true if the type can have a layout, else false
 */
export function canTypeHaveLayout(aType: AuthoringType): boolean {
  return isNotNil(aType) && isStandalone(aType.kind);
}

/**
 * Creates a predicate that filters authoring types
 *
 * @param aOptions - black whitelist options
 * @returns the predicate
 */
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
