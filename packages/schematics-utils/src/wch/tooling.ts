import { join, Path } from '@angular-devkit/core';
import { FileEntry, Tree } from '@angular-devkit/schematics';
import {
  anyToBuffer,
  createFileDescriptor,
  FileDescriptor,
  ReadBuffer,
  ReadDirectory,
  ReadDirectoryEntry,
  ReadTextFile,
  WriteBuffer,
  WriteTextFile
} from '@acoustic-content-sdk/tooling';
import {
  isFunction,
  isNil,
  isNotNil,
  Predicate,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  defer,
  identity,
  MonoTypeOperatorFunction,
  Observable,
  Observer,
  of,
  throwError,
  UnaryFunction
} from 'rxjs';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { VError } from 'verror';

import { safeWrite } from './rx.copy';

/**
 * Loads textual content from the tree
 *
 * @param aName - name
 * @param aHost - host
 *
 * @returns the observable of the content or a failed observable
 */
function bufferFromTree(aName: string, aHost: Tree): Observable<Buffer> {
  // load the entry
  const fileEntry = aHost.get(aName);

  if (isNil(fileEntry) || isNil(fileEntry.content)) {
    return throwError(new VError(`The file (${aName}) does not exist.`));
  }

  return of(fileEntry.content);
}

/**
 * Loads textual content from the tree
 *
 * @param aName - name
 * @param aHost - host
 *
 * @returns the observable of the content or a failed observable
 */
const textFromTree = (aName: string, aHost: Tree): Observable<string> =>
  rxPipe(bufferFromTree(aName, aHost), map((data) => data.toString()));

function isRoot(aRoot?: Path): boolean {
  return isNotNil(aRoot) && aRoot !== '/';
}

function addRoot(aRoot?: Path): UnaryFunction<string, string> {
  return isRoot(aRoot) ? (aName: string) => join(aRoot, aName) : identity;
}

function removeRoot(aRoot?: Path): UnaryFunction<string, string> {
  // check if we have a root
  if (isRoot(aRoot)) {
    // strip the prefix
    const len = aRoot.length;
    return (aName) => aName.substr(len);
  }
  // nothing to do
  return identity;
}

/**
 * Constructs the ReadTextFile callback on top of a host
 *
 * @param aHost - the host
 * @param aRoot - optionally a root path
 *
 * @returns the callback
 */
export function readTextFileOnTree(aHost: Tree, aRoot?: Path): ReadTextFile {
  // root callback
  const addPath = addRoot(aRoot);
  // read the file
  return (aName: string) => defer(() => textFromTree(addPath(aName), aHost));
}

/**
 * Constructs the ReadBuffer callback on top of a host
 *
 * @param aHost - the host
 * @param aRoot - optionally a root path
 *
 * @returns the callback
 */
export function readBufferOnTree(aHost: Tree, aRoot?: Path): ReadBuffer {
  // root callback
  const addPath = addRoot(aRoot);
  // read the file
  return (aName: string) => defer(() => bufferFromTree(addPath(aName), aHost));
}

function directoryOnTree(
  aPath: string,
  aHost: Tree,
  aAccept: Predicate<ReadDirectoryEntry>,
  aRemoveRoot: UnaryFunction<string, string>
) {
  // predicate
  const accept = isFunction(aAccept) ? aAccept : () => true;
  // construct the new observable
  return new Observable<FileDescriptor<Buffer>>(
    (aObserver: Observer<FileDescriptor<Buffer>>) => {
      // open the subdirectory
      const dir = aHost.getDir(aPath);
      if (isNotNil(dir)) {
        // visit
        dir.visit((path: Path, entry?: Readonly<FileEntry>) => {
          // fix the path
          const relPath = aRemoveRoot(path);
          // test the predicate
          if (
            accept({
              path: relPath,
              isDirectory: isNotNil(entry) && isNotNil(entry.content)
            })
          ) {
            // dispatch
            aObserver.next(createFileDescriptor(relPath, entry.content));
          }
        });
      }
      // done
      aObserver.complete();
    }
  );
}

/**
 * Creates a function callback that reads files from a host
 *
 * @param aHost - the host
 * @param aRoot - optional root path
 *
 * @returns the callback
 */
export function readDirectoryOnTree(aHost: Tree, aRoot?: Path): ReadDirectory {
  // root callback
  const addPath = addRoot(aRoot);
  const delPath = removeRoot(aRoot);
  // the function
  return (aName: string, aAccept: Predicate<ReadDirectoryEntry>) =>
    directoryOnTree(addPath(aName), aHost, aAccept, delPath);
}

function writeToHost(
  aName: string,
  aValue: string | Buffer,
  aHost: Tree
): Observable<string> {
  // write
  safeWrite(aName, aValue, aHost);
  // ok
  return of(aName);
}

function writeTextOrBufferFileOnTree(aHost: Tree, aRoot?: Path) {
  // root callback
  const addPath = addRoot(aRoot);
  // the actual function
  return (aName, aValue) =>
    defer(() => writeToHost(addPath(aName), aValue, aHost));
}

/**
 * Constructs a WriteTextFile on top of a host
 *
 * @param aHost - the host
 * @returns the callback
 */
export const writeTextFileOnTree: (
  aHost: Tree,
  aRoot?: Path
) => WriteTextFile = writeTextOrBufferFileOnTree;

/**
 * Constructs a WriteTextFile on top of a host
 *
 * @param aHost - the host
 * @returns the callback
 */
export const writeBufferOnTree: (
  aHost: Tree,
  aRoot?: Path
) => WriteBuffer = writeTextOrBufferFileOnTree;

/**
 * Returns an operator that writes all file descriptors to disk
 *
 * @param aRoot - the base of the target file system
 *
 * @returns the operator
 */
export function writeFilesOnTree<T>(
  aHost: Tree,
  aRoot?: Path
): MonoTypeOperatorFunction<FileDescriptor<T>> {
  // callback
  const writeToTree = writeBufferOnTree(aHost, aRoot);
  // write file handler
  const write = ([name, data]) =>
    rxPipe(writeToTree(name, anyToBuffer(data)), mapTo(data));
  // actually do write
  return mergeMap(write);
}
