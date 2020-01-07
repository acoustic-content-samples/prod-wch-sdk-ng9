import { join } from 'path';

import { createReadDirectory } from '../../dir/dir';
import { ASSET_ROOT } from '../../test/assets';
import { generateKeys } from './generate.keys';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { tap } from 'rxjs/operators';

describe('generate.keys', () => {
  fit('should work with the sample document', () => {
    // root directory
    const testDir = 'C:\\temp\\wch-sample';
    // read directory callback
    const readDir = createReadDirectory(testDir);
    // the generator
    const gen = generateKeys({ data: '/' });
    // produce the result
    const artifacts$ = gen(readDir);

    const test$ = rxPipe(
      artifacts$,
      tap(([file]) => console.log(file)),
      tap(([file]) => expect(file).toBeDefined())
    );

    return test$.toPromise();
  });

  it('should insert keys', () => {
    // root directory
    const testDir = join(ASSET_ROOT, 'sample-email');
    // read directory callback
    const readDir = createReadDirectory(testDir);
    // the generator
    const gen = generateKeys({ data: 'data' });
    // produce the result
    const artifacts$ = gen(readDir);

    const test$ = rxPipe(
      artifacts$,
      tap(([file]) => console.log(file)),
      tap(([file]) => expect(file).toBeDefined())
    );

    return test$.toPromise();
  });
});
