import {
  isEqual,
  isNil,
  isNotNil,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { Tree } from '@angular-devkit/schematics';
import { JSDOM } from 'jsdom';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {
  rxTransformTextFile,
  TransformCallback,
  TransformWithPath
} from './rx.tree';

const KEY_JSDOM = Symbol();

function parseHtml(aString?: string): Observable<Document> {
  // parse the string and return an object
  const jsdom = new JSDOM(aString);
  const doc = jsdom.window.document;
  doc[KEY_JSDOM] = jsdom;
  // return the document
  return of(doc);
}

function serializeHtml(aHtml: Document): Observable<string> {
  // sanity check
  if (isNil(aHtml)) {
    return UNDEFINED$;
  }
  // check of we can use the serializer
  const jsdom: JSDOM = aHtml[KEY_JSDOM] as any;
  // returns the serialized document
  return of(
    isNotNil(jsdom) && isEqual(jsdom.window.document, aHtml)
      ? jsdom.serialize()
      : aHtml.documentElement.outerHTML
  );
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
