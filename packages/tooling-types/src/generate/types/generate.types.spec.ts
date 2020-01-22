import { createReadDirectory } from '@acoustic-content-sdk/tooling';
import { join } from 'path';
import { ASSET_ROOT } from '../../test/assets';
import { generateTypes } from './generate.types';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { tap } from 'rxjs/operators';

describe('generate.types', () => {
  it('should produce typings', async () => {
    // root directory
    const testDir = join(ASSET_ROOT, 'sample-generate-types');
    // read directory callback
    const readDir = createReadDirectory(testDir);
    // the generator
    const gen = generateTypes({ data: 'data' });

    const types$ = gen(readDir);

    const test$ = rxPipe(types$, tap(console.log));

    return await test$.toPromise();
  });
});
