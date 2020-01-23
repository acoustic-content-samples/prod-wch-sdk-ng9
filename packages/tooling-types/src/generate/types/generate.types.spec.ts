import {
  createReadDirectory,
  createReadTextFile,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { tap } from 'rxjs/operators';

import { ASSET_ROOT } from '../../test/assets';
import { generateTypes } from './generate.types';

describe('generate.types', () => {
  it('should produce typings', async () => {
    // root directory
    const testDir = join(ASSET_ROOT, 'sample-generate-types');
    // read directory callback
    const readDir = createReadDirectory(testDir);
    const readText = createReadTextFile(testDir);
    // target folder
    const ROOT = 'src/samples';
    const writeText = writeFiles(ROOT, true);
    // the generator
    const gen = generateTypes({ data: 'data' });

    const types$ = gen(readDir, readText);

    const test$ = rxPipe(
      types$,
      writeText,
      tap(([name]) => console.log(name))
    );

    return await test$.toPromise();
  });
});
