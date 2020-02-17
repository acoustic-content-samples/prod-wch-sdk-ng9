import { rxForkJoin } from '@acoustic-content-sdk/rx-utils';
import {
  canonicalizeJSON,
  createLoggerService,
  DEP_TYPE,
  getFolderForType,
  getPackageManager,
  rxTransformJsonFile
} from '@acoustic-content-sdk/schematics-utils';
import {
  PackageManager,
  rxYarnHasPackage
} from '@acoustic-content-sdk/tooling-pkg-mgr';
import {
  arrayPush,
  assertObject,
  BiFunction,
  cloneDeep,
  filterArray,
  forEach,
  isNotEmpty,
  isNotNil,
  Maybe,
  reduceForIn,
  rxNext,
  rxPipe,
  TRUE$
} from '@acoustic-content-sdk/utils';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { endWith, ignoreElements, map, mergeMap, pluck } from 'rxjs/operators';

import { readPackageJson } from './utils';

const LOGGER = 'addPeerDependencies';

const CHECK_INSTALLED = {
  [PackageManager.YARN]: rxYarnHasPackage
};

const CHECK_FALLBACK = () => TRUE$;

function transformPackageJson(aDeps: string[][], aPkg: any): Observable<any> {
  // clone
  const pkg = cloneDeep(aPkg);
  // add dependencies
  const dependencies = assertObject<Record<string, string>>(
    getFolderForType(DEP_TYPE.RUNTIME),
    pkg
  );
  // insert
  forEach(aDeps, ([name, version]) => (dependencies[name] = version));
  // done
  return of(canonicalizeJSON(pkg));
}

// split the modules
function addDependencies(
  aDeps: Record<string, string> = {},
  aCheck: BiFunction<string, string, Observable<boolean>>,
  aHost: Tree,
  aContext: SchematicContext
) {
  // find all dependencies that need to be installed
  const deps$ = rxPipe(
    rxForkJoin(
      reduceForIn(
        aDeps,
        (
          aDst: Observable<Maybe<[string, string]>>[],
          aVersion: string,
          aName: string
        ) =>
          arrayPush(
            rxPipe(
              aCheck(aName, aVersion),
              map((result) => (result ? undefined : [aName, aVersion]))
            ),
            aDst
          ),
        []
      )
    ),
    map((result) => filterArray(result, isNotNil))
  );
  // the JSON file
  return rxPipe(
    deps$,
    mergeMap((deps) => {
      if (isNotEmpty(deps)) {
        // install missing dependencies
        aContext.addTask(new NodePackageInstallTask());
        // execute the transform
        return rxTransformJsonFile(
          '/package.json',
          (pkg: any) => transformPackageJson(deps, pkg),
          aHost
        );
      }
      return of(aHost);
    })
  );
}

function getCheckInstalled(
  aMgr: PackageManager
): BiFunction<string, string, Observable<boolean>> {
  return CHECK_INSTALLED[aMgr] || CHECK_FALLBACK;
}

/**
 * Adds peer dependencies to the dependency list of the application if the dependencies
 * have not been installed, yet
 *
 * @param options - the options
 */
export function addPeerDependencies({
  importPath
}: {
  importPath?: string;
}): Rule {
  return (host: Tree, context: SchematicContext) => {
    // if the import path is set, nothing special to do
    if (isNotEmpty(importPath)) {
      return of(host);
    }
    // some logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // locate the package manager
    const pkgMgr$ = rxPipe(getPackageManager(host), log('packageManager'));
    // locate the package json
    const peerDependencies$ = rxPipe(
      readPackageJson(context),
      pluck(getFolderForType(DEP_TYPE.PEER))
    );
    // resolve
    return rxPipe(
      combineLatest([peerDependencies$, pkgMgr$]),
      mergeMap(([peerDependencies, pkgMgr]) =>
        addDependencies(
          peerDependencies,
          getCheckInstalled(pkgMgr),
          host,
          context
        )
      ),
      ignoreElements(),
      endWith(host)
    );
  };
}
