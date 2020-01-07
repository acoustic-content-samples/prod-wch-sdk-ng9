import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import { map } from 'rxjs/operators';

import { rxFindScript } from './process';
import { debugLog } from './test/log';

describe('process', () => {
  it('should locate cpx', () => {
    // find the script
    const path$ = rxFindScript('cpx');

    return rxPipe(path$, map((path) => expect(path).toBeDefined())).toPromise();
  });

  it.skip('should locate source-map-explorer', () => {
    // find the script
    const path$ = rxFindScript('source-map-explorer');

    return rxPipe(path$, map((path) => expect(path).toBeDefined())).toPromise();
  });
});
