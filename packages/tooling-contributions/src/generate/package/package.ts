import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  canonicalizeJson,
  createFileDescriptor,
  ensureDirPath,
  FileDescriptor,
  ReadTextFile,
  relativePath,
  rxFindPackageJson
} from '@acoustic-content-sdk/tooling';
import {
  isNotEmpty,
  isNotNil,
  mapArray,
  NOOP_LOGGER_SERVICE,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { parse } from 'path';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { splitArray } from '../artifacts';
import { CreatePackageFromArtifactsSchema } from './schema';

const SITES_NEXT_API_MODULE = '@sites-next-content/data-sites-next';

const DEFAULT_LICENSE = 'MIT';
const DEFAULT_DATA = './data';

const LOGGER = 'createPackageArtifacts';

/**
 * Makes sure to remove the leading slash and to convert backslashes to slashes
 *
 * @param aName  filename
 * @returns the fixed name
 */
function fixFilename(aSrcDir: string, aName: string): string {
  return relativePath(aSrcDir, ensureDirPath(aName));
}

/**
 * Constructs the package json
 *
 * @param aPkg  - the package
 * @param aDstDir - target directory of the package
 * @param aDataDir - data directory
 * @param aSchema - the schema
 *
 * @returns the new package
 */
function createPackage(
  aPkg: any,
  aDstDir: string,
  aDataDir: string,
  aSchema: CreatePackageFromArtifactsSchema,
  aLogger: Logger
): any {
  // extract relevant information
  const {
    name,
    repository,
    license = aSchema.license || DEFAULT_LICENSE,
    author,
    version
  } = aPkg;
  // tags
  const tags = splitArray(aSchema.tag || '');
  // make copy
  const files = mapArray(aSchema.files, (fileName: string) =>
    fixFilename(aDstDir, fileName)
  );
  // create the package
  const dependencies = { [SITES_NEXT_API_MODULE]: '^9' };
  // relative path from dst dir to data dir
  const data = relativePath(aDstDir, aDataDir);
  // config
  const config = {
    data
  };
  // construct the package
  const pkg: Record<string, any> = {
    version,
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
  return of(canonicalizeJson(pkg));
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
  aSchema: CreatePackageFromArtifactsSchema = {},
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
): Observable<FileDescriptor<any>> {
  // logger
  const logger = aLogSvc.get(LOGGER);
  // data dir
  const dataDir = `${ensureDirPath(aSchema.data || DEFAULT_DATA)}`;
  // parse the base directory
  const { dir: dstDir } = parse(dataDir);
  // log the target directory
  logger.info('dst directory', dstDir);
  // locate the package json
  const pkg$ = rxPipe(
    rxFindPackageJson('/', aHost),
    mergeMap((pkg) => createPackage(pkg, dstDir, dataDir, aSchema, logger)),
    map((pkg) => createFileDescriptor(`${dstDir}/package.json`, pkg))
  );
  // merge
  return merge(pkg$);
}