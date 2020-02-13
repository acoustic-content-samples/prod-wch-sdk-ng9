import {
  rxCacheSingle,
  rxPipe,
  rxReadJsonFile,
  rxSpawn,
  rxStats,
  SPAWN_OUTPUT_TYPE,
  SpawnLine
} from '@acoustic-content-sdk/rx-utils';
import { createError } from '@acoustic-content-sdk/utils';
import { ExecOptions, SpawnOptions } from 'child_process';
import { basename, dirname, join } from 'path';
import { cwd } from 'process';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import { catchError, filter, first, map, mergeMap } from 'rxjs/operators';

const PACKAGE_JSON = 'package.json';

/**
 * Locates the file in the parent directory or bails out
 *
 * @param aDir - the directory
 * @returns the observable
 */
function resolveParentDir(aDir: string): Observable<string> {
  // compute the name of the directory
  const parentDir = dirname(aDir);
  // recurse
  return parentDir === aDir
    ? throwError(createError(`Unable to locate ${PACKAGE_JSON}`))
    : internalFindPackageJson(parentDir);
}

/**
 * Locates the package json relative to the given directory
 *
 * @param aDir - the starting directory or the name of the package json
 * @returns the name of the package json or an error
 */
function internalFindPackageJson(aDir: string): Observable<string> {
  // candidate name
  const pkgName = join(aDir, PACKAGE_JSON);
  // read
  return rxPipe(
    rxStats(pkgName),
    mergeMap((stats) =>
      stats.isFile() ? of(pkgName) : resolveParentDir(aDir)
    ),
    catchError((err) => resolveParentDir(aDir))
  );
}

/**
 * Locates the package json relative to the given directory
 *
 * @param aDirOrFile - the starting directory or the name of the package json or the name of a package json
 * @returns the name of the package json or an error
 */
export function rxFindPackageJson(aDirOrFile: string): Observable<string> {
  // root
  const root = aDirOrFile || cwd();
  // check if the name is a package json
  return rxPipe(
    // test the file
    rxStats(root),
    // dispatch based on the file type
    mergeMap((stat) => {
      // handle the file case
      if (stat.isFile()) {
        // is this the package json?
        const name = basename(root);
        if (name === PACKAGE_JSON) {
          // found it
          return of(aDirOrFile);
        }
        // locate based on the dir
        return internalFindPackageJson(dirname(root));
      }
      // default case
      return internalFindPackageJson(root);
    })
  );
}

/**
 * Locates and reads the package json
 *
 * @param aDirOrFile - directory or file as a starting point
 * @returns the package
 */
export function rxReadPackageJson(aDirOrFile: string): Observable<any> {
  return rxPipe(rxFindPackageJson(aDirOrFile), mergeMap(rxReadJsonFile));
}

// extracts a trimmed stdout
const selectFirstLine = (aOut$: Observable<SpawnLine>): Observable<string> =>
  rxPipe(
    aOut$,
    filter(([type]) => type === SPAWN_OUTPUT_TYPE.STDOUT),
    map(([, line]) => line),
    first()
  );

/**
 * Locates the configured package manager
 *
 * @param aDirOrFile - root directory
 * @returns the package manager to use
 */
export function rxFindPackageManager(aDirOrFile: string): Observable<string> {
  // locate the package manager
  const pkg$ = rxCacheSingle(rxFindPackageJson(aDirOrFile));
  // options
  const options$ = rxCacheSingle<SpawnOptions>(
    rxPipe(
      pkg$,
      map((pkg) => ({ cwd: dirname(pkg) }))
    )
  );
  // global package manager
  const ngLocal$ = rxPipe(
    options$,
    mergeMap((options) =>
      rxSpawn('npx', ['ng', 'config', 'cli.packageManager'], options)
    ),
    selectFirstLine
  );
  const ngGlobal = () =>
    rxPipe(
      options$,
      mergeMap((options) =>
        rxSpawn('npx', ['ng', 'config', '-g', 'cli.packageManager'], options)
      ),
      selectFirstLine
    );
  const ngFallback = () => of('npm');
  // return
  return rxPipe(ngLocal$, catchError(ngGlobal), catchError(ngFallback));
}

export enum PACKAGE_INSTALL {
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  GLOBAL
}

/**
 * configured install commands
 */
const INSTALL_COMMANDS = {
  yarn: {
    [PACKAGE_INSTALL.DEPENDENCIES]: ['add'],
    [PACKAGE_INSTALL.DEV_DEPENDENCIES]: ['add', '--dev'],
    [PACKAGE_INSTALL.GLOBAL]: ['global', 'add']
  },
  npm: {
    [PACKAGE_INSTALL.DEPENDENCIES]: ['install', '--save-prod'],
    [PACKAGE_INSTALL.DEV_DEPENDENCIES]: ['install', '--save-dev'],
    [PACKAGE_INSTALL.GLOBAL]: ['install', '--global']
  }
};

/**
 * Returns the install command
 *
 * @param aType - type of install
 * @param aManager - package manager to use
 * @returns the command prefix
 */
function getInstallArgs(aType: PACKAGE_INSTALL, aManager: string): string[] {
  return INSTALL_COMMANDS[aManager][aType];
}

/**
 * Returns a function that allows to install packages via the configured package installer. The
 * function will invoke the package manager in the directory of the package JSON located
 * in the given directory
 *
 * @param aDirOrFile - base directory
 * @returns an install callback
 */
export function packageInstaller(
  aDirOrFile: string
): (aType: PACKAGE_INSTALL, ...aPackages: string[]) => Observable<SpawnLine> {
  // locate the package manager
  const pkg$ = rxCacheSingle(rxFindPackageJson(aDirOrFile));
  // locate the package manager
  const mgr$ = rxCacheSingle(rxPipe(pkg$, mergeMap(rxFindPackageManager)));
  // options
  const options$ = rxCacheSingle<ExecOptions>(
    rxPipe(
      pkg$,
      map((pkg) => ({ cwd: dirname(pkg) }))
    )
  );
  // returns the callback
  function install(
    aType: PACKAGE_INSTALL,
    ...aPackages: string[]
  ): Observable<SpawnLine> {
    // build the command line
    const args$ = rxPipe(
      mgr$,
      map((mgr) => getInstallArgs(aType, mgr))
    );
    // execute
    return rxPipe(
      combineLatest(mgr$, args$, options$),
      mergeMap(([mgr, cmd, options]) =>
        rxSpawn(mgr, [...cmd, ...aPackages], options)
      )
    );
  }
  // ok
  return install;
}
