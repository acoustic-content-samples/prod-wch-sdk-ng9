import {
  DEP_TYPE,
  getFolderForType,
  rxReadTextFile,
  rxTransformJsonFile
} from '@acoustic-content-sdk/schematics-utils';
import {
  canonicalizeJson,
  getOrganization
} from '@acoustic-content-sdk/tooling';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import {
  assignObject,
  cloneDeep,
  filterArray,
  forEach,
  jsonParse,
  objectKeys,
  reduceToObject,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { identity, merge, Observable } from 'rxjs';
import { endWith, ignoreElements, map, mergeMap, pluck } from 'rxjs/operators';

import { PKG_DIR$ } from '../utilities/assets';
import { MODULE, VERSION } from './../version';
import { Schema } from './schema';
import { CONFIG_SOURCE_MAP } from './update.angular.json';

// major version
const {
  version: { major: MAJOR_VERSION }
} = VERSION;

const NAMESPACE = `@${getOrganization(MODULE)}/`;

function fixVersions(aVersion: string, aDeps: Record<string, string>) {
  // just get the keys
  const keys = filterArray(objectKeys(aDeps), (key) =>
    key.startsWith(NAMESPACE)
  );
  // fix versions
  forEach(keys, (key) => (aDeps[key] = aVersion));
}

const SYSTEM_DEPENDENCIES = [
  'react',
  'react-dom',
  'redux',
  'ng2-logger',
  'redux-observable',
  'react-router',
  'redux-actions',
  'redux-devtools-extension',
  'uuid'
];
const SYSTEM_DEV_DEPENDENCIES = [
  'npm-run-all',
  '@types/react',
  '@types/redux-actions',
  '@types/react-dom',
  '@types/react-router',
  '@types/redux-actions'
];

/**
 * Identifies the correct version of system level dependencies. We use the
 * same versions that have been used when this schematic had been built
 *
 * @returns the dependencies
 */
function findSystemDependencies(): Observable<Record<string, string>> {
  // locate our own package file
  return rxPipe(
    PKG_DIR$,
    map((dir) => join(dir, 'package.json')),
    mergeMap(rxReadTextFile),
    map(jsonParse),
    pluck(getFolderForType(DEP_TYPE.RUNTIME)),
    map((deps) =>
      reduceToObject(SYSTEM_DEPENDENCIES, identity, (key) => deps[key])
    )
  );
}

/**
 * Identifies the correct version of system level dependencies. We use the
 * same versions that have been used when this schematic had been built
 *
 * @returns the dependencies
 */
function findSystemDevDependencies(): Observable<Record<string, string>> {
  // locate our own package file
  return rxPipe(
    PKG_DIR$,
    map((dir) => join(dir, 'package.json')),
    mergeMap(rxReadTextFile),
    map(jsonParse),
    pluck(getFolderForType(DEP_TYPE.RUNTIME)),
    map((deps) =>
      reduceToObject(SYSTEM_DEV_DEPENDENCIES, identity, (key) => deps[key])
    )
  );
}

export function updatePackageJson(options: Schema): Rule {
  /**
   * Implement the actual transform of the package json object
   *
   * @param aPkg
   */
  function transformPackageJson(aPkg: any): Observable<any> {
    // make a full clone
    const pkg = cloneDeep(aPkg || {});
    // version number
    const sdkVersion = `^${MAJOR_VERSION}`;
    // consolidate version numbers
    const {
      dependencies = {},
      devDependencies = {},
      peerDependencies = {},
      scripts = {}
    } = pkg;
    // make sure to remove this package from dependencies
    delete dependencies[MODULE];
    delete peerDependencies[MODULE];
    devDependencies[MODULE] = sdkVersion;
    // fix all versions
    fixVersions(sdkVersion, dependencies);
    fixVersions(sdkVersion, devDependencies);
    fixVersions(sdkVersion, peerDependencies);
    // add crutial imports
    dependencies[`${NAMESPACE}ng-app`] = sdkVersion;
    dependencies[`${NAMESPACE}ng-logger`] = sdkVersion;
    devDependencies[`${NAMESPACE}schematics`] = sdkVersion;
    // scripts
    scripts[
      `build:prod:${ArtifactMode.PREVIEW}`
    ] = `ng build --configuration=production,${CONFIG_SOURCE_MAP},${ArtifactMode.PREVIEW}`;
    scripts[
      `build:prod:${ArtifactMode.LIVE}`
    ] = `ng build --configuration=production,${CONFIG_SOURCE_MAP},${ArtifactMode.LIVE}`;
    scripts[
      'build:prod'
    ] = `npm-run-all build:prod:${ArtifactMode.PREVIEW} build:prod:${ArtifactMode.LIVE}`;
    scripts[
      'build:contributions'
    ] = `ng g ${NAMESPACE}/schematics:contributions --data dist/data --configuration=production --mode=${ArtifactMode.PREVIEW},${ArtifactMode.LIVE}`;

    // override the records
    assignObject(pkg, {
      dependencies,
      devDependencies,
      peerDependencies,
      scripts
    });

    // dependencies
    const dependencies$ = rxPipe(
      findSystemDependencies(),
      map((deps) => assignObject(dependencies, deps))
    );
    const devDependencies$ = rxPipe(
      findSystemDevDependencies(),
      map((deps) => assignObject(devDependencies, deps))
    );

    /**
     * Augments the dependencies with the service level dependencies
     */
    return rxPipe(
      merge(dependencies$, devDependencies$),
      ignoreElements(),
      endWith(pkg),
      map(canonicalizeJson)
    );
  }

  return (host: Tree) => {
    // the JSON file
    const pkg$ = rxTransformJsonFile(
      '/package.json',
      transformPackageJson,
      host
    );
    // executes the
    return rxPipe(pkg$, ignoreElements(), endWith(host));
  };
}
