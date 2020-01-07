import {
  AuthoringContentItem,
  AuthoringReference,
  AuthoringText
} from '@acoustic-content-sdk/api';
import {
  isAuthoringReference,
  isAuthoringText,
  isNotNil,
  isOptional
} from '@acoustic-content-sdk/utils';

import { KEY_TITLE } from '../elements/page-descriptor/page.descriptor.type';
import { KEY_ELEMENTS } from '../site-navigation/auth.site.navigation.page';

export const KEY_NAVIGATION = 'navigation';

export interface AuthoringSiteElements {
  [KEY_NAVIGATION]: AuthoringReference;
  [KEY_TITLE]?: AuthoringText;
}

export interface AuthoringSite extends AuthoringContentItem {
  [KEY_ELEMENTS]: AuthoringSiteElements;
}

function isAuthoringPageElements(value: any): value is AuthoringSiteElements {
  return (
    isNotNil(value) &&
    isAuthoringReference(value[KEY_NAVIGATION]) &&
    isOptional(value[KEY_TITLE], isAuthoringText)
  );
}

export function isAuthoringSite(value: any): value is AuthoringSite {
  return isNotNil(value) && isAuthoringPageElements(value[KEY_ELEMENTS]);
}
