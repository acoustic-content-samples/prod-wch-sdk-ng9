import { Path } from '@angular-devkit/core';
import { FileEntry, Tree } from '@angular-devkit/schematics';
import { getSourceFileFromFileEntry } from '@acoustic-content-sdk/schematics-utils';
import { isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { asyncScheduler, Observable } from 'rxjs';
import { filter, map, observeOn } from 'rxjs/operators';
import { SourceFile } from 'typescript';

import { rxWalkFiles } from './rx.dir';

/**
 * Check if the file is a typescript file
 *
 * @param aFileEntry    the file entry
 * @returns true if the entry is a typescript file
 */
function isTypescriptFile(aFileEntry: FileEntry): boolean {
  return (
    isNotNil(aFileEntry) &&
    isNotNil(aFileEntry.content) &&
    aFileEntry.path.endsWith('.ts')
  );
}

/**
 * Reads all typescript files
 */
export function rxReadSourceFiles(
  aRoot: Path,
  aTree: Tree
): Observable<SourceFile> {
  // iterate
  return rxPipe(
    rxWalkFiles(aRoot, aTree),
    observeOn(asyncScheduler),
    filter(isTypescriptFile),
    map(getSourceFileFromFileEntry)
  );
}

/**
 * Reads all typescript files
 */
export function readSourceFiles(
  aRoot: Path,
  aTree: Tree
): Record<string, SourceFile> {
  // iterate
  const result: Record<string, SourceFile> = {};
  // parse
  const dir = aTree.getDir(aRoot);
  dir.visit((path: Path, entry?: FileEntry) => {
    // sanity check
    if (isTypescriptFile(entry)) {
      result[path] = getSourceFileFromFileEntry(entry);
    }
  });
  // ok
  return result;
}
