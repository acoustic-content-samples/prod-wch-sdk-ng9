import { rxCacheSingle, rxPipe } from '@acoustic-content-sdk/rx-utils';
import { dirname, join } from 'path';
import { map } from 'rxjs/operators';

import { rxFindPackageJson } from '../package';

const pkg$ = rxCacheSingle(rxFindPackageJson(__dirname));

export const TEST_DIR$ = rxCacheSingle(
  rxPipe(pkg$, map(dirname), map((dir) => join(dir, 'test')))
);
