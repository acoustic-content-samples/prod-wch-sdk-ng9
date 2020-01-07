import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import { writeFiles } from '@acoustic-content-sdk/tooling';
import { isFunction } from '@acoustic-content-sdk/utils';
import { tmpdir } from 'os';
import { join } from 'path';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ASSET_ROOT } from '../test/assets';
import { rxApplyTemplates, rxReadTemplates } from './templates';

describe('templates', () => {
  const TEMPLATES_DIR = 'sample-templates';

  it('should apply templates', () => {
    const srcDir = join(ASSET_ROOT, TEMPLATES_DIR);
    const dstDir = join(tmpdir(), TEMPLATES_DIR);
    // load the templates
    const files$ = rxReadTemplates(srcDir);
    // the context
    const ctx = { 'folder-name': 'myFolder', 'file-name': 'myFile' };
    const ctx$ = of(ctx);
    // apply
    const applied$ = rxApplyTemplates(ctx$, files$);
    // write
    const written$ = rxPipe(applied$, writeFiles(dstDir));
    // test
    const test$ = rxPipe(written$, tap(console.log));
    // ok
    return test$.toPromise();
  });

  it('should compile templates', () => {
    const dir = join(ASSET_ROOT, TEMPLATES_DIR);

    const files$ = rxReadTemplates(dir);
    const test$ = rxPipe(
      files$,
      tap(([name, data]) =>
        expect(isFunction(name) && isFunction(data)).toBeTruthy()
      )
    );

    return test$.toPromise();
  });
});
