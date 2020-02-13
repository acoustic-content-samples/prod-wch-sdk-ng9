import { WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  assertArray,
  filterArray,
  getProperty,
  isEqual,
  isNotEmpty,
  isString,
  jsonStringify,
  Maybe,
  objectKeys,
  opShareLast,
  reduceForIn,
  reduceToObject,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Exception } from 'handlebars';
import { combineLatest, identity, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { coerce } from 'semver';

import { ReadTextFile, rxReadJsonFile } from '../file/file';
import { JsonSchemaForNpmPackageJsonFiles } from '../types/package.schema';
import { MODULE, VERSION } from './../version';
import { rxGetWorkspace } from './config';
import { rxFindPackageJson } from './package';
import { isWorkspaceSchema, rxGetProject } from './project';
import { ensureLeadingSlash, ensureTrailingSlash } from './url.utils';
import { getOrganization } from './version';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from './workspace-models';

const PACKAGE_JSON = '/package.json';
const FALLBACK = '/data';

const OPTIONS = '.wchtoolsoptions.json';

const SDK_IMPORT = '@acoustic-content-sdk/ng';
const CLI_IMPORT = '@acoustic-content-sdk/cli';

export const WCHTOOLS_DEPENDENCIES = 'wchtools-dependencies';

export type PackageJson = JsonSchemaForNpmPackageJsonFiles;

function getBuildVersion(aVersion: WchSdkVersion = VERSION): string {
  const {
    version: { major, minor, patch }
  } = aVersion;
  return `${major}.${minor}.${patch}`;
}

function _rxFindBuildVersion(aReadFile: ReadTextFile): Observable<string> {
  // find the package
  return rxPipe(
    rxFindPackageJson('/', aReadFile),
    pluck<any, string>('version')
  );
}

/**
 * Decode the version from the dependency
 *
 * @param aVersion - the version
 *
 * @returns observable of the version
 */
function _rxFromDependency(
  aVersion: string,
  aReadFile: ReadTextFile
): Observable<string> {
  const parsed = coerce(aVersion);
  return !!parsed ? of(parsed.version) : _rxFindBuildVersion(aReadFile);
}

// the organization prefix for 'our' SDK packages
const ORG_PREFIX = `@${getOrganization(MODULE)}/`;

/**
 * Locates the SDK version
 *
 * @param aPackage - the package JSON
 *
 * @returns the SDK version or an exception if the SDK versions in the package are inconsistent
 */
export function findSdkVersionFromPkg(aPackage: any): string {
  // check if we have imports
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {}
  } = aPackage;
  // merge them all
  const merged: Record<string, string> = {
    ...dependencies,
    devDependencies,
    peerDependencies
  };
  // filter keys
  const keys = filterArray(objectKeys(merged), (key) =>
    key.startsWith(ORG_PREFIX)
  );
  if (isNotEmpty(keys)) {
    // get all the versions
    const sdk = reduceToObject(keys, identity, (key) => merged[key]);
    // validate that all values are consistent
    return reduceForIn(
      sdk,
      (pre: Maybe<string>, current: string) => {
        // check if we have a consistent version
        if (isNotEmpty(pre) && !isEqual(pre, current)) {
          throw new Exception(
            `Inconsistent set of SDK versions: ${jsonStringify(sdk)}`
          );
        }
        // the current, consistent version
        return current;
      },
      undefined
    );
  }
  // fallback
  return getBuildVersion();
}

/**
 * Locates the SDK version
 *
 * @param aReadFile - read callback
 * @returns the SDK version
 */
export function findSdkVersion(aReadFile: ReadTextFile): Observable<string> {
  // fallback
  return rxPipe(
    rxReadJsonFile<PackageJson>(PACKAGE_JSON, aReadFile),
    map(findSdkVersionFromPkg)
  );
}

/**
 * Locates the workspace project, either from the configured project name, else falls back
 * to the default project
 *
 * @param workspaceOrHost - the workspace root
 * @param options  - the options
 *
 * @returns the project
 */
export function rxFindProject<
  TProjectType extends ProjectType = ProjectType.Application
>(
  workspaceOrHost: WorkspaceSchema | ReadTextFile,
  options: { project?: string }
): Observable<WorkspaceProject<TProjectType>> {
  // locate the workspace
  const workspace$ = rxPipe(
    isWorkspaceSchema(workspaceOrHost)
      ? of(workspaceOrHost)
      : rxGetWorkspace(workspaceOrHost),
    opShareLast
  );
  // check if we have a project
  const projectFromOptions = getProperty(options, 'project');
  const project$ = isString(projectFromOptions)
    ? of(projectFromOptions)
    : rxPipe(workspace$, pluck('defaultProject'));
  // read
  return rxPipe(
    combineLatest([workspace$, project$]),
    mergeMap(([workspace, project]) =>
      rxGetProject<TProjectType>(workspace, project)
    )
  );
}

/**
 * Locates the workspace project, either from the configured project name, else falls back
 * to the default project
 *
 * @param workspaceOrHost - the workspace root
 * @param options  - the options
 *
 * @returns the project
 */
export function rxFindProjectName(
  workspaceOrHost: WorkspaceSchema | ReadTextFile,
  options: { project?: string }
): Observable<string> {
  // locate the workspace
  const workspace$ = rxPipe(
    isWorkspaceSchema(workspaceOrHost)
      ? of(workspaceOrHost)
      : rxGetWorkspace(workspaceOrHost),
    opShareLast
  );
  // check if we have a project
  const projectFromOptions = getProperty(options, 'project');
  return isString(projectFromOptions)
    ? of(projectFromOptions)
    : rxPipe(workspace$, pluck('defaultProject'));
}

export function rxFindDataDir(
  host: ReadTextFile,
  options?: { data?: string }
): Observable<string> {
  /**
   * Test if we have an override
   */
  const dataFromOptions = getProperty(options, 'data');
  if (isString(dataFromOptions)) {
    // use
    return of(dataFromOptions);
  }
  // package
  const pkg$ = rxReadJsonFile<PackageJson>(PACKAGE_JSON, host);
  // resolve
  return rxPipe(
    pkg$,
    map((pkg) => {
      const cfg = pkg.config || {};
      return ensureLeadingSlash(cfg.data) || FALLBACK;
    }),
    catchError(() => of(FALLBACK)),
    map(ensureTrailingSlash)
  );
}

export function rxFindWchToolsOptions(
  host: ReadTextFile,
  options?: { data?: string }
): Observable<string> {
  return rxPipe(
    rxFindDataDir(host, options),
    map((dir) => `${dir}${OPTIONS}`)
  );
}

export function addToWchToolsDependencies(aDeps: string[], aPkg: any) {
  // add the key
  const deps = assertArray<string>(WCHTOOLS_DEPENDENCIES, aPkg);
  // filter
  deps.push(...aDeps.filter((dep) => deps.indexOf(dep) < 0));
}
