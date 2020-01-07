import {
  AuthoringContentItem,
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringType
} from '@acoustic-content-sdk/api';
import { jsonParse, objectAssign, rxPipe } from '@acoustic-content-sdk/utils';
import { Observable, OperatorFunction, UnaryFunction } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

import { ReadDirectory, ReadDirectoryEntry } from '../dir/dir';
import { CONTENT_FOLDER } from './content';
import { LAYOUT_MAPPINGS_FOLDER } from './layout.mappings';
import { LAYOUTS_FOLDER } from './layouts';
import { selectId } from './selectors';
import { TYPES_FOLDER } from './types';
import { ensureDirPath } from './url.utils';

function selectSimpleId(
  aItem: AuthoringLayoutItem | AuthoringLayoutMapping
): string {
  return aItem.id;
}

export interface JsonEntry<T> {
  id: string;
  path: string;
  entry: T;
}

export type JsonEntryMap<T> = Record<string, JsonEntry<T>>;

/**
 * Tests if a file is either a directory or a JSON file
 *
 * @param aFile - the descriptor
 *
 * @returns true if we accept the file or directory
 */
export function acceptJsonFile(aFile: ReadDirectoryEntry): boolean {
  return aFile.isDirectory || aFile.path.endsWith('.json');
}

/**
 * Reads the files in a row
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns observable of the involved files
 */
function rxReadAllJsonFiles<T>(
  aRoot: string,
  aTree: ReadDirectory,
  aId: UnaryFunction<T, string>
): Observable<JsonEntry<T>> {
  // iterate
  return rxPipe(
    aTree(aRoot, acceptJsonFile),
    map(([path, content]) => {
      // parse  the data
      const entry = jsonParse<any>(content.toString());
      // parse
      return {
        id: aId(entry),
        path,
        entry: { ...entry, path }
      };
    }),
    map((entry) => ({ ...entry }))
  );
}

function reduceToObject<T>(): OperatorFunction<JsonEntry<T>, JsonEntryMap<T>> {
  // reduce
  return reduce(
    (res: JsonEntryMap<T>, entry: JsonEntry<T>) =>
      objectAssign(entry.id, entry, res),
    {}
  );
}

/**
 * Reads the authoring types from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringTypes(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntry<AuthoringType>> {
  // fix the path
  const root = ensureDirPath(aRoot);
  // scan
  return rxReadAllJsonFiles<AuthoringType>(
    `${root}/${TYPES_FOLDER}`,
    aTree,
    selectId
  );
}

/**
 * Reads the authoring types from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringContent(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntry<AuthoringContentItem>> {
  // fix the path
  const root = ensureDirPath(aRoot);
  // scan
  return rxReadAllJsonFiles<AuthoringContentItem>(
    `${root}/${CONTENT_FOLDER}`,
    aTree,
    selectId
  );
}

/**
 * Reads the authoring types from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxReadAuthoringTypes(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntryMap<AuthoringType>> {
  // reduce
  return rxPipe(rxFindAuthoringTypes(aRoot, aTree), reduceToObject());
}

/**
 * Reads the authoring content from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxReadAuthoringContent(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntryMap<AuthoringContentItem>> {
  // reduce
  return rxPipe(rxFindAuthoringContent(aRoot, aTree), reduceToObject());
}

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringLayouts(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntry<AuthoringLayoutItem>> {
  // fix the path
  const root = ensureDirPath(aRoot);
  // scan
  return rxReadAllJsonFiles<AuthoringLayoutItem>(
    `${root}/${LAYOUTS_FOLDER}`,
    aTree,
    selectSimpleId
  );
}

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxReadAuthoringLayouts(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntryMap<AuthoringLayoutItem>> {
  // reduce
  return rxPipe(rxFindAuthoringLayouts(aRoot, aTree), reduceToObject());
}

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringLayoutMappings(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntry<AuthoringLayoutMapping>> {
  // fix the path
  const root = ensureDirPath(aRoot);
  // read all files
  return rxReadAllJsonFiles<AuthoringLayoutMapping>(
    `${root}/${LAYOUT_MAPPINGS_FOLDER}`,
    aTree,
    selectSimpleId
  );
}

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxReadAuthoringLayoutMappings(
  aRoot: string,
  aTree: ReadDirectory
): Observable<JsonEntryMap<AuthoringLayoutMapping>> {
  // reduce
  return rxPipe(rxFindAuthoringLayoutMappings(aRoot, aTree), reduceToObject());
}
