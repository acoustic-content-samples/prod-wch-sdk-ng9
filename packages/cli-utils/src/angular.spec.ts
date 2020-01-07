import { rxStats } from '@acoustic-content-sdk/rx-utils';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { map, mergeMap, tap } from 'rxjs/operators';

import { rxGetSourceFolder, rxReadAngularJson } from './angular';
import { TEST_DIR$ } from './test/assets';
import { debugLog } from './test/log';

describe('angular', () => {
  it('should locate the source folder', () => {
    const rootDir$ = rxPipe(TEST_DIR$, map((dir) => join(dir, 'project')));

    const srcDir$ = rxPipe(
      rootDir$,
      mergeMap(rxReadAngularJson),
      mergeMap((root) => rxGetSourceFolder(root))
    );

    // check if the index file is located inside the source folder
    const test$ = rxPipe(
      srcDir$,
      map((src) => join(src.absPath, 'index.html')),
      mergeMap((file) => rxStats(file)),
      tap(debugLog)
    );

    return test$.toPromise();
  });
});
