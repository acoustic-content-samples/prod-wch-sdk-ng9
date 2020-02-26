import {
  createReadDirectory,
  createReadTextFile
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { count, tap } from 'rxjs/operators';

import { ASSET_ROOT } from '../../test/assets';
import { createNgDriverArtifacts } from './driver';

describe('driver', () => {
  const BASE = join(ASSET_ROOT, 'sample-spa');
  const readFile = createReadTextFile(BASE);
  const readDir = createReadDirectory(BASE);

  fit('should generate descriptors for preview mode', async () => {
    const PROTO = join(ASSET_ROOT, 'proto-sites-next-app');
    const readProto = createReadTextFile(PROTO);
    const readDir = createReadDirectory(PROTO);

    const artifact$ = createNgDriverArtifacts(readProto, readDir, {
      configuration: 'production'
    });

    const test$ = rxPipe(
      artifact$,
      tap(([name]) => console.log('filename', name)),
      tap(
        ([name, data]) =>
          name.indexOf('/assets/dxconfig/manifests/') === 0 &&
          console.log('Carsten', name, JSON.stringify(data, undefined, 2))
      ),
      count(),
      tap((c) => expect(c).toEqual(51))
    );

    await test$.toPromise();
  });

  it('should generate the descriptors', () => {
    const artifact$ = createNgDriverArtifacts(readFile, readDir);

    const test$ = rxPipe(
      artifact$,
      count(),
      tap((c) => expect(c).toEqual(11))
    );

    return test$.toPromise();
  });
});
