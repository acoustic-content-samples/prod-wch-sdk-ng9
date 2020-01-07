import { join } from 'path';

import { createReadDirectory } from '../../dir/dir';
import { ASSET_ROOT } from '../../test/assets';
import { generateLayouts } from './generate.layouts';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { tap } from 'rxjs/operators';

describe('generate.layouts', () => {
  it('should produce layout resources', () => {
    // root directory
    const testDir = join(ASSET_ROOT, 'sample-generate-layouts');
    // read directory callback
    const readDir = createReadDirectory(testDir);
    // the generator
    const gen = generateLayouts({ data: 'data' });
    // produce the result
    const artifacts$ = gen(readDir);

    const test$ = rxPipe(
      artifacts$,
      tap(([file]) => expect(file).toBeDefined())
    );

    return test$.toPromise();
  });
});
