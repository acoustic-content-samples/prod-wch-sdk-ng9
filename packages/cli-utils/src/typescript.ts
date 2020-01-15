import {
  FileDescriptor,
  rxReadTextFile,
  rxWalkFiles
} from '@acoustic-content-sdk/rx-utils';
import { isNotNil, rxPipe, objectAssign } from '@acoustic-content-sdk/utils';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, map, mergeMap, reduce } from 'rxjs/operators';
import { createSourceFile, ScriptTarget, SourceFile } from 'typescript';

/**
 * Check if the file is a typescript file
 *
 * @param aFileEntry - the file entry
 * @returns true if the entry is a typescript file
 */
function isTypescriptFile(aFileEntry: FileDescriptor): boolean {
  return (
    isNotNil(aFileEntry) &&
    isNotNil(aFileEntry.stats.isFile()) &&
    isNotNil(aFileEntry.absPath) &&
    aFileEntry.absPath.endsWith('.ts')
  );
}

/**
 * Read a typescript file from a file descriptor
 *
 * @param aEntry - the entry
 * @returns an observable of the source files
 */
function rxGetSourceFileFromFileDescriptor(
  aEntry: FileDescriptor
): Observable<SourceFile> {
  // extract the path
  const { absPath } = aEntry;
  // read and parse
  return rxPipe(
    rxReadTextFile(absPath),
    map((data) => createSourceFile(absPath, data, ScriptTarget.Latest, true))
  );
}

/**
 * Reads all typescript files
 *
 * @param aRoot - root of the source files
 * @returns an observable of the source files
 */
export function rxReadSourceFiles(aRoot: string): Observable<SourceFile> {
  // iterate
  return rxPipe(
    rxWalkFiles(aRoot),
    filter(isTypescriptFile),
    mergeMap(rxGetSourceFileFromFileDescriptor)
  );
}

/**
 * Reduces all source files to an object, keyed by filename
 *
 * @returns the reducer function
 */
export function reduceSourceFiles(): OperatorFunction<
  SourceFile,
  Record<string, SourceFile>
> {
  return reduce(
    (aDst: Record<string, SourceFile>, aFile: SourceFile) =>
      objectAssign(aFile.fileName, aFile, aDst),
    {}
  );
}
