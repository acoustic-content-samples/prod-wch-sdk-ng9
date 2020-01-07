import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import { isEmpty, objectKeys } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { map, mergeMap } from 'rxjs/operators';

import { TEST_DIR$ } from './test/assets';
import { PreRequisites, rxVerifyPreRequisites } from './validation';

describe('validation', () => {
  it('validate package dependencies', () => {
    // root package
    const pkgDir$ = rxPipe(TEST_DIR$, map((dir) => join(dir, 'project')));
    // requirements
    const prereq: PreRequisites = {
      '@acoustic-content-sdk/schematics': '>= 7',
      '@acoustic-content-sdk/cli': '>= 7'
    };
    // validate
    const val$ = rxPipe(
      pkgDir$,
      mergeMap((dir) => rxVerifyPreRequisites(prereq, dir)),
      map((val) => expect(isEmpty(objectKeys(val))).toBeTruthy())
    );

    return val$.toPromise();
  });
});
