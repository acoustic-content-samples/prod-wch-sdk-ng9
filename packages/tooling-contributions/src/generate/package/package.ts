import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  canonicalizeJson,
  createFileDescriptor,
  ensureDirPath,
  FileDescriptor,
  kebabCase,
  ReadTextFile,
  relativePath,
  rxFindPackageJson
} from '@acoustic-content-sdk/tooling';
import {
  isNotEmpty,
  isNotNil,
  mapArray,
  NOOP_LOGGER_SERVICE,
  opShareLast,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { join, parse } from 'path';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';

import { ASSET_ROOT$ } from '../../utils/assets';
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

const RE_SCOPE = /^(?:@([^\/]+)\/)?(.*)$/;

/**
 * Constructs the handlebars context
 *
 * @param aPkg - the package json
 * @returns the context
 */
function createContext(aPkg: any): Record<string, any> {
  // build date
  const BUILD_DATE = Date.now();
  const MODULE_NAME = aPkg.name;
  const ACOUSTIC_CONTENT = {};
  // parse the version
  const version = aPkg.version;
  const [
    ,
    MAJOR_VERSION,
    MINOR_VERSION,
    PATCH_LEVEL
  ] = /(\d+).(\d+).(\d+)/.exec(version);
  // name
  const fileName = kebabCase(MODULE_NAME);
  // check for a scoped package
  const [, MODULE_SCOPE, MODULE_LOCAL] = RE_SCOPE.exec(MODULE_NAME);
  // returns the context
  return {
    fileName,
    BUILD_DATE,
    MODULE_NAME,
    ACOUSTIC_CONTENT,
    MAJOR_VERSION,
    MINOR_VERSION,
    PATCH_LEVEL,
    MODULE_SCOPE,
    MODULE_LOCAL
  };
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
  // filename for helper files
  const fileName = kebabCase(name);
  const main = `bundles/${fileName}.umd.js`;
  const module = `fesm5/${fileName}.js`;
  const typings = `typings/${fileName}.d.ts`;
  // tags
  const tags = splitArray(aSchema.tag || '');
  // make copy
  const files = mapArray(aSchema.files, (aName: string) =>
    fixFilename(aDstDir, aName)
  );
  files.push(main, module, typings);
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
    config,
    main,
    module,
    typings
  };
  // optional fields
  if (isNotEmpty(tags)) {
    pkg.keywords = tags;
  }
  if (isNotEmpty(files)) {
    files.sort();
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
  // source package
  const srcPkg$ = rxPipe(rxFindPackageJson('/', aHost), opShareLast);
  // locate the package json
  const pkg$ = rxPipe(
    srcPkg$,
    mergeMap((pkg) => createPackage(pkg, dstDir, dataDir, aSchema, logger)),
    map((pkg) => createFileDescriptor(`${dstDir}/package.json`, pkg))
  );
  // the context
  const hbsCtx$ = rxPipe(
    srcPkg$,
    map((pkg) => createContext(pkg))
  );
  // read the templates
  const templates$ = rxPipe(
    ASSET_ROOT$,
    map((root) => join(root, 'package')),
    mergeMap((dir) => rxReadTemplates(dir))
  );
  // the files
  const lib$ = rxPipe(
    rxApplyTemplates(hbsCtx$, templates$),
    map(([name, data]) => createFileDescriptor(`${dstDir}${name}`, data)),
    shareReplay()
  );
  //
  return merge(pkg$, lib$);
}
