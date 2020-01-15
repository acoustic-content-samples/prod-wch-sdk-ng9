import { normalize, resolve } from 'path';
import { EMPTY, Observable, of, UnaryFunction } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * Searches the parent directory for a match, if such a parent exists
 *
 * @param aSrcDir - the source directory
 * @param aPredicate - the predicate
 *
 * @returns the potentially matching source directory
 */
function _rxLocateParentDir(
  aSrcDir: string,
  aPredicate: UnaryFunction<string, Observable<boolean>>
): Observable<string> {
  // get the parent dir
  const parent = resolve(aSrcDir, '..');
  if (parent && parent !== aSrcDir) {
    // recurse
    return _rxLocateDir(parent, aPredicate);
  }
  // nothing
  return EMPTY;
}

/**
 * Locates the directory across the parent chain for which the predicate matches
 *
 * @param aSrcDir - the source directory
 * @param aPredicate - the predicate to check
 *
 * @returns the matching directory
 */
function _rxLocateDir(
  aSrcDir: string,
  aPredicate: UnaryFunction<string, Observable<boolean>>
): Observable<string> {
  // check the current dir
  return aPredicate(aSrcDir).pipe(
    mergeMap((bFlag) =>
      bFlag ? of(aSrcDir) : _rxLocateParentDir(aSrcDir, aPredicate)
    )
  );
}

/**
 * Locates the directory across the parent chain for which the predicate matches
 *
 * @param aSrcDir - the source directory
 * @param aPredicate - the predicate to check
 *
 * @returns the matching directory
 */
export function rxLocateDir(
  aSrcDir: string,
  aPredicate: UnaryFunction<string, Observable<boolean>>
): Observable<string> {
  // dispatch
  return _rxLocateDir(normalize(aSrcDir), aPredicate);
}
