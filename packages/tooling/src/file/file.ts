import {
  rxLocateDir,
  rxMkDirs,
  rxReadBinaryFile,
  rxReadTextFile,
  rxStats
} from '@acoustic-content-sdk/rx-utils';
import {
  BiFunction,
  FALSE$,
  isNotNil,
  isString,
  jsonParse,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { PathLike, readFile, writeFile } from 'fs';
import { join, normalize, parse } from 'path';
import { cwd } from 'process';
import {
  bindNodeCallback,
  EMPTY,
  MonoTypeOperatorFunction,
  Observable,
  UnaryFunction
} from 'rxjs';
import { catchError, map, mapTo, mergeMap, mergeMapTo } from 'rxjs/operators';

import { serializeJson } from '../utils/json';

export type ReadTextFile = UnaryFunction<string, Observable<string>>;
export type ReadBuffer = UnaryFunction<string, Observable<Buffer>>;
export type WriteTextFile = BiFunction<string, string, Observable<string>>;
export type WriteBuffer = BiFunction<string, Buffer, Observable<string>>;

function _stringify(aData: any): string {
  return JSON.stringify(aData, undefined, 2);
}

/**
 * File descriptor, first element is path, second is content
 */
export type FileDescriptor<T> = [string, T];

export function createFileDescriptor<T>(
  aName: string,
  aValue: T
): FileDescriptor<T> {
  return [aName, aValue];
}

/**
 * Reads a JSON file on top of a text callback
 *
 * @param aFile - filename
 * @param aHost - callback host
 *
 * @returns the JSON file
 */
export function rxReadJsonFile<T>(
  aFile: string,
  aHost: ReadTextFile
): Observable<T> {
  return rxPipe(aHost(aFile), map<string, T>(jsonParse));
}

/**
 * Reads a JSON file on top of a text callback
 *
 * @param aFile - filename
 * @param aHost - callback host
 *
 * @returns the JSON file
 */
export function rxReadBuffer<T>(
  aFile: string,
  aHost: ReadTextFile
): Observable<T> {
  return rxPipe(aHost(aFile), map<string, T>(jsonParse));
}

/**
 * Persist a JSON file
 *
 * @param aName   - name of the file
 * @param aValue  - value of the file
 * @param aHost - host that can write text files
 *
 * @returns the name of the file
 */
export function rxWriteJsonFile(
  aName: string,
  aValue: any,
  aHost: WriteTextFile
): Observable<string> {
  // persist the json file
  return aHost(aName, _stringify(aValue));
}

/**
 * Persists a file descriptor
 *
 * @param aDesc  - the descriptor
 * @param aHost  - host
 *
 * @returns the descriptor
 */
export function rxWriteFileDescriptor<T>(
  aDesc: FileDescriptor<T>,
  aHost: WriteTextFile
): Observable<FileDescriptor<T>> {
  // data
  const [path, data] = aDesc;
  // check for the operation
  return rxPipe(
    isString(data) ? aHost(path, data) : rxWriteJsonFile(path, data, aHost),
    mapTo(aDesc)
  );
}

/**
 * Tests if a file exists
 *
 * @param aFile - the file to check
 * @param aRead  - the callback
 *
 * @return true if the file exists, else false
 */
export const rxExists = (
  aFile: string,
  aRead: UnaryFunction<string, Observable<any>>
): Observable<boolean> =>
  rxPipe(
    aRead(aFile),
    map(isNotNil),
    catchError(() => FALSE$)
  );

/**
 * Tests if we have a package.json in the root directory
 *
 * @param aDir - the directory to check
 * @returns result of the check
 */
function rxFindPackage(aDir: string): Observable<boolean> {
  // name
  const pkg = join(aDir, 'package.json');
  return rxPipe(
    rxStats(pkg),
    map((s) => s.isFile()),
    catchError((err) => FALSE$)
  );
}

/**
 * Locates the application root directory based on the working directory
 *
 * @param aBaseDir - optionally the base directory, defaults to the current working dir
 * @returns the application root
 */
export function rxLocateRootDir(aBaseDir: string = cwd()): Observable<string> {
  return rxLocateDir(aBaseDir, rxFindPackage);
}

/**
 * Constructs the read text file callback
 *
 * @param aRoot - root directory
 * @returns the callback
 */
export const createReadTextFile = (aRoot: string): ReadTextFile => (aFile) =>
  rxReadTextFile(join(aRoot, aFile));

/**
 * Constructs the read buffer  callback
 *
 * @param aRoot - root directory
 * @returns the callback
 */
export const createReadBuffer = (aRoot: string): ReadBuffer => (aFile) =>
  rxReadBinaryFile(join(aRoot, aFile));

// write callback
const rxWrite = bindNodeCallback<PathLike, string | Buffer>(writeFile);
const rxRead = bindNodeCallback<PathLike, Buffer>(readFile);

/**
 * Converts an arbitrary value into a buffer
 *
 * @param aValue - the value
 * @returns the buffer
 */
export const anyToBuffer = (aValue: any): Buffer =>
  isString(aValue)
    ? Buffer.from(aValue)
    : Buffer.isBuffer(aValue)
    ? aValue
    : Buffer.from(serializeJson(aValue));

// write the file
function doWriteFile<T>(
  aAbsName: string,
  aDst: FileDescriptor<T>,
  aOverride: boolean
): Observable<FileDescriptor<T>> {
  // decompose
  const [, data] = aDst;
  // get the original buffer
  const buf = anyToBuffer(data);
  // read the content
  const isSame$ = rxPipe(
    rxRead(aAbsName),
    map((read) => isNotNil(read) && (!aOverride || read.equals(buf))),
    catchError(() => FALSE$)
  );
  // write
  const written$ = rxPipe(rxWrite(aAbsName, buf), mapTo(aDst));
  // only write if different
  return rxPipe(
    isSame$,
    mergeMap((same) => (!same ? written$ : EMPTY))
  );
}

/**
 * Write file and make sure to attach to a pending write operation
 *
 * @param aRoot - the target root
 * @param aDesc - file descriptor to write
 * @param aOverride - override flag
 *
 * @returns the final observable
 */
function ensureWriteFile<T>(
  aRoot: string,
  aDesc: FileDescriptor<T>,
  aMkdirs: UnaryFunction<string, Observable<string>>,
  aOverride: boolean
): Observable<FileDescriptor<T>> {
  // decompose
  const [name] = aDesc;
  // build the full path
  const absPath = normalize(join(aRoot, name));
  const { dir } = parse(absPath);
  // do write
  return rxPipe(
    aMkdirs(dir),
    mergeMapTo(doWriteFile(absPath, aDesc, aOverride))
  );
}

/**
 * Returns an operator that writes all file descriptors to disk
 *
 * @param aRoot - the base of the target file system
 * @param aOverride - override flag
 *
 * @returns the operator
 */
export function writeFiles<T>(
  aRoot: string,
  aOverride: boolean = true
): MonoTypeOperatorFunction<FileDescriptor<T>> {
  // generate directories
  const mkdirs = rxMkDirs();

  // write file handler
  const write = (aDesc: FileDescriptor<T>) =>
    ensureWriteFile(aRoot, aDesc, mkdirs, aOverride);

  return mergeMap(write);
}
