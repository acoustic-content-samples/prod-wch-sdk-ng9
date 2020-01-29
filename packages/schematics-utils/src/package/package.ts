import { assertObject, isNil, rxPipe } from '@acoustic-content-sdk/utils';
import { readFile } from 'fs';
import { join, parse } from 'path';
import { bindNodeCallback, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { satisfies } from 'semver';

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
  const deps = assertObject(folder, aPkg) as any;
  const oldDep = deps[aName];
  if (isNil(oldDep) || !satisfies(aMinVersion, oldDep)) {
    // just update
    deps[aName] = `^${aMinVersion}`;
  }
  // ok
  return aPkg;
}

const rxReadFile = bindNodeCallback<string, string, string>(readFile);

export function findPackageJson(aDir: string): Observable<any> {
  // read
  return rxPipe(
    rxReadFile(join(aDir, 'package.json'), 'utf-8'),
    map((data) => JSON.parse(data)),
    catchError((err) => findPackageJson(parse(aDir).dir))
  );
}
