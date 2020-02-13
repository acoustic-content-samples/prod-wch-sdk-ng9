import { rxTransformJsonFile } from '@acoustic-content-sdk/schematics-utils';
import { getOrganization } from '@acoustic-content-sdk/tooling';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import {
  assertFromGenerator,
  assignObject,
  cloneDeep,
  constGenerator,
  filterArray,
  forEach,
  objectKeys,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Rule, Tree } from '@angular-devkit/schematics';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements } from 'rxjs/operators';

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
    // add potentially missing dependencies
    assertFromGenerator('npm-run-all', devDependencies, constGenerator('^4'));
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

    return of(pkg);
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
