import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { load } from 'cheerio';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  rxTransformTextFile,
  TransformCallback,
  TransformWithPath
} from './rx.tree';

function _parseHtml(aString?: string): Observable<CheerioStatic> {
  return of(load(isNotNil(aString) ? aString : ''));
}

function _serializeHtml(aHtml: CheerioStatic): Observable<string> {
  return of(aHtml.html());
}

/**
 * Reads an HMTL from the tree and then transforms it using the given function. If the result
 * is null or undefined, the file will be deleted, else replaced or created.
 *
 * @param aName   name of the file
 * @param aOp     the operator
 * @param aTree   the tree to work in
 */
export function rxTransformHtmlFile(
  aName: string,
  aOp: TransformCallback<CheerioStatic>,
  aTree: Tree
): Observable<string> {
  // cast
  const op: TransformWithPath<CheerioStatic> = aOp as any;
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
