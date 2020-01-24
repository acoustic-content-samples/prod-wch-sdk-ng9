/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { AuthoringReference, AuthoringText } from '@acoustic-content-sdk/api';
import {
  isNotNil,
  isOptional,
  isOptionalArrayOf,
  isString,
  isAuthoringReference
} from '@acoustic-content-sdk/utils';

const KEY_TITLE = 'title';
const KEY_DESCRIPTION = 'description';
const KEY_KEYWORDS = 'keywords';
const KEY_SITE = 'site';
const KEY_CANONICALPATH = 'canonicalpath';
const KEY_ALTERNATIVEPATH = 'alternaviepath';

export interface AuthoringPageDescriptor {
  [KEY_TITLE]: AuthoringText;
  [KEY_DESCRIPTION]?: AuthoringText;
  [KEY_KEYWORDS]?: AuthoringText;
  [KEY_SITE]: AuthoringReference;
  [KEY_CANONICALPATH]: AuthoringText;
  [KEY_ALTERNATIVEPATH]?: AuthoringText;
}

export function isAuthoringPageDescriptor(
  value: any
): value is AuthoringPageDescriptor {
  return (
    isNotNil(value) &&
    isString(value[KEY_TITLE]) &&
    isOptional(value[KEY_DESCRIPTION], isString) &&
    isOptionalArrayOf(value[KEY_KEYWORDS], isString) &&
    isAuthoringReference(value[KEY_SITE]) &&
    isString(value[KEY_CANONICALPATH]) &&
    isOptionalArrayOf(value[KEY_ALTERNATIVEPATH], isString)
  );
}
