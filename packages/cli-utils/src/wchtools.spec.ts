import { rxPipe } from '@acoustic-content-sdk/utils';
import { TEST_DIR$ } from './test/assets';
import { join } from 'path';
import { map, mergeMap } from 'rxjs/operators';
import { rxReadAuthoringTypes } from './wchtools';

describe('wchtools', () => {
  it('should load types', () => {
    const data$ = rxPipe(TEST_DIR$, map((dir) => join(dir, 'data', 'simple')));

    const types$ = rxPipe(data$, mergeMap(rxReadAuthoringTypes));

    const test$ = rxPipe(
      types$,
      map((types) =>
        expect(types['aca5ee5c-a89b-4cf8-aa62-e43a77674663']).toBeDefined()
      )
    );

    return test$.toPromise();
  });
});
