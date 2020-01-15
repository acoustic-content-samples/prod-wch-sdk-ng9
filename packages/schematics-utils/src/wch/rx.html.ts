import { Tree } from '@angular-devkit/schematics';
import { JSDOM } from 'jsdom';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  rxTransformTextFile,
  TransformCallback,
  TransformWithPath
} from './rx.tree';

function _parseHtml(aString?: string): Observable<Document> {
  const { window } = new JSDOM(aString);
  return of(window.document);
}

function _serializeHtml(aHtml: Document): Observable<string> {
  return of(aHtml.documentElement.outerHTML);
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
      _parseHtml(textContent).pipe(
        switchMap((html) => op(html, path)),
        switchMap(_serializeHtml)
      ),
    aTree
  );
}
