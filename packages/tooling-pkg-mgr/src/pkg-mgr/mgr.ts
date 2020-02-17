import { rxForkJoin } from '@acoustic-content-sdk/rx-utils';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { pathExists } from 'fs-extra';
import { join } from 'path';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { rxSupportsNpm } from './npm';
import { rxSupportsYarn } from './yarn';

/**
 * Enumeration of the supported package managers
 */
export enum PackageManager {
  YARN = 'yarn',
  NPM = 'npm'
}

/**
 * Decodes the supported workspace from the host
 *
 * @param aRoot - the root dir to test
 * @returns the supported package manager
 */
export function getPackageManager(aRoot: string): Observable<PackageManager> {
  // check for supported managers
  const hasYarn$ = rxSupportsYarn();
  const hasYarnLock$ = from(pathExists(join(aRoot, 'yarn.lock')));
  const hasNpm$ = rxSupportsNpm();
  const hasNpmLock$ = from(pathExists(join(aRoot, 'package-lock.json')));

  return rxPipe(
    rxForkJoin([hasYarn$, hasYarnLock$, hasNpm$, hasNpmLock$]),
    map(([hasYarn, hasYarnLock, hasNpm, hasNpmLock]) => {
      if (hasYarn && hasYarnLock && !hasNpmLock) {
        return PackageManager.YARN;
      } else if (hasNpm && hasNpmLock && !hasYarnLock) {
        return PackageManager.NPM;
      } else if (hasYarn && !hasNpm) {
        return PackageManager.YARN;
      } else if (hasNpm && !hasYarn) {
        return PackageManager.NPM;
      }
      // fallback to npm
      return PackageManager.NPM;
    })
  );
}
