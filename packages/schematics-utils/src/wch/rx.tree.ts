import { Tree } from '@angular-devkit/schematics';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { first, map, mapTo } from 'rxjs/operators';

import { parseLines, serializeLines } from './../text/lines';
import { canonicalizeJSON, serializeJson } from './json';

export type TransformWithPath<T> = (
  aSource: T | undefined,
  aPath: string
) => Observable<T | undefined>;

export type TransformWithoutPath<T> = (
  aSource: T | undefined
) => Observable<T | undefined>;

export type TransformCallback<T> =
  | TransformWithPath<T>
  | TransformWithoutPath<T>;

/**
 * Reads a text file from the tree and then transforms it using the given function. If the result
 * is null or undefined, the file will be deleted, else replaced or created.
 *
 * @param aName   name of the file
 * @param aOp     the operator
 * @param aTree   the tree to work in
 */
export function rxTransformTextFile(
  aName: string,
  aOp: TransformCallback<string>,
  aTree: Tree
): Observable<string> {
  // load the file if it exists
  const buffer = aTree.read(aName);
  const value = isNotNil(buffer) ? buffer.toString() : null;
  const op: TransformWithPath<string> = aOp as any;
  // replace
  return op(value, aName).pipe(
    first(),
    map((result) =>
      isNotNil(result)
        ? isNotNil(buffer)
          ? aTree.overwrite(aName, result)
          : aTree.create(aName, result)
        : isNotNil(buffer)
        ? aTree.delete(aName)
        : undefined
    ),
    mapTo(aName)
  );
}

/**
 * Reads a JSON file from the tree and then transforms it using the given function. If the result
 * is null or undefined, the file will be deleted, else replaced or created.
 *
 * @param aName   name of the file
 * @param aOp     the operator
 * @param aTree   the tree to work in
 */
export function rxTransformJsonFile(
  aName: string,
  aOp: TransformCallback<any>,
  aTree: Tree
): Observable<string> {
  // cast
  const op: TransformWithPath<any> = aOp as any;
  // dispatch
  return rxTransformTextFile(
    aName,
    (textContent, path) =>
      op(textContent ? JSON.parse(textContent) : undefined, path).pipe(
        map(canonicalizeJSON),
        map(serializeJson)
      ),
    aTree
  );
}

/**
 * Reads a line based file from the tree and then transforms it using the given function. If the result
 * is null or undefined, the file will be deleted, else replaced or created.
 *
 * @param aName   name of the file
 * @param aOp     the operator
 * @param aTree   the tree to work in
 */
export function rxTransformLinesFile(
  aName: string,
  aOp: TransformCallback<string[]>,
  aTree: Tree
): Observable<string> {
  // cast
  const op: TransformWithPath<string[]> = aOp as any;
  // dispatch
  return rxTransformTextFile(
    aName,
    (textContent, path) =>
      op(textContent ? parseLines(textContent) : undefined, path).pipe(
        map(serializeLines)
      ),
    aTree
  );
}
