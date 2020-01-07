import { rxPipe } from '@acoustic-content-sdk/utils';
import { tap } from 'rxjs/operators';

import { generateComponent } from './generate.component';
import { writeFiles } from '@acoustic-content-sdk/tooling';
import { normalize, join } from 'path';

describe('generate.components', () => {
  it('generate a sample component', () => {
    const cmp$ = generateComponent({ name: 'carsten' });

    const test$ = rxPipe(cmp$, tap(console.log));

    return test$.toPromise();
  });

  fit('generate a sample component for di', () => {
    const cmp$ = generateComponent({ name: 'carsten', di: true, store: true });

    // write
    const write = writeFiles(
      normalize(join(__dirname, '..', '..', 'test', 'di-component')),
      true
    );

    const test$ = rxPipe(cmp$, write);

    return test$.toPromise();
  });
});
