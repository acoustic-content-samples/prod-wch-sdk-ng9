import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { count, map, tap } from 'rxjs/operators';

import { createReadTextFile } from '../file/file';
import { ASSET_ROOT } from '../test/assets';
import { wchToolsFileDescriptor } from '../utils/wchtools';
import { createDriverArtifacts } from './driver';

describe('driver', () => {
  const BASE = join(ASSET_ROOT, 'sample-spa');
  const readFile = createReadTextFile(BASE);

  it('should generate descriptors for preview mode', async () => {
    const PROTO = join(ASSET_ROOT, 'proto-sites-next-app');
    const readProto = createReadTextFile(PROTO);

    const artifact$ = createDriverArtifacts(readProto, {
      configuration: 'production, edit'
    });

    const test$ = rxPipe(
      artifact$,
      map(wchToolsFileDescriptor),
      count(),
      tap((c) => expect(c).toEqual(8))
    );

    await test$.toPromise();
  });

  it('should generate the descriptors', () => {
    const artifact$ = createDriverArtifacts(readFile);

    const test$ = rxPipe(
      artifact$,
      map(wchToolsFileDescriptor),
      count(),
      tap((c) => expect(c).toEqual(6))
    );

    return test$.toPromise();
  });
});
