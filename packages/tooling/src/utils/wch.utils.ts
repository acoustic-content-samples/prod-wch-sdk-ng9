import {
  assertArray,
  getProperty,
  isNotNil,
  isString,
  opShareLast,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { coerce } from 'semver';

import { ReadTextFile, rxReadJsonFile } from '../file/file';
import { JsonSchemaForNpmPackageJsonFiles } from '../types/package.schema';
import { rxGetWorkspace } from './config';
import { rxFindPackageJson } from './package';
import { isWorkspaceSchema, rxGetProject } from './project';
import { ensureLeadingSlash, ensureTrailingSlash } from './url.utils';
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

/**
 * Locates the SDK version
 *
 * @param aReadFile - read callback
 * @returns the SDK version
 */
export function findSdkVersion(aReadFile: ReadTextFile): Observable<string> {
  // fallback
  const buildVersion$ = _rxFindBuildVersion(aReadFile);
  // try to locate the package json
  const pkg$ = rxReadJsonFile<PackageJson>(PACKAGE_JSON, aReadFile);
  const fromPkg$ = rxPipe(
    pkg$,
    map((pkg) => {
      // check if we have imports
      const deps = pkg.dependencies || {};
      const devDeps = pkg.devDependencies || {};
      // return based on the SDK import
      return deps[SDK_IMPORT] || devDeps[CLI_IMPORT];
    })
  );
  // implement the fallback
  return rxPipe(
    fromPkg$,
    mergeMap((fromPkg) =>
      isNotNil(fromPkg) ? _rxFromDependency(fromPkg, aReadFile) : buildVersion$
    ),
    catchError(() => buildVersion$)
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
  return rxPipe(rxFindDataDir(host, options), map((dir) => `${dir}${OPTIONS}`));
}

export function addToWchToolsDependencies(aDeps: string[], aPkg: any) {
  // add the key
  const deps = assertArray<string>(WCHTOOLS_DEPENDENCIES, aPkg);
  // filter
  deps.push(...aDeps.filter((dep) => deps.indexOf(dep) < 0));
}
