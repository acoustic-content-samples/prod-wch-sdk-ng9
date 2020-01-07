import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { tap } from 'rxjs/operators';

import { createReadDirectory } from '../../dir/dir';
import { ASSET_ROOT } from '../../test/assets';
import { generateMessages } from './generate.messages';

describe('generate.messages', () => {
  it('should convert messages2', () => {
    // root directory
    const testDir = join(ASSET_ROOT, 'sample-locales-2');
    console.log('testDir', testDir);
    // read directory callback
    const readDir = createReadDirectory(testDir);
    // the generator
    const gen = generateMessages({ dir: '/' });

    const artifacts$ = gen(readDir);

    const test$ = rxPipe(
      artifacts$,
      tap(([file, data]) => console.log(data)),
      tap(([file]) => expect(file).toBeDefined())
    );

    return test$.toPromise();
  });

  it('should convert messages', () => {
    // root directory
    const testDir = join(ASSET_ROOT, 'sample-locales');
    // read directory callback
    const readDir = createReadDirectory(testDir);
    // the generator
    const gen = generateMessages({ dir: '/' });

    const artifacts$ = gen(readDir);

    const test$ = rxPipe(
      artifacts$,
      tap(([file, data]) => console.log(data)),
      tap(([file]) => expect(file).toBeDefined())
    );

    return test$.toPromise();
  });
});
