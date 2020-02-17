import { rxForkJoin } from '@acoustic-content-sdk/rx-utils';
import {
  PackageManager,
  rxSupportsNpm,
  rxSupportsYarn
} from '@acoustic-content-sdk/tooling-pkg-mgr';
import { getPath, isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { join, normalize } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { getWorkspace, getWorkspacePath } from '../utility/config';

/**
 * Decodes the supported workspace from the host
 *
 * @param aHost - the host tree
 * @returns the supported package manager
 */
export function getPackageManager(aHost: Tree): Observable<PackageManager> {
  // read the workspace path
  const root = normalize(getWorkspacePath(aHost));
  // check for the package
  const ws = getWorkspace(aHost);
  // pluck the manager from the host
  if (isNotNil(ws)) {
    // get
    const packageManager = getPath<PackageManager>(ws, [
      'cli',
      'packageManager'
    ]);
    if (isNotNil(packageManager)) {
      // return it
      return of(packageManager);
    }
  }
  // check for supported managers
  const hasYarn$ = rxSupportsYarn();
  const hasYarnLock = aHost.exists(join(root, 'yarn.lock'));
  const hasNpm$ = rxSupportsNpm();
  const hasNpmLock = aHost.exists(join(root, 'package-lock.json'));

  return rxPipe(
    rxForkJoin([hasYarn$, hasNpm$]),
    map(([hasYarn, hasNpm]) => {
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
