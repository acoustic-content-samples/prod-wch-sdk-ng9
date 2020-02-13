import { LoggerService } from '@acoustic-content-sdk/api';
import {
  rxCacheSingle,
  rxPipe,
  rxSpawn,
  rxStats,
  SpawnLine
} from '@acoustic-content-sdk/rx-utils';
import {
  createError,
  isNotNil,
  NOOP_LOGGER_SERVICE,
  rxNext,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { exec } from 'child_process';
import { platform } from 'os';
import { dirname, join } from 'path';
import { bindNodeCallback, Observable, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';

import { rxFindPackageJson } from './package';

/**
 * Rx-ified version of exec
 */
const rxExec = bindNodeCallback<string, string, string>(exec);

/**
 * Determines the name of the script and tries to locate it in the node_modules directory
 *
 * @param aName - name of the script
 * @param aDir - root directory
 *
 * @returns the script
 */
function internalFindExecutableScript(
  aName: string,
  aDir: string
): Observable<string> {
  // bin directory
  const binDir = join(aDir, 'node_modules', '.bin');
  // try to build the executable name
  const name = platform() === 'win32' ? `${aName}.cmd` : aName;
  // full name
  const fullName = join(binDir, name);
  // check
  return rxPipe(rxStats(fullName), mapTo(fullName));
}

/**
 * First tries to locate the package json, then from there find the
 * executable file
 *
 * @param aName - name of the script
 * @param aRoot - some root coordinate
 *
 * @returns the executable script
 */
function internalFindExecutableScriptViaPackage(aName: string, aRoot: string) {
  return rxPipe(
    rxFindPackageJson(aRoot),
    mergeMap((pkgName) => internalFindExecutableScript(aName, dirname(pkgName)))
  );
}

// extracts a trimmed stdout
const trimStdout = () => map<string[], string>(([stdout]) => stdout.trim());

/**
 * Locate the global yarn directory
 *
 * @returns the yarn directory for global modules
 */
const rxYarnDir = rxCacheSingle(
  rxPipe(rxExec('yarn global dir'), trimStdout())
);

/**
 * Locate the global npm directory
 *
 * @returns the yarn directory for global modules
 */
const rxNpmDir = rxCacheSingle(
  rxPipe(rxExec('npm root -g'), trimStdout(), map(dirname))
);

/**
 * Locates the
 *
 * @param aName
 */
function internalFindExecutableScriptManager(
  aName: string
): Observable<string> {
  // find the script based on a directory
  const findScript = (dir: string) => internalFindExecutableScript(aName, dir);
  // from yarn
  const fromYarn$ = rxPipe(rxYarnDir, mergeMap(findScript));
  const fromNpm = () => rxPipe(rxNpmDir, mergeMap(findScript));
  // combine
  return rxPipe(fromYarn$, catchError(fromNpm));
}

/**
 * Locates the executable script command
 *
 * @param aName - name of the script
 * @param aRoot - optionally a root to identify the project to seach in
 *
 * @returns the full path to the executable script
 */
export function rxFindScript(
  aName: string,
  aRoot?: string
): Observable<string> {
  // find the script based on a directory
  const findScript = (dir: string) =>
    internalFindExecutableScriptViaPackage(aName, dir);
  /**
   * Locate the script via the package json, either from our own script or from
   * the given root with the fallback to our local script
   */
  const ownScript = () => findScript(__dirname);
  const localScript$ = isNotNil(aRoot)
    ? rxPipe(findScript(aRoot), catchError(ownScript))
    : ownScript();
  /**
   * Try to find the script in yarn or npm
   */
  const globalScript = () => internalFindExecutableScriptManager(aName);
  // try to locate with fallback
  return rxPipe(
    localScript$,
    catchError(globalScript),
    catchError((error) =>
      throwError(createError(`Unable to locate script [${aName}]`, error))
    )
  );
}

/**
 * Executes wchtools. If we can find wchtools in the path, use that version, else
 * use npx to install and run it.
 *
 * @param aPkgDir - the package directory, will be the execution directory
 * @param aArgs - the arguments to wchtools
 * @param aLogSvc - the logger service
 *
 * @returns an observable with  the output of the command
 */
export function rxExecuteScript(
  aPkgDir: string,
  aScriptName: string,
  aNpxName: string,
  aArgs: string[],
  aLogSvc: LoggerService
): Observable<SpawnLine> {
  // logger
  const logger = aLogSvc.get('rxExecuteScript');
  // the rx logger
  const log = rxNext(logger);
  // command via npx
  const npx = () => rxSpawn('npx', [aNpxName, ...aArgs], { cwd: aPkgDir });
  // command via path
  const script = (path: string) => rxSpawn(path, aArgs, { cwd: aPkgDir });
  // locate the script
  return rxPipe(
    rxFindScript(aScriptName, aPkgDir),
    log(aScriptName),
    catchError(() => UNDEFINED$),
    mergeMap((path) => (isNotNil(path) ? script(path) : npx()))
  );
}

/**
 * Executes the angular command line. If we can find it in the path, use that version, else
 * use npx to install and run it.
 *
 * @param aPkgDir - the package directory, will be the execution directory
 * @param aArgs - the arguments
 * @param aLogSvc - the logger service
 *
 * @returns an observable with the output of the command
 */
export function rxExecuteNg(
  aPkgDir: string,
  aArgs: string[],
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
): Observable<SpawnLine> {
  // dispatch
  return rxExecuteScript(aPkgDir, 'ng', '@angular/cli', aArgs, aLogSvc);
}

/**
 * Executes the WCH SDK CLI. If we can find it in the path, use that version, else
 * use npx to install and run it.
 *
 * @param aPkgDir - the package directory, will be the execution directory
 * @param aArgs - the arguments
 * @param aLogSvc - the logger service
 *
 * @returns an observable with the output of the command
 */
export function rxExecuteCli(
  aPkgDir: string,
  aArgs: string[],
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
): Observable<SpawnLine> {
  // dispatch
  return rxExecuteScript(
    aPkgDir,
    'acoustic-content-sdk-cli',
    '@acoustic-content-sdk/cli',
    aArgs,
    aLogSvc
  );
}
