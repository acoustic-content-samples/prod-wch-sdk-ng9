import { rxPipe, rxSpawn, SpawnLine } from '@acoustic-content-sdk/rx-utils';
import { kebabCase, opShareLast } from '@acoustic-content-sdk/utils';
import { SpawnOptions } from 'child_process';
import { join } from 'path';
import { concat, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { rxFindBuildVersion } from './build.version';

/**
 * Adds the SDK to the application
 *
 * @param aRootFolder  - root folder of the project
 * @param aApiUrl  - the WCH API URI
 * @param aVersion - the major version number, e.g. '7'
 *
 * @returns a stream with lines
 */
function addWchSdk(
  aRootFolder: string,
  aApiUrl: string,
  aVersion: string
): Observable<SpawnLine> {
  // arguments
  const args = ['ng', 'add', `@acoustic-content-sdk/app@^${aVersion}`, '--url', aApiUrl];
  // options
  const opts: SpawnOptions = { cwd: aRootFolder };
  // create via npx
  return rxSpawn('npx', args, opts);
}

/**
 * Constructs a new angular project
 *
 * @param aRootFolder  - root folder of the project
 * @param aProjectName  - name of the project
 * @param aVersion - the major version number, e.g. '7'
 *
 * @returns a stream with lines
 */
function createNgProject(
  aRootFolder: string,
  aProjectName: string,
  aVersion: string
): Observable<SpawnLine> {
  // arguments
  const args = [
    `@angular/cli@^${aVersion}`,
    'new',
    aProjectName,
    '--defaults',
    '--routing',
    'true',
    '--style',
    'scss',
    '--verbose'
  ];
  // options
  const opts: SpawnOptions = { cwd: aRootFolder };
  // create via npx
  return rxSpawn('npx', args, opts);
}

/**
 * The version string, typically three numbers separated by dots
 *
 * @param aVersion - the version string
 * @returns the major version number
 */
function getMajorVersion(aVersion: string): string {
  // split and use first argument
  return aVersion.split('.')[0];
}

/**
 * Constructs a brand new angular project and adds the SDK to the project
 *
 * @param aRootFolder  - the root folder of the project
 * @param aProjectName - the project name
 * @param aApiUrl - the WCH API URL
 *
 * @returns an observable of the command output
 */
export function cmdCreateProject(
  aRootFolder: string,
  aProjectName: string,
  aApiUrl: string
): Observable<SpawnLine> {
  // locate the build version
  const buildVersion$ = rxPipe(
    rxFindBuildVersion(),
    map(getMajorVersion),
    opShareLast
  );
  // massage the name
  const projectName = kebabCase(aProjectName);
  // new project
  const newProject$ = rxPipe(
    buildVersion$,
    mergeMap((version) => createNgProject(aRootFolder, projectName, version))
  );
  // target path
  const targetPath = join(aRootFolder, projectName);
  // with SDK
  const addSdk$ = rxPipe(
    buildVersion$,
    mergeMap((version) => addWchSdk(targetPath, aApiUrl, version))
  );
  // coordinate
  return concat(newProject$, addSdk$);
}
