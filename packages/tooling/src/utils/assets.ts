import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { map } from 'rxjs/operators';

import { rxLocateRootDir } from '../file/file';

export const ASSETS_FOLDER = 'assets';

export const ASSET_ROOT$ = rxPipe(
  rxLocateRootDir(__dirname),
  map((dir) => join(dir, 'assets'))
);
