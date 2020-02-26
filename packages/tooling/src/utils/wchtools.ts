import {
  AuthoringAsset,
  AuthoringContentItem,
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringType,
  CLASSIFICATION_ASSET,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING
} from '@acoustic-content-sdk/api';
import {
  Credentials,
  wchGetCredentials
} from '@acoustic-content-sdk/cli-credentials';
import {
  assertObject,
  isNotNil,
  isString,
  jsonParse
} from '@acoustic-content-sdk/utils';
import { from, Observable, OperatorFunction, pipe } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

import {
  createFileDescriptor,
  FileDescriptor,
  isFileDescriptor
} from '../file/file';
import { cleanupFields } from './json';

export const wchToolsGetCredentials = (
  aApiUrl: string
): Observable<Credentials> => from(wchGetCredentials(aApiUrl));

export const WCHTOOLS_FOLDER_CONTENT = 'content';
export const WCHTOOLS_FOLDER_CONTENT_TYPE = 'types';
export const WCHTOOLS_FOLDER_LAYOUT = 'layouts';
export const WCHTOOLS_FOLDER_LAYOUT_MAPPING = 'layout-mappings';
export const WCHTOOLS_FOLDER_ASSET = 'assets';

const CLASSIFICATION_TO_FOLDER = {
  [CLASSIFICATION_CONTENT]: WCHTOOLS_FOLDER_CONTENT,
  [CLASSIFICATION_CONTENT_TYPE]: WCHTOOLS_FOLDER_CONTENT_TYPE,
  [CLASSIFICATION_LAYOUT]: WCHTOOLS_FOLDER_LAYOUT,
  [CLASSIFICATION_LAYOUT_MAPPING]: WCHTOOLS_FOLDER_LAYOUT_MAPPING,
  [CLASSIFICATION_ASSET]: WCHTOOLS_FOLDER_ASSET
};

const METADATA_PREFIX = {
  [CLASSIFICATION_CONTENT]: 'c',
  [CLASSIFICATION_CONTENT_TYPE]: 't',
  [CLASSIFICATION_ASSET]: 'a'
};

export type AuthoringItem =
  | AuthoringContentItem
  | AuthoringType
  | AuthoringLayoutItem
  | AuthoringLayoutMapping
  | AuthoringAsset;

function createFileName(aItem: AuthoringItem): string {
  // classification
  const { classification, id, path } = aItem;
  // get the folder name
  const folder = CLASSIFICATION_TO_FOLDER[classification] || classification;
  // get the metdata stuff
  const prefix = METADATA_PREFIX[classification];
  const suffix = isNotNil(prefix) ? `_${prefix}md` : '';
  // path
  const filename =
    classification === CLASSIFICATION_ASSET
      ? `/${path || id}${suffix}.json`
      : path || `/${id}${suffix}.json`;
  // build the filename
  return `/${folder}${filename}`;
}

/**
 * Constructs a file descriptor from the item
 *
 * @param aItem - the authoring item
 * @returns the descriptor
 */
export function wchToolsFileDescriptor<T extends AuthoringItem>(
  aItem: T | FileDescriptor<T>
): FileDescriptor<T> {
  return isFileDescriptor(aItem)
    ? aItem
    : createFileDescriptor(createFileName(aItem), aItem);
}

export function wchToolsCleanup<T>(
  aItem: FileDescriptor<T>
): FileDescriptor<T> {
  const [name, data] = aItem;
  return createFileDescriptor(name, cleanupFields(data));
}

declare type Manifest = Record<string, Record<string, any>>;

/**
 * Condenses the content of a file descriptor down to a manifest
 *
 * @param aDst - the manifest
 * @param aSrc - the file descriptor
 *
 * @returns the target manifest
 */
function reduceManifest(aDst: Manifest, aSrc: FileDescriptor<any>): Manifest {
  // decode
  const [path, data] = aSrc;
  // check the first segment
  const startIdx = path.startsWith('/') ? 1 : 0;
  const endIdx = path.indexOf('/', startIdx);
  // the prefix
  const prefix = path.substring(startIdx, endIdx);
  // get the bucket
  const bucket = assertObject<Record<string, any>>(prefix, aDst);
  // for assets use the path
  if (prefix === WCHTOOLS_FOLDER_ASSET) {
    // extract the rel path
    const relPath = path.substr(endIdx);
    // add the path
    bucket[relPath] = { path: relPath };
  } else {
    // decode the payload as json
    const { id, name } = Buffer.isBuffer(data)
      ? jsonParse(data.toString())
      : isString(data)
      ? jsonParse(data)
      : data;
    // register
    if (isString(id) && isString(name)) {
      bucket[id] = { id, name };
    }
  }
  // the target record
  return aDst;
}

/**
 * Creates an operator that converts a sequence of files into
 * a manifest
 *
 * @param aName - the name of the manifest
 * @returns the operator
 */
export function rxWchToolsManifest(
  aName: string
): OperatorFunction<FileDescriptor<any>, FileDescriptor<any>> {
  // name of the manifest
  const name = `/${WCHTOOLS_FOLDER_ASSET}/dxconfig/manifests/${aName}.json`;
  // assemble the files
  return pipe(
    reduce(reduceManifest, {}),
    map((data) => createFileDescriptor(name, data))
  );
}
