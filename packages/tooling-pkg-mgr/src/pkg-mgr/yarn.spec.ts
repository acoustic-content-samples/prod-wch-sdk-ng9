import { rxPipe } from '@acoustic-content-sdk/utils';
import { map } from 'rxjs/operators';

import { VERSION } from './../version';
import { rxSupportsYarn, rxYarnHasPackage } from './yarn';

describe('yarn', () => {
  it('should locate a matching package', async () => {
    const test$ = rxYarnHasPackage(
      '@acoustic-content-sdk/rx-utils',
      `^${VERSION.version.major}`
    );

    await test$.toPromise();
  });

  it('should have a yarn installation', async () => {
    // test if yarn exists
    const yarn$ = rxSupportsYarn();

    const test$ = rxPipe(
      yarn$,
      map((flag) => expect(flag).toBeTruthy())
    );

    await test$.toPromise();
  });
});
