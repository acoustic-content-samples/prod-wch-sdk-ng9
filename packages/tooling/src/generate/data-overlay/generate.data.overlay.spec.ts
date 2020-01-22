import { rxPipe } from '@acoustic-content-sdk/utils';
import { join, normalize } from 'path';
import { tap } from 'rxjs/operators';

import { createReadTextFile } from '../../file/file';
import { DataOverlaySchema } from './schema';
import { generateDataOverlay } from './generate.data.overlay';
import { createReadDirectory } from '../../dir/dir';

describe('generate.data.overlay', () => {
  xit('should generate a data overlay', async () => {
    const ROOT = '/';
    const PKG_FOLDER = '/d/sites-next-content/packages/data-sample-site';
    // read text
    const readText = createReadTextFile(ROOT);
    const readDir = createReadDirectory(ROOT);
    // config
    const schema: DataOverlaySchema = { src: PKG_FOLDER };
    // callback
    const cb = generateDataOverlay(schema);
    const file$ = cb(readText, readDir);

    const test$ = rxPipe(
      file$,
      tap(([name]) => console.log(name))
    );

    await test$.toPromise();
  });
});
