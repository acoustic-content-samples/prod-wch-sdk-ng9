import { rxLocateRootDir } from './file';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { map, tap, mergeMap } from 'rxjs/operators';
import { rxReadJsonFile } from '@acoustic-content-sdk/rx-utils';
import { join } from 'path';
import { ASSET_ROOT } from '../test/assets';

describe('file', () => {
  it('should locate the application directory for assets', () => {
    const dir$ = rxLocateRootDir(join(ASSET_ROOT, 'sample-spa'));

    const pkg$ = rxPipe(
      dir$,
      mergeMap((dir) => rxReadJsonFile(join(dir, 'package.json')))
    );

    const test$ = rxPipe(pkg$, tap((pkg) => expect(pkg).toBeDefined()));

    return test$.toPromise();
  });

  it('should locate the application directory', () => {
    const dir$ = rxLocateRootDir(__dirname);

    const pkg$ = rxPipe(
      dir$,
      mergeMap((dir) => rxReadJsonFile(join(dir, 'package.json')))
    );

    const test$ = rxPipe(pkg$, tap((pkg) => expect(pkg).toBeDefined()));

    return test$.toPromise();
  });
});
