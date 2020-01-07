import {
  FileDescriptor as RxFileDescriptor,
  rxPipe,
  rxReadBinaryFile,
  rxStats,
  rxWalkFiles
} from '@acoustic-content-sdk/rx-utils';
import { FALSE$, isFunction, isNotEmpty, Predicate } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { EMPTY, Observable, UnaryFunction } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { FileDescriptor } from '../file/file';
import { ensureDirPath } from '../utils/url.utils';

/**
 * Make sure the path starts with a slash
 *
 * @param aPath - the path
 * @returns the path
 */
const fixPath = (aPath: string): string =>
  isNotEmpty(aPath) ? ensureDirPath(aPath.replace(/\\/g, '/')) : '';

/**
 * Reads a binary file if it is not a directory
 *
 * @param aDesc  - the file descriptor
 * @returns the descriptor of the file
 */
function rxReadBinFile(
  aDesc: RxFileDescriptor
): Observable<FileDescriptor<Buffer>> {
  // extract some info
  const { absPath, relPath, stats } = aDesc;
  // only read files
  return stats.isFile()
    ? rxPipe(
        rxReadBinaryFile(absPath),
        map((buffer) => [fixPath(relPath), buffer])
      )
    : EMPTY;
}

/**
 * File descriptor
 */
export interface ReadDirectoryEntry {
  path: string;
  isDirectory: boolean;
}

/**
 * Function type to read a directory
 */
export type ReadDirectory = (
  aBaseDir: string,
  aAccept?: Predicate<ReadDirectoryEntry>
) => Observable<FileDescriptor<Buffer>>;

/**
 * Reads all files in the directory and all of its (accepted) subdirectories
 *
 * @param aBaseDir - root directory
 * @param aAccept - function to test if the file is accepted
 *
 * @returns a sequence of files in no particular order
 */
export function rxReadDir(
  aBaseDir: string,
  aAccept?: Predicate<ReadDirectoryEntry>
): Observable<FileDescriptor<Buffer>> {
  // stat the root
  const isDir$ = rxPipe(
    rxStats(aBaseDir),
    map((stats) => stats.isDirectory()),
    catchError(() => FALSE$)
  );
  // predicate
  const accept: UnaryFunction<RxFileDescriptor, boolean> = isFunction(aAccept)
    ? (desc) =>
        aAccept({ path: desc.absPath, isDirectory: desc.stats.isDirectory() })
    : () => true;
  // read the directory and for each file the file content
  return rxPipe(
    isDir$,
    mergeMap((isDir) => (isDir ? rxWalkFiles(aBaseDir, accept) : EMPTY)),
    mergeMap(rxReadBinFile)
  );
}

export function createReadDirectory(aRoot: string): ReadDirectory {
  return (aBaseDir: string, aAccept?: Predicate<ReadDirectoryEntry>) =>
    rxReadDir(join(aRoot, aBaseDir), aAccept);
}
