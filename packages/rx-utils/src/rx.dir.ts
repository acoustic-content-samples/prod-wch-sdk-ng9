import { join, normalize, resolve } from 'path';
import { EMPTY, forkJoin, Observable, of, UnaryFunction } from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';
import { rxStats } from './rx.walk';

/**
 * Locates the first directory that contains a certain file
 *
 * @param aSources - the list of source files to check
 * @param aRelPath - the relative path
 *
 * @returns the observable
 */
export function rxFindDir(
  aSources: Observable<string[]>,
  aRelPath: string,
  aMkdirp: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // map each source to a check
  return aSources.pipe(
    mergeMap(sources =>
      forkJoin(
        sources.map(dir =>
          rxStats(join(dir, aRelPath)).pipe(
            mapTo(dir),
            catchError(err => of(null))
          )
        )
      ).pipe(
        map(result => result.filter(Boolean)),
        map(result => (result.length > 0 ? result[0]! : sources[0]!))
      )
    ),
    mergeMap(aMkdirp)
  );
}

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
    mergeMap(bFlag =>
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
