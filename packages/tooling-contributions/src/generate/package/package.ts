import {
  canonicalizeJson,
  createFileDescriptor,
  ensureDirPath,
  FileDescriptor,
  ReadTextFile,
  rxFindPackageJson
} from '@acoustic-content-sdk/tooling';
import {
  isNotEmpty,
  isNotNil,
  jsonStringify,
  mapArray,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { splitArray } from '../artifacts';
import { CreatePackageFromArtifactsSchema } from './schema';

const SITES_NEXT_API_MODULE = '@sites-next-content/data-sites-next';

const DEFAULT_LICENSE = 'MIT';
const DEFAULT_DATA = './data';

/**
 * Makes sure to remove the leading slash and to convert backslashes to slashes
 *
 * @param aName  filename
 * @returns the fixed name
 */
function fixFilename(aRoot: string, aName: string): string {
  return `${aRoot}${ensureDirPath(aName)}`;
}

/**
 * Constructs the package json
 *
 * @param aPkg  - the package
 * @param aSchema - the schema
 *
 * @returns the new package
 */
function createPackage(
  aPkg: any,
  aSchema: CreatePackageFromArtifactsSchema
): any {
  // extract relevant information
  const {
    name,
    repository,
    license = aSchema.license || DEFAULT_LICENSE,
    author
  } = aPkg;
  // data dir
  const data = `.${ensureDirPath(aSchema.data || DEFAULT_DATA)}`;
  // tags
  const tags = splitArray(aSchema.tag || '');
  // make copy
  const files = mapArray(aSchema.files, (fileName: string) =>
    fixFilename(data, fileName)
  );
  // create the package
  const dependencies = { [SITES_NEXT_API_MODULE]: '^9' };
  // config
  const config = {
    data
  };
  // construct the package
  const pkg: Record<string, any> = {
    name,
    license,
    dependencies,
    config
  };
  // optional fields
  if (isNotEmpty(tags)) {
    pkg.keywords = tags;
  }
  if (isNotEmpty(files)) {
    pkg.files = files;
  }
  if (isNotNil(repository)) {
    pkg.repository = repository;
  }
  if (isNotNil(author)) {
    pkg.author = author;
  }
  // returns the package
  return canonicalizeJson(pkg);
}

function createNpmIgnore(aSchema: CreatePackageFromArtifactsSchema): any {
  // data dir
  const data = `.${ensureDirPath(aSchema.data || DEFAULT_DATA)}`;
  // construct the file
  return `*\n${data}/**\n`;
}

/**
 * Generates the content items that describe a driver based on an Angular build output
 *
 * @param aHost  - callback to read a text file
 * @param aSchema - configuration
 *
 * @returns the sequence of artifacts
 */
export function createPackageArtifacts(
  aHost: ReadTextFile,
  aSchema: CreatePackageFromArtifactsSchema = {}
): Observable<FileDescriptor<any>> {
  // locate the package json
  const pkg$ = rxPipe(
    rxFindPackageJson('/', aHost),
    mergeMap((pkg) => createPackage(pkg, aSchema)),
    map((pkg) => createFileDescriptor('/package.json', jsonStringify(pkg)))
  );
  // create the .npmignore file
  const npmIgnore$ = of(
    createFileDescriptor('/.npmignore', createNpmIgnore(aSchema))
  );
  // merge
  return merge(pkg$, npmIgnore$);
}
