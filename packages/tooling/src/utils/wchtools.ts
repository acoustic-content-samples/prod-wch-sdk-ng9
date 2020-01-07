import {
  AuthoringContentItem,
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringType,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING
} from '@acoustic-content-sdk/api';
import { Credentials, wchGetCredentials } from '@acoustic-content-sdk/cli-credentials';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { from, Observable } from 'rxjs';

import { createFileDescriptor, FileDescriptor } from '../file/file';
import { cleanupFields } from './json';

export const wchToolsGetCredentials = (
  aApiUrl: string
): Observable<Credentials> => from(wchGetCredentials(aApiUrl));

const CLASSIFICATION_TO_FOLDER = {
  [CLASSIFICATION_CONTENT]: 'content',
  [CLASSIFICATION_CONTENT_TYPE]: 'types',
  [CLASSIFICATION_LAYOUT]: 'layouts',
  [CLASSIFICATION_LAYOUT_MAPPING]: 'layout-mappings'
};

const METADATA_PREFIX = {
  [CLASSIFICATION_CONTENT]: 'c',
  [CLASSIFICATION_CONTENT_TYPE]: 't'
};

function createFileName(
  aItem:
    | AuthoringContentItem
    | AuthoringType
    | AuthoringLayoutItem
    | AuthoringLayoutMapping
): string {
  const { classification, id, path } = aItem;
  // get the folder name
  const folder = CLASSIFICATION_TO_FOLDER[classification] || classification;
  // get the metdata stuff
  const prefix = METADATA_PREFIX[classification];
  const suffix = isNotNil(prefix) ? `_${prefix}md` : '';
  // path
  const filename = path || `/${id}${suffix}.json`;
  // build the filename
  return `/${folder}${filename}`;
}

/**
 * Constructs a file descriptor from the item
 *
 * @param aItem - the authoring item
 * @returns the descriptor
 */
export function wchToolsFileDescriptor<
  T extends
    | AuthoringContentItem
    | AuthoringType
    | AuthoringLayoutItem
    | AuthoringLayoutMapping
>(aItem: T): FileDescriptor<T> {
  return createFileDescriptor(createFileName(aItem), aItem);
}

export function wchToolsCleanup<T>(
  aItem: FileDescriptor<T>
): FileDescriptor<T> {
  const [name, data] = aItem;
  return createFileDescriptor(name, cleanupFields(data));
}
