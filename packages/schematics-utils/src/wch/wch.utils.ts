import { Path, resolve } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import {
  KEY_BASICAUTH_LOGIN_PASSWORD,
  KEY_BASICAUTH_LOGIN_USERNAME,
  REL_PATH_BASICAUTH_LOGIN,
  REL_PATH_CURRENT_USER
} from '@acoustic-content-sdk/api';
import { Credentials } from '@acoustic-content-sdk/cli-credentials';
import { wchToolsGetCredentials } from '@acoustic-content-sdk/tooling';
import {
  assertArray,
  getProperty,
  isNil,
  isNotNil,
  isString
} from '@acoustic-content-sdk/utils';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  map,
  mapTo,
  pluck,
  switchMap,
  switchMapTo
} from 'rxjs/operators';
import { coerce } from 'semver';
import { isUri } from 'valid-url';
import { VError } from 'verror';

import { findPackageJson } from '../package';
import { getWorkspace } from '../utility/config';
import { getProject, isWorkspaceSchema } from '../utility/project';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from '../utility/workspace-models';
import { isValidUserName } from './assert';
import { rxFormPost, rxGetJson } from './rx.request';
import { ensureTrailingSlash } from './url.utils';

function _isApiKey(aName: string): boolean {
  return aName === 'apikey';
}

function _isValidPassword(aPassword: string): boolean {
  return aPassword && aPassword.length > 0;
}

function _throwInvalidUrl(aApiUrl: string, aError: Error): Observable<never> {
  return throwError(
    new VError(aError, 'The API URL [%s] is not a valid WCH API URL.', aApiUrl)
  );
}

function _getCurrentUser(aApiUrl: string): Observable<any> {
  // the URL
  const currentUserUrl = `${aApiUrl}${REL_PATH_CURRENT_USER}`;
  return rxGetJson(currentUserUrl).pipe(
    catchError((error) => _throwInvalidUrl(aApiUrl, error))
  );
}

function _throwInvalidCredentials(aApiUrl: string): Observable<never> {
  return throwError(
    new VError(
      'Unable to access credentials for the API URL [%s]. Please follow the directions on https://www.npmjs.com/package/acoustic-content-sdk-cli#credential-management to register credentials.',
      aApiUrl
    )
  );
}

export function validateCredentials(
  aApiUrl: string,
  aCredentials: Credentials
): Observable<string> {
  // check the credentials object
  if (
    !aCredentials ||
    !isValidUserName(aCredentials.username) ||
    !_isValidPassword(aCredentials.password)
  ) {
    return _throwInvalidCredentials(aApiUrl);
  }
  // test if we can login
  const loginUrl = `${aApiUrl}${REL_PATH_BASICAUTH_LOGIN}`;
  const body = {
    [KEY_BASICAUTH_LOGIN_USERNAME]: aCredentials.username,
    [KEY_BASICAUTH_LOGIN_PASSWORD]: aCredentials.password
  };
  // execute
  return rxFormPost(loginUrl, body).pipe(
    map((data) => JSON.parse(data)),
    catchError((error) =>
      throwError(
        new VError(
          error,
          'Unable to login to [%s] with user [%s]. Please check your registered password.',
          loginUrl,
          aCredentials.username
        )
      )
    ),
    mapTo(aApiUrl)
  );
}

function _validateUser(aFeed: any): Observable<any> {
  // test the feed result
  if (!aFeed || !aFeed.externalId) {
    return throwError(new VError('Invalid currentuser response'));
  }
  return of(aFeed);
}

/**
 * Tests if  the API URL is valid and if we have sufficient credentials to access the API
 *
 * @param aUrl - the API URL
 * @returns the url
 */
export function validateApiUrl(
  aUrl: string,
  bValidateWithCredentials: boolean
): Observable<string> {
  // check if the URL is valud
  if (!isUri(aUrl)) {
    return throwError(
      new VError(
        'Please enter a valid API URL. Copy this URL from the "Hub Information" section of your WCH tenant.'
      )
    );
  }
  // check if the URL is valid
  const normUrl = ensureTrailingSlash(aUrl);

  if (bValidateWithCredentials) {
    // load the credentials
    const onCredentials = wchToolsGetCredentials(normUrl).pipe(
      catchError((error) => _throwInvalidCredentials(normUrl))
    );

    // check if the URL exists
    const onValidUrl: Observable<string> = _getCurrentUser(normUrl).pipe(
      switchMap(_validateUser),
      switchMapTo(onCredentials),
      switchMap((cred) => validateCredentials(normUrl, cred))
    );
    // ok
    return onValidUrl;
  } else {
    // check if the URL exists
    const onValidUrl: Observable<string> = _getCurrentUser(normUrl).pipe(
      switchMap(_validateUser),
      mapTo(normUrl)
    );
    // ok
    return onValidUrl;
  }
}

const PACKAGE_JSON = '/package.json' as Path;
const FALLBACK = '/data' as Path;

const OPTIONS = '.wchtoolsoptions.json' as Path;

const SDK_IMPORT = '@acoustic-content-sdk/ng';
const CLI_IMPORT = '@acoustic-content-sdk/cli';

export const WCHTOOLS_DEPENDENCIES = 'wchtools-dependencies';

function _findBuildVersion(): Observable<string> {
  // find the package
  return findPackageJson(__dirname).pipe(pluck<any, string>('version'));
}

/**
 * Decode the version from the dependency
 *
 * @param aVersion - the version
 *
 * @returns observable of the version
 */
function _fromDependency(aVersion: string): Observable<string> {
  const parsed = coerce(aVersion);
  return !!parsed ? of(parsed.version) : _findBuildVersion();
}

export function findSdkVersion(host: Tree): Observable<string> {
  // try to locate the package json
  const buf = host.read(PACKAGE_JSON);
  if (isNil(buf)) {
    return _findBuildVersion();
  }
  // source package
  const pkg = JSON.parse(buf.toString());
  // check if we have imports
  const deps = pkg.dependencies || {};
  const devDeps = pkg.devDependencies || {};

  const fromPkg = deps[SDK_IMPORT] || devDeps[CLI_IMPORT];

  return isNotNil(fromPkg) ? _fromDependency(fromPkg) : _findBuildVersion();
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
export function findProject<
  TProjectType extends ProjectType = ProjectType.Application
>(
  workspaceOrHost: WorkspaceSchema | Tree,
  options: { project?: string }
): WorkspaceProject<TProjectType> {
  // locate the workspace
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost);
  // check if we have a project
  const projectFromOptions = getProperty(options, 'project');
  const project = isString(projectFromOptions)
    ? projectFromOptions
    : workspace.defaultProject;
  // read
  return getProject(workspace, project);
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
export function findProjectName(
  workspaceOrHost: WorkspaceSchema | Tree,
  options: { project?: string }
): string {
  // locate the workspace
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost);
  // check if we have a project
  const projectFromOptions = getProperty(options, 'project');
  return isString(projectFromOptions)
    ? projectFromOptions
    : workspace.defaultProject;
}

export function findDataDir(host: Tree, options?: { data?: string }): Path {
  /**
   * Test if we have an override
   */
  const dataFromOptions = getProperty(options, 'data');
  if (isString(dataFromOptions)) {
    // use
    return dataFromOptions as Path;
  }

  const buf = host.read(PACKAGE_JSON);
  if (isNil(buf)) {
    return FALLBACK;
  }

  const pkg = JSON.parse(buf.toString());
  const cfg = pkg.config || {};

  const data = cfg.data || FALLBACK;

  return resolve('/' as Path, data);
}

export function findWchToolsOptions(
  host: Tree,
  options?: { data?: string }
): Path {
  return resolve(findDataDir(host, options), OPTIONS);
}

export function addToWchToolsDependencies(aDeps: string[], aPkg: any) {
  // add the key
  const deps = assertArray<string>(WCHTOOLS_DEPENDENCIES, aPkg);
  // filter
  deps.push(...aDeps.filter((dep) => deps.indexOf(dep) < 0));
}
