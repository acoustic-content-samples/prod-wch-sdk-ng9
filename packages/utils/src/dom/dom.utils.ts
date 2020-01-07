import { UNDEFINED } from '../js/js.core';
import { UNDEFINED_TYPE } from './../js/js.utils';
import { isNotNil } from './../predicates/predicates';
import { pluckProperty } from '../js/pluck';

export const pluckHref = pluckProperty<
  HTMLAnchorElement | HTMLLinkElement | URL,
  'href'
>('href');

/**
 * Tree-shakeable accessor to an element
 */
export const elementById = <T extends HTMLElement>(
  aId: string,
  aDocument: Document
): T =>
  isNotNil(aDocument) ? (aDocument.getElementById(aId) as T) : UNDEFINED;

/**
 * Returns a window object if one is available
 *
 * @param aWindow - the window object
 * @returns the resolved window object, using the global variable as a default
 */
export function getWindow(aWindow?: Window): Window {
  return isNotNil(aWindow)
    ? aWindow
    : typeof window !== UNDEFINED_TYPE
    ? window
    : UNDEFINED;
}

/**
 * Returns a document object if one is available
 *
 * @param aDocument - the document object
 * @param aWindow - optional window object
 *
 * @returns the resolved document object, using the global variable as a default
 */
export function getDocument(aDocument?: Document, aWindow?: Window): Document {
  return isNotNil(aDocument)
    ? aDocument
    : typeof document !== UNDEFINED_TYPE
    ? document
    : isNotNil(aWindow)
    ? aWindow.document
    : typeof window !== UNDEFINED_TYPE
    ? window.document
    : UNDEFINED;
}
