import { rxLocateRootDir } from '../file/file';
import { join } from 'path';
import { ASSET_ROOT } from '../test/assets';
import { rxReadDir } from './dir';
import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import { mergeMap, tap, first } from 'rxjs/operators';

describe('dir', () => {
  it('should read the assets in a directory', () => {
    const dir = join(ASSET_ROOT, 'sample-templates');

    const files$ = rxReadDir(dir);

    const test$ = rxPipe(
      files$,
      tap(([name]) => expect(name).toBeDefined()),
      tap(([name, buffer]) => expect(buffer).toBeDefined())
    );

    return test$.toPromise();
  });
});
