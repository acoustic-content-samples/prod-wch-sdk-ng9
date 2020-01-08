import { rxPipe } from '@acoustic-content-sdk/utils';
import { tap } from 'rxjs/operators';

import { generateProvider } from './generate.provider';
import { writeFiles } from '@acoustic-content-sdk/tooling';
import { normalize, join } from 'path';

describe('generate.provider', () => {
  it('generate a sample provider', () => {
    const cmp$ = generateProvider({ name: 'carsten' });

    const test$ = rxPipe(cmp$, tap(console.log));

    return test$.toPromise();
  });

  fit('generate a sample provider for di', () => {
    const cmp$ = generateProvider({ name: 'carsten', store: true });

    // write
    const write = writeFiles(
      normalize(join(__dirname, '..', '..', 'test', 'di-provider')),
      true
    );

    const test$ = rxPipe(cmp$, write);

    return test$.toPromise();
  });
});
