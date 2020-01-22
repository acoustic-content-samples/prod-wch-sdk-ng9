import { rxLocateRootDir } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { map } from 'rxjs/operators';

export const ASSETS_FOLDER = 'assets';

export const ASSET_ROOT$ = rxPipe(
  rxLocateRootDir(__dirname),
  map((dir) => join(dir, 'assets'))
);
