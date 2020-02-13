import { isNil, rxPipe, UNDEFINED$ } from '@acoustic-content-sdk/utils';
import { Tree } from '@angular-devkit/schematics';
import { JSDOM } from 'jsdom';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {
  rxTransformTextFile,
  TransformCallback,
  TransformWithPath
} from './rx.tree';

function parseHtml(aString?: string): Observable<Document> {
  const { window } = new JSDOM(aString);
  return of(window.document);
}

function serializeHtml(aHtml: Document): Observable<string> {
  return of(aHtml.documentElement.outerHTML);
}

function parseHtmlFragment(aString?: string): Observable<DocumentFragment> {
  return of(JSDOM.fragment(aString));
}

function serializeHtmlFragment(
  aFragment?: DocumentFragment
): Observable<string> {
  // sanity check
  if (isNil(aFragment)) {
    return UNDEFINED$;
  }
  const doc = aFragment.ownerDocument;
  const div = doc.createElement('div');
  div.appendChild(aFragment.cloneNode(true));

  return of(div.innerHTML);
}

/**
 * Reads an HMTL from the tree and then transforms it using the given function. If the result
 * is null or undefined, the file will be deleted, else replaced or created.
 *
 * @param aName - name of the file
 * @param aOp - the operator
 * @param aTree - the tree to work in
 */
export function rxTransformHtmlFile(
  aName: string,
  aOp: TransformCallback<Document>,
  aTree: Tree
): Observable<string> {
  // cast
  const op: TransformWithPath<Document> = aOp as any;
  // dispatch
  return rxTransformTextFile(
    aName,
    (textContent, path) =>
      rxPipe(
        parseHtml(textContent),
        mergeMap((html) => op(html, path)),
        mergeMap(serializeHtml)
      ),
    aTree
  );
}

/**
 * Reads an HMTL from the tree and then transforms it using the given function. If the result
 * is null or undefined, the file will be deleted, else replaced or created.
 *
 * @param aName - name of the file
 * @param aOp - the operator
 * @param aTree - the tree to work in
 */
export function rxTransformHtmlFragment(
  aName: string,
  aOp: TransformCallback<DocumentFragment>,
  aTree: Tree
): Observable<string> {
  // cast
  const op: TransformWithPath<DocumentFragment> = aOp as any;
  // dispatch
  return rxTransformTextFile(
    aName,
    (textContent, path) =>
      rxPipe(
        parseHtmlFragment(textContent),
        mergeMap((html) => op(html, path)),
        mergeMap(serializeHtmlFragment)
      ),
    aTree
  );
}
