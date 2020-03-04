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
import { ARTIFACT_MODES } from './../utilities/modes';
import { MODULE, VERSION } from './../version';
import { Schema } from './schema';
import { CONFIG_SOURCE_MAP } from './update.angular.json';

// major version
const {
  version: { major: MAJOR_VERSION }
} = VERSION;

const NAMESPACE = `@${getOrganization(MODULE)}/`;

const KEY_BUILD = 'build';
const KEY_START = 'start';

const BUILD_PROD = 'prod';
const BUILD_DEV = 'dev';

const BUILD_CONTRIBUTIONS = 'contributions';

const BUILD_MODES = [BUILD_PROD, BUILD_DEV];

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
  '@types/react-router'
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
    forEach(ARTIFACT_MODES, (mode: ArtifactMode) => {
      scripts[
        `${KEY_BUILD}:${BUILD_PROD}:${mode}`
      ] = `ng build --configuration=production,${CONFIG_SOURCE_MAP},${mode}`;
      scripts[
        `${KEY_BUILD}:${BUILD_DEV}:${mode}`
      ] = `ng build --configuration=${mode}`;
      scripts[`${KEY_START}:${mode}`] = `ng start --configuration=${mode}`;
    });
    // across modes
    forEach(BUILD_MODES, (build: string) => {
      // the suffix
      const commands = ARTIFACT_MODES.map(
        (mode) => `${KEY_BUILD}:${build}:${mode}`
      );
      // add the script
      scripts[`${KEY_BUILD}:${build}`] = `npm-run-all ${commands.join(' ')}`;
    });
    scripts[KEY_BUILD] = `npm run ${KEY_BUILD}:${BUILD_DEV} --`;
    scripts[KEY_START] = `npm run ${KEY_START}:${BUILD_DEV} --`;
    // build the configurations
    scripts[
      `${KEY_BUILD}:${BUILD_CONTRIBUTIONS}`
    ] = `npm run ${KEY_BUILD}:${BUILD_PROD}:${BUILD_CONTRIBUTIONS} --`;

    scripts[
      `${KEY_BUILD}:${BUILD_PROD}:${BUILD_CONTRIBUTIONS}`
    ] = `ng g ${NAMESPACE}schematics:contributions --data dist/data --configuration=production --mode=${ARTIFACT_MODES.join()}`;
    scripts[
      `${KEY_BUILD}:${BUILD_DEV}:${BUILD_CONTRIBUTIONS}`
    ] = `ng g ${NAMESPACE}schematics:contributions --data dist/data --mode=${ARTIFACT_MODES.join()}`;

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
