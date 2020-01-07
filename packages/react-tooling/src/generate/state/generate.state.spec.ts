import { writeFiles } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { tmpdir } from 'os';
import { join } from 'path';

import { generateState } from './generate.state';

describe('generate.state', () => {
  it('generate a sample state', () => {
    const cmp$ = generateState('carsten');
    // target directory
    const dst = join(tmpdir(), 'state');

    const test$ = rxPipe(cmp$, writeFiles(dst));

    return test$.toPromise();
  });
});
