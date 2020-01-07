import { rxPipe } from '@acoustic-content-sdk/utils';
import { TEST_DIR$ } from './test/assets';
import { combineLatest } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { join } from 'path';
import { rxTempDir, rxMkDirs } from '@acoustic-content-sdk/rx-utils';
import { rxCreateAsset } from './asset';

describe('asset', () => {
  it('should create an asset', () => {
    // root test dir
    const rootDir$ = rxPipe(TEST_DIR$, map((dir) => join(dir, 'assets')));
    // assert
    const testAsset$ = rxPipe(
      rootDir$,
      map((dir) => join(dir, 'main-es5.357cc30aaffdaa61635d.js'))
    );
    // target dir
    const dst$ = rxPipe(rxTempDir(), map((dir) => join(dir, 'data')));
    // directory callbacks
    const mkdirs = rxMkDirs();
    // copy the assets
    const assets$ = rxPipe(
      combineLatest([testAsset$, dst$]),
      mergeMap(([src, dst]) => rxCreateAsset(dst, 'app/main.js', src, mkdirs)),
      tap(console.log)
    );
    // done
    return assets$.toPromise();
  });
});
