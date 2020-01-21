import {
  assertObject,
  isEqual,
  isNil,
  jsonParse,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { join, parse } from 'path';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { satisfies } from 'semver';

import { ReadTextFile } from '../file/file';

export const PACKAGE_JSON = 'package.json';

export enum DEP_TYPE {
  PEER,
  RUNTIME,
  DEVELOPMENT
}

export function getFolderForType(aType?: DEP_TYPE): string {
  return aType === DEP_TYPE.PEER
    ? 'peerDependencies'
    : aType === DEP_TYPE.DEVELOPMENT
    ? 'devDependencies'
    : 'dependencies';
}

/**
 * Updates the package JSON to use at least the given version
 *
 * @param aName - name
 * @param aMinVersion - min version
 * @param aPkg - package
 */
export function updateMinVersion(
  aName: string,
  aMinVersion: string,
  aPkg: any,
  aType?: DEP_TYPE
): any {
  // check if we have a version identifier
  const folder = getFolderForType(aType);
  // access
  const deps = assertObject(folder, aPkg);
  const oldDep = deps[aName];
  if (isNil(oldDep) || !satisfies(aMinVersion, oldDep)) {
    // just update
    deps[aName] = `^${aMinVersion}`;
  }
  // ok
  return aPkg;
}

export function rxFindPackageJson(
  aDir: string,
  aReadFile: ReadTextFile
): Observable<any> {
  // read
  return rxPipe(
    aReadFile(join(aDir, PACKAGE_JSON)),
    map(jsonParse),
    catchError((err) => rxFindPackageJson(parse(aDir).dir, aReadFile))
  );
}

/**
 * Locates the folder that contains the closest package json
 *
 * @param aReadFile  - the read file callback
 * @param aRoot - the directory root
 *
 * @returns the folder name or an error
 */
export function rxLocatePackageJson(
  aReadFile: ReadTextFile,
  aRoot: string = '/'
): Observable<string> {
  // read
  return rxPipe(
    aReadFile(`${aRoot}/${PACKAGE_JSON}`),
    mapTo(aRoot),
    catchError((err) => {
      // go to the parent dir
      const { root, dir } = parse(aRoot);
      return isEqual(root, aRoot)
        ? throwError(err)
        : rxLocatePackageJson(aReadFile, dir);
    })
  );
}
