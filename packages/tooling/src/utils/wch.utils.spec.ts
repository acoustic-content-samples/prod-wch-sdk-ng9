import { join } from 'path';
import { ASSET_ROOT } from '../test/assets';
import { createReadTextFile } from '../file/file';
import { rxGetWorkspace } from './config';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { tap } from 'rxjs/operators';
import { isWorkspaceSchema } from './project';

describe('wch.utils', () => {
  const BASE = join(ASSET_ROOT, 'sample-spa');
  const readFile = createReadTextFile(BASE);

  it('should locate the workspace file', () => {
    const ws$ = rxGetWorkspace(readFile);

    const test$ = rxPipe(
      ws$,
      tap((ws) => expect(isWorkspaceSchema(ws)).toBeTruthy())
    );

    return test$.toPromise();
  });
});
