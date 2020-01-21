import { rxPipe } from '@acoustic-content-sdk/utils';
import { join, normalize } from 'path';
import { tap } from 'rxjs/operators';

import { createReadTextFile } from '../file/file';
import { ASSET_ROOT } from '../test/assets';
import { rxDataDirectory, rxGetDependencies } from './dependencies';

describe('dependencies', () => {
  it('should read some dependencies', async () => {
    // root folder
    const ROOT = normalize(join(ASSET_ROOT, '..'));
    // read text
    const readText = createReadTextFile(ROOT);
    // my root
    const PKG_FOLDER = 'packages/tooling';
    // locate the dependencies
    const deps$ = rxGetDependencies(readText, PKG_FOLDER);

    const data$ = rxPipe(deps$, rxDataDirectory(readText));

    const test$ = rxPipe(data$, tap(console.log));

    await test$.toPromise();
  });

  it('should read some dependencies', async () => {
    // root folder
    const ROOT = normalize(join(ASSET_ROOT, '..'));
    // read text
    const readText = createReadTextFile(ROOT);
    // my root
    const PKG_FOLDER = 'packages/tooling';
    // locate the dependencies
    const deps$ = rxGetDependencies(readText, PKG_FOLDER);

    const test$ = rxPipe(deps$, tap(console.log));

    await test$.toPromise();
  });
});
