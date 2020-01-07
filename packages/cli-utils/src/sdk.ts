import { isNotEmpty, isString, rxPipe } from '@acoustic-content-sdk/utils';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { coerce } from 'semver';

import { rxReadPackageJson } from './package';
import { rxFindBuildVersion } from './build.version';

const API_IMPORT = '@acoustic-content-sdk/api';
const SDK_IMPORT = '@acoustic-content-sdk/ng';
const CLI_IMPORT = '@acoustic-content-sdk/cli';

const NG_CORE = '@angular/core';

/**
 * Returns the version of the SDK from the package JSON
 *
 * @param aPkg  - the package JSON
 * @returns the version of the SDK or undefined if not found
 */
function sdkFromPackage(aPkg: any): string {
  // check if we have imports
  const deps = aPkg.dependencies || {};
  const devDeps = aPkg.devDependencies || {};

  return deps[SDK_IMPORT] || devDeps[CLI_IMPORT] || deps[API_IMPORT];
}

/**
 * Returns the version of angular from the package
 *
 * @param aPkg  - the package JSON
 * @returns the version of angular or undefined if not found
 */
function ngFromPackage(aPkg: any): string {
  // check if we have imports
  const deps = aPkg.dependencies || {};

  return deps[NG_CORE];
}

/**
 * Returns the SDK version based on the current build
 *
 * @returns the SDK version
 */
function sdkFromBuild(): Observable<string> {
  return rxPipe(rxFindBuildVersion(), map((version) => `^${version}`));
}

/**
 * Tests the version for validity
 *
 * @param aVersion - the version to check
 * @returns true if the version is valid
 */
function isValidVersion(aVersion: string): boolean {
  return isString(aVersion) && isNotEmpty(aVersion);
}

/**
 * Locates the version of the SDK to use, either from the package JSON
 * or from our own build
 *
 * @param aRootDir  - the root directory used to locate the packae
 * @returns the SDK version as a semantic version string
 */
export function rxFindSdkVersion(aRootDir: string): Observable<string> {
  // find the package
  const pkgJson$ = rxReadPackageJson(aRootDir);
  // the SDK version
  return rxPipe(
    pkgJson$,
    map(sdkFromPackage),
    mergeMap((version) =>
      isValidVersion(version) ? of(version) : sdkFromBuild()
    ),
    catchError(sdkFromBuild)
  );
}

/**
 * Locates the version of angular to use
 *
 * @param aRootDir  - the root directory used to locate the packae
 * @returns the angular version as a semantic version string
 */
export function rxFindAngularVersion(aRootDir: string): Observable<string> {
  // find the package
  const pkgJson$ = rxReadPackageJson(aRootDir);
  // the SDK version
  return rxPipe(pkgJson$, map(ngFromPackage));
}

/**
 * Returns the SDK version from the Angular version
 *
 * @param aAngularVersion - the angular version string
 * @returns the matching SDK version string
 */
export function sdkVersionFromAngularVersion(aAngularVersion: string): string {
  // parse the angular version
  const parsed = coerce(aAngularVersion);
  // returns the matching version
  return `^${parsed.major}.${parsed.minor}`;
}
