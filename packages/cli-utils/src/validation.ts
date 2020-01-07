import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import {
  assignObject,
  isNil,
  objectAssign,
  reduceForIn
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { intersects } from 'semver';

import { rxReadPackageJson } from './package';

/**
 * Prerequisites as module name to string
 */
export type PreRequisites = Record<string, string>;

/**
 * Locates missing prerequisites
 *
 * @param aExist - the existing versions
 * @param aRequired - the required versions
 *
 * @returns the missing prerequisites
 */
function findMissingPrereqs(
  aExist: PreRequisites,
  aRequired: PreRequisites
): PreRequisites {
  // result set
  return reduceForIn(
    aRequired,
    (aDst: PreRequisites, aValue, aKey) => {
      // check for existence
      const exValue = aExist[aKey];
      if (isNil(exValue) || !intersects(exValue, aValue)) {
        // register
        objectAssign(aKey, aValue, aDst);
      }
      // returns the obj
      return aDst;
    },
    {}
  );
}

/**
 * Verifies if the installed prerequisites meet the requirements.
 *
 * @param aPrereq  - required prerequisites
 * @param aRootDir - root directory
 *
 * @returns the missing prerequisites from the input or the empty object
 */
export function rxVerifyPreRequisites(
  aPrereq: PreRequisites,
  aRootDir: string
): Observable<PreRequisites> {
  // load the package json
  const pkgJson$ = rxReadPackageJson(aRootDir);
  // extract the dependencies
  const deps$: Observable<PreRequisites> = rxPipe(
    pkgJson$,
    map((pkg) => assignObject({}, pkg.devDependencies, pkg.dependencies))
  );
  // validate
  return rxPipe(deps$, map((deps) => findMissingPrereqs(deps, aPrereq)));
}
