import { rxSpawn, SPAWN_OUTPUT_TYPE } from '@acoustic-content-sdk/rx-utils';
import {
  arrayPush,
  FALSE$,
  getPath,
  isEqual,
  isNotNil,
  jsonParse,
  reduceArray,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { catchError, filter, first, map, mapTo } from 'rxjs/operators';
import { coerce, satisfies, SemVer } from 'semver';

/**
 * Tests if we have a `yarn` installation
 *
 * @returns true if we have an installation, else false
 */
export function rxSupportsYarn(): Observable<boolean> {
  return rxPipe(
    rxSpawn('yarn', ['--version']),
    filter(([type]) => isEqual(type, SPAWN_OUTPUT_TYPE.STDOUT)),
    map(([, line]) => line),
    filter((line) => /\d+.\d+.\d+/.test(line)),
    first(),
    mapTo(true),
    catchError(() => FALSE$)
  );
}

function splitName(aName: string): [string, SemVer] {
  // last '@'
  const idx = aName.lastIndexOf('@');
  const left = aName.substr(0, idx);
  const right = aName.substr(idx + 1);
  return [left, coerce(right)];
}

/**
 * Locates all dependencies for the named package
 *
 * @param aName  - name
 * @param aMain  - main result of the yarn list command
 *
 * @returns the array
 */
function findAll(aName: string, aMain: any): SemVer[] {
  function reduceTrees(aDst: SemVer[], aTree: any): SemVer[] {
    const [name, version] = splitName(aTree.name);
    const children: any[] = aTree.children;
    // check
    if (isEqual(aName, name)) {
      arrayPush(version, aDst);
    }
    // recurse on the children
    return reduceArray(children, reduceTrees, aDst);
  }

  // extract
  const trees = getPath<any[]>(aMain, ['data', 'trees'], []);
  // reduce
  return reduceArray(trees, reduceTrees, []);
}

/**
 * Tests if we have a matching package installation
 *
 * @param aName  - package name
 * @param aVersion - package version
 *
 * @returns true if we have such a package
 */
export function rxYarnHasPackage(
  aName: string,
  aRange: string
): Observable<boolean> {
  // scan
  return rxPipe(
    rxSpawn('yarn', [
      'list',
      '--no-progress',
      '--json',
      '--prod',
      '--pattern',
      aName
    ]),
    filter(([type]) => isEqual(type, SPAWN_OUTPUT_TYPE.STDOUT)),
    map(([, line]) => line),
    map(jsonParse),
    map((main) => findAll(aName, main)),
    map((versions) => versions.find((version) => satisfies(version, aRange))),
    map(isNotNil),
    catchError(() => FALSE$)
  );
}
