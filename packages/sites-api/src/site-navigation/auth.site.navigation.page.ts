import {
  AuthoringContentItem,
  AuthoringGroup,
  AuthoringReference,
  AuthoringText
} from '@acoustic-content-sdk/api';
import {
  isAuthoringGroup,
  isAuthoringReference,
  isAuthoringText,
  isNotNil,
  isOptional
} from '@acoustic-content-sdk/utils';
import { AuthoringPageDescriptor } from '../elements/page-descriptor/auth.page.descriptor.type';

export const KEY_ELEMENTS = 'elements';
export const KEY_DESCRIPTOR = 'descriptor';
export const KEY_KIND = 'kind';
export const KIND_PAGE = 'page';

export interface AuthoringPageElements {
  [KEY_DESCRIPTOR]?: AuthoringGroup<AuthoringPageDescriptor>;
}

export function isAuthoringPageElements(
  value: any
): value is AuthoringPageElements {
  return isNotNil(value) && isOptional(value[KEY_DESCRIPTOR], isAuthoringGroup);
}

export interface AuthoringPage extends AuthoringContentItem {
  [KEY_ELEMENTS]: AuthoringPageElements;
}

export function isKindPage(value: string[]): boolean {
  return value.includes(KIND_PAGE);
}

export function isAuthoringPage(value: any): value is AuthoringPage {
  return (
    isNotNil(value) &&
    isKindPage(value[KEY_KIND]) &&
    isAuthoringPageElements(value[KEY_ELEMENTS])
  );
}

export function isAuthoringSiteNavigationPage(
  value: any
): value is AuthoringPage {
  return isAuthoringPage(value);
}
