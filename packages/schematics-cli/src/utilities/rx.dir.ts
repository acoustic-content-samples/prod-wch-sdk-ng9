import { join, normalize, Path } from '@angular-devkit/core';
import { FileEntry, Tree } from '@angular-devkit/schematics';
import { filterArray, isNotEmpty, isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Locates the first directory that contains a certain file
 *
 * @param aSources  the list of source files to check
 * @param aRelPath  the relative path
 *
 * @return the observable
 */
export function rxFindDir(
  aSources: Observable<string[]>,
  aRelPath: string,
  aTree: Tree
): Observable<Path> {
  // map each source to a check
  return rxPipe(
    aSources,
    map((sources) => {
      const result = filterArray(sources, (dir) =>
        aTree.exists(join(normalize(dir), aRelPath))
      );
      return normalize(isNotEmpty(result) ? result[0] : sources[0]);
    })
  );
}

export function rxWalkFiles(
  aRoot: Path,
  aTree: Tree
): Observable<Readonly<FileEntry>> {
  const dir = aTree.getDir(aRoot);
  // iterate over the directory
  return Observable.create((aObserver: Observer<FileEntry>) => {
    // visit all files
    dir.visit((path: Path, entry?: Readonly<FileEntry>) => {
      if (isNotNil(entry)) {
        aObserver.next(entry);
      }
    });
    // done
    aObserver.complete();
  });
}
