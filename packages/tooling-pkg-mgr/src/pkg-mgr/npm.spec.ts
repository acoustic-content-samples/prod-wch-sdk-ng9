import { rxPipe } from '@acoustic-content-sdk/utils';
import { map } from 'rxjs/operators';
import { rxSupportsNpm } from './npm';

describe('npm', () => {
  it('should have an npm installation', async () => {
    // test if yarn exists
    const yarn$ = rxSupportsNpm();

    const test$ = rxPipe(
      yarn$,
      map((flag) => expect(flag).toBeTruthy())
    );

    await test$.toPromise();
  });
});
