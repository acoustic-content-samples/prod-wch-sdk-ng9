import {
  createReadDirectory,
  createReadTextFile,
  wchToolsFileDescriptor
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { count, map, tap } from 'rxjs/operators';
import { ASSET_ROOT } from '../../test/assets';
import { copyNgDriverFiles, createNgDriverArtifacts } from './driver';

describe('driver', () => {
  const BASE = join(ASSET_ROOT, 'sample-spa');
  const readFile = createReadTextFile(BASE);

  fit('should read the binary files', async () => {
    const PROTO = join(ASSET_ROOT, 'proto-sites-next-app');
    const readProto = createReadTextFile(PROTO);
    const readDir = createReadDirectory(PROTO);

    const artifact$ = copyNgDriverFiles(readProto, readDir, {
      configuration: 'production'
    });

    const test$ = rxPipe(
      artifact$,
      tap(([name]) => console.log(name))
    );

    await test$.toPromise();
  });

  it('should generate descriptors for preview mode', async () => {
    const PROTO = join(ASSET_ROOT, 'proto-sites-next-app');
    const readProto = createReadTextFile(PROTO);

    const artifact$ = createNgDriverArtifacts(readProto, {
      configuration: 'production'
    });

    const test$ = rxPipe(
      artifact$,
      map(wchToolsFileDescriptor),
      count(),
      tap((c) => expect(c).toEqual(15))
    );

    await test$.toPromise();
  });

  it('should generate the descriptors', () => {
    const artifact$ = createNgDriverArtifacts(readFile);

    const test$ = rxPipe(
      artifact$,
      map(wchToolsFileDescriptor),
      count(),
      tap((c) => expect(c).toEqual(11))
    );

    return test$.toPromise();
  });
});
